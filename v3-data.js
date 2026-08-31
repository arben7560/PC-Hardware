const CPU_DATA = [
  { id: "i3-7100", name: "Intel Core i3-7100", score: 30, threads: 4, coresLabel: "2C / 4T", boost: "3.9 GHz", selectable: false },
  { id: "i3-8100", name: "Intel Core i3-8100", score: 38, threads: 4, coresLabel: "4C / 4T", boost: "3.6 GHz", selectable: false },
  { id: "i5-4670k", name: "Intel Core i5-4670K", score: 35, threads: 4, coresLabel: "4C / 4T", boost: "3.8 GHz", selectable: false },
  { id: "i7-4770k", name: "Intel Core i7-4770K", score: 40, threads: 8, coresLabel: "4C / 8T", boost: "3.9 GHz", selectable: false },
  { id: "i7-6700", name: "Intel Core i7-6700", score: 48, threads: 8, coresLabel: "4C / 8T", boost: "4.0 GHz", selectable: false },
  { id: "i7-7700k", name: "Intel Core i7-7700K", score: 56, threads: 8, coresLabel: "4C / 8T", boost: "4.5 GHz", selectable: false },
  { id: "i5-8400", name: "Intel Core i5-8400", score: 52, threads: 6, coresLabel: "6C / 6T", boost: "4.0 GHz", selectable: false },
  { id: "i5-8600", name: "Intel Core i5-8600", score: 56, threads: 6, coresLabel: "6C / 6T", boost: "4.3 GHz", selectable: false },
  { id: "i7-8700", name: "Intel Core i7-8700", score: 62, threads: 12, coresLabel: "6C / 12T", boost: "4.6 GHz", selectable: false },
  { id: "i7-9700", name: "Intel Core i7-9700", score: 70, threads: 8, coresLabel: "8C / 8T", boost: "4.7 GHz", selectable: false },
  { id: "i7-9700k", name: "Intel Core i7-9700K", score: 72, threads: 8, coresLabel: "8C / 8T", boost: "4.9 GHz", selectable: false },
  { id: "i5-11400", name: "Intel Core i5-11400", score: 72, threads: 12, coresLabel: "6C / 12T", boost: "4.4 GHz", selectable: false },
  { id: "i5-11600k", name: "Intel Core i5-11600K", score: 79, threads: 12, coresLabel: "6C / 12T", boost: "4.9 GHz", selectable: false },
  { id: "i7-11700", name: "Intel Core i7-11700", score: 83, threads: 16, coresLabel: "8C / 16T", boost: "4.9 GHz", selectable: false },
  { id: "i5-12400f", name: "Intel Core i5-12400F", score: 78, threads: 12, coresLabel: "6C / 12T", boost: "4.4 GHz" },
  { id: "i5-12600k", name: "Intel Core i5-12600K", score: 93, threads: 16, coresLabel: "10C / 16T", boost: "4.9 GHz" },
  { id: "i7-12700", name: "Intel Core i7-12700", score: 98, threads: 20, coresLabel: "12C / 20T", boost: "4.9 GHz", selectable: false },
  { id: "i7-12700k", name: "Intel Core i7-12700K", score: 100, threads: 20, coresLabel: "12C / 20T", boost: "5.0 GHz", selectable: false },
  { id: "i7-12700kf", name: "Intel Core i7-12700KF", score: 100, threads: 20, coresLabel: "12C / 20T", boost: "5.0 GHz" },
  { id: "i9-12900", name: "Intel Core i9-12900", score: 106, threads: 24, coresLabel: "16C / 24T", boost: "5.1 GHz", selectable: false },
  { id: "i9-12900k", name: "Intel Core i9-12900K", score: 108, threads: 24, coresLabel: "16C / 24T", boost: "5.2 GHz" },
  { id: "i5-14600k", name: "Intel Core i5-14600K", score: 114, threads: 20, coresLabel: "14C / 20T", boost: "5.3 GHz" },
  { id: "r3-1200", name: "AMD Ryzen 3 1200", score: 28, threads: 4, coresLabel: "4C / 4T", boost: "3.4 GHz", selectable: false },
  { id: "r3-1300x", name: "AMD Ryzen 3 1300X", score: 31, threads: 4, coresLabel: "4C / 4T", boost: "3.7 GHz", selectable: false },
  { id: "r3-3100", name: "AMD Ryzen 3 3100", score: 45, threads: 8, coresLabel: "4C / 8T", boost: "3.9 GHz", selectable: false },
  { id: "r5-1500x", name: "AMD Ryzen 5 1500X", score: 34, threads: 8, coresLabel: "4C / 8T", boost: "3.7 GHz", selectable: false },
  { id: "r5-1600", name: "AMD Ryzen 5 1600", score: 38, threads: 12, coresLabel: "6C / 12T", boost: "3.6 GHz", selectable: false },
  { id: "r7-2700x", name: "AMD Ryzen 7 2700X", score: 48, threads: 16, coresLabel: "8C / 16T", boost: "4.3 GHz", selectable: false },
  { id: "r5-3600", name: "AMD Ryzen 5 3600", score: 55, threads: 12, coresLabel: "6C / 12T", boost: "4.2 GHz", selectable: false },
  { id: "r5-3600x", name: "AMD Ryzen 5 3600X", score: 57, threads: 12, coresLabel: "6C / 12T", boost: "4.4 GHz", selectable: false },
  { id: "r7-3700x", name: "AMD Ryzen 7 3700X", score: 60, threads: 16, coresLabel: "8C / 16T", boost: "4.4 GHz", selectable: false },
  { id: "r5-5600", name: "AMD Ryzen 5 5600", score: 73, threads: 12, coresLabel: "6C / 12T", boost: "4.4 GHz", selectable: false },
  { id: "r5-5600x", name: "AMD Ryzen 5 5600X", score: 76, threads: 12, coresLabel: "6C / 12T", boost: "4.6 GHz" },
  { id: "r7-5700x", name: "AMD Ryzen 7 5700X", score: 78, threads: 16, coresLabel: "8C / 16T", boost: "4.6 GHz", selectable: false },
  { id: "r9-5900x", name: "AMD Ryzen 9 5900X", score: 82, threads: 24, coresLabel: "12C / 24T", boost: "4.8 GHz", selectable: false },
  { id: "r5-7600", name: "AMD Ryzen 5 7600", score: 94, threads: 12, coresLabel: "6C / 12T", boost: "5.1 GHz" },
  { id: "r7-7800x3d", name: "AMD Ryzen 7 7800X3D", score: 122, threads: 16, coresLabel: "8C / 16T", boost: "5.0 GHz" },
  { id: "r9-7900x", name: "AMD Ryzen 9 7900X", score: 110, threads: 24, coresLabel: "12C / 24T", boost: "5.6 GHz", selectable: false },
  { id: "r7-9800x3d", name: "AMD Ryzen 7 9800X3D", score: 142, threads: 16, coresLabel: "8C / 16T", boost: "5.2 GHz" }
];

