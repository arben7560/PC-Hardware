const CPU_DATA = [
  { id: "i5-12400f", name: "Intel Core i5-12400F", score: 0.73, cores: "6C / 12T", boost: "4.4 GHz" },
  { id: "r5-7600", name: "AMD Ryzen 5 7600", score: 0.94, cores: "6C / 12T", boost: "5.1 GHz" },
  { id: "i7-12700kf", name: "Intel Core i7-12700KF", score: 1.0, cores: "12C / 20T", boost: "5.0 GHz" },
  { id: "i5-14600k", name: "Intel Core i5-14600K", score: 1.1, cores: "14C / 20T", boost: "5.3 GHz" },
  { id: "r7-7800x3d", name: "AMD Ryzen 7 7800X3D", score: 1.23, cores: "8C / 16T", boost: "5.0 GHz" },
  { id: "r7-9800x3d", name: "AMD Ryzen 7 9800X3D", score: 1.38, cores: "8C / 16T", boost: "5.2 GHz" }
];

const GPU_DATA = [
  { id: "rtx3060", name: "NVIDIA GeForce RTX 3060 12 GB", score: 0.48, vram: 12, brand: "nvidia", gen: 30, frameGen: false, price: 289 },
  { id: "rx7800xt", name: "AMD Radeon RX 7800 XT 16 GB", score: 0.88, vram: 16, brand: "amd", gen: 7000, frameGen: true, price: 519 },
  { id: "rtx4070", name: "NVIDIA GeForce RTX 4070 12 GB", score: 0.84, vram: 12, brand: "nvidia", gen: 40, frameGen: true, price: 549 },
  { id: "rtx5070", name: "NVIDIA GeForce RTX 5070 12 GB", score: 1.0, vram: 12, brand: "nvidia", gen: 50, frameGen: true, price: 649 },
  { id: "rtx5070ti", name: "NVIDIA GeForce RTX 5070 Ti 16 GB", score: 1.17, vram: 16, brand: "nvidia", gen: 50, frameGen: true, price: 729 },
  { id: "rx9070xt", name: "AMD Radeon RX 9070 XT 16 GB", score: 1.2, vram: 16, brand: "amd", gen: 9000, frameGen: true, price: 699 },
  { id: "rtx5080", name: "NVIDIA GeForce RTX 5080 16 GB", score: 1.5, vram: 16, brand: "nvidia", gen: 50, frameGen: true, price: 1099 },
  { id: "rtx5090", name: "NVIDIA GeForce RTX 5090 32 GB", score: 2.05, vram: 32, brand: "nvidia", gen: 50, frameGen: true, price: 2199 }
];

const GAME_DATA = [
  { id: "cyberpunk", title: "Cyberpunk 2077", cover: "CYBERPUNK", studio: "CD PROJEKT RED", year: 2020, tags: ["RPG", "OPEN WORLD", "RAY TRACING"], base: 82, cpuCeiling: 180, cpuIntensity: 0.72, vram: 8.8, ram: 16, low: 0.76, rtLevel: 3, frameGen: true, samples: 1284, confidence: 94, colors: ["#153846", "#35152d"] },
  { id: "alanwake2", title: "Alan Wake 2", cover: "ALAN WAKE II", studio: "REMEDY", year: 2023, tags: ["SURVIVAL", "RAY TRACING", "DLSS"], base: 66, cpuCeiling: 160, cpuIntensity: 0.58, vram: 9.4, ram: 16, low: 0.73, rtLevel: 3, frameGen: true, samples: 816, confidence: 92, colors: ["#182435", "#26151e"] },
  { id: "blackmyth", title: "Black Myth: Wukong", cover: "BLACK MYTH", studio: "GAME SCIENCE", year: 2024, tags: ["ACTION RPG", "UE5", "RAY TRACING"], base: 74, cpuCeiling: 175, cpuIntensity: 0.62, vram: 9.1, ram: 16, low: 0.72, rtLevel: 3, frameGen: true, samples: 1037, confidence: 93, colors: ["#343026", "#18151e"] },
  { id: "starfield", title: "Starfield", cover: "STARFIELD", studio: "BETHESDA", year: 2023, tags: ["RPG", "OPEN WORLD", "CPU HEAVY"], base: 76, cpuCeiling: 145, cpuIntensity: 0.9, vram: 8.3, ram: 16, low: 0.69, rtLevel: 0, frameGen: true, samples: 921, confidence: 91, colors: ["#243241", "#151b29"] },
  { id: "hogwarts", title: "Hogwarts Legacy", cover: "HOGWARTS", studio: "AVALANCHE", year: 2023, tags: ["RPG", "OPEN WORLD", "RAY TRACING"], base: 96, cpuCeiling: 185, cpuIntensity: 0.7, vram: 8.7, ram: 16, low: 0.7, rtLevel: 2, frameGen: true, samples: 1432, confidence: 94, colors: ["#202c42", "#21152d"] },
  { id: "fortnite", title: "Fortnite", cover: "FORTNITE", studio: "EPIC GAMES", year: 2017, tags: ["COMPETITIVE", "UE5", "LUMEN"], base: 154, cpuCeiling: 270, cpuIntensity: 0.95, vram: 6.7, ram: 16, low: 0.8, rtLevel: 2, frameGen: false, samples: 2341, confidence: 95, colors: ["#12324a", "#27205c"] },
  { id: "forza5", title: "Forza Horizon 5", cover: "FORZA HORIZON", studio: "PLAYGROUND", year: 2021, tags: ["RACING", "OPEN WORLD", "HDR"], base: 146, cpuCeiling: 225, cpuIntensity: 0.68, vram: 7.8, ram: 16, low: 0.82, rtLevel: 1, frameGen: false, samples: 1886, confidence: 96, colors: ["#1d3547", "#391938"] },
  { id: "gtav", title: "Grand Theft Auto V Enhanced", cover: "GTA V ENHANCED", studio: "ROCKSTAR GAMES", year: 2025, tags: ["OPEN WORLD", "RAY TRACING", "DLSS"], base: 119, cpuCeiling: 205, cpuIntensity: 0.84, vram: 8.0, ram: 16, low: 0.77, rtLevel: 2, frameGen: true, samples: 662, confidence: 89, colors: ["#1f3b33", "#302033"] }
];

const RESOLUTIONS = {
  "1080": { label: "1920 × 1080", fps: 1.38, vram: 0.78 },
  "1440": { label: "2560 × 1440", fps: 1.0, vram: 1.0 },
  "uw1440": { label: "3440 × 1440", fps: 0.78, vram: 1.12 },
  "4k": { label: "3840 × 2160", fps: 0.60, vram: 1.35 }
};

const PRESETS = {
  medium: { fps: 1.34, vram: 0.82 },
  high: { fps: 1.16, vram: 0.92 },
  ultra: { fps: 1.0, vram: 1.0 }
};

const RT_LEVELS = {
  off: { fps: 1.0, vram: 1.0 },
  medium: { fps: 0.84, vram: 1.10 },
  ultra: { fps: 0.69, vram: 1.26 },
  path: { fps: 0.44, vram: 1.48 }
};

const UPSCALERS = {
  native: { fps: 1.0, label: "Native" },
  dlssQuality: { fps: 1.31, label: "DLSS Quality" },
  dlssBalanced: { fps: 1.45, label: "DLSS Balanced" },
  dlssPerformance: { fps: 1.62, label: "DLSS Performance" },
  fsrQuality: { fps: 1.29, label: "FSR Quality" },
  fsrBalanced: { fps: 1.43, label: "FSR Balanced" },
  fsrPerformance: { fps: 1.58, label: "FSR Performance" }
};

