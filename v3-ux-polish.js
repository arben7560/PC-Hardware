(() => {
  const uxText = (en, fr) => (state.language === "fr" ? fr : en);

  function ensurePolishStyles() {
    if (document.querySelector('link[data-frameforge-ux-polish]')) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "v3-ux-polish.css";
    link.dataset.frameforgeUxPolish = "true";
    document.head.appendChild(link);
  }

  function enhanceReferenceRatios() {
    const articles = $$(".ratio-grid article").slice(0, 3);
    if (!articles.length) return;

    const help = [
      {
        en: "Compares your GPU's modeled rendering capability with the GPU used by the official developer reference. 1.00× means roughly equivalent modeled capability.",
        fr: "Compare la capacité de rendu modélisée de votre GPU avec le GPU de la référence officielle du développeur. 1,00× correspond à une capacité modélisée approximativement équivalente."
      },
      {
        en: "Compares your CPU's modeled gaming capacity with the CPU used by the official reference. 1.00× means roughly equivalent modeled gaming capacity.",
        fr: "Compare la capacité gaming modélisée de votre CPU avec le CPU utilisé par la référence officielle. 1,00× correspond à une capacité gaming modélisée approximativement équivalente."
      },
      {
        en: "Compares the effective rendering workload of your selected resolution and settings with the official target. Above 1.00× means a heavier workload.",
        fr: "Compare la charge de rendu effective de votre résolution et de vos réglages avec la cible officielle. Au-dessus de 1,00×, la charge est plus lourde."
      }
    ];

    articles.forEach((article, index) => {
      article.classList.add("ratio-explained");
      if (article.querySelector(".ratio-help-button")) return;

      const button = document.createElement("button");
      button.type = "button";
      button.className = "ratio-help-button";
      button.setAttribute("aria-label", "Explain this ratio");
      button.textContent = "?";

      const tooltip = document.createElement("span");
      tooltip.className = "ratio-help-tooltip";
      tooltip.setAttribute("role", "tooltip");
      tooltip.innerHTML = `
        <span class="ratio-help-copy ratio-help-copy-en">${help[index].en}</span>
        <span class="ratio-help-copy ratio-help-copy-fr">${help[index].fr}</span>
      `;

      article.append(button, tooltip);
    });
  }

  function ensurePriorityVerdict() {
    const panel = byId("performance");
    if (!panel || byId("priority-verdict")) return;

    const topline = panel.querySelector(".performance-topline");
    const performanceGrid = panel.querySelector(".performance-grid");
    const goalCard = panel.querySelector(".goal-card");
    const scenarioStrip = panel.querySelector(".scenario-strip");

    const verdict = document.createElement("section");
    verdict.id = "priority-verdict";
    verdict.className = "verdict-priority-card";
    verdict.innerHTML = `
      <div class="verdict-topline">
        <div>
          <span class="section-kicker" id="verdict-kicker">FRAMEFORGE VERDICT</span>
          <div class="verdict-target" id="verdict-target">—</div>
        </div>
        <div class="verdict-confidence-chip">
          <span id="verdict-confidence-label">Estimate confidence</span>
          <strong id="verdict-confidence">—</strong>
        </div>
      </div>

      <div class="verdict-main-row">
        <div class="verdict-number-block">
          <div class="verdict-fps-line"><strong id="verdict-fps">—</strong><span>FPS</span></div>
          <div class="verdict-status" id="verdict-status">—</div>
          <p class="verdict-summary" id="verdict-summary">—</p>
        </div>

        <div class="verdict-meta-grid">
          <div>
            <span id="verdict-range-label">Expected range</span>
            <strong id="verdict-range">—</strong>
          </div>
          <div>
            <span>1% LOW</span>
            <strong id="verdict-low">—</strong>
          </div>
          <div>
            <span id="verdict-limit-label">Primary limit</span>
            <strong id="verdict-limit">—</strong>
          </div>
        </div>
      </div>

      <div class="verdict-model-disclosure">
        <span class="verdict-model-dot"></span>
        <div>
          <strong id="verdict-modeled-title">MODELED ESTIMATE</strong>
          <small id="verdict-modeled-copy">Not a measured benchmark. Anchored to an official developer target.</small>
        </div>
        <button class="verdict-method-link" id="verdict-method-link" type="button">Methodology →</button>
      </div>
    `;

    if (topline) topline.insertAdjacentElement("afterend", verdict);
    else panel.prepend(verdict);

    if (goalCard) {
      goalCard.classList.add("goal-card-integrated");
      verdict.appendChild(goalCard);
    }

    if (performanceGrid && !panel.querySelector(".technical-breakdown-heading")) {
      const technicalHeading = document.createElement("div");
      technicalHeading.className = "analysis-tier-heading technical-breakdown-heading";
      technicalHeading.innerHTML = `
        <div>
          <span class="section-kicker" id="technical-kicker">TECHNICAL BREAKDOWN</span>
          <strong id="technical-title">Why this result</strong>
        </div>
        <small id="technical-copy">Loads, frame time and the first limiting factor.</small>
      `;
      performanceGrid.insertAdjacentElement("beforebegin", technicalHeading);
    }

    if (scenarioStrip && !panel.querySelector(".performance-profiles-heading")) {
      const profilesHeading = document.createElement("div");
      profilesHeading.className = "analysis-tier-heading performance-profiles-heading";
      profilesHeading.innerHTML = `
        <div>
          <span class="section-kicker" id="profiles-kicker">PERFORMANCE PROFILES</span>
          <strong id="profiles-title">Different strategies, not a quality ladder</strong>
        </div>
        <small id="profiles-copy">Each profile uses a different mix of quality, upscaling and frame generation.</small>
      `;
      scenarioStrip.insertAdjacentElement("beforebegin", profilesHeading);
    }

    byId("verdict-method-link")?.addEventListener("click", openMethodology);
  }

  function ensureBuilderPersistentCue() {
    const panel = document.querySelector(".builder-panel");
    if (!panel || panel.querySelector(".builder-persistent-cue")) return;

    const cue = document.createElement("div");
    cue.className = "builder-persistent-cue";
    cue.innerHTML = `<span></span><strong id="builder-persistent-copy">CURRENT CONFIGURATION · LIVE CONTROLS</strong>`;
    const intro = panel.querySelector(".panel-intro");
    if (intro) intro.insertAdjacentElement("beforebegin", cue);
    else panel.prepend(cue);
  }

  function ensureSecondaryDisclosure() {
    const lowerGrid = byId("upgrade");
    if (!lowerGrid || lowerGrid.closest(".secondary-disclosure")) return;

    const details = document.createElement("details");
    details.className = "secondary-disclosure";
    details.id = "upgrade-disclosure";

    const summary = document.createElement("summary");
    summary.innerHTML = `
      <div>
        <span class="section-kicker" id="secondary-kicker">DECISION LAYER</span>
        <strong id="secondary-title">Upgrade & market insights</strong>
        <small id="secondary-copy">Optional guidance once you understand the performance result.</small>
      </div>
      <span class="secondary-disclosure-action" id="secondary-action">Explore</span>
    `;

    lowerGrid.insertAdjacentElement("beforebegin", details);
    details.append(summary, lowerGrid);

    const upgradeNav = document.querySelector('a[href="#upgrade"]');
    if (upgradeNav && !upgradeNav.dataset.uxDisclosureWired) {
      upgradeNav.dataset.uxDisclosureWired = "true";
      upgradeNav.addEventListener("click", () => {
        details.open = true;
      });
    }

    details.addEventListener("toggle", syncUxCopy);
  }

  function scenarioLabel(selector, text) {
    const el = document.querySelector(selector);
    if (el) el.textContent = text;
  }

  function syncUxCopy() {
    const fr = state.language === "fr";

    const copy = {
      "verdict-kicker": fr ? "VERDICT FRAMEFORGE" : "FRAMEFORGE VERDICT",
      "verdict-confidence-label": fr ? "Confiance de l'estimation" : "Estimate confidence",
      "verdict-range-label": fr ? "Plage estimée" : "Expected range",
      "verdict-limit-label": fr ? "Limite principale" : "Primary limit",
      "verdict-modeled-title": fr ? "ESTIMATION MODÉLISÉE" : "MODELED ESTIMATE",
      "verdict-modeled-copy": fr
        ? "Ce n'est pas un benchmark mesuré. L'estimation est ancrée sur une cible officielle du développeur."
        : "Not a measured benchmark. Anchored to an official developer target.",
      "verdict-method-link": fr ? "Méthodologie →" : "Methodology →",
      "technical-kicker": fr ? "DÉCOMPOSITION TECHNIQUE" : "TECHNICAL BREAKDOWN",
      "technical-title": fr ? "Pourquoi ce résultat" : "Why this result",
      "technical-copy": fr
        ? "Charges, temps par image et premier facteur limitant."
        : "Loads, frame time and the first limiting factor.",
      "profiles-kicker": fr ? "PROFILS DE PERFORMANCE" : "PERFORMANCE PROFILES",
      "profiles-title": fr ? "Des stratégies différentes, pas une échelle de qualité" : "Different strategies, not a quality ladder",
      "profiles-copy": fr
        ? "Chaque profil combine différemment qualité, upscaling et Frame Generation."
        : "Each profile uses a different mix of quality, upscaling and frame generation.",
      "builder-persistent-copy": fr ? "CONFIGURATION ACTIVE · CONTRÔLES DIRECTS" : "CURRENT CONFIGURATION · LIVE CONTROLS",
      "secondary-kicker": fr ? "AIDE À LA DÉCISION" : "DECISION LAYER",
      "secondary-title": fr ? "Améliorations & marché" : "Upgrade & market insights",
      "secondary-copy": fr
        ? "Conseils optionnels une fois le résultat de performances compris."
        : "Optional guidance once you understand the performance result.",
      "secondary-action": fr
        ? (byId("upgrade-disclosure")?.open ? "Réduire" : "Explorer")
        : (byId("upgrade-disclosure")?.open ? "Collapse" : "Explore")
    };

    Object.entries(copy).forEach(([id, value]) => {
      const el = byId(id);
      if (el) el.textContent = value;
    });

    scenarioLabel('[data-i18n="scenarioNative"]', fr ? "Rendu natif" : "Native rendering");
    scenarioLabel('[data-i18n="scenarioRecommended"]', fr ? "Profil équilibré" : "Balanced setup");
    scenarioLabel('[data-i18n="scenarioHighRefresh"]', fr ? "Profil performance" : "Performance setup");
    scenarioLabel('[data-i18n="scenarioMaxVisuals"]', fr ? "Qualité visuelle" : "Visual quality");

    const nativeDetail = document.querySelector('[data-i18n="nativeDetail"]');
    if (nativeDetail) {
      nativeDetail.textContent = fr
        ? "Preset actuel · sans upscaling ni Frame Generation"
        : "Current preset · no upscaling or frame generation";
    }

    $$(".ratio-help-button").forEach((button) => {
      button.setAttribute("aria-label", fr ? "Expliquer ce ratio" : "Explain this ratio");
    });
  }

  function updatePriorityVerdict(result) {
    const target = Number(byId("target-fps").value);
    const fps = Math.max(1, round(result.fps));
    const low = Math.max(1, round(result.low));
    const spreadPercent = clamp(
      0.07 + (100 - result.referenceMatch) / 420 + (96 - result.confidence) / 450,
      0.07,
      0.23
    );
    const rangeLow = Math.max(1, round(result.fps * (1 - spreadPercent)));
    const rangeHigh = Math.max(rangeLow, round(result.fps * (1 + spreadPercent)));
    const delta = round(result.fps - target);
    const fr = state.language === "fr";

    const presetLabel = t(result.presetKey === "high" ? "high" : result.presetKey);
    const resLabel = RESOLUTIONS[result.resolutionKey].label;
    const rtLabel = result.rtKey === "off"
      ? (fr ? "RT désactivé" : "RT off")
      : result.rtKey === "path"
        ? "Path Tracing"
        : result.rtKey === "ultra"
          ? "RT Ultra"
          : (fr ? "RT moyen" : "RT medium");

    byId("verdict-target").textContent = fr
      ? `${resLabel} · ${presetLabel} · objectif ${target} FPS · ${rtLabel}`
      : `${resLabel} · ${presetLabel} · ${target} FPS target · ${rtLabel}`;
    byId("verdict-fps").textContent = fps;
    byId("verdict-confidence").textContent = `${round(result.confidence)}%`;
    byId("verdict-range").textContent = `${rangeLow}–${rangeHigh} FPS`;
    byId("verdict-low").textContent = `${low} FPS`;
    byId("verdict-limit").textContent = byId("bottleneck-title")?.textContent || "—";

    let tone = "miss";
    let status = fr ? "Sous votre objectif" : "Below your target";
    let summary = fr
      ? `Il manque environ ${Math.abs(delta)} FPS à l'objectif sélectionné.`
      : `About ${Math.abs(delta)} FPS short of the selected target.`;

    if (result.fps >= target) {
      tone = "met";
      status = fr ? "Objectif atteint" : "Target reached";
      summary = fr
        ? `Marge estimée de +${Math.max(0, delta)} FPS au-dessus de votre objectif.`
        : `Estimated headroom of +${Math.max(0, delta)} FPS above your target.`;
    } else if (result.fps >= target * 0.9) {
      tone = "near";
      status = fr ? "Objectif presque atteint" : "Target nearly reached";
      summary = fr
        ? `Seulement ${Math.abs(delta)} FPS séparent l'estimation de votre objectif.`
        : `Only ${Math.abs(delta)} FPS separate the estimate from your target.`;
    }

    const card = byId("priority-verdict");
    card?.classList.remove("is-met", "is-near", "is-miss");
    card?.classList.add(`is-${tone}`);
    byId("verdict-status").textContent = status;
    byId("verdict-summary").textContent = summary;
  }

  ensurePolishStyles();

  const originalEnsureReferencePanel = ensureReferencePanel;
  ensureReferencePanel = function ensureReferencePanelWithUx() {
    originalEnsureReferencePanel();
    enhanceReferenceRatios();
  };

  const originalRenderPerformance = renderPerformance;
  renderPerformance = function renderPerformanceWithUx(result) {
    originalRenderPerformance(result);
    ensurePriorityVerdict();
    ensureBuilderPersistentCue();
    ensureSecondaryDisclosure();
    enhanceReferenceRatios();
    syncUxCopy();
    updatePriorityVerdict(result);
  };
})();
