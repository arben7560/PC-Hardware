/* FrameForge V3 — concise FPS estimate hover help */
(() => {
  function ensureFpsHelpStyles() {
    if (document.getElementById("frameforge-fps-help-styles")) return;
    const style = document.createElement("style");
    style.id = "frameforge-fps-help-styles";
    style.textContent = `
      .verdict-fps-help-wrap {
        position: relative;
        display: inline-flex;
        align-items: flex-end;
      }

      .verdict-fps-help {
        width: 20px;
        height: 20px;
        margin: 0 0 4px 2px;
        padding: 0;
        display: inline-grid;
        place-items: center;
        flex: 0 0 auto;
        border: 1px solid rgba(101,243,255,.20);
        border-radius: 50%;
        background: rgba(101,243,255,.035);
        color: #8cecf6;
        font-family: var(--font-display);
        font-size: 9px;
        font-weight: 800;
        line-height: 1;
        cursor: help;
        opacity: .78;
        transition: 150ms ease;
      }

      .verdict-fps-help:hover,
      .verdict-fps-help:focus-visible {
        opacity: 1;
        outline: 0;
        border-color: rgba(101,243,255,.44);
        background: rgba(101,243,255,.08);
        box-shadow: 0 0 14px rgba(101,243,255,.10);
      }

      .verdict-fps-tooltip {
        position: absolute;
        left: 50%;
        bottom: calc(100% + 10px);
        z-index: 90;
        width: min(300px, calc(100vw - 48px));
        padding: 10px 12px;
        border: 1px solid rgba(101,243,255,.14);
        border-radius: 10px;
        background: rgba(8,11,16,.985);
        box-shadow: 0 16px 38px rgba(0,0,0,.42);
        color: var(--text-soft);
        font-size: 9px;
        line-height: 1.5;
        text-align: left;
        opacity: 0;
        visibility: hidden;
        transform: translate(-50%, 5px);
        transition: 140ms ease;
        pointer-events: none;
      }

      .verdict-fps-tooltip::after {
        content: "";
        position: absolute;
        left: 50%;
        top: 100%;
        width: 9px;
        height: 9px;
        border-right: 1px solid rgba(101,243,255,.14);
        border-bottom: 1px solid rgba(101,243,255,.14);
        background: #080b10;
        transform: translate(-50%, -5px) rotate(45deg);
      }

      .verdict-fps-help-wrap:hover .verdict-fps-tooltip,
      .verdict-fps-help-wrap:focus-within .verdict-fps-tooltip {
        opacity: 1;
        visibility: visible;
        transform: translate(-50%, 0);
      }

      .verdict-fps-tooltip strong {
        color: var(--text);
      }
    `;
    document.head.appendChild(style);
  }

  function tooltipCopy() {
    return state.language === "fr"
      ? "Les FPS affichés sont une <strong>estimation</strong>. Les performances réelles peuvent varier selon la scène, les pilotes, les températures, les processus en arrière-plan et les réglages DLSS / RT / Frame Generation."
      : "Displayed FPS are a <strong>modeled estimate</strong>. Real performance can vary with the scene, drivers, temperatures, background load and DLSS / RT / Frame Generation settings.";
  }

  function ensureFpsHelp() {
    const line = document.querySelector(".verdict-fps-line");
    if (!line) return;

    let wrap = byId("verdict-fps-help-wrap");
    if (!wrap) {
      wrap = document.createElement("span");
      wrap.id = "verdict-fps-help-wrap";
      wrap.className = "verdict-fps-help-wrap";

      const button = document.createElement("button");
      button.id = "verdict-fps-help";
      button.className = "verdict-fps-help";
      button.type = "button";
      button.textContent = "?";

      const tooltip = document.createElement("span");
      tooltip.id = "verdict-fps-tooltip";
      tooltip.className = "verdict-fps-tooltip";
      tooltip.setAttribute("role", "tooltip");

      wrap.append(button, tooltip);
      line.appendChild(wrap);
    }

    const button = byId("verdict-fps-help");
    const tooltip = byId("verdict-fps-tooltip");
    const fr = state.language === "fr";

    if (button) {
      button.setAttribute("aria-label", fr ? "À propos de l'estimation FPS" : "About the FPS estimate");
      button.setAttribute("aria-describedby", "verdict-fps-tooltip");
    }
    if (tooltip) tooltip.innerHTML = tooltipCopy();
  }

  ensureFpsHelpStyles();

  const previousRenderPerformance = renderPerformance;
  renderPerformance = function renderPerformanceWithFpsHelp(result) {
    previousRenderPerformance(result);
    ensureFpsHelp();
  };
})();