const translations = {
  en: {
    navPerformance: "Performance", navBuilder: "PC Builder", navGames: "Games", navBenchmarks: "Benchmarks", navDeals: "Upgrades",
    saved: "Saved", scanPC: "Quick scan", heroEyebrow: "INTERACTIVE PERFORMANCE ENGINE · V2", heroTitle1: "Don't ask if it runs.", heroTitle2: "Know how well.",
    heroDescription: "Model your build, choose a game and tune the exact performance scenario you care about — resolution, preset, ray tracing, upscaling and frame generation.",
    startAnalysis: "Start an analysis", howItWorks: "How the estimate works", modelVersion: "Model", localModel: "local beta engine", gamesModeled: "Games modeled", interactiveProfiles: "interactive profiles", liveEngine: "Engine", online: "LIVE", instantRecalc: "instant recalculation",
    performanceMission: "PERFORMANCE MISSION", defineGoal: "Define what “runs well” means to you.", targetFps: "Target FPS", liveAnalysis: "Live analysis", updatesAsYouTune: "Updates as you tune", readyToAnalyze: "Ready to analyze", analyzing: "Analyzing configuration...", updatedNow: "Updated just now",
    yourMachine: "01 / YOUR MACHINE", buildYourPC: "Build your PC", manual: "MANUAL", builderDescription: "Select your actual hardware. Every change can recalculate the performance model instantly.", processor: "Processor", graphicsCard: "Graphics card", memory: "Memory", gameStorage: "Game storage", display: "Resolution", operatingSystem: "Operating system", buildHealth: "Build health", cpuGpuBalance: "CPU / GPU balance", memoryHeadroom: "Memory headroom", featureSupport: "Feature support", analyzeBuild: "Analyze this build", saveConfiguration: "+ Save this configuration", estimateDisclaimer: "V2 estimates are an interactive beta model, not vendor-certified benchmark results.",
    targetGame: "02 / TARGET GAME", whatPlay: "What do you want to play?", searchGame: "Search a game...", performanceProfile: "PERFORMANCE PROFILE", referenceSamples: "reference samples", modelConfidence: "Model confidence", preset: "Preset", medium: "Medium", high: "High", ultra: "Ultra", rayTracing: "Ray tracing", upscaling: "Upscaling", frameGeneration: "Frame generation",
    expectedPerformance: "03 / EXPECTED PERFORMANCE", avgFPS: "AVG FPS", frameTime: "FRAME TIME", gpuLoad: "GPU load", cpuLoad: "CPU load", vramPressure: "VRAM pressure", primaryLimit: "PRIMARY LIMIT", targetCheck: "TARGET CHECK", scenarioNative: "Native", nativeDetail: "Current preset · no upscaling", scenarioRecommended: "Recommended", scenarioHighRefresh: "High refresh", scenarioMaxVisuals: "Max visuals",
    optimizationRecipe: "OPTIMIZATION RECIPE", bestSettings: "Best settings for your goal", goalFit: "Goal fit", applyRecommended: "Apply recommended profile", framePacing: "FRAME PACING", experienceQuality: "Experience quality", smoothnessScore: "Smoothness score", estimatedStutter: "Estimated stutter", latencyClass: "Latency class", onePercentStability: "1% low stability",
    smartUpgrade: "SMART UPGRADE", needUpgrade: "Do you need to upgrade?", bestNextStep: "BEST NEXT STEP", expectedGain: "EXPECTED GAIN", compareUpgrade: "Compare current vs upgrade", marketIntelligence: "MARKET INTELLIGENCE", hardwarePriceSignal: "Hardware price signal", referencePrice: "reference price", priceContext: "Position", valueScore: "Value score", marketNote: "About market data",
    realWorldData: "REFERENCE DATA", benchmarkDescription: "The beta engine combines normalized hardware scores with game profiles. Reference sample counts indicate model depth, not a live benchmark feed.", median: "Median", typicalRange: "Typical range", matchQuality: "Match quality", methodology: "Methodology", performanceModel: "Performance model V2 beta", calculationMode: "Calculation", localInstant: "Local / instant", region: "Region",
    excellent: "Excellent", good: "Good", fair: "Fair", limited: "Limited", full: "Full", partial: "Partial", low: "Low", mediumLabel: "Medium", highLabel: "High", balanced: "Balanced", gpuBound: "GPU bound", cpuBound: "CPU bound", memoryBound: "VRAM pressure", storageBound: "Storage limited", noMajorLimit: "Balanced workload",
    gpuLimitDesc: "The GPU is the main performance limit in this scenario.", cpuLimitDesc: "The CPU ceiling is limiting additional rendered frames.", memoryLimitDesc: "Video memory demand is above the comfortable range.", storageLimitDesc: "HDD storage can increase streaming stutter and 1% low drops.", balancedDesc: "CPU and GPU utilization are reasonably balanced.",
    ratingExcellent: "EXCELLENT", ratingGreat: "GREAT", ratingGood: "GOOD", ratingPlayable: "PLAYABLE", ratingLimited: "LIMITED", targetMet: "Target reached", targetMissed: "Below target", aboveTarget: "above your target", belowTarget: "below your target",
    perfExcellent: "Excellent headroom for a high-refresh experience at these settings.", perfGreat: "Strong performance with enough margin for a smooth experience.", perfGood: "Comfortable performance, though heavier scenes can dip below the average.", perfPlayable: "Playable, but tuning a few expensive settings will improve consistency.", perfLimited: "This profile is too demanding for the selected target; optimization is recommended.",
    recUpscaleTitle: "Use smart upscaling", recUpscaleDetail: "Quality mode preserves image quality while recovering GPU headroom.", recRtTitle: "Reduce ray tracing", recRtDetail: "RT is the most expensive visual feature in this profile.", recFgTitle: "Enable frame generation", recFgDetail: "Useful for a high-refresh target when base rendering is already stable.", recStorageTitle: "Move the game to SSD", recStorageDetail: "Improves asset streaming and reduces traversal stutter.", recRamTitle: "Use 32 GB memory", recRamDetail: "Adds system headroom for modern open-world workloads.", recKeepTitle: "Keep this profile", recKeepDetail: "Your current settings already fit the selected performance target.", recPresetTitle: "Use High instead of Ultra", recPresetDetail: "Usually the best visual/performance trade-off for this target.",
    appliedProfile: "Recommended profile applied.", buildSaved: "Configuration saved locally.", noSavedBuild: "No saved configuration yet.", savedBuildTitle: "Saved configuration", restoreBuild: "Restore build", close: "Close", savedAt: "Saved locally in this browser.", scanTitle: "Browser quick scan", scanKicker: "LOCAL DEVICE SIGNALS", scanIntro: "Browsers cannot reliably expose an exact CPU model. FrameForge can still read a few local signals without uploading them.", logicalCores: "Logical cores", approxMemory: "Approx. memory", graphicsRenderer: "Graphics renderer", platform: "Platform", unavailable: "Unavailable", applyDetected: "Apply detected values", scanApplied: "Available detected values applied.", scanLimits: "Exact hardware identification would require a native helper in a production version.",
    howTitle: "How V2 estimates performance", howBody1: "FrameForge V2 starts from a normalized game workload at 1440p, then applies GPU power, CPU ceilings, resolution cost, preset cost, ray tracing, upscaling, frame generation, VRAM pressure and storage/RAM penalties.", howBody2: "The result is an interactive planning estimate. It is useful for comparing scenarios, but it is not yet a replacement for measured benchmark telemetry.", methodologyTitle: "V2 methodology", marketTitle: "Market data in this prototype", marketBody: "Prices shown in V2 are static reference values bundled with the prototype. They are not live retailer prices yet. A production version would connect to price feeds and affiliate partners.",
    compareTitle: "Upgrade impact", currentBuild: "Current build", upgradedBuild: "Suggested upgrade", estimatedAverage: "Estimated average", noUpgradeNeeded: "No upgrade required", upgradeOptional: "Your current configuration already meets the selected target. An upgrade is optional.", upgradeHelpful: "An upgrade can materially improve this target.", gpuUpgradeReason: "More GPU headroom for this resolution and visual profile.", cpuUpgradeReason: "Higher CPU ceiling for the requested frame rate.", storageUpgradeReason: "Move the game to an SSD before changing core hardware.", goalFitExcellent: "Excellent", goalFitGood: "Good", goalFitWeak: "Needs tuning", stutterLow: "Low", stutterMedium: "Medium", stutterHigh: "High", latencyLow: "Low", latencyNormal: "Normal", latencyFG: "Frame Gen", stabilityExcellent: "Excellent", stabilityGood: "Good", stabilityFair: "Fair", priceGood: "GOOD VALUE", priceNeutral: "FAIR", pricePremium: "PREMIUM", similarBuilds: "reference scenarios around this profile", matchHigh: "High", matchMedium: "Medium", matchLow: "Low"
  },
  fr: {
    navPerformance: "Performances", navBuilder: "Configurateur PC", navGames: "Jeux", navBenchmarks: "Benchmarks", navDeals: "Améliorations",
    saved: "Sauvegardé", scanPC: "Scan rapide", heroEyebrow: "MOTEUR DE PERFORMANCE INTERACTIF · V2", heroTitle1: "Ne demandez plus s'il tourne.", heroTitle2: "Découvrez comment il tournera.",
    heroDescription: "Modélisez votre configuration, choisissez un jeu et ajustez précisément le scénario qui vous intéresse — résolution, qualité, ray tracing, upscaling et génération d'images.",
    startAnalysis: "Lancer une analyse", howItWorks: "Comment fonctionne l'estimation", modelVersion: "Modèle", localModel: "moteur bêta local", gamesModeled: "Jeux modélisés", interactiveProfiles: "profils interactifs", liveEngine: "Moteur", online: "ACTIF", instantRecalc: "recalcul instantané",
    performanceMission: "OBJECTIF DE PERFORMANCE", defineGoal: "Définissez ce que « bien tourner » signifie pour vous.", targetFps: "Objectif FPS", liveAnalysis: "Analyse en direct", updatesAsYouTune: "Mise à jour automatique", readyToAnalyze: "Prêt pour l'analyse", analyzing: "Analyse de la configuration...", updatedNow: "Mis à jour à l'instant",
    yourMachine: "01 / VOTRE MACHINE", buildYourPC: "Configurez votre PC", manual: "MANUEL", builderDescription: "Sélectionnez votre matériel réel. Chaque modification peut recalculer instantanément le modèle de performances.", processor: "Processeur", graphicsCard: "Carte graphique", memory: "Mémoire", gameStorage: "Stockage du jeu", display: "Résolution", operatingSystem: "Système d'exploitation", buildHealth: "État de la configuration", cpuGpuBalance: "Équilibre CPU / GPU", memoryHeadroom: "Marge mémoire", featureSupport: "Technologies prises en charge", analyzeBuild: "Analyser cette configuration", saveConfiguration: "+ Sauvegarder cette configuration", estimateDisclaimer: "Les estimations V2 proviennent d'un modèle bêta interactif et ne sont pas des benchmarks certifiés.",
    targetGame: "02 / JEU CIBLE", whatPlay: "À quel jeu voulez-vous jouer ?", searchGame: "Rechercher un jeu...", performanceProfile: "PROFIL DE PERFORMANCES", referenceSamples: "échantillons de référence", modelConfidence: "Fiabilité du modèle", preset: "Qualité", medium: "Moyen", high: "Élevé", ultra: "Ultra", rayTracing: "Ray tracing", upscaling: "Upscaling", frameGeneration: "Génération d'images",
    expectedPerformance: "03 / PERFORMANCES ESTIMÉES", avgFPS: "FPS MOY.", frameTime: "TEMPS / IMAGE", gpuLoad: "Charge GPU", cpuLoad: "Charge CPU", vramPressure: "Utilisation VRAM", primaryLimit: "LIMITE PRINCIPALE", targetCheck: "VÉRIFICATION DE L'OBJECTIF", scenarioNative: "Natif", nativeDetail: "Qualité actuelle · sans upscaling", scenarioRecommended: "Recommandé", scenarioHighRefresh: "Haut rafraîchissement", scenarioMaxVisuals: "Visuels maximum",
    optimizationRecipe: "PROFIL D'OPTIMISATION", bestSettings: "Meilleurs réglages pour votre objectif", goalFit: "Adéquation", applyRecommended: "Appliquer le profil recommandé", framePacing: "RÉGULARITÉ DES IMAGES", experienceQuality: "Qualité de l'expérience", smoothnessScore: "Score de fluidité", estimatedStutter: "Saccades estimées", latencyClass: "Classe de latence", onePercentStability: "Stabilité du 1% low",
    smartUpgrade: "AMÉLIORATION INTELLIGENTE", needUpgrade: "Avez-vous besoin d'améliorer votre PC ?", bestNextStep: "MEILLEURE ÉTAPE SUIVANTE", expectedGain: "GAIN ESTIMÉ", compareUpgrade: "Comparer avant / après", marketIntelligence: "ANALYSE DU MARCHÉ", hardwarePriceSignal: "Signal de prix du matériel", referencePrice: "prix de référence", priceContext: "Position", valueScore: "Rapport valeur", marketNote: "À propos des prix",
    realWorldData: "DONNÉES DE RÉFÉRENCE", benchmarkDescription: "Le moteur bêta combine des scores matériels normalisés avec des profils de jeux. Le nombre d'échantillons indique la profondeur du modèle, pas un flux de benchmarks en direct.", median: "Médiane", typicalRange: "Plage habituelle", matchQuality: "Qualité de correspondance", methodology: "Méthodologie", performanceModel: "Modèle de performances V2 bêta", calculationMode: "Calcul", localInstant: "Local / instantané", region: "Région",
    excellent: "Excellent", good: "Bon", fair: "Correct", limited: "Limité", full: "Complète", partial: "Partielle", low: "Faible", mediumLabel: "Moyenne", highLabel: "Élevée", balanced: "Équilibré", gpuBound: "Limité par le GPU", cpuBound: "Limité par le CPU", memoryBound: "Pression VRAM", storageBound: "Limité par le stockage", noMajorLimit: "Charge équilibrée",
    gpuLimitDesc: "La carte graphique est la principale limite de performances dans ce scénario.", cpuLimitDesc: "Le plafond du processeur limite la production d'images supplémentaires.", memoryLimitDesc: "La demande en mémoire vidéo dépasse la zone confortable.", storageLimitDesc: "Un disque dur peut accroître les saccades de streaming et dégrader le 1% low.", balancedDesc: "L'utilisation du CPU et du GPU reste raisonnablement équilibrée.",
    ratingExcellent: "EXCELLENT", ratingGreat: "TRÈS BON", ratingGood: "BON", ratingPlayable: "JOUABLE", ratingLimited: "LIMITÉ", targetMet: "Objectif atteint", targetMissed: "Sous l'objectif", aboveTarget: "au-dessus de votre objectif", belowTarget: "sous votre objectif",
    perfExcellent: "Excellente marge pour une expérience à haut taux de rafraîchissement avec ces réglages.", perfGreat: "Très bonnes performances avec suffisamment de marge pour une expérience fluide.", perfGood: "Performances confortables, même si les scènes lourdes peuvent descendre sous la moyenne.", perfPlayable: "Jouable, mais quelques réglages coûteux doivent être ajustés pour gagner en régularité.", perfLimited: "Ce profil est trop exigeant pour l'objectif sélectionné ; une optimisation est recommandée.",
    recUpscaleTitle: "Activer un upscaling intelligent", recUpscaleDetail: "Le mode Qualité conserve une bonne image tout en récupérant de la marge GPU.", recRtTitle: "Réduire le ray tracing", recRtDetail: "Le RT est l'option visuelle la plus coûteuse de ce profil.", recFgTitle: "Activer la génération d'images", recFgDetail: "Utile pour viser un haut rafraîchissement lorsque le rendu de base est déjà stable.", recStorageTitle: "Installer le jeu sur SSD", recStorageDetail: "Améliore le streaming des ressources et réduit les saccades en déplacement.", recRamTitle: "Passer à 32 Go de mémoire", recRamDetail: "Ajoute de la marge système pour les charges modernes en monde ouvert.", recKeepTitle: "Conserver ce profil", recKeepDetail: "Vos réglages actuels correspondent déjà à l'objectif choisi.", recPresetTitle: "Passer d'Ultra à Élevé", recPresetDetail: "C'est souvent le meilleur compromis visuel / performances pour cet objectif.",
    appliedProfile: "Profil recommandé appliqué.", buildSaved: "Configuration sauvegardée localement.", noSavedBuild: "Aucune configuration sauvegardée pour le moment.", savedBuildTitle: "Configuration sauvegardée", restoreBuild: "Restaurer", close: "Fermer", savedAt: "Sauvegardée localement dans ce navigateur.", scanTitle: "Scan rapide du navigateur", scanKicker: "SIGNAUX LOCAUX DE L'APPAREIL", scanIntro: "Un navigateur ne peut pas identifier de façon fiable le modèle exact du processeur. FrameForge peut néanmoins lire quelques signaux locaux sans les envoyer ailleurs.", logicalCores: "Cœurs logiques", approxMemory: "Mémoire approx.", graphicsRenderer: "Renderer graphique", platform: "Plateforme", unavailable: "Indisponible", applyDetected: "Appliquer les valeurs détectées", scanApplied: "Les valeurs détectables ont été appliquées.", scanLimits: "L'identification exacte du matériel nécessiterait un utilitaire natif dans une version de production.",
    howTitle: "Comment la V2 estime les performances", howBody1: "FrameForge V2 part d'une charge de jeu normalisée en 1440p, puis applique la puissance GPU, le plafond CPU, le coût de la résolution, de la qualité graphique, du ray tracing, de l'upscaling, de la génération d'images, ainsi que les contraintes de VRAM, RAM et stockage.", howBody2: "Le résultat est une estimation interactive destinée à comparer des scénarios. Elle ne remplace pas encore des mesures de benchmark réelles.", methodologyTitle: "Méthodologie V2", marketTitle: "Données de prix de ce prototype", marketBody: "Les prix affichés dans la V2 sont des valeurs de référence statiques intégrées au prototype. Ce ne sont pas encore des prix marchands en direct. Une version de production pourra se connecter à des flux tarifaires et partenaires affiliés.",
    compareTitle: "Impact de l'amélioration", currentBuild: "Configuration actuelle", upgradedBuild: "Amélioration proposée", estimatedAverage: "Moyenne estimée", noUpgradeNeeded: "Aucune amélioration nécessaire", upgradeOptional: "Votre configuration atteint déjà l'objectif sélectionné. Une amélioration reste optionnelle.", upgradeHelpful: "Une amélioration peut faire une vraie différence pour cet objectif.", gpuUpgradeReason: "Davantage de marge GPU pour cette résolution et ce niveau visuel.", cpuUpgradeReason: "Un plafond CPU plus élevé pour le nombre d'images demandé.", storageUpgradeReason: "Installez d'abord le jeu sur un SSD avant de changer le matériel principal.", goalFitExcellent: "Excellent", goalFitGood: "Bon", goalFitWeak: "À optimiser", stutterLow: "Faibles", stutterMedium: "Moyennes", stutterHigh: "Élevées", latencyLow: "Faible", latencyNormal: "Normale", latencyFG: "Frame Gen", stabilityExcellent: "Excellente", stabilityGood: "Bonne", stabilityFair: "Correcte", priceGood: "BON RAPPORT", priceNeutral: "CORRECT", pricePremium: "PREMIUM", similarBuilds: "scénarios de référence proches de ce profil", matchHigh: "Élevée", matchMedium: "Moyenne", matchLow: "Faible"
  }
};

