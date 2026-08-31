/* FrameForge V3 — GPU-specific Frame Generation UI */
(() => {
  state.frameGenMode = state.frameGenMode || "off";

  function ensureFrameGenStyles() {
    if (document.querySelector('link[data-frameforge-framegen]')) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "v3-framegen.css";
    link.dataset.frameforgeFramegen = "true";
    document.head.appendChild(link);
  }

  function supportedModes(gpu, game) {
    if (!gpu?.frameGen || !game?.frameGen) {
      return [{ value: "off", label: state.language === "fr" ? "Désactivé" : "Off" }];
    }

    if (gpu.brand === "nvidia" && gpu.gen >= 50) {
      return [
        { value: "off", label: state.language === "fr" ? "Désactivé" : "Off" },
        { value: "mfg2x", label: "MFG 2X" },
        { value: "mfg3x", label: "MFG 3X" },
        { value: "mfg4x", label: "MFG 4X" }
      ];
    }

    return [
      { value: "off", label: state.language === "fr" ? "Désactivé" : "Off" },
      { value: "fg", label: gpu.brand === "nvidia" ? "DLSS Frame Generation" : "Frame Generation" }
    ];
  }

  function capabilityCopy(gpu, game) {
    const fr = state.language === "fr";
    if (!gpu?.frameGen || !game?.frameGen) return fr ? "Non pris en charge pour ce GPU / jeu" : "Not supported for this GPU / game";
    if (gpu.brand === "nvidia" && gpu.gen >= 50) return "RTX 50 · Multi Frame Generation 2X / 3X / 4X";
    if (gpu.brand === "nvidia" && gpu.gen >= 40) return fr ? "RTX 40 · Frame Generation classique · pas de MFG" : "RTX 40 · Standard Frame Generation · no MFG";
    if (gpu.brand === "amd") return fr ? "AMD · Frame Generation pris en charge" : "AMD · Frame Generation supported";
    return fr ? "Frame Generation standard" : "Standard Frame Generation";
  }

  function syncFrameGenControl({ preserve = true } = {}) {
    const host = document.querySelector(".framegen-control");
    const checkbox = byId("frame-generation");
    if (!host || !checkbox) return;

    let select = byId("frame-generation-mode");
    let note = byId("frame-generation-capability");

    if (!select) {
      const oldSwitch = host.querySelector(".switch-wide");
      if (oldSwitch) oldSwitch.classList.add("framegen-legacy-switch");

      select = document.createElement("select");
      select.id = "frame-generation-mode";
      select.className = "framegen-mode-select";
      select.setAttribute("aria-label", "Frame Generation mode");

      note = document.createElement("small");
      note.id = "frame-generation-capability";
      note.className = "framegen-capability";

      host.append(select, note);

      select.addEventListener("change", () => {
        state.frameGenMode = select.value;
        checkbox.checked = select.value !== "off";
        updateFrameGenLabel();
        queueLiveAnalysis();
      });
    }

    const gpu = getGpu();
    const game = getGame();
    const modes = supportedModes(gpu, game);
    const previous = preserve ? (state.frameGenMode || select.value) : "off";
    select.innerHTML = modes.map((mode) => `<option value="${mode.value}">${mode.label}</option>`).join("");

    let next = modes.some((mode) => mode.value === previous) ? previous : "off";
    if (checkbox.checked && next === "off" && modes.length > 1) next = modes[1].value;
    if (!checkbox.checked) next = "off";

    select.value = next;
    select.disabled = modes.length === 1;
    state.frameGenMode = next;
    checkbox.checked = next !== "off";
    checkbox.disabled = modes.length === 1;
    note.textContent = capabilityCopy(gpu, game);

    const label = host.querySelector(":scope > label");
    if (label) label.textContent = state.language === "fr" ? "Frame Generation" : "Frame generation";
  }

  ensureFrameGenStyles();

  const originalPopulateUpscalingOptions = populateUpscalingOptions;
  populateUpscalingOptions = function populateUpscalingOptionsWithFrameModes() {
    originalPopulateUpscalingOptions();
    syncFrameGenControl();
  };

  const originalUpdateFrameGenLabel = updateFrameGenLabel;
  updateFrameGenLabel = function updateFrameGenLabelWithModes() {
    originalUpdateFrameGenLabel();
    const select = byId("frame-generation-mode");
    const label = byId("framegen-state");
    if (!select || !label) return;
    const active = select.value !== "off" && !select.disabled;
    label.textContent = active ? select.options[select.selectedIndex]?.text || "ON" : "OFF";
    label.classList.toggle("is-on", active);
  };

  const originalApplyLanguage = applyLanguage;
  applyLanguage = function applyLanguageWithFrameModes(language, rerender = true) {
    originalApplyLanguage(language, rerender);
    syncFrameGenControl();
  };

  const originalSerializeBuild = serializeBuild;
  serializeBuild = function serializeBuildWithFrameMode() {
    return { ...originalSerializeBuild(), frameGenMode: state.frameGenMode || "off" };
  };

  const originalRestoreBuild = restoreBuild;
  restoreBuild = function restoreBuildWithFrameMode(data) {
    state.frameGenMode = data?.frameGenMode || (data?.frameGen ? "mfg2x" : "off");
    originalRestoreBuild(data);
    syncFrameGenControl();
    runAnalysis();
  };

  const originalApplyRecommended = applyRecommended;
  applyRecommended = function applyRecommendedWithFrameMode() {
    originalApplyRecommended();
    if (byId("frame-generation")?.checked) {
      const gpu = getGpu();
      if (gpu.brand === "nvidia" && gpu.gen >= 50 && state.frameGenMode === "off") state.frameGenMode = "mfg2x";
      else if (state.frameGenMode === "off") state.frameGenMode = "fg";
    }
    syncFrameGenControl();
    runAnalysis();
  };

  const originalOpenMethodology = openMethodology;
  openMethodology = function openMethodologyWithFrameMode() {
    originalOpenMethodology();
    const body = byId("modal-body");
    const r = state.lastResult;
    if (!body || !r) return;
    const modeLabel = r.frameGenMode === "mfg4x" ? "MFG 4X" : r.frameGenMode === "mfg3x" ? "MFG 3X" : r.frameGenMode === "mfg2x" ? "MFG 2X" : r.frameGenMode === "fg" ? "Frame Generation" : "Off";
    const line = document.createElement("p");
    line.className = "framegen-method-note";
    line.textContent = state.language === "fr"
      ? `Mode de génération d'images actif : ${modeLabel}. Multiplicateur effectif modélisé : ×${r.frameGenMultiplier.toFixed(2)}.`
      : `Active frame-generation mode: ${modeLabel}. Modeled effective multiplier: ×${r.frameGenMultiplier.toFixed(2)}.`;
    body.prepend(line);
  };

  function initFrameGenUi() {
    syncFrameGenControl({ preserve: false });
    const gpu = byId("gpu");
    if (gpu && !gpu.dataset.frameGenModeWired) {
      gpu.dataset.frameGenModeWired = "true";
      gpu.addEventListener("change", () => syncFrameGenControl({ preserve: false }));
    }
    runAnalysis();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initFrameGenUi);
  else initFrameGenUi();
})();
