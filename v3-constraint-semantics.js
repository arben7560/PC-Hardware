/* FrameForge V3 — performance-aware influence / constraint wording */
(() => {
  function performanceContext(result) {
    const target = Number(byId("target-fps")?.value || 0);
    const fps = Number(result.fps || 0);
    const low = Number(result.low || 0);
    const targetRatio = target > 0 ? fps / target : 1;

    if (fps >= 120 && low >= 75) return { tier: "excellent", target, targetRatio };
    if (fps >= 90 && low >= 55) return { tier: "veryGood", target, targetRatio };
    if (fps >= 60 && low >= 40) return { tier: "good", target, targetRatio };
    if (fps >= 45 && low >= 30) return { tier: "fair", target, targetRatio };
    if (fps >= 30) return { tier: "limited", target, targetRatio };
    return { tier: "critical", target, targetRatio };
  }

  function workloadShares(result) {
    const gpuPressure = clamp(result.renderedFps / Math.max(result.gpuCeiling, 1), 0.05, 1.2);
    const cpuPressure = clamp(result.renderedFps / Math.max(result.cpuCeiling, 1), 0.05, 1.2);
    const gpuWeight = gpuPressure * gpuPressure;
    const cpuWeight = cpuPressure * cpuPressure;
    const total = Math.max(gpuWeight + cpuWeight, 0.01);
    let gpu = Math.round((gpuWeight / total) * 100);
    gpu = clamp(gpu, 5, 95);
    return { gpu, cpu: 100 - gpu };
  }

  function componentNames(result, fr) {
    const shares = workloadShares(result);
    const dominant = shares.gpu >= shares.cpu ? "GPU" : "CPU";
    const part = dominant === "CPU"
      ? (fr ? "Le processeur" : "The processor")
      : (fr ? "La carte graphique" : "The graphics card");
    const share = dominant === "GPU" ? shares.gpu : shares.cpu;
    const otherShare = 100 - share;
    return { dominant, part, share, otherShare, shares };
  }

  function workloadSemantic(dominant, share, fr) {
    const isGpu = dominant === "GPU";

    if (share <= 54) {
      return {
        title: fr ? "Charge presque équilibrée entre CPU et GPU" : "CPU and GPU workload is nearly balanced",
        caption: fr
          ? "Le processeur et la carte graphique contribuent presque à parts égales sur ce scénario."
          : "The processor and graphics card contribute almost equally in this scenario.",
        boxLabel: fr ? "RÉPARTITION DE LA CHARGE" : "WORKLOAD BALANCE"
      };
    }

    if (share <= 64) {
      return {
        title: isGpu
          ? (fr ? "La carte graphique est légèrement plus sollicitée" : "The graphics card is slightly more involved")
          : (fr ? "Le processeur est légèrement plus sollicité" : "The processor is slightly more involved"),
        caption: fr
          ? `${isGpu ? "La carte graphique" : "Le processeur"} prend une part un peu plus importante du travail, sans déséquilibre marqué.`
          : `${isGpu ? "The graphics card" : "The processor"} takes a slightly larger share of the work, without a pronounced imbalance.`,
        boxLabel: fr ? "COMPOSANT LE PLUS SOLLICITÉ" : "MOST INVOLVED COMPONENT"
      };
    }

    if (share <= 79) {
      return {
        title: isGpu
          ? (fr ? "La charge repose majoritairement sur le GPU" : "The workload is mostly GPU-driven")
          : (fr ? "La charge repose majoritairement sur le CPU" : "The workload is mostly CPU-driven"),
        caption: fr
          ? `${isGpu ? "La carte graphique" : "Le processeur"} porte la majorité du travail sur ce scénario.`
          : `${isGpu ? "The graphics card" : "The processor"} carries most of the workload in this scenario.`,
        boxLabel: fr ? "COMPOSANT DOMINANT" : "DOMINANT COMPONENT"
      };
    }

    return {
      title: isGpu
        ? (fr ? "La charge est fortement orientée GPU" : "The workload is strongly GPU-oriented")
        : (fr ? "La charge est fortement orientée CPU" : "The workload is strongly CPU-oriented"),
      caption: fr
        ? `${isGpu ? "La carte graphique" : "Le processeur"} concentre une large majorité du travail sur ce scénario.`
        : `${isGpu ? "The graphics card" : "The processor"} carries a large majority of the workload in this scenario.`,
      boxLabel: fr ? "COMPOSANT DOMINANT" : "DOMINANT COMPONENT"
    };
  }

  function constraintCopy(result) {
    const fr = state.language === "fr";
    const context = performanceContext(result);
    const { dominant, part, share, otherShare } = componentNames(result, fr);
    const workload = workloadSemantic(dominant, share, fr);
    const targetMet = context.target > 0 && result.fps >= context.target;
    const targetNear = context.target > 0 && result.fps >= context.target * 0.9;

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

    if (result.bottleneck === "balanced" || Math.abs(share - otherShare) <= 8) {
      const isStrong = context.tier === "excellent" || context.tier === "veryGood" || context.tier === "good";
      return {
        mode: isStrong ? "healthy" : "balanced",
        meterTitle: fr ? "RÉPARTITION DE LA CHARGE" : "WORKLOAD DISTRIBUTION",
        meterCaption: workload.caption,
        boxLabel: fr ? "PROFIL MATÉRIEL" : "HARDWARE PROFILE",
        verdictLabel: fr ? "Profil matériel" : "Hardware profile",
        title: workload.title,
        description: isStrong
          ? (fr
            ? `La répartition ${Math.max(share, otherShare)}/${Math.min(share, otherShare)} reste très homogène. Aucun composant ne ressort comme un frein notable à ${Math.round(result.fps)} FPS.`
            : `The ${Math.max(share, otherShare)}/${Math.min(share, otherShare)} split remains very even. No component stands out as a meaningful brake at ${Math.round(result.fps)} FPS.`)
          : (fr
            ? "CPU et GPU sont assez proches dans leur contribution. Les réglages globaux comptent davantage qu'un seul composant."
            : "CPU and GPU contribute at similar levels. Overall settings matter more than one single component."),
        score: isStrong ? (fr ? "TRÈS BON" : "VERY GOOD") : (fr ? "ÉQUILIBRÉ" : "BALANCED")
      };
    }

    if (context.tier === "excellent" || context.tier === "veryGood") {
      return {
        mode: "healthy",
        meterTitle: fr ? "RÉPARTITION DE LA CHARGE" : "WORKLOAD DISTRIBUTION",
        meterCaption: workload.caption,
        boxLabel: workload.boxLabel,
        verdictLabel: fr ? "Profil de charge" : "Workload profile",
        title: workload.title,
        description: fr
          ? `La jauge attribue environ ${share}% de la charge au ${dominant} contre ${otherShare}% à l'autre composant. À ${Math.round(result.fps)} FPS estimés, cela indique surtout quel composant contribue le plus au plafond de performances, pas qu'il est saturé.`
          : `The gauge assigns about ${share}% of the workload to the ${dominant} versus ${otherShare}% to the other component. At an estimated ${Math.round(result.fps)} FPS, this mainly shows which component contributes more to the performance ceiling, not that it is saturated.`,
        score: context.tier === "excellent" ? (fr ? "EXCELLENT" : "EXCELLENT") : (fr ? "TRÈS BON" : "VERY GOOD")
      };
    }

    if (context.tier === "good") {
      return {
        mode: "healthy",
        meterTitle: fr ? "RÉPARTITION DE LA CHARGE" : "WORKLOAD DISTRIBUTION",
        meterCaption: workload.caption,
        boxLabel: workload.boxLabel,
        verdictLabel: fr ? "Facteur dominant" : "Dominant factor",
        title: workload.title,
        description: targetMet
          ? (fr
            ? `Votre objectif est atteint. La répartition ${share}% ${dominant} / ${otherShare}% ${dominant === "GPU" ? "CPU" : "GPU"} indique simplement quel composant pèse davantage dans ce scénario.`
            : `Your target is met. The ${share}% ${dominant} / ${otherShare}% ${dominant === "GPU" ? "CPU" : "GPU"} split simply shows which component matters more in this scenario.`)
          : (fr
            ? `Le jeu reste fluide à environ ${Math.round(result.fps)} FPS. Le ${dominant} représente environ ${share}% de la charge modélisée et constitue le premier levier pour gagner davantage de FPS.`
            : `The game remains smooth at around ${Math.round(result.fps)} FPS. The ${dominant} represents about ${share}% of the modeled workload and is the first lever for gaining more FPS.`),
        score: fr ? "BON" : "GOOD"
      };
    }

    if (context.tier === "fair") {
      return {
        mode: "watch",
        meterTitle: fr ? "RÉPARTITION DE L'EFFORT" : "PERFORMANCE PRESSURE",
        meterCaption: fr
          ? `${part} représente environ ${share}% de l'effort modélisé et devient le premier facteur à optimiser si vous voulez gagner des FPS.`
          : `${part} represents about ${share}% of modeled pressure and becomes the first factor to optimize if you want more FPS.`,
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

    return {
      mode: "limited",
      meterTitle: fr ? "RÉPARTITION DE LA LIMITE" : "LIMITING FACTOR BALANCE",
      meterCaption: fr
        ? `${part} représente environ ${share}% de la pression modélisée et freine actuellement le plus les performances.`
        : `${part} represents about ${share}% of modeled pressure and is currently holding performance back the most.`,
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
          ? "Les indicateurs ci-dessous montrent le composant qui freine réellement le framerate dans ce scénario."
          : "The indicators below show which component is materially holding frame rate back in this scenario."
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
          ? "À ce niveau de fluidité, la jauge décrit la part relative du travail entre CPU et GPU ; elle ne mesure pas leur taux d'utilisation réel."
          : "At this level of smoothness, the gauge describes the relative CPU/GPU workload share; it does not measure their actual utilization rate."
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