const state = { language: "en", game: "cyberpunk", preset: "high", rt: "off", upscaling: "dlssQuality", frameGen: false, recommended: null, lastResult: null, upgrade: null, toastTimer: null, analyzeTimer: null };
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const byId = (id) => document.getElementById(id);
const t = (key) => translations[state.language]?.[key] ?? translations.en[key] ?? key;
const clamp = (n, min, max) => Math.min(max, Math.max(min, n));
const round = (n) => Math.round(n);
const getCpu = (id = byId("cpu")?.value) => CPU_DATA.find((item) => item.id === id) || CPU_DATA[2];
const getGpu = (id = byId("gpu")?.value) => GPU_DATA.find((item) => item.id === id) || GPU_DATA[4];
const getGame = (id = state.game) => GAME_DATA.find((item) => item.id === id) || GAME_DATA[0];
const getPreset = () => document.querySelector('input[name="preset"]:checked')?.value || state.preset;

function populateHardware() {
  byId("cpu").innerHTML = CPU_DATA.map((item) => `<option value="${item.id}">${item.name}</option>`).join("");
  byId("gpu").innerHTML = GPU_DATA.map((item) => `<option value="${item.id}">${item.name}</option>`).join("");
  byId("cpu").value = "i7-12700kf";
  byId("gpu").value = "rtx5070ti";
  updateHardwareMeta();
}
function updateHardwareMeta() {
  const cpu = getCpu(), gpu = getGpu();
  byId("cpu-meta").textContent = `${cpu.cores} · ${cpu.boost}`;
  byId("gpu-meta").textContent = `${gpu.vram} GB VRAM · ${gpu.brand === "nvidia" ? `RTX ${gpu.gen} series` : "Radeon"} · ${gpu.frameGen ? "Frame Gen" : "Raster / Upscaling"}`;
}
function populateRtOptions() {
  const game = getGame(), select = byId("rt"), current = state.rt;
  const options = [{ value: "off", label: state.language === "fr" ? "Désactivé" : "Off" }];
  if (game.rtLevel >= 1) options.push({ value: "medium", label: state.language === "fr" ? "Moyen" : "Medium" });
  if (game.rtLevel >= 2) options.push({ value: "ultra", label: "Ultra" });
  if (game.rtLevel >= 3) options.push({ value: "path", label: "Path Tracing" });
  select.innerHTML = options.map((o) => `<option value="${o.value}">${o.label}</option>`).join("");
  state.rt = options.some((o) => o.value === current) ? current : "off";
  select.value = state.rt;
}
function populateUpscalingOptions() {
  const gpu = getGpu(), select = byId("upscaling"), current = state.upscaling;
  const list = [{ value: "native", label: state.language === "fr" ? "Natif" : "Native" }];
  if (gpu.brand === "nvidia") list.push({ value: "dlssQuality", label: "DLSS Quality" }, { value: "dlssBalanced", label: "DLSS Balanced" }, { value: "dlssPerformance", label: "DLSS Performance" }, { value: "fsrQuality", label: "FSR Quality" });
  else list.push({ value: "fsrQuality", label: "FSR Quality" }, { value: "fsrBalanced", label: "FSR Balanced" }, { value: "fsrPerformance", label: "FSR Performance" });
  select.innerHTML = list.map((o) => `<option value="${o.value}">${o.label}</option>`).join("");
  state.upscaling = list.some((o) => o.value === current) ? current : (gpu.brand === "nvidia" ? "dlssQuality" : "fsrQuality");
  select.value = state.upscaling;
  const supported = gpu.frameGen && getGame().frameGen;
  const fg = byId("frame-generation");
  fg.disabled = !supported;
  if (!supported) { fg.checked = false; state.frameGen = false; }
  updateFrameGenLabel();
}
function updateFrameGenLabel() { byId("framegen-state").textContent = byId("frame-generation").checked ? "ON" : "OFF"; byId("framegen-state").style.color = byId("frame-generation").checked ? "var(--cyan)" : "var(--muted)"; }

