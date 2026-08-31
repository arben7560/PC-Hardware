function calculateScenario(overrides = {}) {
  const cpu = getCpu(overrides.cpu);
  const gpu = getGpu(overrides.gpu);
  const game = getGame(overrides.game || state.game);
  const resolutionKey = overrides.resolution || byId("resolution").value;
  const presetKey = overrides.preset || getPreset();
  const rtKey = overrides.rt ?? byId("rt").value;
  const upscalingKey = overrides.upscaling || byId("upscaling").value;
  const frameGen = overrides.frameGen ?? byId("frame-generation").checked;
  const ram = Number(overrides.ram || byId("ram").value);
  const storage = overrides.storage || byId("storage").value;

  const request = { resolution: resolutionKey, preset: presetKey, rt: rtKey, upscaling: upscalingKey, frameGen };

  // Keep the official anchor stable when only the quality preset changes.
  // The selected preset is then applied as workload, which guarantees that
  // Medium > High > Ultra for the same hardware/resolution/RT scenario.
  const anchorRequest = { ...request, preset: "high" };
  const anchorMatch = selectOfficialReference(game, anchorRequest);
  const reference = anchorMatch.profile;
  const actualReferenceDistance = referenceDistance(reference, request);
  const refCpu = getCpu(reference.cpu);
  const refGpu = getGpu(reference.gpu);

  const refFg = frameGenMultiplier(refGpu, reference.frameGen);
  const referenceRenderedFps = reference.fps / refFg;

  const userGpuScore = gpuScore(gpu, rtKey);
  const referenceGpuScore = gpuScore(refGpu, rtKey);
  const gpuRatioRaw = userGpuScore / Math.max(referenceGpuScore, 1);
  const gpuRatio = Math.pow(gpuRatioRaw, 0.93);
  const cpuRatioRaw = cpu.score / Math.max(refCpu.score, 1);
  const cpuRatio = Math.pow(cpuRatioRaw, 0.90);

  const referenceUpscaling = reference.upscalingKnown === false ? "native" : reference.upscaling;
  const pixelRatio = effectivePixels(resolutionKey, upscalingKey) / effectivePixels(reference.resolution, referenceUpscaling);
  const pixelWorkload = Math.pow(pixelRatio, 0.78);
  const presetRatio = PRESETS[presetKey].cost / PRESETS[reference.preset].cost;
  const rtRatio = RT_LEVELS[rtKey].cost / RT_LEVELS[reference.rt].cost;
  const workloadRatio = pixelWorkload * presetRatio * rtRatio;

  let gpuCeiling = referenceRenderedFps * gpuRatio / Math.max(workloadRatio, 0.18);
  const vramNeed = reference.vram * Math.pow(pixels(resolutionKey) / pixels(reference.resolution), 0.28) * Math.pow(PRESETS[presetKey].cost / PRESETS[reference.preset].cost, 0.35) * Math.pow(RT_LEVELS[rtKey].cost / RT_LEVELS[reference.rt].cost, 0.28);
  const vramPressure = (vramNeed / gpu.vram) * 100;
  if (vramPressure > 100) gpuCeiling *= clamp(1 - (vramPressure - 100) * 0.0032, 0.70, 1);
  if (ram < reference.ram) gpuCeiling *= clamp(1 - (reference.ram - ram) * 0.009, 0.82, 1);
  if (storage === "hdd" && reference.storage !== "hdd") gpuCeiling *= 0.97;

  const cpuHeadroom = 1.65 + (1 - game.cpuIntensity) * 1.08;
  const presetCpuRatio = Math.pow(PRESETS[reference.preset].cpuCost / PRESETS[presetKey].cpuCost, 0.28);
  const cpuCeiling = referenceRenderedFps * cpuHeadroom * cpuRatio * presetCpuRatio;

  // CPU/GPU interaction is a soft saturation, not a hard min(). A faster GPU
  // should still improve a GPU-heavy workload after the CPU starts to matter,
  // but with diminishing returns as the CPU ceiling is approached/exceeded.
  const gpuToCpu = gpuCeiling / Math.max(cpuCeiling, 1);
  let renderedFps;
  if (gpuToCpu <= 0.88) {
    renderedFps = gpuCeiling;
  } else {
    const transitionStart = cpuCeiling * 0.88;
    const excessGpu = Math.max(0, gpuCeiling - transitionStart);
    const saturationWindow = Math.max(cpuCeiling * 0.58, 1);
    const retainedExcess = saturationWindow * (1 - Math.exp(-excessGpu / saturationWindow));
    renderedFps = transitionStart + retainedExcess;
    const practicalCpuCap = cpuCeiling * (1.18 + (1 - game.cpuIntensity) * 0.08);
    renderedFps = Math.min(renderedFps, practicalCpuCap);
  }

  const userFgMultiplier = frameGenMultiplier(gpu, frameGen && game.frameGen);
  const displayedFps = renderedFps * userFgMultiplier;

  const gpuPressure = clamp(renderedFps / Math.max(gpuCeiling, 1), 0, 1);
  const cpuPressure = clamp(renderedFps / Math.max(cpuCeiling, 1), 0, 1.2);
  const gpuLoad = clamp(28 + 71 * Math.pow(gpuPressure, 0.88) + (frameGen ? 2 : 0), 28, 99);
  const threadCoverage = clamp(game.threadDemand / Math.max(cpu.threads, 1), 0.34, 1);
  const cpuLoad = clamp(12 + 82 * Math.min(cpuPressure, 1) * threadCoverage + game.cpuIntensity * 8, 16, 96);

  let bottleneck = "balanced";
  if (vramPressure > 110) bottleneck = "memory";
  else if (storage === "hdd" && reference.storage !== "hdd") bottleneck = "storage";
  else if (gpuCeiling < cpuCeiling * 0.88) bottleneck = "gpu";
  else if (gpuCeiling > cpuCeiling * 1.10) bottleneck = "cpu";

  const lowPenalty = Math.max(0, cpuPressure - 0.76) * 0.13 + (storage === "hdd" ? 0.08 : 0) + (ram < reference.ram ? 0.05 : 0);
  const oneLow = displayedFps * clamp(game.lowFactor - lowPenalty, 0.54, 0.84);
  const frameTime = 1000 / Math.max(displayedFps, 1);

  const referenceMatch = clamp(100 * Math.exp(-actualReferenceDistance / 5.2), 34, 100);
  const extrapolation = Math.abs(Math.log2(Math.max(gpuRatioRaw, 0.1))) + Math.abs(Math.log2(Math.max(cpuRatioRaw, 0.1))) * 0.6;
  const confidence = clamp(76 + referenceMatch * 0.20 - extrapolation * 3.8 - (reference.upscalingKnown === false ? 3 : 0) - (vramPressure > 115 ? 3 : 0), 63, 96);
  const stability = clamp((oneLow / Math.max(displayedFps, 1)) * 100, 48, 91);
  const smoothness = clamp(45 + Math.min(displayedFps, 165) / 165 * 36 + stability * 0.22 - (storage === "hdd" ? 6 : 0), 45, 99);

  return {
    cpu, gpu, game, resolutionKey, presetKey, rtKey, upscalingKey, frameGen, ram, storage,
    fps: displayedFps, renderedFps, low: oneLow, frameTime, vramNeed, vramPressure, gpuLoad, cpuLoad,
    bottleneck, confidence, stability, smoothness, gpuCeiling, cpuCeiling,
    reference, refCpu, refGpu, referenceDistance: actualReferenceDistance, referenceMatch,
    gpuRatioRaw, cpuRatioRaw, workloadRatio, referenceRenderedFps, pixelRatio
  };
}

