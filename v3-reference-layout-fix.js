/* FrameForge V3 — reference card spacing fix */
(() => {
  if (document.getElementById("frameforge-reference-layout-fix")) return;

  const style = document.createElement("style");
  style.id = "frameforge-reference-layout-fix";
  style.textContent = `
    .official-reference-panel.reference-compact .reference-hardware-row {
      grid-template-columns: 6px minmax(68px, max-content) minmax(0, 1fr);
      column-gap: 9px;
    }

    .official-reference-panel.reference-compact .reference-hardware-row b {
      min-width: 0;
      white-space: nowrap;
    }

    .official-reference-panel.reference-compact .reference-hardware-row strong {
      min-width: 0;
      padding-left: 1px;
    }

    @media (max-width: 760px) {
      .official-reference-panel.reference-compact .reference-hardware-row {
        grid-template-columns: 6px 72px minmax(0, 1fr);
      }
    }
  `;

  document.head.appendChild(style);
})();