function selectGame(id, shouldAnalyze = true) {
  const game = getGame(id); state.game = game.id;
  byId("game-title").textContent = game.title; byId("game-year").textContent = game.year;
  byId("sample-count").textContent = game.samples.toLocaleString(state.language === "fr" ? "fr-FR" : "en-US");
  byId("game-confidence").textContent = `${game.confidence}%`; byId("cover-title").textContent = game.cover; byId("cover-studio").textContent = game.studio;
  byId("cover-chip").textContent = game.tags.includes("CPU HEAVY") ? "CPU" : "AAA";
  byId("game-cover").style.setProperty("--cover-a", game.colors[0]); byId("game-cover").style.setProperty("--cover-b", game.colors[1]);
  byId("game-tags").innerHTML = game.tags.map((tag) => `<span>${tag}</span>`).join("");
  byId("game-search").value = ""; byId("game-search-results").hidden = true;
  populateRtOptions(); populateUpscalingOptions(); if (shouldAnalyze) queueLiveAnalysis();
}
function renderGameSearch(query = "") {
  const q = query.trim().toLowerCase();
  const results = GAME_DATA.filter((game) => !q || game.title.toLowerCase().includes(q) || game.studio.toLowerCase().includes(q)).slice(0, 6);
  const box = byId("game-search-results"); box.innerHTML = "";
  results.forEach((game) => {
    const button = document.createElement("button"); button.className = "game-result"; button.type = "button";
    const left = document.createElement("span"), strong = document.createElement("strong"), small = document.createElement("small"), meta = document.createElement("em");
    strong.textContent = game.title; small.textContent = `${game.studio} · ${game.year}`; meta.textContent = `${game.confidence}%`; left.append(strong, small); button.append(left, meta);
    button.addEventListener("click", () => selectGame(game.id)); box.appendChild(button);
  });
  box.hidden = false;
}

