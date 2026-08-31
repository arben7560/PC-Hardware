/* FrameForge V3 — performance result UI refinements */
(() => {
  function ensurePerformanceTuneStyles() {
    if (document.getElementById("frameforge-performance-tune-styles")) return;
    const style = document.createElement("style");
    style.id = "frameforge-performance-tune-styles";
    style.textContent = `
      /*
       * Clean performance-card layout.
       * The legacy FPS ring remains in the DOM so the engine can keep updating it,
       * but it no longer participates in visual layout. The bottleneck meter is a
       * real grid column of its own, so it can never overlap the result copy.
       */
      .fps-card.ff-performance-layout {
        position: relative !important;
        display: grid !important;
        grid-template-columns: minmax(230px, 270px) minmax(0, 1fr) !important;
        align-items: stretch !important;
        column-gap: 24px !important;
        row-gap: 0 !important;
        min-width: 0 !important;
      }

      .fps-card.ff-performance-layout > .fps-orbit {
        position: absolute !important;
        inset: auto !important;
        left: 0 !important;
        top: 0 !important;
        width: 1px !important;
        min-width: 0 !important;
        max-width: 1px !important;
        height: 1px !important;
        min-height: 0 !important;
        margin: 0 !important;
        padding: 0 !important;
        overflow: hidden !important;
        clip: rect(0 0 0 0) !important;
        clip-path: inset(50%) !important;
        opacity: 0 !important;
        pointer-events: none !important;
        transform: none !important;
      }

      .fps-card.ff-performance-layout > .fps-orbit::before,
      .fps-card.ff-performance-layout > .fps-orbit::after,
      .fps-card.ff-performance-layout > .fps-orbit .fps-ring::before,
      .fps-card.ff-performance-layout > .fps-orbit .fps-ring::after {
        display: none !important;
        content: none !important;
      }

      .fps-card.ff-performance-layout > .ff-bottleneck-meter {
        grid-column: 1;
        grid-row: 1;
        align-self: stretch;
      }

      .fps-card.ff-performance-layout > .fps-copy {
        grid-column: 2;
        grid-row: 1;
        position: relative !important;
        z-index: 1;
        min-width: 0 !important;
        width: auto !important;
        max-width: none !important;
        margin: 0 !important;
        padding: 2px 0 !important;
        transform: none !important;
      }

      .fps-card.ff-performance-layout .fps-copy > * {
        min-width: 0;
      }

      .ff-bottleneck-meter {
        width: 100%;
        min-width: 0;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 17px 16px;
        border: 1px solid rgba(255,255,255,.075);
        border-radius: 13px;
        background:
          linear-gradient(180deg, rgba(101,243,255,.025), rgba(255,255,255,.012));
      }

      .ff-bottleneck-kicker {
        display: block;
        margin-bottom: 12px;
        color: var(--text-muted);
        font-size: 8.5px;
        font-weight: 700;
        line-height: 1.2;
        letter-spacing: .07em;
        text-transform: uppercase;
      }

      .ff-bottleneck-values {
        display: grid;
        grid-template-columns: 1fr 1fr;
        align-items: end;
        gap: 16px;
        margin-bottom: 9px;
      }

      .ff-bottleneck-values span {
        display: flex;
        flex-direction: column;
        gap: 3px;
        min-width: 0;
        color: var(--text-muted);
        font-size: 8px;
        font-weight: 650;
        line-height: 1.2;
        letter-spacing: .035em;
      }

      .ff-bottleneck-values .is-cpu {
        text-align: right;
        align-items: flex-end;
      }

      .ff-bottleneck-values strong {
        color: var(--text);
        font-family: var(--font-display);
        font-size: 17px;
        font-weight: 720;
        line-height: 1;
        letter-spacing: -0.02em;
      }

      .ff-bottleneck-values .is-gpu strong { color: var(--cyan); }
      .ff-bottleneck-values .is-cpu strong { color: #8b73ff; }

      .ff-bottleneck-track {
        position: relative;
        width: 100%;
        height: 9px;
        display: flex;
        overflow: hidden;
        border: 1px solid rgba(255,255,255,.055);
        border-radius: 999px;
        background: rgba(255,255,255,.035);
      }

      .ff-bottleneck-track > span {
        display: block;
        height: 100%;
        min-width: 0;
        transition: width 220ms ease;
      }

      .ff-bottleneck-gpu {
        background: linear-gradient(90deg, rgba(101,243,255,.68), rgba(101,243,255,.95));
        box-shadow: 0 0 14px rgba(101,243,255,.12);
      }

      .ff-bottleneck-cpu {
        background: linear-gradient(90deg, rgba(139,115,255,.94), rgba(139,115,255,.62));
      }

      .ff-bottleneck-caption {
        display: block;
        margin-top: 11px;
        color: var(--text-muted);
        font-size: 9px;
        line-height: 1.45;
        letter-spacing: 0;
      }

      .fps-card.ff-performance-layout .fps-meta {
        display: grid !important;
        grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
        gap: 10px !important;
        width: 100% !important;
      }

      .fps-card.ff-performance-layout .fps-meta > div {
        min-width: 0 !important;
      }

      /* The FPS gap belongs with the target gauge, not under the headline FPS. */
      .goal-card .verdict-summary {
        margin: 9px 0 0;
        padding-top: 9px;
        border-top: 1px solid rgba(255,255,255,.055);
        color: var(--text-soft);
        font-size: 10px;
        line-height: 1.4;
        letter-spacing: 0;
      }

      .goal-card .verdict-summary strong {
        color: var(--text);
      }

      .verdict-number-block > .verdict-summary {
        display: none;
      }

      /* Target-reached cue on alternate performance profiles. */
      .scenario-strip article {
        position: relative;
      }

      .scenario-target-badge {
        position: absolute;
        top: 10px;
        right: 10px;
        display: inline-flex;
        align-items: center;
        min-height: 19px;
        padding: 3px 7px;
        border: 1px solid rgba(95,232,164,.30);
        border-radius: 999px;
        background: rgba(95,232,164,.075);
        color: var(--green);
        font-size: 7.5px;
        font-weight: 750;
        line-height: 1;
        letter-spacing: .055em;
        text-transform: uppercase;
        box-shadow: 0 0 14px rgba(95,232,164,.055);
        pointer-events: none;
      }

      .scenario-strip article.has-target-badge > span:first-child {
        padding-right: 72px;
      }

      @media (min-width: 3000px) {
        .fps-card.ff-performance-layout {
          grid-template-columns: minmax(280px, 330px) minmax(0, 1fr) !important;
          column-gap: 30px !important;
        }
        .ff-bottleneck-meter { padding: 20px 19px; }
        .ff-bottleneck-values strong { font-size: 19px; }
        .ff-bottleneck-caption,
        .goal-card .verdict-summary { font-size: 11px; }
        .scenario-target-badge { font-size: 8.5px; padding: 4px 8px; }
      }

      @media (max-width: 1100px) {
        .fps-card.ff-performance-layout {
          grid-template-columns: minmax(200px, 235px) minmax(0, 1fr) !important;
          column-gap: 18px !important;
        }
      }

      @media (max-width: 820px) {
        .fps-card.ff-performance-layout {
          grid-template-columns: 1fr !important;
          row-gap: 14px !important;
        }

        .fps-card.ff-performance-layout > .ff-bottleneck-meter,
        .fps-card.ff-performance-layout > .fps-copy {
          grid-column: 1;
        }

        .fps-card.ff-performance-layout > .ff-bottleneck-meter {
          grid-row: 1;
        }

        .fps-card.ff-performance-layout > .fps-copy {
          grid-row: 2;
          padding: 0 !important;
        }
      }

      @media (max-width: 560px) {
        .ff-bottleneck-meter {
          padding: 14px;
        }

        .fps-card.ff-performance-layout .fps-meta {
          grid-template-columns: 1fr !important;
        }

        .ff-bottleneck-values strong {
          font-size: 16px;
        }

        .scenario-target-badge {
          top: 8px;
          right: 8px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function bottleneckShares(result) {
    const gpuPressure = clamp(result.renderedFps / Math.max(result.gpuCeiling, 1), 0.05, 1.2);
    const cpuPressure = clamp(result.renderedFps / Math.max(result.cpuCeiling, 1), 0.05, 1.2);

    const gpuWeight = gpuPressure * gpuPressure;
    const cpuWeight = cpuPressure * cpuPressure;
    const total = Math.max(gpuWeight + cpuWeight, 0.01);
    let gpu = Math.round((gpuWeight / total) * 100);
    gpu = clamp(gpu, 5, 95);
    return { gpu, cpu: 100 - gpu };
  }

  function ensureCleanPerformanceLayout() {
    const card = document.querySelector(".fps-card");
    const orbit = card?.querySelector(":scope > .fps-orbit");
    const copy = card?.querySelector(":scope > .fps-copy");
    if (!card || !orbit || !copy) return null;

    card.classList.add("ff-performance-layout");

    let meter = card.querySelector(":scope > .ff-bottleneck-meter");
    if (!meter) {
      // Migrate a meter created by an older version instead of duplicating it.
      meter = orbit.querySelector(".ff-bottleneck-meter");
      if (meter) meter.remove();
      else {
        meter = document.createElement("section");
        meter.className = "ff-bottleneck-meter";
        meter.setAttribute("aria-label", "CPU GPU bottleneck balance");
        meter.innerHTML = `
          <span class="ff-bottleneck-kicker" id="ff-bottleneck-kicker">BOTTLENECK BALANCE</span>
          <div class="ff-bottleneck-values">
            <span class="is-gpu">GPU <strong id="ff-bottleneck-gpu-value">—</strong></span>
            <span class="is-cpu">CPU <strong id="ff-bottleneck-cpu-value">—</strong></span>
          </div>
          <div class="ff-bottleneck-track">
            <span class="ff-bottleneck-gpu" id="ff-bottleneck-gpu-bar"></span>
            <span class="ff-bottleneck-cpu" id="ff-bottleneck-cpu-bar"></span>
          </div>
          <small class="ff-bottleneck-caption" id="ff-bottleneck-caption">—</small>`;
      }
      card.insertBefore(meter, copy);
    }

    return meter;
  }

  function renderBottleneckMeter(result) {
    const meter = ensureCleanPerformanceLayout();
    if (!meter) return;

    const shares = bottleneckShares(result);
    byId("ff-bottleneck-gpu-value").textContent = `${shares.gpu}%`;
    byId("ff-bottleneck-cpu-value").textContent = `${shares.cpu}%`;
    byId("ff-bottleneck-gpu-bar").style.width = `${shares.gpu}%`;
    byId("ff-bottleneck-cpu-bar").style.width = `${shares.cpu}%`;

    const fr = state.language === "fr";
    byId("ff-bottleneck-kicker").textContent = fr ? "RÉPARTITION DE LA LIMITE" : "BOTTLENECK BALANCE";
    const dominant = shares.gpu >= shares.cpu ? "GPU" : "CPU";
    byId("ff-bottleneck-caption").textContent = fr
      ? `${dominant} exerce actuellement la plus forte contrainte sur ce scénario.`
      : `${dominant} is currently the stronger constraint in this scenario.`;
  }

  function moveGoalSummary() {
    const goal = document.querySelector("#priority-verdict .goal-card") || document.querySelector(".goal-card");
    const summary = byId("verdict-summary");
    const scale = goal?.querySelector(".goal-scale");
    if (!goal || !summary || !scale) return;
    if (summary.parentElement !== goal) scale.insertAdjacentElement("afterend", summary);
  }

  function updateScenarioBadges() {
    const target = Number(byId("target-fps")?.value || 0);
    const fr = state.language === "fr";
    $$(".scenario-strip article").forEach((card) => {
      const value = Number.parseInt(card.querySelector("strong")?.textContent || "", 10);
      let badge = card.querySelector(".scenario-target-badge");
      const reaches = Number.isFinite(value) && target > 0 && value >= target;

      card.classList.toggle("has-target-badge", reaches);
      if (!reaches) {
        badge?.remove();
        return;
      }

      if (!badge) {
        badge = document.createElement("span");
        badge.className = "scenario-target-badge";
        card.appendChild(badge);
      }
      badge.textContent = fr ? "✓ OBJECTIF" : "✓ TARGET";
      badge.title = fr
        ? `${value} FPS : objectif de ${target} FPS atteint`
        : `${value} FPS: ${target} FPS target reached`;
    });
  }

  function tunePerformanceUi(result = state.lastResult) {
    if (!result) return;
    renderBottleneckMeter(result);
    moveGoalSummary();
    updateScenarioBadges();
  }

  ensurePerformanceTuneStyles();

  const previousRenderPerformance = renderPerformance;
  renderPerformance = function renderPerformanceWithUiTune(result) {
    previousRenderPerformance(result);
    tunePerformanceUi(result);
  };

  const previousApplyLanguage = applyLanguage;
  applyLanguage = function applyLanguageWithUiTune(language, rerender = true) {
    previousApplyLanguage(language, rerender);
    setTimeout(() => tunePerformanceUi(state.lastResult), 0);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => setTimeout(() => tunePerformanceUi(state.lastResult), 0));
  } else {
    setTimeout(() => tunePerformanceUi(state.lastResult), 0);
  }
})();
