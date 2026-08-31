function renderOfficialReference(result) {
  const reference = result.reference;
  const source = result.game.source;
  byId("reference-tier").textContent = reference.name;
  const rtLabel = reference.rt === "off" ? "RT Off" : reference.rt === "path" ? "Path Tracing" : reference.rt === "ultra" ? "RT Ultra" : "RT Medium";
  byId("reference-target").textContent = `${RESOLUTIONS[reference.resolution].label} · ${reference.name} · ${rtLabel} · ${reference.fps} FPS`;
  byId("reference-hardware").textContent = `${result.refGpu.name.replace("NVIDIA GeForce ", "").replace("AMD Radeon ", "")} + ${result.refCpu.name}`;
  byId("reference-memory").textContent = `${reference.ram} GB RAM · ${reference.storage.toUpperCase()} · ${reference.vram} GB VRAM`;
  byId("reference-match-value").textContent = `${round(result.referenceMatch)}%`;
  byId("reference-match-bar").style.width = `${result.referenceMatch}%`;
  byId("reference-match-label").textContent = t(result.referenceMatch >= 78 ? "exactAnchor" : result.referenceMatch >= 52 ? "interpolatedAnchor" : "extrapolatedAnchor");
  byId("reference-publisher").textContent = source.publisher;
  const sourceLink = byId("reference-source-link");
  sourceLink.href = source.url;
  sourceLink.title = source.label;
  byId("gpu-ratio").textContent = `${result.gpuRatioRaw.toFixed(2)}×`;
  byId("cpu-ratio").textContent = `${result.cpuRatioRaw.toFixed(2)}×`;
  byId("workload-ratio").textContent = `${result.workloadRatio.toFixed(2)}×`;
  const workloadKey = result.workloadRatio < 0.92 ? "lighterThanReference" : result.workloadRatio > 1.08 ? "heavierThanReference" : "sameWorkload";
  byId("workload-ratio-label").textContent = t(workloadKey);
  byId("reference-fps").textContent = `${reference.fps} FPS`;
  byId("reference-fps-note").textContent = reference.frameGen
    ? (state.language === "fr" ? "Cible officielle avec Frame Generation" : "Official target includes Frame Generation")
    : (state.language === "fr" ? "Cible officielle du développeur" : "Official developer target");
}

function renderBuildHealth(result) {
  const ratio = result.cpuCeiling / Math.max(result.gpuCeiling, 1);
  const balance = clamp(100 - Math.abs(Math.log2(Math.max(ratio, 0.1))) * 34, 52, 99);
  let health = balance;
  if (result.ram < result.reference.ram) health -= 7;
  if (result.storage === "hdd" && result.reference.storage !== "hdd") health -= 8;
  if (result.vramPressure > 100) health -= 9;
  health = clamp(health, 42, 98);
  byId("balance-value").textContent = `${round(balance)}%`;
  byId("memory-health").textContent = result.ram >= result.reference.ram ? t("good") : t("fair");
  byId("feature-health").textContent = result.gpu.frameGen || result.game.rtLevel === 0 ? t("full") : t("partial");
  byId("health-fill").style.width = `${health}%`;
  const key = health >= 86 ? "excellent" : health >= 72 ? "good" : health >= 58 ? "fair" : "limited";
  byId("build-health-label").textContent = t(key);
  byId("build-health-label").style.color = health >= 72 ? "var(--green)" : health >= 58 ? "var(--yellow)" : "var(--red)";
}

function renderTelemetry(result) {
  const stutterKey = result.storage === "hdd" ? "stutterHigh" : result.stability < 66 ? "stutterMedium" : "stutterLow";
  const latencyKey = result.frameGen ? "latencyFG" : result.fps >= 100 ? "latencyLow" : "latencyNormal";
  const stabilityKey = result.stability >= 75 ? "stabilityExcellent" : result.stability >= 66 ? "stabilityGood" : "stabilityFair";
  byId("smoothness-score").textContent = `${round(result.smoothness)}/100`;
  byId("stutter-value").textContent = t(stutterKey);
  byId("latency-value").textContent = t(latencyKey);
  byId("stability-value").textContent = t(stabilityKey);
  byId("quality-pill").textContent = t(result.smoothness >= 88 ? "goalFitExcellent" : result.smoothness >= 74 ? "goalFitGood" : "goalFitWeak").toUpperCase();
  const graph = byId("frametime-graph");
  graph.innerHTML = "";
  for (let i = 0; i < 42; i += 1) {
    const bar = document.createElement("i");
    const wave = Math.sin(i * 0.72) * 4 + Math.sin(i * 0.21) * 3;
    const jitter = (1 - result.stability / 100) * ((i * 13) % 9);
    const h = clamp(26 + wave + jitter + (result.storage === "hdd" && i % 11 === 0 ? 24 : 0), 16, 72);
    bar.style.height = `${h}%`;
    graph.appendChild(bar);
  }
}