function calculateScenario(overrides = {}) {
  const cpu = getCpu(overrides.cpu), gpu = getGpu(overrides.gpu), game = getGame(overrides.game || state.game);
  const resolutionKey = overrides.resolution || byId("resolution").value, presetKey = overrides.preset || getPreset(), rtKey = overrides.rt ?? byId("rt").value;
  const upscalingKey = overrides.upscaling || byId("upscaling").value, frameGen = overrides.frameGen ?? byId("frame-generation").checked;
  const ram = Number(overrides.ram || byId("ram").value), storage = overrides.storage || byId("storage").value;
  const resolution = RESOLUTIONS[resolutionKey], preset = PRESETS[presetKey], rt = RT_LEVELS[rtKey] || RT_LEVELS.off, upscale = UPSCALERS[upscalingKey] || UPSCALERS.native;
  let gpuFps = game.base * gpu.score * resolution.fps * preset.fps * rt.fps * upscale.fps;
  const vramNeed = game.vram * resolution.vram * preset.vram * rt.vram, vramPressure = (vramNeed / gpu.vram) * 100;
  if (vramPressure > 100) gpuFps *= clamp(1 - ((vramPressure - 100) / 100) * 0.34, 0.68, 1);
  if (ram < game.ram) gpuFps *= 0.9; if (ram === 16 && game.cpuIntensity > 0.82) gpuFps *= 0.97; if (storage === "hdd") gpuFps *= 0.97;
  const resolutionCpuRelief = resolutionKey === "1080" ? 0.96 : resolutionKey === "4k" ? 1.06 : 1.0;
  const cpuCeiling = game.cpuCeiling * cpu.score * resolutionCpuRelief;
  const renderedFps = Math.min(gpuFps, cpuCeiling), gpuLimited = gpuFps <= cpuCeiling * 0.91, cpuLimited = gpuFps >= cpuCeiling * 1.09;
  let displayedFps = renderedFps; if (frameGen && gpu.frameGen && game.frameGen) displayedFps *= gpu.brand === "nvidia" ? 1.58 : 1.48;
  const storageLow = storage === "hdd" ? 0.82 : storage === "ssd" ? 0.96 : 1.0, ramLow = ram < 32 && game.cpuIntensity > 0.78 ? 0.94 : 1.0, fgLow = frameGen ? 0.94 : 1.0;
  const oneLow = displayedFps * game.low * storageLow * ramLow * fgLow, gpuLoad = gpuLimited ? 97 : cpuLimited ? 74 : 89;
  const cpuLoad = clamp(42 + (renderedFps / Math.max(cpuCeiling, 1)) * 42 + game.cpuIntensity * 10, 45, 97), frameTime = 1000 / Math.max(displayedFps, 1);
  let bottleneck = "balanced"; if (vramPressure > 108) bottleneck = "memory"; else if (storage === "hdd" && game.cpuIntensity > 0.72) bottleneck = "storage"; else if (gpuLimited) bottleneck = "gpu"; else if (cpuLimited) bottleneck = "cpu";
  const confidence = clamp(game.confidence - (vramPressure > 110 ? 4 : 0) - (storage === "hdd" ? 2 : 0), 78, 97);
  const stability = clamp((oneLow / Math.max(displayedFps, 1)) * 100, 45, 92), smoothness = clamp(45 + Math.min(displayedFps, 165) / 165 * 37 + stability * 0.2 - (storage === "hdd" ? 7 : 0), 45, 99);
  return { cpu, gpu, game, resolutionKey, presetKey, rtKey, upscalingKey, frameGen, ram, storage, fps: displayedFps, renderedFps, low: oneLow, frameTime, vramNeed, vramPressure, gpuLoad, cpuLoad, bottleneck, confidence, stability, smoothness };
}

