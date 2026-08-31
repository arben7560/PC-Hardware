/* FrameForge V3 — optimization / telemetry / upgrade / reference cleanup */
(() => {
  function ensureBottomPolishStyles() {
    if (document.getElementById("frameforge-bottom-polish-styles")) return;
    const style = document.createElement("style");
    style.id = "frameforge-bottom-polish-styles";
    style.textContent = `
      .ff-frametime-legend {
        display: flex;
        align-items: center;
        gap: 7px;
        margin: 8px 0 2px;
        color: var(--text-muted);
        font-size: 9px;
        line-height: 1.35;
        letter-spacing: 0;
      }

      .ff-frametime-legend::before {
        content: "";
        width: 7px;
        height: 7px;
        flex: 0 0 7px;
        border-radius: 50%;
        background: var(--cyan);
        box-shadow: 0 0 10px rgba(101,243,255,.18);
      }

      .optimization-card .optimization-score strong {
        min-width: 82px;
      }

      .secondary-disclosure > summary {
        grid-template-columns: minmax(0,1fr) auto auto;
        align-items: center;
        gap: 18px;
      }

      .ff-upgrade-preview {
        display: flex;
        align-items: center;
        gap: 10px;
        min-width: 0;
        padding: 8px 10px;
        border: 1px solid rgba(101,243,255,.09);
        border-radius: 9px;
        background: rgba(101,243,255,.025);
      }

      .ff-upgrade-preview i {
        width: 7px;
        height: 7px;
        flex: 0 0 7px;
        border-radius: 50%;
        background: var(--cyan);
        box-shadow: 0 0 12px rgba(101,243,255,.20);
      }

      .ff-upgrade-preview span {
        min-width: 0;
      }

      .ff-upgrade-preview small,
      .ff-upgrade-preview strong {
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        letter-spacing: 0;
      }

      .ff-upgrade-preview small {
        margin-bottom: 2px;
        color: var(--text-muted);
        font-size: 8px;
        text-transform: uppercase;
        letter-spacing: .05em;
      }

      .ff-upgrade-preview strong {
        color: var(--text-soft);
        font-size: 10px;
        font-weight: 650;
      }

      #benchmarks.ff-duplicate-reference-hidden {
        display: none !important;
      }

      @media (min-width: 3000px) {
        .ff-frametime-legend { font-size: 10.5px; }
        .ff-upgrade-preview strong { font-size: 11.5px; }
        .ff-upgrade-preview small { font-size: 9px; }
      }

      @media (max-width: 900px) {
        .secondary-disclosure > summary {
          grid-template-columns: 1fr auto;
        }
        .ff-upgrade-preview {
          grid-column: 1 / -1;
          grid-row: 2;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function fixRecommendationUnits() {
    $$("#recommendations-list .recommendation-row em").forEach((gain) => {
      if (gain.textContent.trim() === "+Hz") gain.textContent = "+FPS";
    });
  }

  function clarifyGoalFit() {
    const label = document.querySelector(".optimization-score [data-i18n='goalFit']");
    const value = byId("goal-fit-score");
    const bar = byId("goal-fit-bar");
    if (!label || !value || !state.recommended) return;

    const target = Number(byId("target-fps")?.value || 0);
    const recommendedResult = calculateScenario(state.recommended);
    const fps = Math.max(1, round(recommendedResult.fps));
    const reached = target > 0 && recommendedResult.fps >= target;
    const fr = state.language === "fr";

    label.textContent = reached
      ? (fr ? `Objectif ${target} FPS accessible` : `${target} FPS target achievable`)
      : (fr ? `Objectif ${target} FPS non atteint` : `${target} FPS target not reached`);
    value.textContent = `${fps} FPS`;
    if (bar && target > 0) bar.style.width = `${clamp((recommendedResult.fps / target) * 100, 0, 100)}%`;
  }

  function ensureFrametimeLegend() {
    const graph = byId("frametime-graph");
    if (!graph) return;
    let legend = document.querySelector(".ff-frametime-legend");
    if (!legend) {
      legend = document.createElement("small");
      legend.className = "ff-frametime-legend";
      graph.insertAdjacentElement("afterend", legend);
    }
    legend.textContent = state.language === "fr"
      ? "Régularité du temps entre les images (frametime) · variations estimées"
      : "Frame-time consistency · estimated variation between frames";
  }

  function findUpgradePrice(upgrade) {
    if (!upgrade) return null;
    const gpu = GPU_DATA.find((item) => item.name === upgrade.name);
    return gpu?.price || null;
  }

  function updateUpgradePreview() {
    const summary = document.querySelector("#upgrade-disclosure > summary");
    if (!summary) return;

    let preview = summary.querySelector(".ff-upgrade-preview");
    if (!preview) {
      preview = document.createElement("div");
      preview.className = "ff-upgrade-preview";
      const action = summary.querySelector(".secondary-disclosure-action");
      if (action) action.insertAdjacentElement("beforebegin", preview);
      else summary.appendChild(preview);
    }

    const upgrade = state.upgrade;
    const fr = state.language === "fr";
    if (!upgrade || upgrade.type === "none") {
      preview.innerHTML = `<i></i><span><small>${fr ? "Suggestion" : "Suggestion"}</small><strong>${fr ? "Aucune amélioration prioritaire" : "No priority upgrade needed"}</strong></span>`;
      return;
    }

    const price = findUpgradePrice(upgrade);
    const gain = upgrade.gain ? ` · +${upgrade.gain}%` : "";
    const priceText = price ? ` · ~${price} €` : "";
    preview.innerHTML = `<i></i><span><small>${fr ? "Suggestion directe" : "Quick suggestion"}</small><strong>${upgrade.name}${priceText}${gain}</strong></span>`;
  }

  function removeDuplicateReferenceFooter() {
    const benchmark = byId("benchmarks");
    if (benchmark) benchmark.classList.add("ff-duplicate-reference-hidden");

    const nav = document.querySelector('a[href="#benchmarks"]');
    if (nav) nav.setAttribute("href", "#official-reference");
  }

  function applyBottomPolish() {
    fixRecommendationUnits();
    clarifyGoalFit();
    ensureFrametimeLegend();
    updateUpgradePreview();
    removeDuplicateReferenceFooter();
  }

  ensureBottomPolishStyles();

  const previousRenderPerformance = renderPerformance;
  renderPerformance = function renderPerformanceWithBottomPolish(result) {
    previousRenderPerformance(result);
    setTimeout(applyBottomPolish, 0);
  };

  const previousApplyLanguage = applyLanguage;
  applyLanguage = function applyLanguageWithBottomPolish(language, rerender = true) {
    previousApplyLanguage(language, rerender);
    setTimeout(applyBottomPolish, 0);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => setTimeout(applyBottomPolish, 0));
  } else {
    setTimeout(applyBottomPolish, 0);
  }
})();
