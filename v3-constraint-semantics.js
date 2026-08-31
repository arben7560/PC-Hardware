/* FrameForge V3 — performance-aware constraint wording */
(() => {
  function constraintCopy(result) {
    const fr = state.language === "fr";
    const target = Number(byId("target-fps")?.value || 0);
    const margin = target > 0 ? result.fps - target : 0;
    const comfortablyAbove = target > 0 && result.fps >= target * 1.12 && margin >= 15;
    const targetMet = target > 0 && result.fps >= target;
    const dominant = result.bottleneck === "cpu" ? "CPU" : result.bottleneck === "gpu" ? "GPU" : null;

    if (result.bottleneck === "memory") {
      return {
        meterTitle: fr ? "RÉPARTITION CPU / GPU" : "CPU / GPU BALANCE",
        meterCaption: fr
          ? "Le CPU et le GPU restent lisibles ici, mais la mémoire vidéo est le point à surveiller sur ce scénario."
          : "CPU and GPU balance is shown here, but video memory is the main thing to watch in this scenario.",
        title: fr ? "Mémoire vidéo à surveiller" : "Video memory needs attention",
        description: fr
          ? "La mémoire vidéo peut devenir le premier facteur de dégradation avant le CPU ou le GPU."
          : "Video memory may become the first source of degradation before CPU or GPU limits matter.",
        score: fr ? "À SURVEILLER" : "WATCH"
      };
    }

    if (result.bottleneck === "storage") {
      return {
        meterTitle: fr ? "RÉPARTITION CPU / GPU" : "CPU / GPU BALANCE",
        meterCaption: fr
          ? "Le CPU et le GPU ne sont pas le problème principal ici ; le stockage peut surtout affecter la régularité."
          : "CPU and GPU are not the main issue here; storage can mainly affect consistency.",
        title: fr ? "Le stockage peut affecter la régularité" : "Storage can affect consistency",
        description: fr
          ? "Les FPS moyens peuvent rester bons, mais un stockage lent peut provoquer des chargements ou à-coups plus visibles."
          : "Average FPS may remain good, but slow storage can cause more noticeable loading or stutter.",
        score: fr ? "À SURVEILLER" : "WATCH"
      };
    }

    if (!dominant || result.bottleneck === "balanced") {
      return {
        meterTitle: fr ? "RÉPARTITION CPU / GPU" : "CPU / GPU BALANCE",
        meterCaption: fr
          ? "La charge est bien répartie entre le processeur et la carte graphique."
          : "The workload is well distributed between the processor and graphics card.",
        title: fr ? "Configuration bien équilibrée" : "Well-balanced configuration",
        description: fr
          ? "Aucun composant ne ressort comme une limite matérielle importante pour ce scénario."
          : "No component stands out as a meaningful hardware limit in this scenario.",
        score: fr ? "ÉQUILIBRÉ" : "BALANCED"
      };
    }

    if (comfortablyAbove) {
      const part = dominant === "CPU" ? (fr ? "Le processeur" : "The processor") : (fr ? "La carte graphique" : "The graphics card");
      return {
        meterTitle: fr ? "RÉPARTITION CPU / GPU" : "CPU / GPU BALANCE",
        meterCaption: fr
          ? `${part} influence davantage le plafond maximal, mais sans limiter votre expérience à cet objectif.`
          : `${part} has more influence on the maximum ceiling, but it is not limiting your experience at this target.`,
        title: fr ? "Aucune contrainte matérielle notable" : "No meaningful hardware constraint",
        description: fr
          ? `${part} devient le facteur dominant si l'on cherche encore plus de FPS, mais votre objectif est dépassé avec une marge confortable.`
          : `${part} becomes the dominant factor only if you push for even more FPS; your target is already exceeded with comfortable headroom.`,
        score: fr ? "RAS" : "CLEAR"
      };
    }

    if (targetMet) {
      const part = dominant === "CPU" ? (fr ? "Le processeur" : "The processor") : (fr ? "La carte graphique" : "The graphics card");
      return {
        meterTitle: fr ? "RÉPARTITION CPU / GPU" : "CPU / GPU BALANCE",
        meterCaption: fr
          ? `${part} est le facteur dominant, sans empêcher l'atteinte de votre objectif.`
          : `${part} is the dominant factor, without preventing you from reaching your target.`,
        title: fr ? `Facteur dominant : ${dominant}` : `Dominant factor: ${dominant}`,
        description: fr
          ? "Votre objectif est atteint. Ce composant compte surtout si vous cherchez davantage de marge ou un framerate encore plus élevé."
          : "Your target is met. This component mainly matters if you want more headroom or an even higher frame rate.",
        score: fr ? "FAIBLE" : "LOW"
      };
    }

    const part = dominant === "CPU" ? (fr ? "Le processeur" : "The processor") : (fr ? "La carte graphique" : "The graphics card");
    return {
      meterTitle: fr ? "RÉPARTITION DE LA LIMITE" : "LIMITING FACTOR BALANCE",
      meterCaption: fr
        ? `${part} exerce actuellement la plus forte contrainte sur ce scénario.`
        : `${part} is currently the stronger constraint in this scenario.`,
      title: dominant === "CPU"
        ? (fr ? "Le processeur est la principale limite" : "The processor is the main limit")
        : (fr ? "La carte graphique est la principale limite" : "The graphics card is the main limit"),
      description: dominant === "CPU"
        ? (fr ? "Le processeur réduit ici le gain qu'une carte graphique plus rapide pourrait apporter." : "The processor is reducing how much extra performance a faster graphics card could deliver here.")
        : (fr ? "La carte graphique est ici le principal composant qui retient les FPS." : "The graphics card is the main component holding FPS back here."),
      score: fr ? "MOYEN" : "MEDIUM"
    };
  }

  function applyConstraintSemantics(result = state.lastResult) {
    if (!result) return;
    const copy = constraintCopy(result);

    const kicker = byId("ff-bottleneck-kicker");
    const caption = byId("ff-bottleneck-caption");
    const title = byId("bottleneck-title");
    const description = byId("bottleneck-description");
    const score = byId("bottleneck-score");
    const verdictLimit = byId("verdict-limit");

    if (kicker) kicker.textContent = copy.meterTitle;
    if (caption) caption.textContent = copy.meterCaption;
    if (title) title.textContent = copy.title;
    if (description) description.textContent = copy.description;
    if (score) score.textContent = copy.score;
    if (verdictLimit) verdictLimit.textContent = copy.title;
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