function recommendedProfile(baseResult) {
  const gpu = baseResult.gpu, game = baseResult.game, target = Number(byId("target-fps").value);
  const qualityUpscale = gpu.brand === "nvidia" ? "dlssQuality" : "fsrQuality", balancedUpscale = gpu.brand === "nvidia" ? "dlssBalanced" : "fsrBalanced";
  const profile = { preset: baseResult.presetKey, rt: baseResult.rtKey, upscaling: baseResult.upscalingKey, frameGen: baseResult.frameGen };
  if (baseResult.fps < target) {
    if (profile.rt === "path" || profile.rt === "ultra") profile.rt = game.rtLevel >= 1 ? "medium" : "off";
    if (profile.upscaling === "native") profile.upscaling = qualityUpscale;
    if (profile.preset === "ultra") profile.preset = "high";
    let test = calculateScenario(profile); if (test.fps < target * 0.94) profile.upscaling = balancedUpscale;
    test = calculateScenario(profile); if (test.fps < target * 0.92 && gpu.frameGen && game.frameGen) profile.frameGen = true;
  } else if (baseResult.fps > target * 1.32) {
    profile.preset = "ultra"; if (game.rtLevel >= 1 && profile.rt === "off") profile.rt = "medium"; if (baseResult.fps > target * 1.55) profile.upscaling = "native";
  }
  return profile;
}
function ratingFor(fps, target) { const ratio = fps / target; if (ratio >= 1.18) return { key:"ratingExcellent",desc:"perfExcellent" }; if (ratio >= 1) return { key:"ratingGreat",desc:"perfGreat" }; if (ratio >= .78) return { key:"ratingGood",desc:"perfGood" }; if (fps >= 48) return { key:"ratingPlayable",desc:"perfPlayable" }; return { key:"ratingLimited",desc:"perfLimited" }; }
function bottleneckText(type) { const map = { gpu:["gpuBound","gpuLimitDesc"], cpu:["cpuBound","cpuLimitDesc"], memory:["memoryBound","memoryLimitDesc"], storage:["storageBound","storageLimitDesc"], balanced:["noMajorLimit","balancedDesc"] }; const pair = map[type] || map.balanced; return { title:t(pair[0]), description:t(pair[1]) }; }
function buildRecommendations(result) {
  const target = Number(byId("target-fps").value), rows = [];
  if (result.upscalingKey === "native" && result.fps < target * 1.12) rows.push(["↗",t("recUpscaleTitle"),t("recUpscaleDetail"),"+FPS"]);
  if (["ultra","path"].includes(result.rtKey) && result.fps < target * 1.15) rows.push(["RT",t("recRtTitle"),t("recRtDetail"),"+GPU"]);
  if (!result.frameGen && result.gpu.frameGen && result.game.frameGen && target >= 120) rows.push(["FG",t("recFgTitle"),t("recFgDetail"),"+Hz"]);
  if (result.storage === "hdd") rows.push(["SSD",t("recStorageTitle"),t("recStorageDetail"),"1% low"]);
  if (result.ram < 32 && result.game.cpuIntensity > .75) rows.push(["RAM",t("recRamTitle"),t("recRamDetail"),"+stable"]);
  if (result.presetKey === "ultra" && result.fps < target) rows.push(["FX",t("recPresetTitle"),t("recPresetDetail"),"+FPS"]);
  if (!rows.length) rows.push(["✓",t("recKeepTitle"),t("recKeepDetail"),"OK"]); return rows.slice(0,3);
}
function findUpgrade(result) {
  const target = Number(byId("target-fps").value);
  if (result.fps >= target * 1.05 && result.storage !== "hdd") { const nextGpu = GPU_DATA.find((gpu) => gpu.score >= result.gpu.score * 1.27); if (!nextGpu) return { type:"none",name:t("noUpgradeNeeded"),gain:0,reason:t("upgradeOptional"),result:null }; const nextResult = calculateScenario({ gpu:nextGpu.id }); return { type:"optional",name:nextGpu.name,gain:Math.max(0,round((nextResult.fps/result.fps-1)*100)),reason:t("upgradeOptional"),result:nextResult }; }
  if (result.storage === "hdd" && result.bottleneck === "storage") { const nextResult = calculateScenario({ storage:"nvme" }); return { type:"storage",name:"NVMe SSD",gain:Math.max(3,round((nextResult.low/result.low-1)*100)),reason:t("storageUpgradeReason"),result:nextResult }; }
  if (result.bottleneck === "cpu") { const next = CPU_DATA.find((cpu) => cpu.score >= result.cpu.score * 1.2) || CPU_DATA[CPU_DATA.length-1], nextResult = calculateScenario({ cpu:next.id }); return { type:"cpu",name:next.name,gain:Math.max(0,round((nextResult.fps/result.fps-1)*100)),reason:t("cpuUpgradeReason"),result:nextResult }; }
  const next = GPU_DATA.find((gpu) => gpu.score >= result.gpu.score * 1.25) || GPU_DATA[GPU_DATA.length-1]; if (next.id === result.gpu.id) return { type:"none",name:t("noUpgradeNeeded"),gain:0,reason:t("upgradeOptional"),result:null }; const nextResult = calculateScenario({ gpu:next.id }); return { type:"gpu",name:next.name,gain:Math.max(0,round((nextResult.fps/result.fps-1)*100)),reason:t("gpuUpgradeReason"),result:nextResult };
}

function renderBuildHealth(result) { const ratio = result.cpu.score/result.gpu.score, balance = clamp(100-Math.abs(1-ratio)*52,55,99); let health=balance; if(result.ram<32)health-=4;if(result.storage==="hdd")health-=7;if(result.vramPressure>100)health-=8;health=clamp(health,45,98);byId("balance-value").textContent=`${round(balance)}%`;byId("memory-health").textContent=result.ram>=32?t("good"):t("fair");byId("feature-health").textContent=result.gpu.frameGen?t("full"):t("partial");byId("health-fill").style.width=`${health}%`;const key=health>=86?"excellent":health>=72?"good":health>=58?"fair":"limited";byId("build-health-label").textContent=t(key);byId("build-health-label").style.color=health>=72?"var(--green)":health>=58?"var(--yellow)":"var(--red)"; }
function renderTelemetry(result) { const stutterKey=result.storage==="hdd"?"stutterHigh":result.stability<66?"stutterMedium":"stutterLow", latencyKey=result.frameGen?"latencyFG":result.fps>=100?"latencyLow":"latencyNormal", stabilityKey=result.stability>=75?"stabilityExcellent":result.stability>=66?"stabilityGood":"stabilityFair";byId("smoothness-score").textContent=`${round(result.smoothness)}/100`;byId("stutter-value").textContent=t(stutterKey);byId("latency-value").textContent=t(latencyKey);byId("stability-value").textContent=t(stabilityKey);byId("quality-pill").textContent=t(result.smoothness>=88?"goalFitExcellent":result.smoothness>=74?"goalFitGood":"goalFitWeak").toUpperCase();const graph=byId("frametime-graph");graph.innerHTML="";for(let i=0;i<42;i++){const bar=document.createElement("i"),wave=Math.sin(i*.72)*4+Math.sin(i*.21)*3,jitter=(1-result.stability/100)*((i*13)%9),h=clamp(26+wave+jitter+(result.storage==="hdd"&&i%11===0?24:0),16,72);bar.style.height=`${h}%`;graph.appendChild(bar);} }
function renderMarket(result) { const price=result.gpu.price,value=clamp(round((result.gpu.score/price)*65000),45,99);byId("market-product-name").textContent=result.gpu.name.replace("NVIDIA GeForce ","").replace("AMD Radeon ","");byId("market-price").textContent=`€${price}`;byId("value-score").textContent=`${value}/100`;let key="priceNeutral",context=state.language==="fr"?"Milieu de gamme":"Mid market";if(value>=82){key="priceGood";context=state.language==="fr"?"Valeur forte":"Strong value";}if(price>=1000){key="pricePremium";context=state.language==="fr"?"Haut de gamme":"High end";}byId("price-state").textContent=t(key);byId("price-context").textContent=context; }
function renderBenchmarks(result) { const sampleFactor=clamp(result.game.samples*(.82+result.gpu.score*.12),250,2600),median=round(result.fps*.97),spread=Math.max(5,round(result.fps*(1-result.confidence/120)));byId("similar-builds-title").textContent=`${round(sampleFactor).toLocaleString(state.language==="fr"?"fr-FR":"en-US")} ${t("similarBuilds")}`;byId("median-fps").textContent=`${median} FPS`;byId("typical-range").textContent=`${Math.max(1,median-spread)}–${median+spread}`;byId("match-quality").textContent=t(result.confidence>=93?"matchHigh":result.confidence>=88?"matchMedium":"matchLow"); }
function renderRecommendations(result,profile){const recommendedResult=calculateScenario(profile),target=Number(byId("target-fps").value),fit=clamp(round((recommendedResult.fps/target)*100),0,100);byId("goal-fit-score").textContent=`${fit}%`;byId("goal-fit-bar").style.width=`${fit}%`;byId("recommendations-list").innerHTML=buildRecommendations(result).map(([icon,title,detail,gain])=>`<div class="recommendation-row"><b>${icon}</b><span><strong>${title}</strong><small>${detail}</small></span><em>${gain}</em></div>`).join("");}
function profileLabel(profile){const preset=profile.preset==="high"?t("high"):profile.preset==="medium"?t("medium"):t("ultra"),up=UPSCALERS[profile.upscaling]?.label||profile.upscaling,fg=profile.frameGen?" + FG":"";return `${preset} · ${up}${fg}`;}
function renderUpgrade(upgrade,result){const meets=result.fps>=Number(byId("target-fps").value);byId("verdict-mark").textContent=meets?"✓":"↗";byId("upgrade-verdict-title").textContent=meets?t("noUpgradeNeeded"):t("upgradeHelpful");byId("upgrade-verdict-description").textContent=upgrade.reason;byId("upgrade-product").textContent=upgrade.name;byId("upgrade-reason").textContent=upgrade.reason;byId("upgrade-gain").textContent=upgrade.gain?`+${upgrade.gain}%`:"—";}

