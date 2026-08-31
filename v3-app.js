function runAnalysis({ animated = false } = {}) {
  clearTimeout(state.analyzeTimer);
  const button = byId("analyze-btn");
  const execute = () => {
    updateHardwareMeta();
    renderPerformance(calculateScenario());
    button.classList.remove("is-analyzing");
    byId("last-run-label").textContent = t("updatedNow");
  };
  if (!animated) { execute(); return; }
  button.classList.add("is-analyzing");
  byId("last-run-label").textContent = t("analyzing");
  state.analyzeTimer = setTimeout(execute, 320);
}

function queueLiveAnalysis() {
  if (!byId("live-analysis")?.checked) return;
  clearTimeout(state.analyzeTimer);
  state.analyzeTimer = setTimeout(() => runAnalysis(), 90);
}

function applyRecommended() {
  if (!state.recommended) return;
  const p = state.recommended;
  if (byId(p.preset)) byId(p.preset).checked = true;
  if ([...byId("rt").options].some((o) => o.value === p.rt)) byId("rt").value = p.rt;
  if ([...byId("upscaling").options].some((o) => o.value === p.upscaling)) byId("upscaling").value = p.upscaling;
  if (!byId("frame-generation").disabled) byId("frame-generation").checked = Boolean(p.frameGen);
  updateFrameGenLabel();
  runAnalysis({ animated: true });
  showToast(t("appliedProfile"));
}

function serializeBuild() {
  return { cpu: byId("cpu").value, gpu: byId("gpu").value, ram: byId("ram").value, storage: byId("storage").value, resolution: byId("resolution").value, os: byId("os").value, target: byId("target-fps").value, game: state.game, preset: getPreset(), rt: byId("rt").value, upscaling: byId("upscaling").value, frameGen: byId("frame-generation").checked, savedAt: new Date().toISOString() };
}

function saveBuild() {
  localStorage.setItem("frameforge-v3-build", JSON.stringify(serializeBuild()));
  showToast(t("buildSaved"));
}

function restoreBuild(data) {
  if (!data) return;
  if ([...byId("cpu").options].some((o) => o.value === data.cpu)) byId("cpu").value = data.cpu;
  if ([...byId("gpu").options].some((o) => o.value === data.gpu)) byId("gpu").value = data.gpu;
  if (data.ram) byId("ram").value = data.ram;
  if (data.storage) byId("storage").value = data.storage;
  if (data.resolution) byId("resolution").value = data.resolution;
  if (data.os) byId("os").value = data.os;
  if (data.target) byId("target-fps").value = data.target;
  updateHardwareMeta();
  selectGame(data.game || "cyberpunk", false);
  if (data.preset && byId(data.preset)) byId(data.preset).checked = true;
  if ([...byId("rt").options].some((o) => o.value === data.rt)) byId("rt").value = data.rt;
  populateUpscalingOptions();
  if ([...byId("upscaling").options].some((o) => o.value === data.upscaling)) byId("upscaling").value = data.upscaling;
  if (!byId("frame-generation").disabled) byId("frame-generation").checked = Boolean(data.frameGen);
  updateFrameGenLabel();
  runAnalysis();
}

function openSavedBuild() {
  let saved = null;
  try { saved = JSON.parse(localStorage.getItem("frameforge-v3-build") || localStorage.getItem("frameforge-v2-build")); } catch (_) { saved = null; }
  if (!saved) {
    openModal({ title: t("savedBuildTitle"), body: `<p>${t("noSavedBuild")}</p>`, actions: [{ label: t("close"), className: "button-ghost", close: true }] });
    return;
  }
  const cpu = getCpu(saved.cpu);
  const gpu = getGpu(saved.gpu);
  const game = getGame(saved.game);
  const body = `<p>${t("savedAt")}</p><ul class="modal-list"><li><strong>${cpu.name}</strong></li><li><strong>${gpu.name}</strong></li><li><strong>${game.title}</strong> · ${RESOLUTIONS[saved.resolution]?.label || saved.resolution} · ${saved.target} FPS</li></ul>`;
  openModal({ title: t("savedBuildTitle"), body, actions: [{ label: t("close"), className: "button-ghost", close: true }, { label: t("restoreBuild"), className: "button-primary", onClick: () => { restoreBuild(saved); closeModal(); } }] });
}

function detectBrowserSignals() {
  let renderer = t("unavailable");
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    const ext = gl?.getExtension("WEBGL_debug_renderer_info");
    if (gl && ext) renderer = gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) || renderer;
  } catch (_) {}
  return { cores: navigator.hardwareConcurrency || null, memory: navigator.deviceMemory || null, renderer, platform: navigator.userAgentData?.platform || navigator.platform || t("unavailable") };
}

