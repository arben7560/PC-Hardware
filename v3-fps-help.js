/* FrameForge V3 — FPS estimate context help */
(() => {
  function ensureFpsHelpStyles() {
    if (document.getElementById("frameforge-fps-help-styles")) return;
    const style = document.createElement("style");
    style.id = "frameforge-fps-help-styles";
    style.textContent = `
      .verdict-fps-help {
        width: 21px;
        height: 21px;
        margin: 0 0 4px 1px;
        padding: 0;
        display: inline-grid;
        place-items: center;
        flex: 0 0 auto;
        border: 1px solid rgba(101,243,255,.22);
        border-radius: 50%;
        background: rgba(101,243,255,.04);
        color: #8cecf6;
        font-family: var(--font-display);
        font-size: 10px;
        font-weight: 800;
        line-height: 1;
        cursor: pointer;
        opacity: .82;
        transition: 150ms ease;
      }
      .verdict-fps-help:hover,
      .verdict-fps-help:focus-visible {
        opacity: 1;
        outline: 0;
        border-color: rgba(101,243,255,.48);
        background: rgba(101,243,255,.09);
        box-shadow: 0 0 16px rgba(101,243,255,.10);
        transform: translateY(-1px);
      }
      .fps-help-lead {
        margin-bottom: 14px;
        color: var(--text-soft);
        line-height: 1.6;
      }
      .fps-help-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 9px;
        margin: 14px 0;
      }
      .fps-help-grid > div {
        padding: 11px 12px;
        border: 1px solid var(--line);
        border-radius: 10px;
        background: rgba(255,255,255,.02);
      }
      .fps-help-grid strong,
      .fps-help-grid small {
        display: block;
      }
      .fps-help-grid strong {
        color: var(--text);
        font-size: 10px;
      }
      .fps-help-grid small {
        margin-top: 4px;
        color: var(--muted);
        font-size: 9px;
        line-height: 1.45;
      }
      .fps-help-current {
        margin-top: 13px;
        padding: 11px 12px;
        border: 1px solid rgba(101,243,255,.10);
        border-radius: 10px;
        background: rgba(101,243,255,.025);
      }
      .fps-help-current span,
      .fps-help-current strong {
        display: block;
      }
      .fps-help-current span {
        color: var(--muted);
        font-size: 8px;
        font-weight: 700;
        letter-spacing: .08em;
        text-transform: uppercase;
      }
      .fps-help-current strong {
        margin-top: 4px;
        color: var(--cyan);
        font-family: var(--font-display);
        font-size: 13px;
      }
      @media (max-width: 720px) {
        .fps-help-grid { grid-template-columns: 1fr; }
      }
    `;
    document.head.appendChild(style);
  }

  function frameGenerationLabel(result) {
    if (!result?.frameGen || result.frameGenMode === "off") return state.language === "fr" ? "désactivée" : "off";
    if (result.frameGenMode === "mfg4x") return "MFG 4X";
    if (result.frameGenMode === "mfg3x") return "MFG 3X";
    if (result.frameGenMode === "mfg2x") return "MFG 2X";
    return "Frame Generation";
  }

  function openFpsEstimateHelp() {
    const result = state.lastResult;
    const fr = state.language === "fr";

    const title = fr ? "Pourquoi les FPS peuvent-ils varier ?" : "Why can the FPS result vary?";
    const body = fr
      ? `
        <p class="fps-help-lead">Le nombre affiché par FrameForge est une <strong>estimation modélisée</strong>, pas la mesure d'un benchmark exécuté sur votre PC. Il représente une valeur centrale probable pour la configuration et les réglages sélectionnés.</p>
        <div class="fps-help-grid">
          <div><strong>Scène et zone du jeu</strong><small>Une ville dense, un combat, des foules ou une zone intérieure peuvent produire des charges CPU/GPU très différentes.</small></div>
          <div><strong>Version du jeu et pilotes</strong><small>Les patchs, pilotes graphiques et mises à jour DLSS/FSR peuvent modifier les performances.</small></div>
          <div><strong>CPU, RAM et processus en arrière-plan</strong><small>La fréquence réelle du CPU, la mémoire, les températures et les applications ouvertes influencent les FPS et les 1% lows.</small></div>
          <div><strong>GPU, températures et limite de puissance</strong><small>Les fréquences boost, le refroidissement, le BIOS et les limites de puissance peuvent créer des écarts entre deux machines identiques sur le papier.</small></div>
          <div><strong>Ray tracing, upscaling et Frame Generation</strong><small>Le coût réel du Path Tracing, du DLSS et du MFG varie selon le jeu, la résolution et le framerate rendu de base.</small></div>
          <div><strong>Référence officielle et extrapolation</strong><small>FrameForge part d'une cible développeur officielle puis extrapole vers votre matériel. Plus le scénario s'éloigne de cette référence, plus l'incertitude augmente.</small></div>
        </div>
        ${result ? `<div class="fps-help-current"><span>Scénario actuellement modélisé</span><strong>${round(result.fps)} FPS · ${RESOLUTIONS[result.resolutionKey].label} · ${t(result.presetKey === "high" ? "high" : result.presetKey)} · ${frameGenerationLabel(result)}</strong></div>` : ""}
        <p>Utilisez surtout la <strong>plage estimée</strong> et le <strong>score de confiance</strong> pour interpréter le résultat plutôt que de considérer le nombre central comme une garantie absolue.</p>
      `
      : `
        <p class="fps-help-lead">The number shown by FrameForge is a <strong>modeled estimate</strong>, not a benchmark measured on your exact PC. It represents a likely central value for the selected hardware and settings.</p>
        <div class="fps-help-grid">
          <div><strong>Scene and game area</strong><small>Dense cities, combat, crowds and indoor areas can create very different CPU and GPU loads.</small></div>
          <div><strong>Game version and drivers</strong><small>Patches, graphics drivers and DLSS/FSR updates can change performance.</small></div>
          <div><strong>CPU, memory and background load</strong><small>Real CPU clocks, memory behavior, temperatures and background apps affect FPS and 1% lows.</small></div>
          <div><strong>GPU clocks, thermals and power</strong><small>Boost clocks, cooling, BIOS settings and power limits can create differences between otherwise similar systems.</small></div>
          <div><strong>Ray tracing, upscaling and Frame Generation</strong><small>The real cost of Path Tracing, DLSS and MFG varies by game, resolution and the base rendered frame rate.</small></div>
          <div><strong>Official anchor and extrapolation</strong><small>FrameForge starts from an official developer target and extrapolates to your hardware. Uncertainty rises as the scenario moves farther from that anchor.</small></div>
        </div>
        ${result ? `<div class="fps-help-current"><span>Current modeled scenario</span><strong>${round(result.fps)} FPS · ${RESOLUTIONS[result.resolutionKey].label} · ${t(result.presetKey === "high" ? "high" : result.presetKey)} · ${frameGenerationLabel(result)}</strong></div>` : ""}
        <p>Use the <strong>expected range</strong> and <strong>confidence score</strong> to interpret the result rather than treating the central FPS number as a guaranteed measurement.</p>
      `;

    openModal({
      kicker: fr ? "ESTIMATION DE PERFORMANCE" : "PERFORMANCE ESTIMATE",
      title,
      body,
      actions: [{ label: fr ? "Compris" : "Got it", className: "button-primary", close: true }]
    });
  }

  function ensureFpsHelpButton() {
    const line = document.querySelector(".verdict-fps-line");
    if (!line || byId("verdict-fps-help")) return;

    const button = document.createElement("button");
    button.id = "verdict-fps-help";
    button.className = "verdict-fps-help";
    button.type = "button";
    button.textContent = "?";
    button.setAttribute("aria-label", state.language === "fr" ? "Comprendre l'estimation FPS" : "Understand the FPS estimate");
    button.addEventListener("click", openFpsEstimateHelp);
    line.appendChild(button);
  }

  ensureFpsHelpStyles();

  const previousRenderPerformance = renderPerformance;
  renderPerformance = function renderPerformanceWithFpsHelp(result) {
    previousRenderPerformance(result);
    ensureFpsHelpButton();
    const button = byId("verdict-fps-help");
    if (button) button.setAttribute("aria-label", state.language === "fr" ? "Comprendre l'estimation FPS" : "Understand the FPS estimate");
  };
})();