function renderPerformance(result) {
  state.lastResult=result;const target=Number(byId("target-fps").value),rating=ratingFor(result.fps,target),fps=Math.max(1,round(result.fps)),low=Math.max(1,round(result.low)),resLabel=RESOLUTIONS[result.resolutionKey].label,presetLabel=t(result.presetKey==="high"?"high":result.presetKey);
  byId("fps-value").textContent=fps;byId("low-value").textContent=`${low} FPS`;byId("frametime-value").textContent=`${result.frameTime.toFixed(1)} ms`;byId("vram-value").textContent=`${result.vramNeed.toFixed(1)} GB`;byId("scenario-title").textContent=`${presetLabel} / ${resLabel}`;byId("rating-badge").textContent=t(rating.key);byId("performance-description").textContent=t(rating.desc);byId("performance-headline").textContent=result.fps>=target?t("targetMet"):t("targetMissed");byId("confidence-value").textContent=`${round(result.confidence)}%`;byId("game-confidence").textContent=`${round(result.confidence)}%`;
  byId("fps-ring").style.setProperty("--ring-progress",`${clamp((result.fps/180)*330,40,330)}deg`);byId("gpu-load-value").textContent=`${round(result.gpuLoad)}%`;byId("cpu-load-value").textContent=`${round(result.cpuLoad)}%`;byId("vram-pressure-value").textContent=`${round(result.vramPressure)}%`;byId("gpu-load-bar").style.width=`${clamp(result.gpuLoad,0,100)}%`;byId("cpu-load-bar").style.width=`${clamp(result.cpuLoad,0,100)}%`;byId("vram-pressure-bar").style.width=`${clamp(result.vramPressure,0,100)}%`;
  const bottleneck=bottleneckText(result.bottleneck);byId("bottleneck-title").textContent=bottleneck.title;byId("bottleneck-description").textContent=bottleneck.description;byId("bottleneck-score").textContent=(result.bottleneck==="balanced"?t("low"):result.bottleneck==="memory"||result.bottleneck==="storage"?t("highLabel"):t("mediumLabel")).toUpperCase();
  const delta=round(result.fps-target);byId("goal-verdict").textContent=result.fps>=target?t("targetMet"):t("targetMissed");byId("goal-delta").textContent=`${delta>=0?"+":""}${delta} FPS ${delta>=0?t("aboveTarget"):t("belowTarget")}`;byId("goal-delta").style.color=delta>=0?"var(--green)":"var(--yellow)";byId("goal-marker").style.left=`${clamp((result.fps-30)/(165-30)*100,0,100)}%`;
  const nativeResult=calculateScenario({upscaling:"native",frameGen:false}),recommended=recommendedProfile(result),recommendedResult=calculateScenario(recommended),highRefresh=calculateScenario({preset:"medium",rt:"off",upscaling:result.gpu.brand==="nvidia"?"dlssBalanced":"fsrBalanced",frameGen:result.gpu.frameGen&&result.game.frameGen}),maxRt=result.game.rtLevel>=3?"path":result.game.rtLevel>=2?"ultra":result.game.rtLevel>=1?"medium":"off",maxVisuals=calculateScenario({preset:"ultra",rt:maxRt,upscaling:result.gpu.brand==="nvidia"?"dlssQuality":"fsrQuality",frameGen:result.gpu.frameGen&&result.game.frameGen});state.recommended=recommended;
  byId("scenario-native").textContent=`${round(nativeResult.fps)} FPS`;byId("scenario-recommended").textContent=`${round(recommendedResult.fps)} FPS`;byId("recommended-detail").textContent=profileLabel(recommended);byId("scenario-refresh").textContent=`${round(highRefresh.fps)} FPS`;byId("refresh-detail").textContent=profileLabel({preset:"medium",rt:"off",upscaling:highRefresh.upscalingKey,frameGen:highRefresh.frameGen});byId("scenario-max").textContent=`${round(maxVisuals.fps)} FPS`;byId("max-detail").textContent=profileLabel({preset:"ultra",rt:maxRt,upscaling:maxVisuals.upscalingKey,frameGen:maxVisuals.frameGen});
  renderBuildHealth(result);renderRecommendations(result,recommended);renderTelemetry(result);renderMarket(result);renderBenchmarks(result);state.upgrade=findUpgrade(result);renderUpgrade(state.upgrade,result);
}

