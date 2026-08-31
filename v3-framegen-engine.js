/* FrameForge V3 — explicit Frame Generation / Multi Frame Generation modes
   Important: NVIDIA's 2X / 3X / 4X labels describe the nominal frame cadence
   (rendered + generated frames). They are not universal measured FPS multipliers.
   FrameForge therefore derives an effective estimate from the rendered FPS and
   the current workload instead of applying fixed 1.62 / 2.30 / 2.85 constants.
*/

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

function frameGenNominalMultiplier(gpu, mode) {
  if (!gpu?.frameGen || mode === "off") return 1;
  if (gpu.brand === "nvidia" && gpu.gen >= 50) {
    if (mode === "mfg4x") return 4;
    if (mode === "mfg3x") return 3;
    return 2;
  }
  // Standard Frame Generation inserts one generated frame between rendered frames.
  return 2;
}

function frameGenPerformanceModel(gpu, mode, renderedFps, context = {}) {
  const nominalMultiplier = frameGenNominalMultiplier(gpu, mode);
  if (nominalMultiplier <= 1 || !Number.isFinite(renderedFps) || renderedFps <= 0) {
    return {
      nominalMultiplier: 1,
      effectiveMultiplier: 1,
      displayedFps: Math.max(0, renderedFps || 0),
      generatedFramesPerRendered: 0,
      efficiency: 1,
      overheadMs: 0
    };
  }

  const generatedFramesPerRendered = nominalMultiplier - 1;
  const rtWeight = context.rtKey === "path" ? 1 : context.rtKey === "ultra" ? 0.72 : context.rtKey === "medium" ? 0.38 : 0;
  const resolutionPixels = context.resolutionKey && RESOLUTIONS[context.resolutionKey]
    ? pixels(context.resolutionKey)
    : pixels("1440");
  const resolutionWeight = clamp(Math.log2(Math.max(resolutionPixels / pixels("1080"), 1)) / 2.4, 0, 1);

  // Frame-generation work is not free. Instead of pretending that 4X means
  // measured FPS ×4, estimate a small per-frame scheduling/generation cost.
  // Blackwell receives a lower base cost because MFG scheduling is hardware-assisted.
  const isBlackwell = gpu.brand === "nvidia" && gpu.gen >= 50;
  const baseOverheadMs = isBlackwell ? 0.72 : gpu.brand === "nvidia" ? 1.05 : 1.20;
  const extraFrameCostMs = isBlackwell ? 0.18 : 0.28;
  const workloadCostMs = 0.16 * rtWeight + 0.10 * resolutionWeight;
  const overheadMs = baseOverheadMs + generatedFramesPerRendered * extraFrameCostMs + workloadCostMs;

  // At very low rendered FPS, interpolation quality/latency limits make the
  // headline multiplier less useful. At high base FPS, generation overhead
  // consumes a larger share of the frame budget. This bell-shaped efficiency
  // keeps the estimate scenario-dependent and conservative.
  const lowBasePenalty = renderedFps < 45 ? clamp((45 - renderedFps) / 70, 0, 0.25) : 0;
  const generationBudgetShare = clamp((overheadMs * renderedFps) / 1000, 0, 0.32);
  const modeComplexityPenalty = generatedFramesPerRendered >= 3 ? 0.035 : generatedFramesPerRendered === 2 ? 0.02 : 0;
  const efficiency = clamp(1 - lowBasePenalty - generationBudgetShare - modeComplexityPenalty, 0.68, 0.97);

  // The rendered frame is always present. Efficiency only discounts generated
  // frames, which is more faithful than multiplying the whole result by a fixed constant.
  const effectiveMultiplier = 1 + generatedFramesPerRendered * efficiency;
  const displayedFps = renderedFps * effectiveMultiplier;

  return {
    nominalMultiplier,
    effectiveMultiplier,
    displayedFps,
    generatedFramesPerRendered,
    efficiency,
    overheadMs
  };
}

function officialReferenceFrameGenModel(gpu, enabled, displayedReferenceFps, context = {}) {
  if (!enabled || !gpu?.frameGen) {
    return { renderedFps: displayedReferenceFps, effectiveMultiplier: 1, nominalMultiplier: 1 };
  }

  // RTX 40 official references use standard FG (nominal 2X). For an RTX 50
  // reference without an explicit MFG mode, default conservatively to 2X.
  const mode = gpu.brand === "nvidia" && gpu.gen >= 50 ? "mfg2x" : "fg";
  let rendered = Math.max(1, displayedReferenceFps / 1.7);

  // Solve the scenario-dependent model backwards so the published reference
  // FPS remains the anchor rather than being altered by an arbitrary constant.
  for (let i = 0; i < 8; i += 1) {
    const model = frameGenPerformanceModel(gpu, mode, rendered, context);
    rendered = displayedReferenceFps / Math.max(model.effectiveMultiplier, 1);
  }

  const finalModel = frameGenPerformanceModel(gpu, mode, rendered, context);
  return { renderedFps: rendered, effectiveMultiplier: finalModel.effectiveMultiplier, nominalMultiplier: finalModel.nominalMultiplier };
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

  const refFgModel = officialReferenceFrameGenModel(refGpu, reference.frameGen, reference.fps, {
    resolutionKey: reference.resolution,
    rtKey: reference.rt
  });
  const referenceRenderedFps = refFgModel.renderedFps;

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

  const frameGenModel = frameGenPerformanceModel(gpu, frameGenMode, renderedFps, { resolutionKey, rtKey });
  const userFgMultiplier = frameGenModel.effectiveMultiplier;
  const displayedFps = frameGenModel.displayedFps;

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
    cpu, gpu, game, resolutionKey, presetKey, rtKey, upscalingKey, frameGen, frameGenMode,
    frameGenMultiplier: userFgMultiplier,
    frameGenNominalMultiplier: frameGenModel.nominalMultiplier,
    frameGenEfficiency: frameGenModel.efficiency,
    frameGenOverheadMs: frameGenModel.overheadMs,
    generatedFramesPerRendered: frameGenModel.generatedFramesPerRendered,
    ram, storage,
    fps: displayedFps, renderedFps, low: oneLow, frameTime, vramNeed, vramPressure, gpuLoad, cpuLoad,
    bottleneck, confidence, stability, smoothness, gpuCeiling, cpuCeiling,
    reference, refCpu, refGpu, referenceDistance: actualReferenceDistance, referenceMatch,
    gpuRatioRaw, cpuRatioRaw, workloadRatio, referenceRenderedFps, pixelRatio
  };
}