const GPU_DATA = [
  { id: "gtx960", name: "NVIDIA GeForce GTX 960 4 GB", raster: 22, rt: 0, vram: 4, brand: "nvidia", gen: 9, frameGen: false, selectable: false },
  { id: "gtx970", name: "NVIDIA GeForce GTX 970 4 GB", raster: 27, rt: 0, vram: 4, brand: "nvidia", gen: 9, frameGen: false, selectable: false },
  { id: "gtx1060", name: "NVIDIA GeForce GTX 1060 6 GB", raster: 32, rt: 0, vram: 6, brand: "nvidia", gen: 10, frameGen: false, selectable: false },
  { id: "gtx1650", name: "NVIDIA GeForce GTX 1650 4 GB", raster: 25, rt: 0, vram: 4, brand: "nvidia", gen: 16, frameGen: false, selectable: false },
  { id: "rtx2060", name: "NVIDIA GeForce RTX 2060 6 GB", raster: 45, rt: 33, vram: 6, brand: "nvidia", gen: 20, frameGen: false, selectable: false },
  { id: "rtx2060s", name: "NVIDIA GeForce RTX 2060 Super 8 GB", raster: 52, rt: 38, vram: 8, brand: "nvidia", gen: 20, frameGen: false, selectable: false },
  { id: "rtx2070s", name: "NVIDIA GeForce RTX 2070 Super 8 GB", raster: 62, rt: 47, vram: 8, brand: "nvidia", gen: 20, frameGen: false, selectable: false },
  { id: "rtx2080ti", name: "NVIDIA GeForce RTX 2080 Ti 11 GB", raster: 78, rt: 60, vram: 11, brand: "nvidia", gen: 20, frameGen: false, selectable: false },
  { id: "rtx3060", name: "NVIDIA GeForce RTX 3060 12 GB", raster: 53, rt: 45, vram: 12, brand: "nvidia", gen: 30, frameGen: false },
  { id: "rtx3060ti", name: "NVIDIA GeForce RTX 3060 Ti 8 GB", raster: 68, rt: 60, vram: 8, brand: "nvidia", gen: 30, frameGen: false },
  { id: "rtx3070", name: "NVIDIA GeForce RTX 3070 8 GB", raster: 75, rt: 68, vram: 8, brand: "nvidia", gen: 30, frameGen: false },
  { id: "rtx3080", name: "NVIDIA GeForce RTX 3080 10 GB", raster: 100, rt: 100, vram: 10, brand: "nvidia", gen: 30, frameGen: false },
  { id: "rtx3080ti", name: "NVIDIA GeForce RTX 3080 Ti 12 GB", raster: 109, rt: 110, vram: 12, brand: "nvidia", gen: 30, frameGen: false },
  { id: "rtx4070", name: "NVIDIA GeForce RTX 4070 12 GB", raster: 98, rt: 105, vram: 12, brand: "nvidia", gen: 40, frameGen: true },
  { id: "rtx4070ti", name: "NVIDIA GeForce RTX 4070 Ti 12 GB", raster: 129, rt: 135, vram: 12, brand: "nvidia", gen: 40, frameGen: true },
  { id: "rtx4080", name: "NVIDIA GeForce RTX 4080 16 GB", raster: 159, rt: 170, vram: 16, brand: "nvidia", gen: 40, frameGen: true },
  { id: "rtx4090", name: "NVIDIA GeForce RTX 4090 24 GB", raster: 215, rt: 232, vram: 24, brand: "nvidia", gen: 40, frameGen: true },
  { id: "rtx5070", name: "NVIDIA GeForce RTX 5070 12 GB", raster: 126, rt: 136, vram: 12, brand: "nvidia", gen: 50, frameGen: true, price: 649 },
  { id: "rtx5070ti", name: "NVIDIA GeForce RTX 5070 Ti 16 GB", raster: 158, rt: 168, vram: 16, brand: "nvidia", gen: 50, frameGen: true, price: 729 },
  { id: "rtx5080", name: "NVIDIA GeForce RTX 5080 16 GB", raster: 188, rt: 202, vram: 16, brand: "nvidia", gen: 50, frameGen: true, price: 1099 },
  { id: "rtx5090", name: "NVIDIA GeForce RTX 5090 32 GB", raster: 258, rt: 282, vram: 32, brand: "nvidia", gen: 50, frameGen: true, price: 2199 },
  { id: "rx5500xt", name: "AMD Radeon RX 5500 XT 8 GB", raster: 27, rt: 0, vram: 8, brand: "amd", gen: 5000, frameGen: false, selectable: false },
  { id: "rx5600xt", name: "AMD Radeon RX 5600 XT 6 GB", raster: 40, rt: 0, vram: 6, brand: "amd", gen: 5000, frameGen: false, selectable: false },
  { id: "rx5700", name: "AMD Radeon RX 5700 8 GB", raster: 45, rt: 0, vram: 8, brand: "amd", gen: 5000, frameGen: false, selectable: false },
  { id: "rx5700xt", name: "AMD Radeon RX 5700 XT 8 GB", raster: 51, rt: 0, vram: 8, brand: "amd", gen: 5000, frameGen: false, selectable: false },
  { id: "rx6800", name: "AMD Radeon RX 6800 16 GB", raster: 81, rt: 45, vram: 16, brand: "amd", gen: 6000, frameGen: false, selectable: false },
  { id: "rx6800xt", name: "AMD Radeon RX 6800 XT 16 GB", raster: 95, rt: 55, vram: 16, brand: "amd", gen: 6000, frameGen: false },
  { id: "rx6900xt", name: "AMD Radeon RX 6900 XT 16 GB", raster: 105, rt: 62, vram: 16, brand: "amd", gen: 6000, frameGen: false, selectable: false },
  { id: "rx7800xt", name: "AMD Radeon RX 7800 XT 16 GB", raster: 90, rt: 67, vram: 16, brand: "amd", gen: 7000, frameGen: true, price: 519 },
  { id: "rx7900xt", name: "AMD Radeon RX 7900 XT 20 GB", raster: 135, rt: 90, vram: 20, brand: "amd", gen: 7000, frameGen: true },
  { id: "rx7900xtx", name: "AMD Radeon RX 7900 XTX 24 GB", raster: 155, rt: 102, vram: 24, brand: "amd", gen: 7000, frameGen: true },
  { id: "rx9070xt", name: "AMD Radeon RX 9070 XT 16 GB", raster: 148, rt: 122, vram: 16, brand: "amd", gen: 9000, frameGen: true, price: 699 }
];

