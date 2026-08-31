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
        margin: 0 0 5px 4px;
        padding: 0;
        display: inline-grid;
        place-items: center;
        flex: 0 0 auto;
        border: 1px solid rgba(101,243,255,.22);
        border-radius: 50%;
        background: rgba(101,243,255,.045);
        color: #92edf7;
        font-family: var(--font-display);
        font-size: 9px;
        font-weight: 800;
        line-height: 1;
        letter-spacing: 0;
        cursor: help;
        opacity: .82;
        transition: opacity 150ms ease, border-color 150ms ease, background 150ms ease, box-shadow 150ms ease;
      }

      .verdict-fps-help:hover,
      .verdict-fps-help:focus-visible {
        opacity: 1;
        outline: 0;
        border-color: rgba(101,243,255,.50);
        background: rgba(101,243,255,.095);
        box-shadow: 0 0 15px rgba(101,243,255,.12);
      }

      .verdict-fps-tooltip {
        position: absolute;
        left: 50%;
        bottom: calc(100% + 12px);
        z-index: 90;
        width: min(318px, calc(100vw - 40px));
        padding: 13px 14px 14px;
        border: 1px solid rgba(101,243,255,.14);
        border-radius: 11px;
        background: rgba(9,13,19,.985);
        box-shadow: 0 18px 42px rgba(0,0,0,.46), inset 0 1px 0 rgba(255,255,255,.025);
        color: #aab3c2;
        font-family: var(--font-body, Arial, sans-serif);
        font-size: 11px;
        font-weight: 400;
        line-height: 1.48;
        letter-spacing: 0;
        text-transform: none;
        text-align: left;
        opacity: 0;
        visibility: hidden;
        transform: translate(-50%, 6px);
        transition: opacity 140ms ease, visibility 140ms ease, transform 140ms ease;
        pointer-events: none;
      }

      .verdict-fps-tooltip::before {
        content: "";
        position: absolute;
        left: 0;
        top: 12px;
        bottom: 12px;
        width: 2px;
        border-radius: 999px;
        background: rgba(101,243,255,.42);
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
        background: #090d13;
        transform: translate(-50%, -5px) rotate(45deg);
      }

      .verdict-fps-help-wrap:hover .verdict-fps-tooltip,
      .verdict-fps-help-wrap:focus-within .verdict-fps-tooltip {
        opacity: 1;
        visibility: visible;
        transform: translate(-50%, 0);
      }

      .verdict-fps-tooltip strong {
        display: block;
        margin: 0 0 4px;
        color: #e2e8f0;
        font-family: var(--font-body, Arial, sans-serif);
        font-size: 11.5px;
        font-weight: 700;
        line-height: 1.3;
        letter-spacing: 0;
      }

      @media (min-width: 3000px) {
        .verdict-fps-tooltip {
          width: 340px;
          padding: 14px 15px 15px;
          font-size: 11.5px;
          line-height: 1.5;
        }

        .verdict-fps-tooltip strong {
          font-size: 12px;
        }
      }

      @media (max-width: 720px) {
        .verdict-fps-tooltip {
          left: auto;
          right: -18px;
          width: min(286px, calc(100vw - 32px));
          padding: 12px 13px 13px;
          font-size: 10.5px;
          line-height: 1.46;
          transform: translateY(6px);
        }

        .verdict-fps-tooltip::after {
          left: auto;
          right: 20px;
        }

        .verdict-fps-help-wrap:hover .verdict-fps-tooltip,
        .verdict-fps-help-wrap:focus-within .verdict-fps-tooltip {
          transform: none;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function tooltipCopy() {
    return state.language === "fr"
      ? "<strong>Estimation indicative</strong>Les FPS réels peuvent varier selon la scène, les pilotes, les températures, la charge en arrière-plan et les réglages DLSS, RT ou Frame Generation."
      : "<strong>Indicative estimate</strong>Actual FPS can vary with the scene, drivers, temperatures, background load and DLSS, RT or Frame Generation settings.";
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
