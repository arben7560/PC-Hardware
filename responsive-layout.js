(() => {
  const STYLE_ID = "frameforge-responsive-layout";
  if (document.getElementById(STYLE_ID)) return;

  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `
    /* =====================================================
       FRAMEFORGE — COMPACT / RESPONSIVE LAYOUT
       Keeps the wide desktop layout untouched above 1366px.
    ===================================================== */

    @media (max-width: 1366px) {
      body {
        min-width: 0;
      }

      .site-shell {
        width: calc(100% - 28px);
        max-width: 1338px;
      }

      [id] {
        scroll-margin-top: 94px !important;
      }

      .topbar {
        height: 74px;
        grid-template-columns: auto minmax(0, 1fr) auto;
        column-gap: 16px;
      }

      .brand {
        gap: 9px;
      }

      .brand-mark {
        width: 34px;
        height: 34px;
      }

      .brand-copy strong {
        font-size: 13px;
      }

      .brand-copy small {
        font-size: 7px;
        letter-spacing: .11em;
      }

      .main-nav {
        justify-content: center;
        gap: clamp(13px, 1.45vw, 21px);
        min-width: 0;
      }

      .main-nav a {
        padding: 27px 0 25px;
        font-size: 10.5px;
        white-space: nowrap;
      }

      .topbar-actions {
        gap: 6px;
      }

      .language-switcher {
        height: 38px;
        padding: 0 7px;
      }

      .language-selector {
        min-width: 84px;
        min-height: 34px;
        font-size: 9px;
      }

      .compact-action {
        min-height: 38px;
        padding-inline: 11px;
        font-size: 10px;
      }

      .hero {
        min-height: 218px;
        padding: 30px 0 26px;
        gap: 24px;
      }

      .hero-copy {
        max-width: 650px;
      }

      .hero h1 {
        font-size: clamp(39px, 3.5vw, 48px);
      }

      .hero-copy > p {
        max-width: 620px;
        font-size: 12px;
        line-height: 1.6;
      }

      .hero-status {
        padding: 14px 10px;
        border-radius: 15px;
      }

      .status-item {
        min-width: 103px;
        padding: 0 11px;
      }

      .status-item strong {
        font-size: 16px;
      }

      .lab-toolbar {
        min-height: 70px;
        padding: 12px 15px;
        grid-template-columns: minmax(230px, 1.2fr) 145px 205px auto;
        gap: 12px;
      }

      .live-toggle-wrap {
        padding-left: 13px;
      }

      .workspace {
        grid-template-columns: 330px minmax(0, 1fr);
        gap: 12px;
      }

      .content-stack {
        gap: 12px;
      }

      .builder-panel {
        top: 88px;
        padding: 20px;
      }

      .game-target-panel,
      .performance-panel,
      .official-reference-panel {
        padding: 20px;
      }

      .panel-heading,
      .performance-topline,
      .insight-heading {
        gap: 13px;
      }

      .game-search-wrap {
        width: 235px;
      }

      .game-search-results {
        width: min(330px, calc(100vw - 42px));
      }

      .game-selector {
        margin-top: 17px;
        grid-template-columns: 205px minmax(0, 1fr);
        gap: 16px;
      }

      .game-cover {
        min-height: 184px;
      }

      .game-title-row h3 {
        font-size: 22px;
      }

      .target-controls {
        margin-top: 20px;
        gap: 8px;
      }

      .performance-grid {
        gap: 10px;
      }

      .fps-card {
        padding: 17px;
        grid-template-columns: 170px minmax(0, 1fr);
        gap: 13px;
      }

      .fps-orbit {
        height: 166px;
      }

      .fps-orbit::before {
        width: 148px;
        height: 148px;
      }

      .fps-orbit::after {
        width: 164px;
        height: 164px;
      }

      .fps-ring {
        width: 130px;
        height: 130px;
      }

      .fps-value strong {
        font-size: 38px;
      }

      .metrics-card {
        padding: 16px;
      }

      .reference-header {
        gap: 16px;
      }

      .reference-main-grid {
        gap: 10px;
      }

      .reference-anchor-card > div {
        min-height: 88px;
        padding: 13px;
      }

      .ratio-grid {
        gap: 7px;
      }

      .ratio-grid article {
        min-height: 80px;
        padding: 12px;
      }

      .reference-equation {
        gap: 16px;
      }
    }

    @media (max-width: 1180px) {
      .site-shell {
        width: calc(100% - 24px);
      }

      .brand-copy small {
        display: none;
      }

      .main-nav {
        gap: 13px;
      }

      .main-nav a {
        font-size: 10px;
      }

      #saved-builds-btn {
        padding-inline: 9px;
      }

      .lab-toolbar {
        grid-template-columns: minmax(210px, 1fr) 135px 190px auto;
        gap: 9px;
      }

      .workspace {
        grid-template-columns: 300px minmax(0, 1fr);
      }

      .builder-panel {
        padding: 18px;
      }

      .hardware-field {
        grid-template-columns: 40px minmax(0, 1fr);
        gap: 9px;
      }

      .hardware-icon {
        height: 40px;
      }

      .game-selector {
        grid-template-columns: 180px minmax(0, 1fr);
      }

      .game-cover {
        min-height: 168px;
      }

      .target-controls {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .performance-grid {
        grid-template-columns: minmax(0, 1.35fr) minmax(220px, .72fr);
      }

      .fps-card {
        grid-template-columns: 150px minmax(0, 1fr);
      }

      .fps-orbit {
        height: 150px;
      }

      .fps-orbit::before {
        width: 134px;
        height: 134px;
      }

      .fps-orbit::after {
        width: 148px;
        height: 148px;
      }

      .fps-ring {
        width: 118px;
        height: 118px;
      }

      .fps-value strong {
        font-size: 34px;
      }

      .reference-main-grid {
        grid-template-columns: 1fr;
      }

      .reference-anchor-card {
        grid-template-columns: .8fr 1fr 1.1fr;
      }

      .ratio-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    @media (max-width: 1024px) {
      [id] {
        scroll-margin-top: 128px !important;
      }

      .topbar {
        height: auto;
        min-height: 108px;
        padding: 9px 0 0;
        grid-template-columns: auto 1fr;
        grid-template-rows: 42px auto;
        row-gap: 5px;
      }

      .brand {
        grid-column: 1;
        grid-row: 1;
      }

      .topbar-actions {
        grid-column: 2;
        grid-row: 1;
      }

      .main-nav {
        grid-column: 1 / -1;
        grid-row: 2;
        width: 100%;
        justify-content: flex-start;
        gap: 24px;
        overflow-x: auto;
        scrollbar-width: none;
        border-top: 1px solid rgba(255,255,255,.045);
      }

      .main-nav::-webkit-scrollbar {
        display: none;
      }

      .main-nav a {
        flex: 0 0 auto;
        padding: 12px 0 14px;
      }

      .hero {
        align-items: stretch;
        flex-direction: column;
        gap: 18px;
      }

      .hero-copy {
        max-width: 760px;
      }

      .hero-status {
        align-self: stretch;
        justify-content: space-between;
      }

      .status-item {
        flex: 1 1 0;
      }

      .lab-toolbar {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 12px 18px;
      }

      .lab-toolbar-copy {
        grid-column: 1 / -1;
      }

      .run-state {
        justify-content: flex-start;
      }

      .workspace {
        grid-template-columns: 1fr;
      }

      .builder-panel {
        position: relative;
        top: auto;
      }

      .hardware-mini-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .game-selector {
        grid-template-columns: 210px minmax(0, 1fr);
      }

      .performance-grid {
        grid-template-columns: 1fr;
      }

      .fps-card {
        grid-template-columns: 180px minmax(0, 1fr);
      }

      .reference-equation {
        align-items: flex-start;
        flex-direction: column;
        gap: 7px;
      }

      .reference-equation p {
        text-align: left;
      }

      .methodology-live {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    @media (max-width: 760px) {
      .site-shell {
        width: calc(100% - 18px);
      }

      [id] {
        scroll-margin-top: 124px !important;
      }

      .topbar-actions {
        gap: 4px;
      }

      #saved-builds-btn {
        display: none;
      }

      .language-switcher {
        min-width: 0;
      }

      .language-selector {
        width: 78px;
        min-width: 0;
      }

      .compact-action {
        padding-inline: 9px;
      }

      .hero {
        padding-top: 24px;
      }

      .hero h1 {
        font-size: clamp(34px, 9vw, 42px);
      }

      .hero-status {
        overflow-x: auto;
      }

      .status-item {
        min-width: 112px;
      }

      .hero-actions {
        flex-wrap: wrap;
      }

      .lab-toolbar {
        grid-template-columns: 1fr;
      }

      .lab-toolbar-copy,
      .goal-control,
      .live-toggle-wrap,
      .run-state {
        grid-column: 1;
      }

      .live-toggle-wrap {
        padding: 10px 0 0;
        border-left: 0;
        border-top: 1px solid var(--line);
      }

      .hardware-mini-grid {
        grid-template-columns: 1fr;
      }

      .game-heading {
        align-items: stretch;
        flex-direction: column;
      }

      .game-search-wrap {
        width: 100%;
      }

      .game-search-results {
        left: 0;
        right: auto;
        width: 100%;
      }

      .game-selector {
        grid-template-columns: 1fr;
      }

      .game-cover {
        min-height: 190px;
      }

      .game-title-row {
        align-items: flex-start;
        flex-direction: column;
      }

      .game-rating {
        text-align: left;
      }

      .target-controls {
        grid-template-columns: 1fr;
      }

      .fps-card {
        grid-template-columns: 1fr;
        text-align: left;
      }

      .fps-orbit {
        height: 150px;
      }

      .fps-meta {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }

      .reference-header {
        align-items: stretch;
        flex-direction: column;
      }

      .reference-source-link {
        width: max-content;
        max-width: 100%;
      }

      .reference-anchor-card {
        grid-template-columns: 1fr;
      }

      .reference-anchor-card > div + div {
        border-left: 0;
        border-top: 1px solid var(--line);
      }

      .reference-help-tooltip {
        left: 0;
        width: min(320px, calc(100vw - 36px));
        transform: translate(0, 6px);
      }

      .reference-help-wrap:hover .reference-help-tooltip,
      .reference-help-wrap:focus-within .reference-help-tooltip {
        transform: translate(0, 0);
      }

      .reference-help-tooltip::after {
        left: 11px;
      }

      .ratio-grid,
      .methodology-live {
        grid-template-columns: 1fr 1fr;
      }
    }

    @media (max-width: 520px) {
      .brand-copy strong {
        font-size: 11px;
      }

      .brand-mark {
        width: 31px;
        height: 31px;
      }

      .main-nav {
        gap: 20px;
      }

      .ratio-grid,
      .methodology-live,
      .fps-meta {
        grid-template-columns: 1fr;
      }

      .game-target-panel,
      .performance-panel,
      .official-reference-panel,
      .builder-panel {
        padding: 16px;
      }
    }
  `;

  document.head.appendChild(style);
})();