function openQuickScan() {
  const s = detectBrowserSignals();
  const displayMemory = s.memory ? `${s.memory} GB` : t("unavailable");
  const body = `<p>${t("scanIntro")}</p><div class="scan-grid"><div class="scan-cell"><span>${t("logicalCores")}</span><strong>${s.cores ?? t("unavailable")}</strong></div><div class="scan-cell"><span>${t("approxMemory")}</span><strong>${displayMemory}</strong></div><div class="scan-cell"><span>${t("graphicsRenderer")}</span><strong>${s.renderer}</strong></div><div class="scan-cell"><span>${t("platform")}</span><strong>${s.platform}</strong></div></div><p>${t("scanLimits")}</p>`;
  openModal({ kicker: t("scanKicker"), title: t("scanTitle"), body, actions: [{ label: t("close"), className: "button-ghost", close: true }, { label: t("applyDetected"), className: "button-primary", onClick: () => { applyDetectedSignals(s); closeModal(); } }] });
}

function applyDetectedSignals(s) {
  if (s.memory) byId("ram").value = s.memory >= 48 ? "64" : s.memory >= 24 ? "32" : "16";
  const renderer = String(s.renderer || "").toLowerCase();
  const match = GPU_DATA.filter((x) => x.selectable !== false).find((gpu) => renderer.includes(gpu.name.toLowerCase().replace("nvidia geforce ", "").replace("amd radeon ", "")));
  if (match) byId("gpu").value = match.id;
  byId("build-mode-badge").textContent = "QUICK SCAN";
  populateUpscalingOptions();
  runAnalysis({ animated: true });
  showToast(t("scanApplied"));
}

function openHowItWorks() {
  openModal({ title: t("howTitle"), body: `<p>${t("howBody1")}</p><p>${t("howBody2")}</p>`, actions: [{ label: t("close"), className: "button-primary", close: true }] });
}

function openMethodology() {
  const r = state.lastResult;
  const liveDetails = r ? `<div class="methodology-live"><div><span>${t("gpuRatioLabel")}</span><strong>${r.gpuRatioRaw.toFixed(2)}×</strong></div><div><span>${t("cpuRatioLabel")}</span><strong>${r.cpuRatioRaw.toFixed(2)}×</strong></div><div><span>${t("workloadRatioLabel")}</span><strong>${r.workloadRatio.toFixed(2)}×</strong></div><div><span>${t("referenceMatch")}</span><strong>${round(r.referenceMatch)}%</strong></div></div>` : "";
  const steps = state.language === "fr"
    ? [
      "Sélection de la cible officielle la plus proche selon la résolution de sortie, le preset, le RT, l’upscaling et la Frame Generation.",
      "Le ratio GPU combine un indice raster/RT normalisé avec une mise à l’échelle volontairement sous-linéaire.",
      "Le ratio de charge combine les pixels réellement rendus, le coût du preset et celui du ray tracing.",
      "Le plafond CPU part de la cible officielle puis tient compte du ratio CPU gaming, de l’intensité CPU du jeu et du nombre de threads.",
      "La confiance diminue avec la distance à la référence et l’ampleur de l’extrapolation matérielle."
    ]
    : [
      "Closest official target by output resolution, preset, RT level, upscaling and Frame Generation.",
      "GPU ratio uses a normalized raster/RT index and a deliberately sub-linear scaling exponent.",
      "Workload ratio uses effective rendered pixels plus preset and ray-tracing cost.",
      "CPU ceiling is derived from the official target, CPU gaming ratio, game CPU intensity and thread demand.",
      "Confidence falls with reference distance and hardware extrapolation."
    ];
  openModal({ title: t("methodologyTitle"), body: `<p>${t("howBody1")}</p>${liveDetails}<ul class="modal-list">${steps.map((step) => `<li>${step}</li>`).join("")}</ul><p>${t("howBody2")}</p>`, actions: [{ label: t("close"), className: "button-primary", close: true }] });
}

function openMarketInfo() {
  openModal({ title: t("marketTitle"), body: `<p>${t("marketBody")}</p>`, actions: [{ label: t("close"), className: "button-primary", close: true }] });
}