function recommendedProfile(baseResult) {
  const gpu = baseResult.gpu;
  const game = baseResult.game;
  const target = Number(byId("target-fps").value);
  const qualityUpscale = gpu.brand === "nvidia" ? "dlssQuality" : "fsrQuality";
  const balancedUpscale = gpu.brand === "nvidia" ? "dlssBalanced" : "fsrBalanced";
  const profile = { preset: baseResult.presetKey, rt: baseResult.rtKey, upscaling: baseResult.upscalingKey, frameGen: baseResult.frameGen };
  if (baseResult.fps < target) {
    if (profile.rt === "path" || profile.rt === "ultra") profile.rt = game.rtLevel >= 1 ? "medium" : "off";
    if (profile.upscaling === "native") profile.upscaling = qualityUpscale;
    if (profile.preset === "ultra") profile.preset = "high";
    let test = calculateScenario(profile);
    if (test.fps < target * 0.94) profile.upscaling = balancedUpscale;
    test = calculateScenario(profile);
    if (test.fps < target * 0.92 && gpu.frameGen && game.frameGen) profile.frameGen = true;
  } else if (baseResult.fps > target * 1.38) {
    profile.preset = "ultra";
    if (game.rtLevel >= 1 && profile.rt === "off") profile.rt = "medium";
  }
  return profile;
}