const RESOLUTIONS = {
  "720": { label: "1280 × 720", width: 1280, height: 720 },
  "1080": { label: "1920 × 1080", width: 1920, height: 1080 },
  "1440": { label: "2560 × 1440", width: 2560, height: 1440 },
  "uw1440": { label: "3440 × 1440", width: 3440, height: 1440 },
  "4k": { label: "3840 × 2160", width: 3840, height: 2160 }
};

const PRESETS = {
  low: { cost: 0.72, cpuCost: 0.90 },
  medium: { cost: 0.84, cpuCost: 0.95 },
  high: { cost: 1.0, cpuCost: 1.0 },
  ultra: { cost: 1.15, cpuCost: 1.04 }
};

const RT_LEVELS = {
  off: { cost: 1.0, scoreWeight: 0 },
  medium: { cost: 1.32, scoreWeight: 0.45 },
  ultra: { cost: 1.72, scoreWeight: 0.66 },
  path: { cost: 2.62, scoreWeight: 0.86 }
};

const UPSCALERS = {
  native: { label: "Native", renderScale: 1 },
  dlssQuality: { label: "DLSS Quality", renderScale: 0.667 },
  dlssBalanced: { label: "DLSS Balanced", renderScale: 0.588 },
  dlssPerformance: { label: "DLSS Performance", renderScale: 0.5 },
  fsrQuality: { label: "FSR Quality", renderScale: 0.667 },
  fsrBalanced: { label: "FSR Balanced", renderScale: 0.588 },
  fsrPerformance: { label: "FSR Performance", renderScale: 0.5 }
};

const SOURCES = {
  cyberpunk: { publisher: "CD PROJEKT RED", url: "https://www.cyberpunk.net/en/news/48271/update-to-pc-system-requirements", label: "Cyberpunk 2077 PC system requirements" },
  horizon: { publisher: "PlayStation / Nixxes", url: "https://www.playstation.com/en-us/games/horizon-forbidden-west/pc/", label: "Horizon Forbidden West PC requirements" },
  ghost: { publisher: "PlayStation / Nixxes", url: "https://www.playstation.com/en-us/support/games/ghost-of-tsushima-pc/", label: "Ghost of Tsushima PC requirements" },
  spiderman2: { publisher: "PlayStation / Nixxes", url: "https://www.playstation.com/en-us/support/games/marvels-spider-man-2-pc-support/", label: "Marvel's Spider-Man 2 PC requirements" },
  tlou1: { publisher: "PlayStation / Naughty Dog", url: "https://www.playstation.com/en-us/games/the-last-of-us-part-i/pc/", label: "The Last of Us Part I PC requirements" },
  gowr: { publisher: "PlayStation / Santa Monica Studio", url: "https://www.playstation.com/en-us/games/god-of-war-ragnarok/pc/", label: "God of War Ragnarök PC requirements" },
  ratchet: { publisher: "PlayStation / Nixxes", url: "https://www.playstation.com/en-us/games/ratchet-and-clank-rift-apart/pc/", label: "Ratchet & Clank: Rift Apart PC requirements" }
};

