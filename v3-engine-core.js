const state = { language: "en", game: "cyberpunk", lastResult: null, recommended: null, upgrade: null, analyzeTimer: null, toastTimer: null };
const byId = (id) => document.getElementById(id);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const clamp = (n, min, max) => Math.min(max, Math.max(min, n));
const round = (n) => Math.round(n);
const t = (key) => translations[state.language]?.[key] ?? translations.en[key] ?? key;
const getCpu = (id = byId("cpu")?.value) => CPU_DATA.find((x) => x.id === id) || CPU_DATA.find((x) => x.id === "i7-12700kf");
const getGpu = (id = byId("gpu")?.value) => GPU_DATA.find((x) => x.id === id) || GPU_DATA.find((x) => x.id === "rtx5070ti");
const getGame = (id = state.game) => GAME_DATA.find((x) => x.id === id) || GAME_DATA[0];
const getPreset = () => document.querySelector('input[name="preset"]:checked')?.value || "high";
const pixels = (resolutionKey) => RESOLUTIONS[resolutionKey].width * RESOLUTIONS[resolutionKey].height;

function ensureV3Styles() {
  if (document.querySelector('link[data-frameforge-v3]')) return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "v3.css";
  link.dataset.frameforgeV3 = "true";
  document.head.appendChild(link);
}

function ensureReferencePanel() {
  if (byId("official-reference")) return;
  const target = document.querySelector(".game-target-panel");
  if (!target) return;
  const section = document.createElement("section");
  section.className = "panel official-reference-panel";
  section.id = "official-reference";
  section.innerHTML = `
    <div class="reference-header">
      <div>
        <span class="section-kicker" data-i18n="officialReference">OFFICIAL REFERENCE</span>
        <h2 data-i18n="closestAnchor">Closest developer target</h2>
      </div>
      <a id="reference-source-link" class="reference-source-link" href="#" target="_blank" rel="noopener noreferrer">
        <span class="source-pulse"></span><span data-i18n="openOfficialSource">Open official source ↗</span>
      </a>
    </div>
    <div class="reference-main-grid">
      <article class="reference-anchor-card">
        <div class="reference-tier"><span id="reference-tier">—</span><em data-i18n="verifiedSource">PUBLISHER SOURCE</em></div>
        <div class="reference-target-line"><span data-i18n="publisherTarget">Publisher target</span><strong id="reference-target">—</strong></div>
        <div class="reference-hardware-line"><span data-i18n="referenceHardware">Reference hardware</span><strong id="reference-hardware">—</strong><small id="reference-memory">—</small></div>
      </article>
      <article class="reference-match-card">
        <div class="reference-match-top"><span data-i18n="referenceMatch">Reference match</span><strong id="reference-match-value">—</strong></div>
        <div class="reference-match-track"><span id="reference-match-bar"></span></div>
        <p id="reference-match-label">—</p>
        <small id="reference-publisher">—</small>
      </article>
    </div>
    <div class="ratio-grid">
      <article><span data-i18n="gpuRatioLabel">GPU ratio</span><strong id="gpu-ratio">—</strong><small data-i18n="relativeToReference">vs official reference</small></article>
      <article><span data-i18n="cpuRatioLabel">CPU ratio</span><strong id="cpu-ratio">—</strong><small data-i18n="relativeToReference">vs official reference</small></article>
      <article><span data-i18n="workloadRatioLabel">Workload ratio</span><strong id="workload-ratio">—</strong><small id="workload-ratio-label">—</small></article>
      <article><span data-i18n="baseRenderedLabel">Reference FPS</span><strong id="reference-fps">—</strong><small id="reference-fps-note">—</small></article>
    </div>
    <div class="reference-equation">
      <div><span>ƒx</span><strong data-i18n="refFormulaTitle">Why this number?</strong></div>
      <p data-i18n="refFormulaText">Official FPS × hardware ratio ÷ workload ratio, then constrained by the CPU frame ceiling.</p>
    </div>`;
  target.insertAdjacentElement("afterend", section);
}

