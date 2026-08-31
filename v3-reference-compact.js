/* FrameForge V3 — compact official developer reference */
(() => {
  function ensureCompactReferenceStyles() {
    if (document.getElementById("frameforge-reference-compact-styles")) return;
    const style = document.createElement("style");
    style.id = "frameforge-reference-compact-styles";
    style.textContent = `
      .official-reference-panel.reference-compact {
        padding: 18px 20px;
      }

      .official-reference-panel.reference-compact .reference-header {
        align-items: center;
        gap: 16px;
        margin-bottom: 12px;
      }

      .official-reference-panel.reference-compact .reference-title-line {
        display: block;
      }

      .official-reference-panel.reference-compact .reference-title-line h2 {
        margin: 3px 0 0;
        font-size: 17px;
        line-height: 1.25;
        letter-spacing: -0.015em;
        font-weight: 650;
      }

      .official-reference-panel.reference-compact .reference-help-wrap,
      .official-reference-panel.reference-compact .reference-match-card,
      .official-reference-panel.reference-compact .ratio-grid,
      .official-reference-panel.reference-compact .reference-equation {
        display: none !important;
      }

      .official-reference-panel.reference-compact .reference-main-grid {
        display: block;
        margin: 0;
      }

      .official-reference-panel.reference-compact .reference-anchor-card {
        display: grid;
        grid-template-columns: auto minmax(0, 1fr);
        column-gap: 14px;
        row-gap: 4px;
        align-items: center;
        padding: 12px 14px;
        min-height: 0;
        border-radius: 11px;
        background: rgba(255,255,255,.018);
      }

      .official-reference-panel.reference-compact .reference-tier {
        grid-row: 1 / span 2;
        align-self: stretch;
        min-width: 96px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 4px;
        padding-right: 14px;
        border-right: 1px solid rgba(255,255,255,.07);
      }

      .official-reference-panel.reference-compact .reference-tier span {
        font-size: 10px;
        line-height: 1.2;
        letter-spacing: .035em;
      }

      .official-reference-panel.reference-compact .reference-tier em {
        display: none;
      }

      .official-reference-panel.reference-compact .reference-target-line,
      .official-reference-panel.reference-compact .reference-hardware-line {
        display: flex;
        align-items: baseline;
        gap: 9px;
        min-width: 0;
      }

      .official-reference-panel.reference-compact .reference-target-line > span,
      .official-reference-panel.reference-compact .reference-hardware-line > span {
        flex: 0 0 auto;
        font-size: 9px;
        letter-spacing: .035em;
        color: var(--text-muted);
      }

      .official-reference-panel.reference-compact .reference-target-line strong {
        font-size: 11.5px;
        font-weight: 650;
        letter-spacing: 0;
      }

      .official-reference-panel.reference-compact .reference-hardware-line strong,
      .official-reference-panel.reference-compact .reference-hardware-line small {
        font-size: 10px;
        line-height: 1.35;
        letter-spacing: 0;
        color: var(--text-soft);
      }

      .official-reference-panel.reference-compact .reference-hardware-line small {
        opacity: .7;
      }

      .official-reference-panel.reference-compact .reference-source-link {
        padding: 7px 10px;
        font-size: 9px;
        white-space: nowrap;
      }

      @media (max-width: 720px) {
        .official-reference-panel.reference-compact {
          padding: 16px;
        }

        .official-reference-panel.reference-compact .reference-header {
          align-items: flex-start;
          flex-direction: column;
          gap: 10px;
        }

        .official-reference-panel.reference-compact .reference-anchor-card {
          grid-template-columns: 1fr;
          gap: 7px;
        }

        .official-reference-panel.reference-compact .reference-tier {
          grid-row: auto;
          min-width: 0;
          padding: 0 0 7px;
          border-right: 0;
          border-bottom: 1px solid rgba(255,255,255,.07);
        }

        .official-reference-panel.reference-compact .reference-target-line,
        .official-reference-panel.reference-compact .reference-hardware-line {
          align-items: flex-start;
          flex-direction: column;
          gap: 2px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function applyCompactReference() {
    const panel = byId("official-reference");
    if (!panel) return;

    panel.classList.add("reference-compact");
    const fr = state.language === "fr";

    const kicker = panel.querySelector('[data-i18n="officialReference"]');
    const title = panel.querySelector('[data-i18n="closestAnchor"]');
    const targetLabel = panel.querySelector('[data-i18n="publisherTarget"]');
    const hardwareLabel = panel.querySelector('[data-i18n="referenceHardware"]');
    const sourceLabel = panel.querySelector('[data-i18n="openOfficialSource"]');

    if (kicker) kicker.textContent = fr ? "BASE OFFICIELLE" : "OFFICIAL BASIS";
    if (title) title.textContent = fr ? "Basé sur les recommandations du développeur" : "Based on the developer's recommendations";
    if (targetLabel) targetLabel.textContent = fr ? "Réglage officiel" : "Official target";
    if (hardwareLabel) hardwareLabel.textContent = fr ? "Configuration de référence" : "Reference PC";
    if (sourceLabel) sourceLabel.textContent = fr ? "Voir la source ↗" : "View source ↗";
  }

  ensureCompactReferenceStyles();

  const previousRenderPerformance = renderPerformance;
  renderPerformance = function renderPerformanceWithCompactReference(result) {
    previousRenderPerformance(result);
    applyCompactReference();
  };

  const previousApplyLanguage = applyLanguage;
  applyLanguage = function applyLanguageWithCompactReference(language, rerender = true) {
    previousApplyLanguage(language, rerender);
    applyCompactReference();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => setTimeout(applyCompactReference, 0));
  } else {
    setTimeout(applyCompactReference, 0);
  }
})();