const GAME_DATA = [
  {
    id: "cyberpunk", title: "Cyberpunk 2077", cover: "CYBERPUNK", studio: "CD PROJEKT RED", year: 2020,
    tags: ["RPG", "OPEN WORLD", "RAY TRACING"], cpuIntensity: 0.74, threadDemand: 12, lowFactor: 0.76, rtLevel: 3, frameGen: true, source: SOURCES.cyberpunk,
    profiles: [
      { id: "minimum", name: "Minimum", preset: "low", resolution: "1080", fps: 30, cpu: "i7-6700", gpu: "gtx1060", ram: 12, vram: 6, storage: "ssd", rt: "off", upscaling: "native", frameGen: false },
      { id: "recommended", name: "Recommended", preset: "high", resolution: "1080", fps: 60, cpu: "i7-12700", gpu: "rtx2060s", ram: 16, vram: 8, storage: "ssd", rt: "off", upscaling: "native", frameGen: false },
      { id: "ultra", name: "Ultra", preset: "ultra", resolution: "4k", fps: 60, cpu: "i9-12900", gpu: "rtx3080", ram: 20, vram: 12, storage: "nvme", rt: "off", upscaling: "native", frameGen: false },
      { id: "rt-low", name: "Ray Tracing Minimum", preset: "high", resolution: "1080", fps: 30, cpu: "i7-9700", gpu: "rtx2060", ram: 16, vram: 8, storage: "ssd", rt: "medium", upscaling: "native", frameGen: false },
      { id: "rt-ultra", name: "Ray Tracing Recommended", preset: "ultra", resolution: "1080", fps: 60, cpu: "i9-12900", gpu: "rtx3080ti", ram: 20, vram: 12, storage: "nvme", rt: "ultra", upscaling: "native", frameGen: false },
      { id: "overdrive", name: "Ray Tracing Overdrive", preset: "ultra", resolution: "4k", fps: 60, cpu: "i9-12900", gpu: "rtx4080", ram: 24, vram: 16, storage: "nvme", rt: "path", upscaling: "native", upscalingKnown: false, frameGen: true }
    ]
  },
  {
    id: "horizon", title: "Horizon Forbidden West Complete Edition", cover: "HORIZON", studio: "GUERRILLA / NIXXES", year: 2024,
    tags: ["ACTION RPG", "OPEN WORLD", "DLSS / FSR"], cpuIntensity: 0.66, threadDemand: 12, lowFactor: 0.79, rtLevel: 0, frameGen: true, source: SOURCES.horizon,
    profiles: [
      { id: "minimum", name: "Minimum", preset: "low", resolution: "720", fps: 30, cpu: "i3-8100", gpu: "gtx1650", ram: 16, vram: 4, storage: "ssd", rt: "off", upscaling: "native", frameGen: false },
      { id: "recommended", name: "Recommended", preset: "medium", resolution: "1080", fps: 60, cpu: "i5-8600", gpu: "rtx3060", ram: 16, vram: 8, storage: "ssd", rt: "off", upscaling: "native", frameGen: false },
      { id: "high", name: "High", preset: "high", resolution: "1440", fps: 60, cpu: "i7-9700", gpu: "rtx3070", ram: 16, vram: 8, storage: "ssd", rt: "off", upscaling: "native", frameGen: false },
      { id: "very-high", name: "Very High", preset: "ultra", resolution: "4k", fps: 60, cpu: "i7-11700", gpu: "rtx4080", ram: 16, vram: 16, storage: "ssd", rt: "off", upscaling: "native", frameGen: false }
    ]
  },
  {
    id: "ghost", title: "Ghost of Tsushima Director's Cut", cover: "GHOST OF TSUSHIMA", studio: "SUCKER PUNCH / NIXXES", year: 2024,
    tags: ["ACTION", "OPEN WORLD", "ULTRAWIDE"], cpuIntensity: 0.58, threadDemand: 10, lowFactor: 0.81, rtLevel: 0, frameGen: true, source: SOURCES.ghost,
    profiles: [
      { id: "minimum", name: "Minimum", preset: "low", resolution: "720", fps: 30, cpu: "i3-7100", gpu: "gtx960", ram: 8, vram: 4, storage: "hdd", rt: "off", upscaling: "native", frameGen: false },
      { id: "recommended", name: "Recommended", preset: "medium", resolution: "1080", fps: 60, cpu: "i5-8600", gpu: "rtx2060", ram: 16, vram: 6, storage: "ssd", rt: "off", upscaling: "native", frameGen: false },
      { id: "high", name: "High", preset: "high", resolution: "1440", fps: 60, cpu: "i5-11400", gpu: "rtx3070", ram: 16, vram: 8, storage: "ssd", rt: "off", upscaling: "native", frameGen: false },
      { id: "very-high", name: "Very High", preset: "ultra", resolution: "4k", fps: 60, cpu: "i5-11400", gpu: "rtx4080", ram: 16, vram: 16, storage: "ssd", rt: "off", upscaling: "native", frameGen: false }
    ]
  },
  {
    id: "spiderman2", title: "Marvel's Spider-Man 2", cover: "SPIDER-MAN 2", studio: "INSOMNIAC / NIXXES", year: 2025,
    tags: ["ACTION", "OPEN WORLD", "RAY TRACING"], cpuIntensity: 0.79, threadDemand: 14, lowFactor: 0.76, rtLevel: 3, frameGen: true, source: SOURCES.spiderman2,
    profiles: [
      { id: "minimum", name: "Minimum", preset: "low", resolution: "720", fps: 30, cpu: "i3-8100", gpu: "gtx1650", ram: 16, vram: 4, storage: "ssd", rt: "off", upscaling: "native", frameGen: false },
      { id: "recommended", name: "Recommended", preset: "medium", resolution: "1080", fps: 60, cpu: "i5-8400", gpu: "rtx3060", ram: 16, vram: 8, storage: "ssd", rt: "off", upscaling: "native", frameGen: false },
      { id: "high", name: "High", preset: "high", resolution: "1440", fps: 60, cpu: "i5-11400", gpu: "rtx3070", ram: 16, vram: 8, storage: "ssd", rt: "off", upscaling: "native", frameGen: false },
      { id: "rt-high", name: "High Ray Tracing", preset: "high", resolution: "1440", fps: 60, cpu: "i5-11600k", gpu: "rtx4070", ram: 16, vram: 12, storage: "ssd", rt: "medium", upscaling: "native", frameGen: false },
      { id: "rt-very-high", name: "Very High Ray Tracing", preset: "ultra", resolution: "1440", fps: 60, cpu: "i7-12700k", gpu: "rtx4080", ram: 16, vram: 16, storage: "ssd", rt: "ultra", upscaling: "native", frameGen: false },
      { id: "rt-ultimate", name: "Ultimate Ray Tracing", preset: "ultra", resolution: "4k", fps: 60, cpu: "i9-12900k", gpu: "rtx4090", ram: 32, vram: 24, storage: "ssd", rt: "path", upscaling: "native", frameGen: false }
    ]
  },
  {
    id: "tlou1", title: "The Last of Us Part I", cover: "THE LAST OF US", studio: "NAUGHTY DOG", year: 2023,
    tags: ["ACTION", "STORY", "DLSS / FSR"], cpuIntensity: 0.82, threadDemand: 14, lowFactor: 0.72, rtLevel: 0, frameGen: false, source: SOURCES.tlou1,
    profiles: [
      { id: "minimum", name: "Minimum", preset: "low", resolution: "720", fps: 30, cpu: "i7-4770k", gpu: "gtx970", ram: 16, vram: 4, storage: "ssd", rt: "off", upscaling: "native", frameGen: false },
      { id: "recommended", name: "Recommended", preset: "high", resolution: "1080", fps: 60, cpu: "i7-8700", gpu: "rtx3060", ram: 16, vram: 8, storage: "ssd", rt: "off", upscaling: "native", frameGen: false },
      { id: "performance", name: "Performance", preset: "high", resolution: "1440", fps: 60, cpu: "i7-9700k", gpu: "rtx2080ti", ram: 32, vram: 11, storage: "ssd", rt: "off", upscaling: "native", frameGen: false },
      { id: "ultra", name: "Ultra", preset: "ultra", resolution: "4k", fps: 60, cpu: "i5-12600k", gpu: "rtx4080", ram: 32, vram: 16, storage: "ssd", rt: "off", upscaling: "native", frameGen: false }
    ]
  },
  {
    id: "gowr", title: "God of War Ragnarök", cover: "GOD OF WAR", studio: "SANTA MONICA STUDIO", year: 2024,
    tags: ["ACTION", "DLSS / FSR", "NATIVE TARGETS"], cpuIntensity: 0.68, threadDemand: 12, lowFactor: 0.80, rtLevel: 0, frameGen: false, source: SOURCES.gowr,
    profiles: [
      { id: "minimum", name: "Minimum", preset: "low", resolution: "1080", fps: 30, cpu: "i5-4670k", gpu: "gtx1060", ram: 8, vram: 6, storage: "ssd", rt: "off", upscaling: "native", frameGen: false },
      { id: "recommended", name: "Recommended", preset: "medium", resolution: "1080", fps: 60, cpu: "i5-8600", gpu: "rtx2060s", ram: 16, vram: 8, storage: "ssd", rt: "off", upscaling: "native", frameGen: false },
      { id: "high", name: "High", preset: "high", resolution: "1440", fps: 60, cpu: "i7-7700k", gpu: "rtx3070", ram: 16, vram: 8, storage: "ssd", rt: "off", upscaling: "native", frameGen: false },
      { id: "performance", name: "Performance", preset: "high", resolution: "4k", fps: 60, cpu: "i7-7700k", gpu: "rtx3080ti", ram: 16, vram: 12, storage: "ssd", rt: "off", upscaling: "native", frameGen: false },
      { id: "ultra", name: "Ultra", preset: "ultra", resolution: "4k", fps: 60, cpu: "i5-11600k", gpu: "rtx4070ti", ram: 16, vram: 12, storage: "ssd", rt: "off", upscaling: "native", frameGen: false }
    ]
  },
  {
    id: "ratchet", title: "Ratchet & Clank: Rift Apart", cover: "RIFT APART", studio: "INSOMNIAC / NIXXES", year: 2023,
    tags: ["ACTION", "RAY TRACING", "DIRECTSTORAGE"], cpuIntensity: 0.63, threadDemand: 12, lowFactor: 0.79, rtLevel: 2, frameGen: true, source: SOURCES.ratchet,
    profiles: [
      { id: "minimum", name: "Minimum", preset: "low", resolution: "720", fps: 30, cpu: "i3-8100", gpu: "gtx960", ram: 8, vram: 4, storage: "hdd", rt: "off", upscaling: "native", frameGen: false },
      { id: "recommended", name: "Recommended", preset: "medium", resolution: "1080", fps: 60, cpu: "i5-8400", gpu: "rtx2060", ram: 16, vram: 6, storage: "ssd", rt: "off", upscaling: "native", frameGen: false },
      { id: "high", name: "High", preset: "high", resolution: "1440", fps: 60, cpu: "i5-11400", gpu: "rtx3060ti", ram: 16, vram: 8, storage: "ssd", rt: "off", upscaling: "native", frameGen: false },
      { id: "rt-high", name: "High Ray Tracing", preset: "high", resolution: "1440", fps: 60, cpu: "i5-11600k", gpu: "rtx3070", ram: 16, vram: 8, storage: "ssd", rt: "medium", upscaling: "native", frameGen: false },
      { id: "rt-ultimate", name: "Ultimate Ray Tracing", preset: "high", resolution: "4k", fps: 60, cpu: "i7-12700k", gpu: "rtx4080", ram: 32, vram: 16, storage: "ssd", rt: "ultra", upscaling: "native", frameGen: false }
    ]
  }
];

