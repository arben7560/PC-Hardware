/* FrameForge V3 — performance-aware influence / constraint wording */
(() => {
  function performanceContext(result) {
    const target = Number(byId("target-fps")?.value || 0);
    const fps = Number(result.fps || 0);
    const low = Number(result.low || 0);
    const targetRatio = target > 0 ? fps / target : 1;

    // The wording is intentionally driven first by the actual experience,
    // not only by whether an arbitrary FPS target is reached.
    if (fps >= 120 && low >= 75) return { tier: "excellent", target, targetRatio };
    if (fps >= 90 && low >= 55) return { tier: "veryGood", target, targetRatio };
    if (fps >= 60 && low >= 40) return { tier: "good", target, targetRatio };
    if (fps >= 45 && low >= 30) return { tier: "fair", target, targetRatio };
    if (fps >= 30) return { tier: "limited", target, targetRatio };
    return { tier: "critical", target, targetRatio };
  }

  function componentNames(result, fr) {
    const dominant = result.bottleneck === "cpu" ? "CPU" : result.bottleneck === "gpu" ? "GPU" : null;
    const part = dominant === "CPU"
      ? (fr ? "Le processeur" : "The processor")
      : dominant === "GPU"
        ? (fr ? "La carte graphique" : "The graphics card")
        : null;
    return { dominant, part };
  }

  function constraintCopy(result) {
    const fr = state.language === "fr";
    const context = performanceContext(result);
    const { dominant, part } = componentNames(result, fr);
    const targetMet = context.target > 0 && result.fps >= context.target;
    const targetNear = context.target > 0 && result.fps >= context.target * 0.9;

    // Memory and storage can affect consistency even when average FPS is high.
    // Keep the warning factual without automatically presenting the whole PC as limited.
    if (result.bottleneck === "memory") {
      const severe = Number(result.vramPressure || 0) > 105 || context.tier === "limited" || context.tier === "critical";
      return {
        mode: severe ? "limited" : "watch",
        meterTitle: fr ? "PROFIL CPU / GPU" : "CPU / GPU PROFILE",
        meterCaption: fr
          ? "Le CPU et le GPU restent lisibles séparément ; la mémoire vidéo mérite surtout votre attention sur ce scénario."
          : "CPU and GPU are shown separately; video memory is the main thing worth watching in this scenario.",
        boxLabel: fr ? "POINT À SURVEILLER" : "THING TO WATCH",
        verdictLabel: fr ? "Point à surveiller" : "Thing to watch",
        title: severe
          ? (fr ? "Mémoire vidéo sous forte pression" : "Video memory under heavy pressure")
          : (fr ? "Mémoire vidéo très sollicitée" : "Video memory heavily used"),
        description: severe
          ? (fr
            ? "La VRAM peut affecter la régularité ou provoquer des baisses dans les scènes les plus lourdes."
            : "VRAM pressure may hurt consistency or cause drops in the heaviest scenes.")
          : (fr
            ? "La VRAM est fortement utilisée, mais les performances moyennes restent bonnes. Surveillez surtout les 1% low et les éventuelles saccades."
            : "VRAM usage is high, but average performance remains good. The main things to watch are 1% lows and possible stutter."),
        score: severe ? (fr ? "ÉLEVÉ" : "HIGH") : (fr ? "À SURVEILLER" : "WATCH")
      };
    }

    if (result.bottleneck === "storage") {
      const severe = context.tier === "limited" || context.tier === "critical";
      return {
        mode: severe ? "limited" : "watch",
        meterTitle: fr ? "PROFIL CPU / GPU" : "CPU / GPU PROFILE",
        meterCaption: fr
          ? "Le CPU et le GPU ne ressortent pas comme le problème principal ; le stockage peut surtout jouer sur la régularité."
          : "CPU and GPU do not stand out as the main issue; storage can mainly affect consistency.",
        boxLabel: fr ? "POINT À SURVEILLER" : "THING TO WATCH",
        verdictLabel: fr ? "Point à surveiller" : "Thing to watch",
        title: fr ? "Le stockage peut affecter la régularité" : "Storage may affect consistency",
        description: fr
          ? "Les FPS moyens peuvent rester corrects ou élevés, mais un stockage lent peut provoquer des chargements et des à-coups plus visibles."
          : "Average FPS can remain decent or high, but slow storage may cause more visible loading delays and stutter.",
        score: severe ? (fr ? "ÉLEVÉ" : "HIGH") : (fr ? "À SURVEILLER" : "WATCH")
      };
    }

    if (!dominant || result.bottleneck === "balanced") {
      const isStrong = context.tier === "excellent" || context.tier === "veryGood" || context.tier === "good";
      return {
        mode: isStrong ? "healthy" : "balanced",
        meterTitle: fr ? "RÉPARTITION DE LA CHARGE" : "WORKLOAD DISTRIBUTION",
        meterCaption: fr
          ? "Le travail est bien réparti entre le processeur et la carte graphique sur ce scénario."
          : "The workload is well distributed between the processor and graphics card in this scenario.",
        boxLabel: fr ? "PROFIL MATÉRIEL" : "HARDWARE PROFILE",
        verdictLabel: fr ? "Profil matériel" : "Hardware profile",
        title: fr ? "Configuration bien équilibrée" : "Well-balanced configuration",
        description: isStrong
          ? (fr
            ? "Aucun composant ne ressort comme un frein notable à ce niveau de performances."
            : "No component stands out as a meaningful performance brake at this performance level.")
          : (fr
            ? "CPU et GPU sont assez proches dans leur contribution. Les réglages globaux comptent davantage qu'un seul composant."
            : "CPU and GPU contribute at similar levels. Overall settings matter more than one single component."),
        score: isStrong ? (fr ? "TRÈS BON" : "VERY GOOD") : (fr ? "ÉQUILIBRÉ" : "BALANCED")
      };
    }

    // At 90+ FPS, a dominant component is not described as a "constraint".
    // It simply carries more of the workload or defines the theoretical ceiling.
    if (context.tier === "excellent" || context.tier === "veryGood") {
      return {
        mode: "healthy",
        meterTitle: fr ? "RÉPARTITION DE LA CHARGE" : "WORKLOAD DISTRIBUTION",
        meterCaption: fr
          ? `${part} porte la plus grande part du travail sur ce scénario, ce qui est normal à ce niveau de performances.`
          : `${part} carries most of the workload in this scenario, which is normal at this performance level.`,
        boxLabel: fr ? "COMPOSANT LE PLUS SOLLICITÉ" : "MOST UTILIZED COMPONENT",
        verdictLabel: fr ? "Profil de charge" : "Workload profile",
        title: dominant === "GPU"
          ? (fr ? "La carte graphique est pleinement exploitée" : "The graphics card is being fully utilized")
          : (fr ? "Le processeur porte davantage la charge" : "The processor carries more of the workload"),
        description: fr
          ? `${part} influence surtout le plafond maximal de FPS. Avec ${Math.round(result.fps)} FPS estimés, cela décrit la répartition du travail plutôt qu'une faiblesse du PC.`
          : `${part} mainly influences the maximum FPS ceiling. At an estimated ${Math.round(result.fps)} FPS, this describes workload distribution rather than a weakness in the PC.`,
        score: context.tier === "excellent" ? (fr ? "EXCELLENT" : "EXCELLENT") : (fr ? "TRÈS BON" : "VERY GOOD")
      };
    }

    // 60–89 FPS is still a comfortable gaming result. Explain what shapes the
    // result, without using "limit" unless the experience itself is degraded.
    if (context.tier === "good") {
      return {
        mode: "healthy",
        meterTitle: fr ? "RÉPARTITION DE LA CHARGE" : "WORKLOAD DISTRIBUTION",
        meterCaption: fr
          ? `${part} contribue davantage au plafond de performances sur ce scénario.`
          : `${part} contributes more to the performance ceiling in this scenario.`,
        boxLabel: fr ? "FACTEUR DOMINANT" : "DOMINANT FACTOR",
        verdictLabel: fr ? "Facteur dominant" : "Dominant factor",
        title: dominant === "GPU"
          ? (fr ? "La charge repose surtout sur le GPU" : "The workload is mainly GPU-driven")
          : (fr ? "La charge repose davantage sur le CPU" : "The workload is more CPU-driven"),
        description: targetMet
          ? (fr
            ? "Votre objectif est atteint. Ce composant devient surtout important si vous cherchez davantage de marge ou un framerate encore plus élevé."
            : "Your target is met. This component mainly matters if you want more headroom or an even higher frame rate.")
          : (fr
            ? `Le jeu reste fluide à environ ${Math.round(result.fps)} FPS. Pour se rapprocher de votre objectif, c'est le composant qui offrirait le plus de marge supplémentaire.`
            : `The game remains smooth at around ${Math.round(result.fps)} FPS. To get closer to your target, this component offers the most room for improvement.`),
        score: fr ? "BON" : "GOOD"
      };
    }

    // 45–59 FPS: introduce mild friction language, but still avoid calling the
    // whole PC "limited" when the experience remains broadly usable.
    if (context.tier === "fair") {
      return {
        mode: "watch",
        meterTitle: fr ? "RÉPARTITION DE L'EFFORT" : "PERFORMANCE PRESSURE",
        meterCaption: fr
          ? `${part} est le premier facteur à optimiser si vous voulez gagner des FPS.`
          : `${part} is the first factor to optimize if you want more FPS.`,
        boxLabel: fr ? "POINT À OPTIMISER" : "FIRST THING TO OPTIMIZE",
        verdictLabel: fr ? "Point à optimiser" : "First thing to optimize",
        title: dominant === "GPU"
          ? (fr ? "Le GPU est le premier levier de performance" : "The GPU is the first performance lever")
          : (fr ? "Le CPU est le premier levier de performance" : "The CPU is the first performance lever"),
        description: targetNear
          ? (fr
            ? "Votre objectif est proche. Quelques ajustements ciblés peuvent suffire sans changer de matériel."
            : "Your target is close. A few targeted settings changes may be enough without changing hardware.")
          : (fr
            ? "Les performances restent utilisables, mais ce composant est le premier à considérer pour augmenter nettement le framerate."
            : "Performance remains usable, but this component is the first one to consider for a meaningful frame-rate increase."),
        score: fr ? "À OPTIMISER" : "OPTIMIZE"
      };
    }

    // Below ~45 FPS, "limit" becomes appropriate because the hardware factor is
    // now materially affecting the experience, not merely defining the ceiling.
    return {
      mode: "limited",
      meterTitle: fr ? "RÉPARTITION DE LA LIMITE" : "LIMITING FACTOR BALANCE",
      meterCaption: fr
        ? `${part} est actuellement le principal facteur qui freine les performances sur ce scénario.`
        : `${part} is currently the main factor holding performance back in this scenario.`,
      boxLabel: fr ? "LIMITE PRINCIPALE" : "MAIN LIMIT",
      verdictLabel: fr ? "Limite principale" : "Primary limit",
      title: dominant === "CPU"
        ? (fr ? "Le processeur limite réellement ce scénario" : "The processor is materially limiting this scenario")
        : (fr ? "La carte graphique limite réellement ce scénario" : "The graphics card is materially limiting this scenario"),
      description: dominant === "CPU"
        ? (fr
          ? "Le processeur réduit ici le framerate disponible et le gain qu'une carte graphique plus rapide pourrait apporter."
          : "The processor is reducing available frame rate and how much extra performance a faster graphics card could deliver.")
        : (fr
          ? "La carte graphique n'a plus assez de marge pour maintenir une fluidité élevée avec ces réglages."
          : "The graphics card no longer has enough headroom to maintain high smoothness with these settings."),
      score: context.tier === "critical" ? (fr ? "FORT" : "HIGH") : (fr ? "LIMITANT" : "LIMITING")
    };
  }

  function technicalSectionCopy(result, copy) {
    const fr = state.language === "fr";
    const context = performanceContext(result);

    if (copy.mode === "limited") {
      return {
        kicker: fr ? "CE QUI INFLUENCE LES PERFORMANCES" : "WHAT SHAPES PERFORMANCE",
        title: fr ? "Ce qui limite votre PC ici" : "What is limiting your PC here",
        detail: fr
          ? "Les charges ci-dessous montrent le composant qui freine réellement le framerate dans ce scénario."
          : "The loads below show which component is materially holding frame rate back in this scenario."
      };
    }

    if (copy.mode === "watch") {
      return {
        kicker: fr ? "CE QUI INFLUENCE LES PERFORMANCES" : "WHAT SHAPES PERFORMANCE",
        title: fr ? "Ce qu'il faut surveiller sur ce scénario" : "What to watch in this scenario",
        detail: fr
          ? "Le jeu reste exploitable ; ces indicateurs montrent surtout où se trouve la prochaine marge d'amélioration."
          : "The game remains usable; these indicators mainly show where the next performance headroom can come from."
      };
    }

    if (context.tier === "excellent" || context.tier === "veryGood") {
      return {
        kicker: fr ? "CE QUI INFLUENCE LES PERFORMANCES" : "WHAT SHAPES PERFORMANCE",
        title: fr ? "Comment votre PC répartit la charge" : "How your PC distributes the workload",
        detail: fr
          ? "À ce niveau de fluidité, on parle de répartition du travail entre les composants, pas d'une limitation préoccupante."
          : "At this level of smoothness, this is about workload distribution between components, not a concerning limitation."
      };
    }

    return {
      kicker: fr ? "CE QUI INFLUENCE LES PERFORMANCES" : "WHAT SHAPES PERFORMANCE",
      title: fr ? "Ce qui façonne vos performances" : "What shapes your performance",
      detail: fr
        ? "CPU, GPU et mémoire ne contribuent pas de la même façon selon la résolution et les réglages sélectionnés."
        : "CPU, GPU and memory do not contribute in the same way at every resolution and settings combination."
    };
  }

  function applyConstraintSemantics(result = state.lastResult) {
    if (!result) return;
    const copy = constraintCopy(result);
    const technical = technicalSectionCopy(result, copy);

    const kicker = byId("ff-bottleneck-kicker");
    const caption = byId("ff-bottleneck-caption");
    const title = byId("bottleneck-title");
    const description = byId("bottleneck-description");
    const score = byId("bottleneck-score");
    const verdictLimit = byId("verdict-limit");
    const verdictLimitLabel = byId("verdict-limit-label");
    const bottleneckLabel = document.querySelector(".bottleneck-box .bottleneck-label");

    if (kicker) kicker.textContent = copy.meterTitle;
    if (caption) caption.textContent = copy.meterCaption;
    if (title) title.textContent = copy.title;
    if (description) description.textContent = copy.description;
    if (score) score.textContent = copy.score;
    if (verdictLimit) verdictLimit.textContent = copy.title;
    if (verdictLimitLabel) verdictLimitLabel.textContent = copy.verdictLabel;
    if (bottleneckLabel) bottleneckLabel.textContent = copy.boxLabel;

    const technicalKicker = byId("technical-kicker");
    const technicalTitle = byId("technical-title");
    const technicalCopy = byId("technical-copy");
    if (technicalKicker) technicalKicker.textContent = technical.kicker;
    if (technicalTitle) technicalTitle.textContent = technical.title;
    if (technicalCopy) technicalCopy.textContent = technical.detail;

    // Expose the semantic state to CSS / future UI modules without coupling the
    // calculation engine to presentation wording.
    const performanceGrid = document.querySelector("#performance .performance-grid");
    if (performanceGrid) performanceGrid.dataset.performanceSemantics = copy.mode;
  }

  const previousRenderPerformance = renderPerformance;
  renderPerformance = function renderPerformanceWithConstraintSemantics(result) {
    previousRenderPerformance(result);
    applyConstraintSemantics(result);
  };

  const previousApplyLanguage = applyLanguage;
  applyLanguage = function applyLanguageWithConstraintSemantics(language, rerender = true) {
    previousApplyLanguage(language, rerender);
    setTimeout(() => applyConstraintSemantics(state.lastResult), 0);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => setTimeout(() => applyConstraintSemantics(state.lastResult), 0));
  } else {
    setTimeout(() => applyConstraintSemantics(state.lastResult), 0);
  }
})();
