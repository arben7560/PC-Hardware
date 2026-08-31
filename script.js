(() => {
  const files = [
    "v3-data.js",
    "v3-engine-core.js",
    "v3-engine-model.js",
    "v3-framegen-engine.js",
    "v3-engine-render.js",
    "v3-ux-polish.js",
    "v3-fps-help.js",
    "v3-app.js",
    "v3-framegen-ui.js",
    "v3-copy-audit.js",
    "nav-focus.js",
    "responsive-layout.js"
  ];

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = false;
      script.onload = resolve;
      script.onerror = () => reject(new Error(`FrameForge V3: impossible de charger ${src}`));
      document.body.appendChild(script);
    });
  }

  (async () => {
    for (const file of files) {
      await loadScript(file);
    }
  })().catch((error) => {
    console.error(error);
  });
})();
