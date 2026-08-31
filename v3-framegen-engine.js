/* FrameForge V3 — explicit Frame Generation / Multi Frame Generation modes */

function frameGenModeForGpu(gpu, requestedMode, enabled = true) {
  if (!enabled || !gpu?.frameGen) return "off";

  const mode = requestedMode || state.frameGenMode || byId("frame-generation-mode")?.value;

  if (gpu.brand === "nvidia" && gpu.gen >= 50) {
    return ["mfg2x", "mfg3x", "mfg4x"].includes(mode) ? mode : "mfg2x";
  }

  if (gpu.brand === "nvidia" && gpu.gen >= 40) return "fg";
  if (gpu.brand === "amd") return "fg";
  return "off";
}

function frameGenModeMultiplier(gpu, mode) {
  if (!gpu?.frameGen || mode === "off") return 1;

  if (gpu.brand === "nvidia" && gpu.gen >= 50) {
    if (mode === "mfg4x") return 2.85;
    if (mode === "mfg3x") return 2.30;
    return 1.68;
  }

  if (gpu.brand === "nvidia" && gpu.gen >= 40) return 1.62;
  if (gpu.brand === "amd") return 1.52;
  return 1;
}

function officialReferenceFrameGenMultiplier(gpu, enabled) {
  if (!enabled || !gpu?.frameGen) return 1;
  if (gpu.brand === "nvidia") return gpu.gen >= 50 ? 1.68 : 1.62;
  if (gpu.brand === "amd") return 1.52;
  return 1;
}

function calculateScenario(overrides = {}) {
  const cpu = getCpu(overrides.cpu);
  const gpu = getGpu(overrides.gpu);
  const game = getGame(overrides.game || state.game);
  const resolutionKey = overrides.resolution || byId("resolution").value;
  const presetKey = overrides.preset || getPreset();
  const rtKey = overrides.rt ?? byId("rt").value;
  const upscalingKey = overrides.upscaling || byId("upscaling").value;
  const frameGenEnabled = overrides.frameGen ?? byId("frame-generation")?.checked ?? false;
  const frameGenMode = frameGenModeForGpu(gpu, overrides.frameGenMode, frameGenEnabled && game.frameGen);
  const frameGen = frameGenMode !== "off";
  const ram = Number(overrides.ram || byId("ram").value);
  const storage = overrides.storage || byId("storage").value;

  const request = { resolution: resolutionKey, preset: presetKey, rt: rtKey, upscaling: upscalingKey, frameGen };
  const anchorRequest = { ...request, preset: "high" };
  const anchorMatch = selectOfficialReference(game, anchorRequest);
  const reference = anchorMatch.profile;
  const actualReferenceDistance = referenceDistance(reference, request);
  const refCpu = getCpu(reference.cpu);
  const refGpu = getGpu(reference.gpu);

  const refFg = officialReferenceFrameGenMultiplier(refGpu, reference.frameGen);
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
  }

  const userFgMultiplier = frameGenModeMultiplier(gpu, frameGenMode);
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
    cpu, gpu, game, resolutionKey, presetKey, rtKey, upscalingKey, frameGen, frameGenMode, frameGenMultiplier: userFgMultiplier, ram, storage,
    fps: displayedFps, renderedFps, low: oneLow, frameTime, vramNeed, vramPressure, gpuLoad, cpuLoad,
    bottleneck, confidence, stability, smoothness, gpuCeiling, cpuCeiling,
    reference, refCpu, refGpu, referenceDistance: actualReferenceDistance, referenceMatch,
    gpuRatioRaw, cpuRatioRaw, workloadRatio, referenceRenderedFps, pixelRatio
  };
}