function patchStaticV3Labels() {
  const brandSmall = document.querySelector(".brand-copy small");
  if (brandSmall) brandSmall.textContent = "PC PERFORMANCE LAB · V3";
  const modelStrong = document.querySelector(".hero-status .status-item strong");
  if (modelStrong) modelStrong.textContent = "V3.0";
  document.title = "FrameForge V3 — Official Reference Engine";
  const description = document.querySelector('meta[name="description"]');
  if (description) description.content = "FrameForge V3 — PC gaming performance estimates anchored to official developer hardware targets and normalized hardware ratios.";
}

function populateHardware() {
  const cpuSelect = byId("cpu");
  const gpuSelect = byId("gpu");
  cpuSelect.innerHTML = CPU_DATA.filter((x) => x.selectable !== false).map((cpu) => `<option value="${cpu.id}">${cpu.name}</option>`).join("");
  gpuSelect.innerHTML = GPU_DATA.filter((x) => x.selectable !== false).map((gpu) => `<option value="${gpu.id}">${gpu.name}</option>`).join("");
  cpuSelect.value = "i7-12700kf";
  gpuSelect.value = "rtx5070ti";
  updateHardwareMeta();
}

function updateHardwareMeta() {
  const cpu = getCpu();
  const gpu = getGpu();
  byId("cpu-meta").textContent = `${cpu.coresLabel} · ${cpu.boost} · FF CPU ${cpu.score}`;
  byId("gpu-meta").textContent = `${gpu.vram} GB VRAM · FF GPU ${gpu.raster} · ${gpu.frameGen ? "Frame Gen" : "No Frame Gen"}`;
}

function populateRtOptions() {
  const game = getGame();
  const select = byId("rt");
  const previous = select.value || "off";
  const options = [{ value: "off", label: state.language === "fr" ? "Désactivé" : "Off" }];
  if (game.rtLevel >= 1) options.push({ value: "medium", label: state.language === "fr" ? "RT Moyen" : "RT Medium" });
  if (game.rtLevel >= 2) options.push({ value: "ultra", label: "RT Ultra" });
  if (game.rtLevel >= 3) options.push({ value: "path", label: "Path Tracing" });
  select.innerHTML = options.map((o) => `<option value="${o.value}">${o.label}</option>`).join("");
  select.value = options.some((o) => o.value === previous) ? previous : "off";
}

function populateUpscalingOptions() {
  const gpu = getGpu();
  const select = byId("upscaling");
  const previous = select.value || "native";
  const options = [{ value: "native", label: state.language === "fr" ? "Natif" : "Native" }];
  if (gpu.brand === "nvidia") options.push(
    { value: "dlssQuality", label: "DLSS Quality" },
    { value: "dlssBalanced", label: "DLSS Balanced" },
    { value: "dlssPerformance", label: "DLSS Performance" }
  );
  if (gpu.brand === "amd") options.push(
    { value: "fsrQuality", label: "FSR Quality" },
    { value: "fsrBalanced", label: "FSR Balanced" },
    { value: "fsrPerformance", label: "FSR Performance" }
  );
  select.innerHTML = options.map((o) => `<option value="${o.value}">${o.label}</option>`).join("");
  select.value = options.some((o) => o.value === previous) ? previous : "native";
  const game = getGame();
  const fg = byId("frame-generation");
  fg.disabled = !(gpu.frameGen && game.frameGen);
  if (fg.disabled) fg.checked = false;
  updateFrameGenLabel();
}

function updateFrameGenLabel() {
  const input = byId("frame-generation");
  const label = byId("framegen-state");
  label.textContent = input.checked && !input.disabled ? "ON" : "OFF";
  label.classList.toggle("is-on", input.checked && !input.disabled);
}