const translations = {
  en: {
    navPerformance: "Performance", navBuilder: "PC Builder", navGames: "Games", navBenchmarks: "References", navDeals: "Upgrades",
    saved: "Saved", scanPC: "Quick scan", heroEyebrow: "OFFICIAL REFERENCE ENGINE · V3", heroTitle1: "Don't ask if it runs.", heroTitle2: "Know why it will.",
    heroDescription: "FrameForge V3 anchors every estimate to an official developer hardware target, then recalculates the workload for your exact CPU, GPU, resolution and settings.",
    startAnalysis: "Start an analysis", howItWorks: "How V3 calculates", modelVersion: "Model", localModel: "official-reference engine", gamesModeled: "Games modeled", interactiveProfiles: "officially anchored", liveEngine: "Engine", online: "LIVE", instantRecalc: "instant recalculation",
    performanceMission: "PERFORMANCE MISSION", defineGoal: "Define what “runs well” means to you.", targetFps: "Target FPS", liveAnalysis: "Live analysis", updatesAsYouTune: "Updates as you tune", readyToAnalyze: "Ready to analyze", analyzing: "Recalculating from official reference...", updatedNow: "Updated just now",
    yourMachine: "01 / YOUR MACHINE", buildYourPC: "Build your PC", manual: "MANUAL", builderDescription: "Select your actual hardware. V3 compares it with the developer's closest official target.", processor: "Processor", graphicsCard: "Graphics card", memory: "Memory", gameStorage: "Game storage", display: "Resolution", operatingSystem: "Operating system", buildHealth: "Build health", cpuGpuBalance: "CPU / GPU balance", memoryHeadroom: "Memory headroom", featureSupport: "Feature support", analyzeBuild: "Analyze this build", saveConfiguration: "+ Save this configuration", estimateDisclaimer: "V3 is anchored to official targets. Results between those targets remain modeled estimates, not measured telemetry.",
    targetGame: "02 / TARGET GAME", whatPlay: "Choose an officially anchored game", searchGame: "Search an anchored game...", performanceProfile: "OFFICIAL TARGET MODEL", referenceSamples: "official reference profiles", modelConfidence: "Estimate confidence", preset: "Preset", medium: "Medium", high: "High", ultra: "Ultra", rayTracing: "Ray tracing", upscaling: "Upscaling", frameGeneration: "Frame generation",
    expectedPerformance: "03 / EXPECTED PERFORMANCE", avgFPS: "AVG FPS", frameTime: "FRAME TIME", gpuLoad: "GPU load est.", cpuLoad: "CPU load est.", vramPressure: "VRAM pressure", primaryLimit: "PRIMARY LIMIT", targetCheck: "TARGET CHECK", scenarioNative: "Native", nativeDetail: "Current preset · no upscaling", scenarioRecommended: "Recommended", scenarioHighRefresh: "High refresh", scenarioMaxVisuals: "Max visuals",
    optimizationRecipe: "OPTIMIZATION RECIPE", bestSettings: "Best settings for your goal", goalFit: "Goal fit", applyRecommended: "Apply recommended profile", framePacing: "FRAME PACING", experienceQuality: "Experience quality", smoothnessScore: "Smoothness score", estimatedStutter: "Estimated stutter", latencyClass: "Latency class", onePercentStability: "1% low stability",
    smartUpgrade: "SMART UPGRADE", needUpgrade: "Do you need to upgrade?", bestNextStep: "BEST NEXT STEP", expectedGain: "EXPECTED GAIN", compareUpgrade: "Compare current vs upgrade", marketIntelligence: "MARKET INTELLIGENCE", hardwarePriceSignal: "Hardware price signal", referencePrice: "reference price", priceContext: "Position", valueScore: "Value score", marketNote: "About market data",
    realWorldData: "OFFICIAL REFERENCE", benchmarkDescription: "V3 selects the closest official developer target, then applies normalized CPU/GPU ratios and workload deltas. The predicted range expands as the requested scenario moves away from that anchor.", median: "Official target", typicalRange: "Predicted range", matchQuality: "Reference match", methodology: "View V3 methodology", performanceModel: "Reference Engine V3 beta", calculationMode: "Calculation", localInstant: "Official anchor + ratios", region: "Region",
    excellent: "Excellent", good: "Good", fair: "Fair", limited: "Limited", full: "Full", partial: "Partial", low: "Low", mediumLabel: "Medium", highLabel: "High", balanced: "Balanced", gpuBound: "GPU bound", cpuBound: "CPU bound", memoryBound: "VRAM pressure", storageBound: "Storage limited", noMajorLimit: "Balanced workload",
    gpuLimitDesc: "The normalized GPU ceiling is below the CPU ceiling for this scenario.", cpuLimitDesc: "The CPU frame ceiling is reached before the GPU's estimated rendering ceiling.", memoryLimitDesc: "Estimated video-memory demand is above the comfortable VRAM budget.", storageLimitDesc: "The official profile expects SSD-class storage; HDD can hurt streaming and 1% lows.", balancedDesc: "The estimated CPU and GPU ceilings are close enough that no single component dominates.",
    ratingExcellent: "EXCELLENT", ratingGreat: "GREAT", ratingGood: "GOOD", ratingPlayable: "PLAYABLE", ratingLimited: "LIMITED", targetMet: "Target reached", targetMissed: "Below target", aboveTarget: "above your target", belowTarget: "below your target",
    perfExcellent: "Excellent headroom for the selected target, based on the closest official hardware anchor.", perfGreat: "Strong estimated performance with useful margin above the selected target.", perfGood: "Comfortable estimate, though heavier scenes can still fall below the average.", perfPlayable: "Playable estimate; reducing one expensive setting should improve consistency.", perfLimited: "The requested workload is materially heavier than what this hardware ratio supports.",
    recUpscaleTitle: "Use smart upscaling", recUpscaleDetail: "Reduce internal pixel workload while keeping the same output resolution.", recRtTitle: "Reduce ray tracing", recRtDetail: "RT increases workload faster than raster performance alone predicts.", recFgTitle: "Enable frame generation", recFgDetail: "Useful once the base rendered frame rate is already stable.", recStorageTitle: "Move the game to SSD", recStorageDetail: "Matches the storage class used by the official target and improves streaming consistency.", recRamTitle: "Increase memory headroom", recRamDetail: "Meet or exceed the RAM amount attached to the closest official profile.", recKeepTitle: "Keep this profile", recKeepDetail: "Your current scenario already fits the selected performance target.", recPresetTitle: "Use High instead of Ultra", recPresetDetail: "Reduces workload while preserving most visual quality.",
    appliedProfile: "Recommended profile applied.", buildSaved: "Configuration saved locally.", noSavedBuild: "No saved configuration yet.", savedBuildTitle: "Saved configuration", restoreBuild: "Restore build", close: "Close", savedAt: "Saved locally in this browser.",
    scanTitle: "Browser quick scan", scanKicker: "LOCAL DEVICE SIGNALS", scanIntro: "Browsers cannot reliably expose an exact CPU model. FrameForge can still read a few local signals without uploading them.", logicalCores: "Logical cores", approxMemory: "Approx. memory", graphicsRenderer: "Graphics renderer", platform: "Platform", unavailable: "Unavailable", scanLimits: "For exact hardware identification, a native helper would still be required.", applyDetected: "Apply detected signals", scanApplied: "Detected browser signals applied where possible.",
    howTitle: "How Reference Engine V3 works", howBody1: "FrameForge first selects the official developer profile closest to your requested resolution, preset and ray-tracing level. That profile provides a real FPS/hardware anchor.", howBody2: "V3 then compares normalized GPU and CPU performance, effective rendered pixels, preset cost, ray-tracing cost, RAM, VRAM and storage. The farther the extrapolation moves from the official anchor, the lower the confidence score.",
    methodologyTitle: "Reference Engine V3 methodology", marketTitle: "Market data", marketBody: "Prices shown in this prototype are static reference values. Live retailer feeds are not connected yet.", compareTitle: "Upgrade comparison", currentBuild: "Current build", upgradedBuild: "With suggested upgrade",
    noUpgradeNeeded: "No upgrade required", upgradeHelpful: "An upgrade can help", upgradeOptional: "Your selected target is already covered. Any upgrade here is optional headroom.", storageUpgradeReason: "The closest official profile expects SSD-class storage; NVMe mainly improves streaming and lows.", cpuUpgradeReason: "The CPU ceiling is the first limit in this scenario.", gpuUpgradeReason: "The GPU ceiling is the first limit in this scenario.",
    priceGood: "GOOD VALUE", priceNeutral: "FAIR", pricePremium: "PREMIUM", similarBuilds: "official anchor", matchHigh: "High", matchMedium: "Medium", matchLow: "Low", goalFitExcellent: "Excellent", goalFitGood: "Good", goalFitWeak: "Needs tuning", stutterLow: "Low", stutterMedium: "Moderate", stutterHigh: "High", latencyFG: "Frame Gen", latencyLow: "Low", latencyNormal: "Normal", stabilityExcellent: "Excellent", stabilityGood: "Good", stabilityFair: "Fair",
    officialReference: "OFFICIAL REFERENCE", closestAnchor: "Closest developer target", verifiedSource: "PUBLISHER SOURCE", publisherTarget: "Publisher target", referenceHardware: "Reference hardware", referenceMatch: "Reference match", openOfficialSource: "Open official source ↗", gpuRatioLabel: "GPU ratio", cpuRatioLabel: "CPU ratio", workloadRatioLabel: "Workload ratio", baseRenderedLabel: "Reference FPS", relativeToReference: "vs official reference", lighterThanReference: "lighter workload", heavierThanReference: "heavier workload", sameWorkload: "similar workload", exactAnchor: "Very close anchor", interpolatedAnchor: "Interpolated from anchor", extrapolatedAnchor: "Wide extrapolation", refFormulaTitle: "Why this number?", refFormulaText: "Official FPS × hardware ratio ÷ workload ratio, then constrained by the CPU frame ceiling.", officialProfilesCount: "official profiles"
  },
  fr: {
    navPerformance: "Performances", navBuilder: "Configurateur", navGames: "Jeux", navBenchmarks: "Références", navDeals: "Améliorations",
    saved: "Sauvegardé", scanPC: "Scan rapide", heroEyebrow: "MOTEUR DE RÉFÉRENCES OFFICIELLES · V3", heroTitle1: "Ne demandez plus s'il tourne.", heroTitle2: "Comprenez pourquoi il tournera.",
    heroDescription: "FrameForge V3 ancre chaque estimation sur une configuration matérielle officielle du développeur, puis recalcule la charge pour votre CPU, GPU, résolution et vos réglages exacts.",
    startAnalysis: "Lancer une analyse", howItWorks: "Comment calcule la V3", modelVersion: "Modèle", localModel: "moteur à références officielles", gamesModeled: "Jeux modélisés", interactiveProfiles: "ancrés officiellement", liveEngine: "Moteur", online: "ACTIF", instantRecalc: "recalcul instantané",
    performanceMission: "OBJECTIF DE PERFORMANCE", defineGoal: "Définissez ce que signifie « bien tourner » pour vous.", targetFps: "Objectif FPS", liveAnalysis: "Analyse en direct", updatesAsYouTune: "Actualisé à chaque réglage", readyToAnalyze: "Prêt à analyser", analyzing: "Recalcul depuis la référence officielle...", updatedNow: "Mis à jour à l'instant",
    yourMachine: "01 / VOTRE MACHINE", buildYourPC: "Configurez votre PC", manual: "MANUEL", builderDescription: "Sélectionnez votre matériel réel. La V3 le compare à la cible officielle la plus proche du développeur.", processor: "Processeur", graphicsCard: "Carte graphique", memory: "Mémoire", gameStorage: "Stockage du jeu", display: "Résolution", operatingSystem: "Système d'exploitation", buildHealth: "État de la configuration", cpuGpuBalance: "Équilibre CPU / GPU", memoryHeadroom: "Marge mémoire", featureSupport: "Technologies prises en charge", analyzeBuild: "Analyser cette configuration", saveConfiguration: "+ Enregistrer cette configuration", estimateDisclaimer: "La V3 est ancrée sur des cibles officielles. Entre ces cibles, les résultats restent des estimations modélisées et non de la télémétrie mesurée.",
    targetGame: "02 / JEU CIBLE", whatPlay: "Choisissez un jeu ancré officiellement", searchGame: "Rechercher un jeu pris en charge...", performanceProfile: "MODÈLE À CIBLE OFFICIELLE", referenceSamples: "profils de référence officiels", modelConfidence: "Confiance de l'estimation", preset: "Qualité", medium: "Moyen", high: "Élevé", ultra: "Ultra", rayTracing: "Ray tracing", upscaling: "Mise à l'échelle", frameGeneration: "Frame Generation",
    expectedPerformance: "03 / PERFORMANCES ESTIMÉES", avgFPS: "FPS MOY.", frameTime: "TEMPS / IMAGE", gpuLoad: "Charge GPU est.", cpuLoad: "Charge CPU est.", vramPressure: "Pression VRAM", primaryLimit: "LIMITE PRINCIPALE", targetCheck: "VÉRIFICATION DE L'OBJECTIF", scenarioNative: "Natif", nativeDetail: "Preset actuel · sans upscaling", scenarioRecommended: "Recommandé", scenarioHighRefresh: "Haut rafraîchissement", scenarioMaxVisuals: "Visuels maximum",
    optimizationRecipe: "OPTIMISATION", bestSettings: "Meilleurs réglages pour votre objectif", goalFit: "Adéquation", applyRecommended: "Appliquer le profil recommandé", framePacing: "RÉGULARITÉ DES IMAGES", experienceQuality: "Qualité de l'expérience", smoothnessScore: "Score de fluidité", estimatedStutter: "Saccades estimées", latencyClass: "Classe de latence", onePercentStability: "Stabilité du 1% low",
    smartUpgrade: "AMÉLIORATION INTELLIGENTE", needUpgrade: "Faut-il améliorer votre PC ?", bestNextStep: "MEILLEURE ÉTAPE", expectedGain: "GAIN ESTIMÉ", compareUpgrade: "Comparer avant / après", marketIntelligence: "ANALYSE DU MARCHÉ", hardwarePriceSignal: "Indication de prix matériel", referencePrice: "prix de référence", priceContext: "Position", valueScore: "Score valeur", marketNote: "À propos des prix",
    realWorldData: "RÉFÉRENCE OFFICIELLE", benchmarkDescription: "La V3 sélectionne la cible officielle du développeur la plus proche, puis applique des ratios CPU/GPU normalisés et l'écart de charge graphique. La plage d'incertitude augmente à mesure que le scénario s'éloigne de cette ancre.", median: "Cible officielle", typicalRange: "Plage estimée", matchQuality: "Correspondance", methodology: "Voir la méthodologie V3", performanceModel: "Reference Engine V3 bêta", calculationMode: "Calcul", localInstant: "Ancre officielle + ratios", region: "Région",
    excellent: "Excellent", good: "Bon", fair: "Correct", limited: "Limité", full: "Complet", partial: "Partiel", low: "Faible", mediumLabel: "Moyen", highLabel: "Élevé", balanced: "Équilibré", gpuBound: "Limité par le GPU", cpuBound: "Limité par le CPU", memoryBound: "Pression VRAM", storageBound: "Limité par le stockage", noMajorLimit: "Charge équilibrée",
    gpuLimitDesc: "Le plafond GPU normalisé est inférieur au plafond CPU pour ce scénario.", cpuLimitDesc: "Le plafond d'images du CPU est atteint avant la capacité de rendu estimée du GPU.", memoryLimitDesc: "Le besoin estimé en mémoire vidéo dépasse la zone confortable de la VRAM.", storageLimitDesc: "Le profil officiel prévoit un stockage de classe SSD ; un HDD peut dégrader le streaming et le 1% low.", balancedDesc: "Les plafonds CPU et GPU estimés sont suffisamment proches pour qu'aucun composant ne domine nettement.",
    ratingExcellent: "EXCELLENT", ratingGreat: "TRÈS BON", ratingGood: "BON", ratingPlayable: "JOUABLE", ratingLimited: "LIMITÉ", targetMet: "Objectif atteint", targetMissed: "Sous l'objectif", aboveTarget: "au-dessus de votre objectif", belowTarget: "sous votre objectif",
    perfExcellent: "Excellente marge pour l'objectif sélectionné, à partir de la référence matérielle officielle la plus proche.", perfGreat: "Très bonne performance estimée avec une marge utile au-dessus de votre objectif.", perfGood: "Estimation confortable, même si les scènes lourdes peuvent descendre sous la moyenne.", perfPlayable: "Estimation jouable ; réduire un réglage coûteux améliorera la constance.", perfLimited: "La charge demandée est sensiblement supérieure à ce que le ratio matériel permet d'estimer.",
    recUpscaleTitle: "Utiliser l'upscaling", recUpscaleDetail: "Réduit le nombre de pixels rendus en interne sans changer la résolution de sortie.", recRtTitle: "Réduire le ray tracing", recRtDetail: "Le RT augmente la charge plus vite que les performances raster seules ne le laissent prévoir.", recFgTitle: "Activer la Frame Generation", recFgDetail: "Utile lorsque le framerate rendu de base est déjà suffisamment stable.", recStorageTitle: "Installer le jeu sur SSD", recStorageDetail: "Correspond au stockage utilisé par la référence officielle et améliore le streaming.", recRamTitle: "Augmenter la marge mémoire", recRamDetail: "Atteignez ou dépassez la quantité de RAM associée au profil officiel le plus proche.", recKeepTitle: "Conserver ce profil", recKeepDetail: "Vos réglages correspondent déjà à l'objectif de performances sélectionné.", recPresetTitle: "Passer d'Ultra à Élevé", recPresetDetail: "Réduit la charge tout en conservant l'essentiel de la qualité visuelle.",
    appliedProfile: "Profil recommandé appliqué.", buildSaved: "Configuration enregistrée localement.", noSavedBuild: "Aucune configuration sauvegardée.", savedBuildTitle: "Configuration sauvegardée", restoreBuild: "Restaurer", close: "Fermer", savedAt: "Enregistrée localement dans ce navigateur.",
    scanTitle: "Scan rapide du navigateur", scanKicker: "SIGNAUX LOCAUX DE L'APPAREIL", scanIntro: "Un navigateur ne peut pas exposer de manière fiable le modèle exact du CPU. FrameForge peut néanmoins lire quelques signaux locaux sans les envoyer.", logicalCores: "Cœurs logiques", approxMemory: "Mémoire approx.", graphicsRenderer: "Renderer graphique", platform: "Plateforme", unavailable: "Indisponible", scanLimits: "Pour une identification matérielle exacte, un petit client natif restera nécessaire.", applyDetected: "Appliquer les signaux détectés", scanApplied: "Signaux du navigateur appliqués lorsque possible.",
    howTitle: "Comment fonctionne Reference Engine V3", howBody1: "FrameForge choisit d'abord le profil officiel du développeur le plus proche de votre résolution, de votre qualité graphique et de votre niveau de ray tracing. Ce profil fournit une véritable ancre FPS + matériel.", howBody2: "La V3 compare ensuite les performances CPU/GPU normalisées, les pixels réellement rendus, le coût du preset, du ray tracing, la RAM, la VRAM et le stockage. Plus l'extrapolation s'éloigne de l'ancre officielle, plus le score de confiance diminue.",
    methodologyTitle: "Méthodologie Reference Engine V3", marketTitle: "Données de marché", marketBody: "Les prix affichés dans ce prototype restent des valeurs statiques de référence. Aucun flux marchand en direct n'est encore connecté.", compareTitle: "Comparaison d'amélioration", currentBuild: "Configuration actuelle", upgradedBuild: "Après amélioration",
    noUpgradeNeeded: "Aucune amélioration nécessaire", upgradeHelpful: "Une amélioration peut aider", upgradeOptional: "Votre objectif est déjà couvert. Une amélioration apporterait uniquement davantage de marge.", storageUpgradeReason: "La référence officielle la plus proche utilise un stockage de classe SSD ; le NVMe améliorera surtout le streaming et les 1% lows.", cpuUpgradeReason: "Le plafond CPU est la première limite dans ce scénario.", gpuUpgradeReason: "Le plafond GPU est la première limite dans ce scénario.",
    priceGood: "BON RAPPORT", priceNeutral: "CORRECT", pricePremium: "PREMIUM", similarBuilds: "ancre officielle", matchHigh: "Élevée", matchMedium: "Moyenne", matchLow: "Faible", goalFitExcellent: "Excellent", goalFitGood: "Bon", goalFitWeak: "À optimiser", stutterLow: "Faibles", stutterMedium: "Modérées", stutterHigh: "Élevées", latencyFG: "Frame Gen", latencyLow: "Faible", latencyNormal: "Normale", stabilityExcellent: "Excellente", stabilityGood: "Bonne", stabilityFair: "Correcte",
    officialReference: "RÉFÉRENCE OFFICIELLE", closestAnchor: "Cible développeur la plus proche", verifiedSource: "SOURCE ÉDITEUR", publisherTarget: "Cible éditeur", referenceHardware: "Matériel de référence", referenceMatch: "Correspondance", openOfficialSource: "Ouvrir la source officielle ↗", gpuRatioLabel: "Ratio GPU", cpuRatioLabel: "Ratio CPU", workloadRatioLabel: "Ratio de charge", baseRenderedLabel: "FPS de référence", relativeToReference: "vs référence officielle", lighterThanReference: "charge plus légère", heavierThanReference: "charge plus lourde", sameWorkload: "charge similaire", exactAnchor: "Ancre très proche", interpolatedAnchor: "Interpolation depuis l'ancre", extrapolatedAnchor: "Extrapolation large", refFormulaTitle: "Pourquoi ce résultat ?", refFormulaText: "FPS officiels × ratio matériel ÷ ratio de charge, puis limitation par le plafond d'images CPU.", officialProfilesCount: "profils officiels"
  }
};
