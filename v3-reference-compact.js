/* FrameForge V3 — compact official developer reference */
(() => {
  function ensureCompactReferenceStyles() {
    if (document.getElementById("frameforge-reference-compact-styles")) return;
    const style = document.createElement("style");
    style.id = "frameforge-reference-compact-styles";
    style.textContent = `
      .official-reference-panel.reference-compact {
        padding: 20px 22px;
      }

      .official-reference-panel.reference-compact .reference-header {
        align-items: flex-start;
        gap: 18px;
        margin-bottom: 15px;
      }

      .official-reference-panel.reference-compact .reference-title-line {
        display: block;
      }

      .official-reference-panel.reference-compact .reference-title-line h2 {
        margin: 4px 0 0;
        font-size: 17px;
        line-height: 1.24;
        letter-spacing: -0.02em;
        font-weight: 650;
      }

      .official-reference-panel.reference-compact .reference-help-wrap,
      .official-reference-panel.reference-compact .reference-main-grid,
      .official-reference-panel.reference-compact .ratio-grid,
      .official-reference-panel.reference-compact .reference-equation {
        display: none !important;
      }

      .official-reference-panel.reference-compact .reference-source-link {
        padding: 7px 10px;
        margin-top: 1px;
        font-size: 9px;
        letter-spacing: .02em;
        white-space: nowrap;
        border-color: rgba(101,243,255,.13);
        background: rgba(101,243,255,.025);
        transition: border-color 150ms ease, background 150ms ease, color 150ms ease, box-shadow 150ms ease, transform 150ms ease;
      }

      .official-reference-panel.reference-compact .reference-source-link:hover,
      .official-reference-panel.reference-compact .reference-source-link:focus-visible {
        color: var(--cyan);
        border-color: rgba(101,243,255,.42);
        background: rgba(101,243,255,.075);
        box-shadow: 0 0 18px rgba(101,243,255,.08);
        transform: translateY(-1px);
        outline: 0;
      }

      .reference-summary-grid {
        display: grid;
        grid-template-columns: minmax(0, .82fr) minmax(0, 1.18fr);
        gap: 10px;
      }

      .reference-summary-card {
        min-width: 0;
        padding: 13px 14px;
        border: 1px solid rgba(255,255,255,.065);
        border-radius: 11px;
        background: rgba(255,255,255,.018);
      }

      .reference-summary-card > span {
        display: block;
        margin-bottom: 10px;
        color: var(--text-muted);
        font-size: 8.5px;
        font-weight: 700;
        line-height: 1.2;
        letter-spacing: .075em;
        text-transform: uppercase;
      }

      .reference-summary-primary {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 8px;
        min-width: 0;
      }

      .reference-summary-primary i,
      .reference-hardware-row i {
        width: 6px;
        height: 6px;
        flex: 0 0 6px;
        border-radius: 50%;
        background: var(--cyan);
        box-shadow: 0 0 10px rgba(101,243,255,.24);
      }

      .reference-summary-primary strong {
        overflow: hidden;
        color: var(--text);
        font-size: 13px;
        font-weight: 650;
        line-height: 1.25;
        letter-spacing: -0.01em;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .reference-profile-meta {
        display: flex;
        flex-wrap: wrap;
        gap: 5px 12px;
        padding-left: 14px;
        color: var(--text-soft);
        font-size: 10px;
        line-height: 1.45;
        letter-spacing: 0;
      }

      .reference-profile-meta span + span::before {
        content: "·";
        margin-right: 12px;
        color: rgba(255,255,255,.24);
      }

      .reference-hardware-list {
        display: grid;
        grid-template-columns: 1fr;
        gap: 7px;
      }

      .reference-hardware-row {
        display: grid;
        grid-template-columns: 6px 34px minmax(0, 1fr);
        align-items: center;
        gap: 8px;
        min-width: 0;
        padding: 3px 0;
        color: var(--text-soft);
        font-size: 10px;
        line-height: 1.35;
      }

      .reference-hardware-row:nth-child(2) i {
        background: #8b73ff;
        box-shadow: 0 0 10px rgba(139,115,255,.22);
      }

      .reference-hardware-row:nth-child(3) i,
      .reference-hardware-row:nth-child(4) i {
        background: rgba(255,255,255,.42);
        box-shadow: none;
      }

      .reference-hardware-row b {
        color: var(--text-muted);
        font-size: 8.5px;
        font-weight: 700;
        letter-spacing: .045em;
      }

      .reference-hardware-row strong {
        overflow: hidden;
        color: var(--text-soft);
        font-size: 10px;
        font-weight: 600;
        letter-spacing: 0;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .reference-delta-bar {
        display: flex;
        align-items: center;
        gap: 9px;
        margin-top: 10px;
        padding: 9px 11px;
        border: 1px solid rgba(101,243,255,.08);
        border-radius: 9px;
        background: rgba(101,243,255,.025);
        color: var(--text-soft);
        font-size: 10px;
        line-height: 1.4;
        letter-spacing: 0;
      }

      .reference-delta-bar .reference-delta-icon {
        width: 22px;
        height: 22px;
        display: inline-grid;
        place-items: center;
        flex: 0 0 22px;
        border-radius: 7px;
        background: rgba(101,243,255,.07);
        color: var(--cyan);
        font-size: 11px;
        font-weight: 700;
      }

      .reference-delta-bar strong {
        color: var(--text);
        font-weight: 650;
      }

      .reference-delta-badge {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex: 0 0 auto;
        min-width: 54px;
        padding: 4px 8px;
        border: 1px solid rgba(101,243,255,.28);
        border-radius: 999px;
        background: rgba(101,243,255,.08);
        color: var(--cyan);
        font-family: var(--font-display);
        font-size: 10px;
        font-weight: 750;
        line-height: 1;
        letter-spacing: .01em;
        box-shadow: 0 0 16px rgba(101,243,255,.08);
      }

      .reference-delta-bar.is-lower {
        border-color: rgba(255,198,87,.10);
        background: rgba(255,198,87,.025);
      }

      .reference-delta-bar.is-lower .reference-delta-icon {
        background: rgba(255,198,87,.07);
        color: var(--yellow);
      }

      .reference-delta-bar.is-lower .reference-delta-badge {
        border-color: rgba(255,198,87,.28);
        background: rgba(255,198,87,.07);
        color: var(--yellow);
        box-shadow: 0 0 16px rgba(255,198,87,.06);
      }

      @media (min-width: 3000px) {
        .official-reference-panel.reference-compact {
          padding: 24px 26px;
        }

        .official-reference-panel.reference-compact .reference-title-line h2 {
          font-size: 19px;
        }

        .reference-summary-card {
          padding: 15px 16px;
        }

        .reference-summary-primary strong {
          font-size: 14px;
        }

        .reference-profile-meta,
        .reference-hardware-row,
        .reference-hardware-row strong,
        .reference-delta-bar {
          font-size: 11px;
        }

        .reference-delta-badge {
          min-width: 60px;
          padding: 5px 9px;
          font-size: 11px;
        }
      }

      @media (max-width: 760px) {
        .official-reference-panel.reference-compact {
          padding: 16px;
        }

        .official-reference-panel.reference-compact .reference-header {
          flex-direction: column;
          gap: 10px;
        }

        .reference-summary-grid {
          grid-template-columns: 1fr;
        }

        .reference-profile-meta {
          flex-direction: column;
          gap: 3px;
        }

        .reference-profile-meta span + span::before {
          display: none;
        }

        .reference-delta-bar {
          align-items: flex-start;
          flex-wrap: wrap;
        }

        .reference-delta-badge {
          margin-left: 31px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function shortGpuName(name) {
    return String(name || "—")
      .replace("NVIDIA GeForce ", "")
      .replace("AMD Radeon ", "");
  }

  function profileRtLabel(rt, fr) {
    if (rt === "off") return fr ? "Ray tracing désactivé" : "Ray tracing off";
    if (rt === "path") return "Path Tracing";
    if (rt === "ultra") return "Ray tracing Ultra";
    return fr ? "Ray tracing moyen" : "Ray tracing medium";
  }

  function profileUpscalingLabel(reference, fr) {
    if (reference.upscalingKnown === false) return fr ? "Upscaling non précisé" : "Upscaling not specified";
    if (!reference.upscaling || reference.upscaling === "native") return fr ? "Upscaling désactivé" : "Upscaling off";
    return UPSCALERS[reference.upscaling]?.label || reference.upscaling;
  }

  function hardwareDelta(result) {
    const combined = result.gpuRatioRaw * 0.68 + result.cpuRatioRaw * 0.32;
    return Math.round((combined - 1) * 100);
  }

  function ensureSummaryMarkup(panel) {
    let summary = panel.querySelector(".reference-summary");
    if (summary) return summary;

    summary = document.createElement("div");
    summary.className = "reference-summary";
    summary.innerHTML = `
      <div class="reference-summary-grid">
        <article class="reference-summary-card reference-profile-card">
          <span id="reference-profile-label">OFFICIAL PROFILE</span>
          <div class="reference-summary-primary"><i></i><strong id="reference-profile-name">—</strong></div>
          <div class="reference-profile-meta">
            <span id="reference-profile-target">—</span>
            <span id="reference-profile-rt">—</span>
            <span id="reference-profile-upscaling">—</span>
          </div>
        </article>
        <article class="reference-summary-card reference-hardware-card">
          <span id="reference-hardware-card-label">REFERENCE PC</span>
          <div class="reference-hardware-list">
            <div class="reference-hardware-row"><i></i><b>GPU</b><strong id="reference-summary-gpu">—</strong></div>
            <div class="reference-hardware-row"><i></i><b>CPU</b><strong id="reference-summary-cpu">—</strong></div>
            <div class="reference-hardware-row"><i></i><b>RAM</b><strong id="reference-summary-ram">—</strong></div>
            <div class="reference-hardware-row"><i></i><b id="reference-storage-label">STORAGE</b><strong id="reference-summary-storage">—</strong></div>
          </div>
        </article>
      </div>
      <div class="reference-delta-bar" id="reference-delta-bar">
        <span class="reference-delta-icon">↗</span>
        <span class="reference-delta-badge" id="reference-delta-badge">—</span>
        <span id="reference-delta-copy">—</span>
      </div>
    `;

    panel.appendChild(summary);
    return summary;
  }

  function applyCompactReference(result = state.lastResult) {
    const panel = byId("official-reference");
    if (!panel) return;

    panel.classList.add("reference-compact");
    const fr = state.language === "fr";

    const kicker = panel.querySelector('[data-i18n="officialReference"]');
    const title = panel.querySelector('[data-i18n="closestAnchor"]');
    const sourceLabel = panel.querySelector('[data-i18n="openOfficialSource"]');

    if (kicker) kicker.textContent = fr ? "BASE OFFICIELLE" : "OFFICIAL BASIS";
    if (title) title.textContent = fr ? "Basé sur les recommandations du développeur" : "Based on the developer's recommendations";
    if (sourceLabel) sourceLabel.textContent = fr ? "Voir la source officielle ↗" : "View official source ↗";

    ensureSummaryMarkup(panel);
    if (!result) return;

    const reference = result.reference;
    byId("reference-profile-label").textContent = fr ? "PROFIL OFFICIEL" : "OFFICIAL PROFILE";
    byId("reference-hardware-card-label").textContent = fr ? "CONFIGURATION DE RÉFÉRENCE" : "REFERENCE PC";
    byId("reference-storage-label").textContent = fr ? "STOCKAGE" : "STORAGE";
    byId("reference-profile-name").textContent = reference.name;
    byId("reference-profile-target").textContent = `${RESOLUTIONS[reference.resolution].label} · ${reference.fps} FPS`;
    byId("reference-profile-rt").textContent = profileRtLabel(reference.rt, fr);
    byId("reference-profile-upscaling").textContent = profileUpscalingLabel(reference, fr);
    byId("reference-summary-gpu").textContent = shortGpuName(result.refGpu.name);
    byId("reference-summary-cpu").textContent = result.refCpu.name;
    byId("reference-summary-ram").textContent = `${reference.ram} GB`;
    byId("reference-summary-storage").textContent = reference.storage.toUpperCase();

    const delta = hardwareDelta(result);
    const deltaBar = byId("reference-delta-bar");
    const deltaCopy = byId("reference-delta-copy");
    const deltaBadge = byId("reference-delta-badge");
    const deltaIcon = deltaBar?.querySelector(".reference-delta-icon");

    deltaBar?.classList.toggle("is-lower", delta < 0);
    if (deltaIcon) deltaIcon.textContent = delta < 0 ? "↘" : delta > 0 ? "↗" : "=";
    if (deltaBadge) deltaBadge.textContent = Math.abs(delta) < 4 ? "≈ 0%" : `${delta > 0 ? "+" : "−"}${Math.abs(delta)}%`;

    if (deltaCopy) {
      if (Math.abs(delta) < 4) {
        deltaCopy.innerHTML = fr
          ? "Votre matériel est estimé à un niveau <strong>proche de cette configuration de référence</strong>."
          : "Your hardware is estimated to be <strong>close to this reference PC</strong>.";
      } else if (delta > 0) {
        deltaCopy.innerHTML = fr
          ? "Votre matériel est estimé <strong>au-dessus</strong> de cette configuration de référence."
          : "Your hardware is estimated to be <strong>above</strong> this reference PC.";
      } else {
        deltaCopy.innerHTML = fr
          ? "Votre matériel est estimé <strong>en dessous</strong> de cette configuration de référence."
          : "Your hardware is estimated to be <strong>below</strong> this reference PC.";
      }
    }
  }

  ensureCompactReferenceStyles();

  const previousRenderPerformance = renderPerformance;
  renderPerformance = function renderPerformanceWithCompactReference(result) {
    previousRenderPerformance(result);
    applyCompactReference(result);
  };

  const previousApplyLanguage = applyLanguage;
  applyLanguage = function applyLanguageWithCompactReference(language, rerender = true) {
    previousApplyLanguage(language, rerender);
    applyCompactReference(state.lastResult);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => setTimeout(() => applyCompactReference(state.lastResult), 0));
  } else {
    setTimeout(() => applyCompactReference(state.lastResult), 0);
  }
})();