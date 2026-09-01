/* FrameForge V3 — contextual help for modeled performance metrics */
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

      .verdict-fps-help,
      .ff-metric-help {
        width: 20px;
        height: 20px;
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

      .verdict-fps-help {
        margin: 0 0 5px 4px;
      }

      .verdict-fps-help:hover,
      .verdict-fps-help:focus-visible,
      .ff-metric-help:hover,
      .ff-metric-help:focus-visible {
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

      .fps-meta > div > span:first-child {
        display: inline-flex;
        align-items: center;
        gap: 6px;
      }

      .ff-metric-help {
        width: 15px;
        height: 15px;
        font-size: 7px;
        vertical-align: middle;
      }

      .ff-metric-modal-note {
        margin-top: 14px;
        padding: 11px 12px;
        border: 1px solid rgba(101,243,255,.10);
        border-radius: 9px;
        background: rgba(101,243,255,.035);
      }

      .ff-metric-modal-note strong {
        display: block;
        margin-bottom: 3px;
        color: var(--text);
      }

      .ff-metric-modal-value {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        gap: 14px;
        margin: 14px 0;
        padding: 12px 13px;
        border: 1px solid rgba(255,255,255,.07);
        border-radius: 10px;
        background: rgba(255,255,255,.02);
      }

      .ff-metric-modal-value span {
        color: var(--text-muted);
        font-size: 10px;
        text-transform: uppercase;
        letter-spacing: .05em;
      }

      .ff-metric-modal-value strong {
        color: var(--cyan);
        font-family: var(--font-display);
        font-size: 20px;
      }

      @media (min-width: 3000px) {
        .verdict-fps-tooltip {
          width: 340px;
          padding: 14px 15px 15px;
          font-size: 11.5px;
          line-height: 1.5;
        }
        .verdict-fps-tooltip strong { font-size: 12px; }
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
        .verdict-fps-tooltip::after { left: auto; right: 20px; }
        .verdict-fps-help-wrap:hover .verdict-fps-tooltip,
        .verdict-fps-help-wrap:focus-within .verdict-fps-tooltip { transform: none; }
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

  function metricCopy(metric) {
    const fr = state.language === "fr";
    const result = state.lastResult;

    const values = {
      low: result ? `${Math.max(1, round(result.low))} FPS` : "—",
      frametime: result ? `${result.frameTime.toFixed(1)} ms` : "—",
      vram: result ? `${result.vramNeed.toFixed(1)} GB` : "—"
    };

    if (metric === "low") {
      return fr ? {
        kicker: "STABILITÉ DES PERFORMANCES",
        title: "Que signifie le 1% low ?",
        valueLabel: "1% low estimé",
        value: values.low,
        body: "Le 1% low représente le niveau de FPS observé pendant les 1 % de moments les plus lents. Il donne une meilleure idée de la régularité qu'une simple moyenne : plus il reste proche des FPS moyens, plus l'expérience devrait paraître stable.",
        note: "Dans FrameForge, cette valeur est modélisée à partir des FPS estimés, du profil du jeu et de facteurs comme la pression CPU, la RAM et le stockage. Ce n'est pas une mesure capturée directement en jeu."
      } : {
        kicker: "PERFORMANCE STABILITY",
        title: "What does 1% low mean?",
        valueLabel: "Estimated 1% low",
        value: values.low,
        body: "1% low represents the frame rate seen during the slowest 1% of moments. It gives a better sense of consistency than the average alone: the closer it stays to average FPS, the smoother the experience should feel.",
        note: "In FrameForge, this value is modeled from estimated FPS, the game profile and factors such as CPU pressure, RAM and storage. It is not captured directly from a live benchmark."
      };
    }

    if (metric === "frametime") {
      return fr ? {
        kicker: "RYTHME D'AFFICHAGE",
        title: "Que signifie le temps par image ?",
        valueLabel: "Temps / image estimé",
        value: values.frametime,
        body: "Le temps par image indique combien de millisecondes sont nécessaires pour afficher une image. Une valeur plus basse signifie que les images arrivent plus rapidement : 60 FPS correspondent à environ 16,7 ms, 120 FPS à environ 8,3 ms.",
        note: "Cette valeur est directement dérivée des FPS estimés par la formule 1000 ÷ FPS. Elle est donc mathématiquement exacte par rapport à l'estimation FrameForge, mais elle ne constitue pas une mesure de frametime capturée sur votre PC."
      } : {
        kicker: "FRAME PACING",
        title: "What does frame time mean?",
        valueLabel: "Estimated frame time",
        value: values.frametime,
        body: "Frame time shows how many milliseconds are needed to display one frame. Lower is faster: 60 FPS is about 16.7 ms, while 120 FPS is about 8.3 ms.",
        note: "This value is directly derived from estimated FPS using 1000 ÷ FPS. It is mathematically exact relative to the FrameForge estimate, but it is not a measured frame-time capture from your PC."
      };
    }

    return fr ? {
      kicker: "MÉMOIRE VIDÉO",
      title: "Que représente la VRAM affichée ?",
      valueLabel: "VRAM estimée nécessaire",
      value: values.vram,
      body: "Cette valeur estime la quantité de mémoire vidéo que le scénario peut demander avec la résolution, le preset et le niveau de ray tracing sélectionnés. Elle sert à repérer un risque de saturation de la carte graphique.",
      note: "Il s'agit d'un besoin VRAM modélisé à partir des références du jeu, pas de la consommation réellement mesurée par le pilote. L'utilisation réelle peut varier selon la scène, les textures, les mises à jour du jeu et les applications ouvertes."
    } : {
      kicker: "VIDEO MEMORY",
      title: "What does the VRAM value represent?",
      valueLabel: "Estimated VRAM requirement",
      value: values.vram,
      body: "This value estimates how much video memory the scenario may require at the selected resolution, preset and ray-tracing level. It helps identify possible graphics-memory pressure.",
      note: "This is a modeled VRAM requirement based on game references, not usage measured by the graphics driver. Actual usage can vary by scene, texture workload, game updates and background applications."
    };
  }

  function openMetricHelp(metric) {
    if (typeof openModal !== "function") return;
    const copy = metricCopy(metric);
    const fr = state.language === "fr";
    openModal({
      kicker: copy.kicker,
      title: copy.title,
      body: `
        <p>${copy.body}</p>
        <div class="ff-metric-modal-value"><span>${copy.valueLabel}</span><strong>${copy.value}</strong></div>
        <div class="ff-metric-modal-note"><strong>${fr ? "À retenir" : "Important"}</strong>${copy.note}</div>
      `,
      actions: [{ label: fr ? "Fermer" : "Close", className: "button-primary", close: true }]
    });
  }

  function ensureMetricHelp() {
    const items = [
      { valueId: "low-value", metric: "low", fr: "À propos du 1% low", en: "About 1% low" },
      { valueId: "frametime-value", metric: "frametime", fr: "À propos du temps par image", en: "About frame time" },
      { valueId: "vram-value", metric: "vram", fr: "À propos de la VRAM estimée", en: "About estimated VRAM" }
    ];

    items.forEach((item) => {
      const value = byId(item.valueId);
      const card = value?.parentElement;
      const label = card?.querySelector(":scope > span:first-child");
      if (!label) return;

      let button = label.querySelector(`.ff-metric-help[data-metric="${item.metric}"]`);
      if (!button) {
        button = document.createElement("button");
        button.type = "button";
        button.className = "ff-metric-help";
        button.dataset.metric = item.metric;
        button.textContent = "?";
        button.addEventListener("click", (event) => {
          event.preventDefault();
          event.stopPropagation();
          openMetricHelp(item.metric);
        });
        label.appendChild(button);
      }
      button.setAttribute("aria-label", state.language === "fr" ? item.fr : item.en);
      button.title = state.language === "fr" ? item.fr : item.en;
    });
  }

  function ensureAllHelp() {
    ensureFpsHelp();
    ensureMetricHelp();
  }

  ensureFpsHelpStyles();

  const previousRenderPerformance = renderPerformance;
  renderPerformance = function renderPerformanceWithFpsHelp(result) {
    previousRenderPerformance(result);
    ensureAllHelp();
  };

  const previousApplyLanguage = typeof applyLanguage === "function" ? applyLanguage : null;
  if (previousApplyLanguage) {
    applyLanguage = function applyLanguageWithMetricHelp(language, rerender = true) {
      previousApplyLanguage(language, rerender);
      setTimeout(ensureAllHelp, 0);
    };
  }
})();
