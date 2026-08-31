/* FrameForge V3 — performance result UI refinements */
(() => {
  function ensurePerformanceTuneStyles() {
    if (document.getElementById("frameforge-performance-tune-styles")) return;
    const style = document.createElement("style");
    style.id = "frameforge-performance-tune-styles";
    style.textContent = `
      /* Give the bottleneck meter and performance summary their own columns. */
      .fps-card {
        display: grid !important;
        grid-template-columns: minmax(230px, 270px) minmax(0, 1fr) !important;
        align-items: stretch !important;
        gap: 18px !important;
      }

      .fps-card .fps-orbit.ff-bottleneck-orbit {
        position: static !important;
        inset: auto !important;
        transform: none !important;
        margin: 0 !important;
        min-width: 0 !important;
        width: 100% !important;
        height: auto !important;
        display: flex !important;
        align-items: stretch !important;
        justify-content: stretch !important;
        padding: 0 !important;
        z-index: auto !important;
      }

      .fps-card .fps-copy {
        position: static !important;
        min-width: 0 !important;
        width: 100% !important;
        margin: 0 !important;
        padding: 16px 0 16px 2px !important;
      }

      .ff-bottleneck-meter {
        width: 100%;
        min-width: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 16px;
        border: 1px solid rgba(255,255,255,.065);
        border-radius: 12px;
        background: rgba(255,255,255,.018);
        box-sizing: border-box;
      }

      .ff-bottleneck-kicker {
        display: block;
        margin-bottom: 11px;
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
        align-items: baseline;
        gap: 12px;
        margin-bottom: 9px;
      }

      .ff-bottleneck-values span {
        display: inline-flex;
        align-items: baseline;
        gap: 5px;
        min-width: 0;
        color: var(--text-soft);
        font-size: 9px;
        font-weight: 600;
        letter-spacing: 0;
      }

      .ff-bottleneck-values span:last-child {
        justify-content: flex-end;
      }

      .ff-bottleneck-values strong {
        color: var(--text);
        font-family: var(--font-display);
        font-size: 14px;
        font-weight: 700;
      }

      .ff-bottleneck-values .is-gpu strong { color: var(--cyan); }
      .ff-bottleneck-values .is-cpu strong { color: #8b73ff; }

      .ff-bottleneck-track {
        position: relative;
        height: 9px;
        display: flex;
        overflow: hidden;
        border: 1px solid rgba(255,255,255,.055);
        border-radius: 999px;
        background: rgba(255,255,255,.035);
      }

      .ff-bottleneck-track > span {
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
        margin-top: 10px;
        color: var(--text-muted);
        font-size: 9px;
        line-height: 1.45;
        letter-spacing: 0;
      }

      .fps-card .fps-copy .fps-meta {
        display: grid !important;
        grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
        gap: 8px !important;
        width: 100% !important;
      }

      .fps-card .fps-copy .fps-meta > div {
        min-width: 0;
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
        .fps-card {
          grid-template-columns: minmax(270px, 310px) minmax(0, 1fr) !important;
          gap: 22px !important;
        }
        .ff-bottleneck-meter { padding: 18px; }
        .ff-bottleneck-values strong { font-size: 16px; }
        .ff-bottleneck-caption,
        .goal-card .verdict-summary { font-size: 11px; }
        .scenario-target-badge { font-size: 8.5px; padding: 4px 8px; }
      }

      @media (max-width: 1180px) {
        .fps-card {
          grid-template-columns: 1fr !important;
          gap: 12px !important;
        }

        .fps-card .fps-copy {
          padding: 4px 0 0 !important;
        }
      }

      @media (max-width: 760px) {
        .ff-bottleneck-meter { width: 100%; }
        .fps-card .fps-copy .fps-meta {
          grid-template-columns: 1fr !important;
        }
        .scenario-target-badge { top: 8px; right: 8px; }
      }
    `;
    document.head.appendChild(style);
  }

  function bottleneckShares(result) {
    const gpuPressure = clamp(result.renderedFps / Math.max(result.gpuCeiling, 1), 0.05, 1.2);
    const cpuPressure = clamp(result.renderedFps / Math.max(result.cpuCeiling, 1), 0.05, 1.2);

    // Squaring makes a clearly dominant limit easier to read without implying
    // that these percentages are literal hardware utilization values.
    const gpuWeight = gpuPressure * gpuPressure;
    const cpuWeight = cpuPressure * cpuPressure;
    const total = Math.max(gpuWeight + cpuWeight, 0.01);
    let gpu = Math.round((gpuWeight / total) * 100);
    gpu = clamp(gpu, 5, 95);
    return { gpu, cpu: 100 - gpu };
  }

  function renderBottleneckMeter(result) {
    const orbit = document.querySelector(".fps-card .fps-orbit");
    if (!orbit) return;

    orbit.classList.add("ff-bottleneck-orbit");
    if (!orbit.querySelector(".ff-bottleneck-meter")) {
      orbit.innerHTML = `
        <div class="ff-bottleneck-meter">
          <span class="ff-bottleneck-kicker" id="ff-bottleneck-kicker">BOTTLENECK BALANCE</span>
          <div class="ff-bottleneck-values">
            <span class="is-gpu">GPU <strong id="ff-bottleneck-gpu-value">—</strong></span>
            <span class="is-cpu">CPU <strong id="ff-bottleneck-cpu-value">—</strong></span>
          </div>
          <div class="ff-bottleneck-track" aria-label="CPU GPU bottleneck balance">
            <span class="ff-bottleneck-gpu" id="ff-bottleneck-gpu-bar"></span>
            <span class="ff-bottleneck-cpu" id="ff-bottleneck-cpu-bar"></span>
          </div>
          <small class="ff-bottleneck-caption" id="ff-bottleneck-caption">—</small>
        </div>`;
    }

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