function renderMarket(result) {
  const price = result.gpu.price || Math.round(result.gpu.raster * 7.2);
  const value = clamp(round((result.gpu.raster / price) * 520), 42, 99);
  byId("market-product-name").textContent = result.gpu.name.replace("NVIDIA GeForce ", "").replace("AMD Radeon ", "");
  byId("market-price").textContent = `€${price}`;
  byId("value-score").textContent = `${value}/100`;
  let key = "priceNeutral";
  let context = state.language === "fr" ? "Milieu de gamme" : "Mid market";
  if (value >= 82) { key = "priceGood"; context = state.language === "fr" ? "Valeur forte" : "Strong value"; }
  if (price >= 1000) { key = "pricePremium"; context = state.language === "fr" ? "Haut de gamme" : "High end"; }
  byId("price-state").textContent = t(key);
  byId("price-context").textContent = context;
}

function renderBenchmarks(result) {
  const spreadPercent = clamp(0.07 + (100 - result.referenceMatch) / 420 + (96 - result.confidence) / 450, 0.07, 0.23);
  const predicted = round(result.fps);
  byId("similar-builds-title").textContent = `${result.reference.name} · ${result.game.source.publisher}`;
  byId("median-fps").textContent = `${result.reference.fps} FPS @ ${RESOLUTIONS[result.reference.resolution].label}`;
  byId("typical-range").textContent = `${round(predicted * (1 - spreadPercent))}–${round(predicted * (1 + spreadPercent))} FPS`;
  byId("match-quality").textContent = t(result.referenceMatch >= 78 ? "matchHigh" : result.referenceMatch >= 52 ? "matchMedium" : "matchLow");
}

function renderRecommendations(result, profile) {
  const recommendedResult = calculateScenario(profile);
  const target = Number(byId("target-fps").value);
  const fit = clamp(round((recommendedResult.fps / target) * 100), 0, 100);
  byId("goal-fit-score").textContent = `${fit}%`;
  byId("goal-fit-bar").style.width = `${fit}%`;
  byId("recommendations-list").innerHTML = buildRecommendations(result).map(([icon, title, detail, gain]) => `<div class="recommendation-row"><b>${icon}</b><span><strong>${title}</strong><small>${detail}</small></span><em>${gain}</em></div>`).join("");
}

function profileLabel(profile) {
  const presetMap = { low: state.language === "fr" ? "Faible" : "Low", medium: t("medium"), high: t("high"), ultra: t("ultra") };
  const preset = presetMap[profile.preset] || profile.preset;
  const up = UPSCALERS[profile.upscaling]?.label || profile.upscaling;
  const fg = profile.frameGen ? " + FG" : "";
  return `${preset} · ${up}${fg}`;
}

function renderUpgrade(upgrade, result) {
  const meets = result.fps >= Number(byId("target-fps").value);
  byId("verdict-mark").textContent = meets ? "✓" : "↗";
  byId("upgrade-verdict-title").textContent = meets ? t("noUpgradeNeeded") : t("upgradeHelpful");
  byId("upgrade-verdict-description").textContent = upgrade.reason;
  byId("upgrade-product").textContent = upgrade.name;
  byId("upgrade-reason").textContent = upgrade.reason;
  byId("upgrade-gain").textContent = upgrade.gain ? `+${upgrade.gain}%` : "—";
}