function renderGameSearch(query = "") {
  const box = byId("game-search-results");
  const q = query.trim().toLowerCase();
  const games = GAME_DATA.filter((game) => !q || game.title.toLowerCase().includes(q) || game.tags.some((tag) => tag.toLowerCase().includes(q)));
  box.innerHTML = games.map((game) => `<button type="button" data-game-id="${game.id}"><span><strong>${game.title}</strong><small>${game.profiles.length} ${t("officialProfilesCount")} · ${game.source.publisher}</small></span><em>→</em></button>`).join("") || `<p>${state.language === "fr" ? "Aucun jeu ancré trouvé." : "No anchored game found."}</p>`;
  box.hidden = false;
  $$('[data-game-id]', box).forEach((button) => button.addEventListener("click", () => {
    selectGame(button.dataset.gameId, true);
    byId("game-search").value = "";
    box.hidden = true;
  }));
}

function selectGame(gameId, analyze = true) {
  const game = getGame(gameId);
  state.game = game.id;
  byId("game-title").textContent = game.title;
  byId("cover-title").textContent = game.cover;
  byId("cover-studio").textContent = game.studio;
  byId("game-year").textContent = game.year;
  byId("sample-count").textContent = game.profiles.length;
  byId("game-tags").innerHTML = game.tags.map((tag) => `<span>${tag}</span>`).join("");
  const cover = byId("game-cover");
  const hue = (GAME_DATA.findIndex((x) => x.id === game.id) * 37 + 178) % 360;
  cover.style.background = `radial-gradient(circle at 70% 24%, hsla(${hue},85%,55%,.22), transparent 44%), linear-gradient(140deg,#111925,#17101d)`;
  populateRtOptions();
  populateUpscalingOptions();
  if (analyze) runAnalysis({ animated: true });
}

function gpuScore(gpu, rtKey) {
  const weight = RT_LEVELS[rtKey]?.scoreWeight || 0;
  if (!weight) return gpu.raster;
  const rtScore = gpu.rt > 0 ? gpu.rt : Math.max(1, gpu.raster * 0.18);
  return gpu.raster * (1 - weight) + rtScore * weight;
}

function frameGenMultiplier(gpu, enabled) {
  if (!enabled || !gpu.frameGen) return 1;
  if (gpu.brand === "nvidia") return gpu.gen >= 50 ? 1.68 : 1.62;
  return 1.52;
}

function effectivePixels(resolutionKey, upscalingKey) {
  const upscale = UPSCALERS[upscalingKey] || UPSCALERS.native;
  return pixels(resolutionKey) * upscale.renderScale * upscale.renderScale;
}

function referenceDistance(profile, request) {
  const resDistance = Math.abs(Math.log2(pixels(request.resolution) / pixels(profile.resolution))) * 1.75;
  const presetOrder = { low: 0, medium: 1, high: 2, ultra: 3 };
  const rtOrder = { off: 0, medium: 1, ultra: 2, path: 3 };
  const presetDistance = Math.abs(presetOrder[request.preset] - presetOrder[profile.preset]) * 1.15;
  const rtDistance = Math.abs(rtOrder[request.rt] - rtOrder[profile.rt]) * 2.35;
  let upscaleDistance = 0;
  if (profile.upscalingKnown !== false) {
    const refNative = profile.upscaling === "native";
    const userNative = request.upscaling === "native";
    upscaleDistance = refNative === userNative ? (profile.upscaling === request.upscaling ? 0 : 0.35) : 0.8;
  }
  const fgDistance = Boolean(profile.frameGen) === Boolean(request.frameGen) ? 0 : 1.15;
  return resDistance + presetDistance + rtDistance + upscaleDistance + fgDistance;
}

function selectOfficialReference(game, request) {
  return game.profiles
    .map((profile) => ({ profile, distance: referenceDistance(profile, request) }))
    .sort((a, b) => a.distance - b.distance)[0];
}