function openUpgradeComparison() {
  const current = state.lastResult;
  const upgrade = state.upgrade;
  if (!current || !upgrade) return;
  if (!upgrade.result) {
    openModal({ title: t("compareTitle"), body: `<p>${t("upgradeOptional")}</p>`, actions: [{ label: t("close"), className: "button-primary", close: true }] });
    return;
  }
  openModal({ title: t("compareTitle"), body: `<p>${upgrade.reason}</p><div class="compare-grid"><div class="compare-card"><span>${t("currentBuild")}</span><strong>${round(current.fps)} FPS</strong><small>${current.gpu.name}</small></div><div class="compare-arrow">→</div><div class="compare-card"><span>${t("upgradedBuild")}</span><strong>${round(upgrade.result.fps)} FPS</strong><small>${upgrade.name}</small></div></div>`, actions: [{ label: t("close"), className: "button-primary", close: true }] });
}

function openModal({ kicker = "FRAMEFORGE V3", title, body, actions = [] }) {
  byId("modal-kicker").textContent = kicker;
  byId("modal-title").textContent = title;
  byId("modal-body").innerHTML = body;
  const box = byId("modal-actions");
  box.innerHTML = "";
  actions.forEach((action) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `button ${action.className || "button-ghost"}`;
    button.textContent = action.label;
    button.addEventListener("click", action.close ? closeModal : action.onClick);
    box.appendChild(button);
  });
  byId("modal-backdrop").hidden = false;
}

function closeModal() { byId("modal-backdrop").hidden = true; }

function showToast(message) {
  const toast = byId("toast");
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(state.toastTimer);
  state.toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2300);
}

function applyLanguage(language, rerender = true) {
  state.language = language === "fr" ? "fr" : "en";
  document.documentElement.lang = state.language;
  localStorage.setItem("frameforge-language", state.language);
  $$('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n;
    if (translations[state.language][key]) el.textContent = translations[state.language][key];
  });
  $$('[data-i18n-placeholder]').forEach((el) => {
    const key = el.dataset.i18nPlaceholder;
    if (translations[state.language][key]) el.placeholder = translations[state.language][key];
  });
  byId("language-selector").value = state.language;
  populateRtOptions();
  populateUpscalingOptions();
  selectGame(state.game, false);
  if (rerender) runAnalysis();
}

function wireEvents() {
  byId("language-selector").addEventListener("change", (e) => applyLanguage(e.target.value));
  byId("cpu").addEventListener("change", () => { updateHardwareMeta(); queueLiveAnalysis(); });
  byId("gpu").addEventListener("change", () => { updateHardwareMeta(); populateUpscalingOptions(); queueLiveAnalysis(); });
  ["ram", "storage", "resolution", "target-fps"].forEach((id) => byId(id).addEventListener("change", queueLiveAnalysis));
  $$('input[name="preset"]').forEach((r) => r.addEventListener("change", queueLiveAnalysis));
  byId("rt").addEventListener("change", queueLiveAnalysis);
  byId("upscaling").addEventListener("change", queueLiveAnalysis);
  byId("frame-generation").addEventListener("change", () => { updateFrameGenLabel(); queueLiveAnalysis(); });
  byId("live-analysis").addEventListener("change", () => { if (byId("live-analysis").checked) runAnalysis(); });
  byId("analyze-btn").addEventListener("click", () => runAnalysis({ animated: true }));
  byId("apply-recommended-btn").addEventListener("click", applyRecommended);
  byId("save-build-btn").addEventListener("click", saveBuild);
  byId("saved-builds-btn").addEventListener("click", openSavedBuild);
  byId("scan-pc-btn").addEventListener("click", openQuickScan);
  byId("how-it-works-btn").addEventListener("click", openHowItWorks);
  byId("methodology-btn").addEventListener("click", openMethodology);
  byId("market-info-btn").addEventListener("click", openMarketInfo);
  byId("compare-upgrade-btn").addEventListener("click", openUpgradeComparison);
  byId("modal-close").addEventListener("click", closeModal);
  byId("modal-backdrop").addEventListener("click", (e) => { if (e.target === byId("modal-backdrop")) closeModal(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !byId("modal-backdrop").hidden) closeModal(); });
  const search = byId("game-search");
  search.addEventListener("focus", () => renderGameSearch(search.value));
  search.addEventListener("input", () => renderGameSearch(search.value));
  document.addEventListener("click", (e) => { if (!e.target.closest(".game-search-wrap")) byId("game-search-results").hidden = true; });
}

function init() {
  ensureV3Styles();
  ensureReferencePanel();
  patchStaticV3Labels();
  populateHardware();
  wireEvents();
  state.language = localStorage.getItem("frameforge-language") === "fr" ? "fr" : "en";
  selectGame("cyberpunk", false);
  applyLanguage(state.language, false);
  byId("game-count").textContent = GAME_DATA.length;
  runAnalysis();
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
else init();