function ratingFor(fps) {
  // The experience rating describes the actual framerate, independently
  // from the user's personal FPS target. Goal attainment is rendered separately.
  if (fps >= 120) return { key: "ratingExcellent", desc: "perfExcellent" };
  if (fps >= 90) return { key: "ratingGreat", desc: "perfGreat" };
  if (fps >= 60) return { key: "ratingGood", desc: "perfGood" };
  if (fps >= 45) return { key: "ratingPlayable", desc: "perfPlayable" };
  return { key: "ratingLimited", desc: "perfLimited" };
}

function bottleneckText(type) {
  const map = { gpu: ["gpuBound", "gpuLimitDesc"], cpu: ["cpuBound", "cpuLimitDesc"], memory: ["memoryBound", "memoryLimitDesc"], storage: ["storageBound", "storageLimitDesc"], balanced: ["noMajorLimit", "balancedDesc"] };
  const pair = map[type] || map.balanced;
  return { title: t(pair[0]), description: t(pair[1]) };
}

function buildRecommendations(result) {
  const target = Number(byId("target-fps").value);
  const rows = [];
  if (result.upscalingKey === "native" && result.fps < target * 1.12) rows.push(["↗", t("recUpscaleTitle"), t("recUpscaleDetail"), "+FPS"]);
  if (["ultra", "path"].includes(result.rtKey) && result.fps < target * 1.15) rows.push(["RT", t("recRtTitle"), t("recRtDetail"), "+GPU"]);
  if (!result.frameGen && result.gpu.frameGen && result.game.frameGen && target >= 120) rows.push(["FG", t("recFgTitle"), t("recFgDetail"), "+Hz"]);
  if (result.storage === "hdd" && result.reference.storage !== "hdd") rows.push(["SSD", t("recStorageTitle"), t("recStorageDetail"), "1% low"]);
  if (result.ram < result.reference.ram) rows.push(["RAM", t("recRamTitle"), t("recRamDetail"), "+stable"]);
  if (result.presetKey === "ultra" && result.fps < target) rows.push(["FX", t("recPresetTitle"), t("recPresetDetail"), "+FPS"]);
  if (!rows.length) rows.push(["✓", t("recKeepTitle"), t("recKeepDetail"), "OK"]);
  return rows.slice(0, 3);
}

function findUpgrade(result) {
  const target = Number(byId("target-fps").value);
  if (result.fps >= target * 1.05 && result.storage !== "hdd") {
    const nextGpu = GPU_DATA.filter((gpu) => gpu.selectable !== false).sort((a, b) => a.raster - b.raster).find((gpu) => gpu.raster >= result.gpu.raster * 1.25);
    if (!nextGpu) return { type: "none", name: t("noUpgradeNeeded"), gain: 0, reason: t("upgradeOptional"), result: null };
    const nextResult = calculateScenario({ gpu: nextGpu.id });
    return { type: "optional", name: nextGpu.name, gain: Math.max(0, round((nextResult.fps / result.fps - 1) * 100)), reason: t("upgradeOptional"), result: nextResult };
  }
  if (result.storage === "hdd" && result.reference.storage !== "hdd") {
    const nextResult = calculateScenario({ storage: "nvme" });
    return { type: "storage", name: "NVMe SSD", gain: Math.max(3, round((nextResult.low / result.low - 1) * 100)), reason: t("storageUpgradeReason"), result: nextResult };
  }
  if (result.bottleneck === "cpu") {
    const selectable = CPU_DATA.filter((x) => x.selectable !== false).sort((a, b) => a.score - b.score);
    const next = selectable.find((cpu) => cpu.score >= result.cpu.score * 1.18) || selectable[selectable.length - 1];
    const nextResult = calculateScenario({ cpu: next.id });
    return { type: "cpu", name: next.name, gain: Math.max(0, round((nextResult.fps / result.fps - 1) * 100)), reason: t("cpuUpgradeReason"), result: nextResult };
  }
  const selectable = GPU_DATA.filter((x) => x.selectable !== false).sort((a, b) => a.raster - b.raster);
  const next = selectable.find((gpu) => gpu.raster >= result.gpu.raster * 1.22) || selectable[selectable.length - 1];
  if (next.id === result.gpu.id) return { type: "none", name: t("noUpgradeNeeded"), gain: 0, reason: t("upgradeOptional"), result: null };
  const nextResult = calculateScenario({ gpu: next.id });
  return { type: "gpu", name: next.name, gain: Math.max(0, round((nextResult.fps / result.fps - 1) * 100)), reason: t("gpuUpgradeReason"), result: nextResult };
}