function runAnalysis({animated=false}={}){clearTimeout(state.analyzeTimer);const button=byId("analyze-btn"),execute=()=>{updateHardwareMeta();state.preset=getPreset();state.rt=byId("rt").value;state.upscaling=byId("upscaling").value;state.frameGen=byId("frame-generation").checked;renderPerformance(calculateScenario());button.classList.remove("is-analyzing");byId("last-run-label").textContent=t("updatedNow");};if(!animated){execute();return;}button.classList.add("is-analyzing");byId("last-run-label").textContent=t("analyzing");state.analyzeTimer=setTimeout(execute,360);}
function queueLiveAnalysis(){if(!byId("live-analysis")?.checked)return;clearTimeout(state.analyzeTimer);state.analyzeTimer=setTimeout(()=>runAnalysis(),90);}
function applyRecommended(){if(!state.recommended)return;const p=state.recommended;if(byId(p.preset))byId(p.preset).checked=true;if([...byId("rt").options].some(o=>o.value===p.rt))byId("rt").value=p.rt;if([...byId("upscaling").options].some(o=>o.value===p.upscaling))byId("upscaling").value=p.upscaling;if(!byId("frame-generation").disabled)byId("frame-generation").checked=Boolean(p.frameGen);updateFrameGenLabel();runAnalysis({animated:true});showToast(t("appliedProfile"));}
function serializeBuild(){return{cpu:byId("cpu").value,gpu:byId("gpu").value,ram:byId("ram").value,storage:byId("storage").value,resolution:byId("resolution").value,os:byId("os").value,target:byId("target-fps").value,game:state.game,preset:getPreset(),rt:byId("rt").value,upscaling:byId("upscaling").value,frameGen:byId("frame-generation").checked,savedAt:new Date().toISOString()};}
function saveBuild(){localStorage.setItem("frameforge-v2-build",JSON.stringify(serializeBuild()));showToast(t("buildSaved"));}
function restoreBuild(data){if(!data)return;if(CPU_DATA.some(x=>x.id===data.cpu))byId("cpu").value=data.cpu;if(GPU_DATA.some(x=>x.id===data.gpu))byId("gpu").value=data.gpu;if(data.ram)byId("ram").value=data.ram;if(data.storage)byId("storage").value=data.storage;if(data.resolution)byId("resolution").value=data.resolution;if(data.os)byId("os").value=data.os;if(data.target)byId("target-fps").value=data.target;updateHardwareMeta();selectGame(data.game||"cyberpunk",false);if(data.preset&&byId(data.preset))byId(data.preset).checked=true;if([...byId("rt").options].some(o=>o.value===data.rt))byId("rt").value=data.rt;populateUpscalingOptions();if([...byId("upscaling").options].some(o=>o.value===data.upscaling))byId("upscaling").value=data.upscaling;if(!byId("frame-generation").disabled)byId("frame-generation").checked=Boolean(data.frameGen);updateFrameGenLabel();runAnalysis();}
function openSavedBuild(){let saved=null;try{saved=JSON.parse(localStorage.getItem("frameforge-v2-build"));}catch(_){saved=null;}if(!saved){openModal({title:t("savedBuildTitle"),body:`<p>${t("noSavedBuild")}</p>`,actions:[{label:t("close"),className:"button-ghost",close:true}]});return;}const cpu=getCpu(saved.cpu),gpu=getGpu(saved.gpu),game=getGame(saved.game),body=`<p>${t("savedAt")}</p><ul class="modal-list"><li><strong>${cpu.name}</strong></li><li><strong>${gpu.name}</strong></li><li><strong>${game.title}</strong> · ${RESOLUTIONS[saved.resolution]?.label||saved.resolution} · ${saved.target} FPS</li></ul>`;openModal({title:t("savedBuildTitle"),body,actions:[{label:t("close"),className:"button-ghost",close:true},{label:t("restoreBuild"),className:"button-primary",onClick:()=>{restoreBuild(saved);closeModal();}}]});}
function detectBrowserSignals(){let renderer=t("unavailable");try{const canvas=document.createElement("canvas"),gl=canvas.getContext("webgl")||canvas.getContext("experimental-webgl"),ext=gl?.getExtension("WEBGL_debug_renderer_info");if(gl&&ext)renderer=gl.getParameter(ext.UNMASKED_RENDERER_WEBGL)||renderer;}catch(_){}return{cores:navigator.hardwareConcurrency||null,memory:navigator.deviceMemory||null,renderer,platform:navigator.userAgentData?.platform||navigator.platform||t("unavailable")};}
function openQuickScan(){const s=detectBrowserSignals(),displayMemory=s.memory?`${s.memory} GB`:t("unavailable"),body=`<p>${t("scanIntro")}</p><div class="scan-grid"><div class="scan-cell"><span>${t("logicalCores")}</span><strong>${s.cores??t("unavailable")}</strong></div><div class="scan-cell"><span>${t("approxMemory")}</span><strong>${displayMemory}</strong></div><div class="scan-cell"><span>${t("graphicsRenderer")}</span><strong>${s.renderer}</strong></div><div class="scan-cell"><span>${t("platform")}</span><strong>${s.platform}</strong></div></div><p>${t("scanLimits")}</p>`;openModal({kicker:t("scanKicker"),title:t("scanTitle"),body,actions:[{label:t("close"),className:"button-ghost",close:true},{label:t("applyDetected"),className:"button-primary",onClick:()=>{applyDetectedSignals(s);closeModal();}}]});}
function applyDetectedSignals(s){if(s.memory){byId("ram").value=s.memory>=48?"64":s.memory>=24?"32":"16";}const renderer=String(s.renderer||"").toLowerCase();const match=GPU_DATA.find(gpu=>renderer.includes(gpu.name.toLowerCase().replace("nvidia geforce ","").replace("amd radeon ","")));if(match)byId("gpu").value=match.id;byId("build-mode-badge").textContent="QUICK SCAN";populateUpscalingOptions();runAnalysis({animated:true});showToast(t("scanApplied"));}
function openHowItWorks(){openModal({title:t("howTitle"),body:`<p>${t("howBody1")}</p><p>${t("howBody2")}</p>`,actions:[{label:t("close"),className:"button-primary",close:true}]});}
function openMethodology(){openModal({title:t("methodologyTitle"),body:`<p>${t("howBody1")}</p><ul class="modal-list"><li>GPU score × game workload × resolution × preset</li><li>Ray tracing + upscaling + frame generation modifiers</li><li>CPU frame ceiling and CPU-heavy game profile</li><li>VRAM, RAM and storage pressure penalties</li><li>1% low and smoothness derived from workload stability</li></ul><p>${t("howBody2")}</p>`,actions:[{label:t("close"),className:"button-primary",close:true}]});}
function openMarketInfo(){openModal({title:t("marketTitle"),body:`<p>${t("marketBody")}</p>`,actions:[{label:t("close"),className:"button-primary",close:true}]});}
function openUpgradeComparison(){const current=state.lastResult,upgrade=state.upgrade;if(!current||!upgrade)return;if(!upgrade.result){openModal({title:t("compareTitle"),body:`<p>${t("upgradeOptional")}</p>`,actions:[{label:t("close"),className:"button-primary",close:true}]});return;}openModal({title:t("compareTitle"),body:`<p>${upgrade.reason}</p><div class="compare-grid"><div class="compare-card"><span>${t("currentBuild")}</span><strong>${round(current.fps)} FPS</strong><small>${current.gpu.name}</small></div><div class="compare-arrow">→</div><div class="compare-card"><span>${t("upgradedBuild")}</span><strong>${round(upgrade.result.fps)} FPS</strong><small>${upgrade.name}</small></div></div>`,actions:[{label:t("close"),className:"button-primary",close:true}]});}
function openModal({kicker="FRAMEFORGE V2",title,body,actions=[]}){byId("modal-kicker").textContent=kicker;byId("modal-title").textContent=title;byId("modal-body").innerHTML=body;const box=byId("modal-actions");box.innerHTML="";actions.forEach(action=>{const button=document.createElement("button");button.type="button";button.className=`button ${action.className||"button-ghost"}`;button.textContent=action.label;button.addEventListener("click",action.close?closeModal:action.onClick);box.appendChild(button);});byId("modal-backdrop").hidden=false;}
function closeModal(){byId("modal-backdrop").hidden=true;}
function showToast(message){const toast=byId("toast");toast.textContent=message;toast.classList.add("is-visible");clearTimeout(state.toastTimer);state.toastTimer=setTimeout(()=>toast.classList.remove("is-visible"),2300);}
function applyLanguage(language,rerender=true){state.language=language==="fr"?"fr":"en";document.documentElement.lang=state.language;localStorage.setItem("frameforge-language",state.language);$$('[data-i18n]').forEach(el=>{const key=el.dataset.i18n;if(translations[state.language][key])el.textContent=translations[state.language][key];});$$('[data-i18n-placeholder]').forEach(el=>{const key=el.dataset.i18nPlaceholder;if(translations[state.language][key])el.placeholder=translations[state.language][key];});byId("language-selector").value=state.language;populateRtOptions();populateUpscalingOptions();selectGame(state.game,false);if(rerender)runAnalysis();}
function wireEvents(){byId("language-selector").addEventListener("change",e=>applyLanguage(e.target.value));byId("cpu").addEventListener("change",()=>{updateHardwareMeta();queueLiveAnalysis();});byId("gpu").addEventListener("change",()=>{updateHardwareMeta();populateUpscalingOptions();queueLiveAnalysis();});["ram","storage","resolution","target-fps"].forEach(id=>byId(id).addEventListener("change",queueLiveAnalysis));$$('input[name="preset"]').forEach(r=>r.addEventListener("change",queueLiveAnalysis));byId("rt").addEventListener("change",queueLiveAnalysis);byId("upscaling").addEventListener("change",queueLiveAnalysis);byId("frame-generation").addEventListener("change",()=>{updateFrameGenLabel();queueLiveAnalysis();});byId("live-analysis").addEventListener("change",()=>{if(byId("live-analysis").checked)runAnalysis();});byId("analyze-btn").addEventListener("click",()=>runAnalysis({animated:true}));byId("apply-recommended-btn").addEventListener("click",applyRecommended);byId("save-build-btn").addEventListener("click",saveBuild);byId("saved-builds-btn").addEventListener("click",openSavedBuild);byId("scan-pc-btn").addEventListener("click",openQuickScan);byId("how-it-works-btn").addEventListener("click",openHowItWorks);byId("methodology-btn").addEventListener("click",openMethodology);byId("market-info-btn").addEventListener("click",openMarketInfo);byId("compare-upgrade-btn").addEventListener("click",openUpgradeComparison);byId("modal-close").addEventListener("click",closeModal);byId("modal-backdrop").addEventListener("click",e=>{if(e.target===byId("modal-backdrop"))closeModal();});document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!byId("modal-backdrop").hidden)closeModal();});const search=byId("game-search");search.addEventListener("focus",()=>renderGameSearch(search.value));search.addEventListener("input",()=>renderGameSearch(search.value));document.addEventListener("click",e=>{if(!e.target.closest(".game-search-wrap"))byId("game-search-results").hidden=true;});}
function init(){populateHardware();wireEvents();state.language=localStorage.getItem("frameforge-language")==="fr"?"fr":"en";selectGame("cyberpunk",false);applyLanguage(state.language,false);byId("game-count").textContent=GAME_DATA.length;runAnalysis();}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();