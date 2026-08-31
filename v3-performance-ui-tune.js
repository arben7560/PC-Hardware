/* FrameForge V3 — performance result UI refinements */
(() => {
  function ensurePerformanceTuneStyles() {
    if (document.getElementById("frameforge-performance-tune-styles")) return;
    const style = document.createElement("style");
    style.id = "frameforge-performance-tune-styles";
    style.textContent = `
      /* Keep the original FPS DOM alive for live recalculation, but hide its visual donut. */
      .fps-card .fps-orbit.ff-bottleneck-orbit {
        min-width: 220px;
        width: 220px;
        height: auto;
        display: flex;
        align-items: stretch;
        justify-content: center;
        padding: 18px;
      }

      .fps-card .fps-orbit.ff-bottleneck-orbit > .fps-ring {
        position: absolute !important;
        width: 1px !important;
        height: 1px !important;
        overflow: hidden !important;
        clip: rect(0 0 0 0) !important;
        clip-path: inset(50%) !important;
        white-space: nowrap !important;
        opacity: 0 !important;
        pointer-events: none !important;
      }

      .ff-bottleneck-meter {
        width: 100%;
        min-width: 0;
        box-sizing: border-box;
        padding: 15px 14px;
        border: 1px solid rgba(255,255,255,.065);
        border-radius: 12px;
        background: rgba(255,255,255,.018);
      }

      .ff-bottleneck-kicker {
        display: block;
        margin-bottom: 10px;
        color: var(--text-muted);
        font-size: 8.5px;
        font-weight: 700;
        line-height: 1.2;
        letter-spacing: .07em;
        text-transform: uppercase;
      }

      .ff-bottleneck-values {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        gap: 12px;
        margin-bottom: 8px;
      }

      .ff-bottleneck-values span {
        display: inline-flex;
        align-items: baseline;
        gap: 5px;
        color: var(--text-soft);
        font-size: 9px;
        font-weight: 600;
        letter-spacing: 0;
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
        margin-top: 9px;
        color: var(--text-muted);
        font-size: 9px;
        line-height: 1.35;
        letter-spacing: 0;
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
        .fps-card .fps-orbit.ff-bottleneck-orbit {
          min-width: 250px;
          width: 250px;
        }
        .ff-bottleneck-meter { padding: 17px 16px; }
        .ff-bottleneck-values strong { font-size: 16px; }
        .ff-bottleneck-caption,
        .goal-card .verdict-summary { font-size: 11px; }
        .scenario-target-badge { font-size: 8.5px; padding: 4px 8px; }
      }

      @media (max-width: 760px) {
        .fps-card .fps-orbit.ff-bottleneck-orbit {
          width: 100%;
          min-width: 0;
          padding: 0 0 12px;
        }
        .ff-bottleneck-meter { width: 100%; }
        .scenario-target-badge { top: 8px; right: 8px; }
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

  function renderBottleneckMeter(result) {
    const orbit = document.querySelector(".fps-card .fps-orbit");
    if (!orbit) return;

    orbit.classList.add("ff-bottleneck-orbit");

    let meter = orbit.querySelector(".ff-bottleneck-meter");
    if (!meter) {
      meter = document.createElement("div");
      meter.className = "ff-bottleneck-meter";
      meter.innerHTML = `
        <span class="ff-bottleneck-kicker" id="ff-bottleneck-kicker">BOTTLENECK BALANCE</span>
        <div class="ff-bottleneck-values">
          <span class="is-gpu">GPU <strong id="ff-bottleneck-gpu-value">—</strong></span>
          <span class="is-cpu">CPU <strong id="ff-bottleneck-cpu-value">—</strong></span>
        </div>
        <div class="ff-bottleneck-track" aria-label="CPU GPU bottleneck balance">
          <span class="ff-bottleneck-gpu" id="ff-bottleneck-gpu-bar"></span>
          <span class="ff-bottleneck-cpu" id="ff-bottleneck-cpu-bar"></span>
        </div>
        <small class="ff-bottleneck-caption" id="ff-bottleneck-caption">—</small>`;
      orbit.appendChild(meter);
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