function renderPerformance(result) {
  state.lastResult = result;
  const target = Number(byId("target-fps").value);
  const rating = ratingFor(result.fps, target);
  const fps = Math.max(1, round(result.fps));
  const low = Math.max(1, round(result.low));
  const resLabel = RESOLUTIONS[result.resolutionKey].label;
  const presetLabel = t(result.presetKey === "high" ? "high" : result.presetKey);
  const targetMet = result.fps >= target;
  const targetStatus = targetMet
    ? t("targetMet")
    : (state.language === "fr" ? "Objectif FPS non atteint" : "FPS target not reached");

  byId("fps-value").textContent = fps;
  byId("low-value").textContent = `${low} FPS`;
  byId("frametime-value").textContent = `${result.frameTime.toFixed(1)} ms`;
  byId("vram-value").textContent = `${result.vramNeed.toFixed(1)} GB`;
  byId("scenario-title").textContent = `${presetLabel} / ${resLabel}`;
  byId("rating-badge").textContent = t(rating.key);
  byId("performance-description").textContent = t(rating.desc);
  byId("performance-headline").textContent = targetStatus;
  byId("confidence-value").textContent = `${round(result.confidence)}%`;
  byId("game-confidence").textContent = `${round(result.confidence)}%`;
  byId("fps-ring").style.setProperty("--ring-progress", `${clamp((result.fps / 180) * 330, 40, 330)}deg`);

  byId("gpu-load-value").textContent = `${round(result.gpuLoad)}%`;
  byId("cpu-load-value").textContent = `${round(result.cpuLoad)}%`;
  byId("vram-pressure-value").textContent = `${round(result.vramPressure)}%`;
  byId("gpu-load-bar").style.width = `${clamp(result.gpuLoad, 0, 100)}%`;
  byId("cpu-load-bar").style.width = `${clamp(result.cpuLoad, 0, 100)}%`;
  byId("vram-pressure-bar").style.width = `${clamp(result.vramPressure, 0, 100)}%`;

  const bottleneck = bottleneckText(result.bottleneck);
  byId("bottleneck-title").textContent = bottleneck.title;
  byId("bottleneck-description").textContent = bottleneck.description;
  byId("bottleneck-score").textContent = (result.bottleneck === "balanced" ? t("low") : result.bottleneck === "memory" || result.bottleneck === "storage" ? t("highLabel") : t("mediumLabel")).toUpperCase();

  const delta = round(result.fps - target);
  byId("goal-verdict").textContent = targetStatus;
  byId("goal-delta").textContent = state.language === "fr"
    ? `${delta >= 0 ? "+" : ""}${delta} FPS par rapport à l’objectif`
    : `${delta >= 0 ? "+" : ""}${delta} FPS vs target`;
  byId("goal-delta").style.color = delta >= 0 ? "var(--green)" : "var(--yellow)";
  byId("goal-marker").style.left = `${clamp((result.fps - 30) / (165 - 30) * 100, 0, 100)}%`;

  const nativeResult = calculateScenario({ upscaling: "native", frameGen: false });
  const recommended = recommendedProfile(result);
  const recommendedResult = calculateScenario(recommended);
  const highRefresh = calculateScenario({ preset: "medium", rt: "off", upscaling: result.gpu.brand === "nvidia" ? "dlssBalanced" : "fsrBalanced", frameGen: result.gpu.frameGen && result.game.frameGen });
  const maxRt = result.game.rtLevel >= 3 ? "path" : result.game.rtLevel >= 2 ? "ultra" : result.game.rtLevel >= 1 ? "medium" : "off";
  const maxVisuals = calculateScenario({ preset: "ultra", rt: maxRt, upscaling: result.gpu.brand === "nvidia" ? "dlssQuality" : "fsrQuality", frameGen: result.gpu.frameGen && result.game.frameGen });
  state.recommended = recommended;

  byId("scenario-native").textContent = `${round(nativeResult.fps)} FPS`;
  byId("scenario-recommended").textContent = `${round(recommendedResult.fps)} FPS`;
  byId("recommended-detail").textContent = profileLabel(recommended);
  byId("scenario-refresh").textContent = `${round(highRefresh.fps)} FPS`;
  byId("refresh-detail").textContent = profileLabel({ preset: "medium", rt: "off", upscaling: highRefresh.upscalingKey, frameGen: highRefresh.frameGen });
  byId("scenario-max").textContent = `${round(maxVisuals.fps)} FPS`;
  byId("max-detail").textContent = profileLabel({ preset: "ultra", rt: maxRt, upscaling: maxVisuals.upscalingKey, frameGen: maxVisuals.frameGen });

  renderOfficialReference(result);
  renderBuildHealth(result);
  renderRecommendations(result, recommended);
  renderTelemetry(result);
  renderMarket(result);
  renderBenchmarks(result);
  state.upgrade = findUpgrade(result);
  renderUpgrade(state.upgrade, result);
}
