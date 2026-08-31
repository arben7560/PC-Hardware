(() => {
  const STYLE_ID = "frameforge-nav-focus-style";
  const FLASH_CLASS = "nav-focus-flash";
  const REDUCED_MOTION = window.matchMedia?.("(prefers-reduced-motion: reduce)");
  let clearTimer = null;
  let cancelScrollWait = null;

  function installStyles() {
    if (document.getElementById(STYLE_ID)) return;

    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      [id] {
        scroll-margin-top: 18px;
      }

      .nav-focus-flash {
        isolation: isolate;
      }

      .nav-focus-flash::after {
        content: "";
        position: absolute;
        inset: 0;
        z-index: 40;
        pointer-events: none;
        border-radius: inherit;
        opacity: 0;
        background:
          radial-gradient(circle at 18% 24%, rgba(101,243,255,.25), transparent 40%),
          linear-gradient(105deg, rgba(101,243,255,.06), rgba(139,115,255,.16), rgba(101,243,255,.03));
        box-shadow:
          inset 0 0 0 1px rgba(101,243,255,.5),
          inset 0 0 54px rgba(101,243,255,.10),
          0 0 42px rgba(101,243,255,.10);
        animation: frameforgeTargetFlash 760ms cubic-bezier(.2,.7,.2,1) both;
      }

      @keyframes frameforgeTargetFlash {
        0% {
          opacity: 0;
          filter: brightness(1);
        }
        25% {
          opacity: .95;
          filter: brightness(1.065);
        }
        35% {
          opacity: .95;
          filter: brightness(1.065);
        }
        100% {
          opacity: 0;
          filter: brightness(1);
        }
      }

      .main-nav a.nav-focus-link {
        color: var(--text);
      }

      .main-nav a.nav-focus-link::before {
        content: "";
        position: absolute;
        left: 50%;
        bottom: 7px;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        transform: translateX(-50%);
        background: var(--cyan);
        box-shadow: 0 0 13px rgba(101,243,255,.78);
        animation: frameforgeNavDot 620ms ease-out both;
      }

      @keyframes frameforgeNavDot {
        0% { opacity: 0; transform: translateX(-50%) scale(.55); }
        30% { opacity: 1; transform: translateX(-50%) scale(1); }
        100% { opacity: 0; transform: translateX(-50%) scale(.8); }
      }

      @media (prefers-reduced-motion: reduce) {
        .nav-focus-flash::after {
          animation: none;
          opacity: .22;
        }
        .main-nav a.nav-focus-link::before {
          animation: none;
          opacity: .45;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function getFlashTarget(target) {
    if (!target) return null;
    if (target.id === "builder") return target.querySelector(".builder-panel") || target;
    if (target.id === "upgrade") return target.querySelector(".upgrade-card") || target;
    return target;
  }

  function flashTarget(target, sourceLink = null) {
    const focusTarget = getFlashTarget(target);
    if (!focusTarget) return;

    clearTimeout(clearTimer);
    document.querySelectorAll(`.${FLASH_CLASS}`).forEach((element) => {
      element.classList.remove(FLASH_CLASS);
    });
    document.querySelectorAll(".main-nav a.nav-focus-link").forEach((link) => {
      link.classList.remove("nav-focus-link");
    });

    void focusTarget.offsetWidth;
    focusTarget.classList.add(FLASH_CLASS);
    sourceLink?.classList.add("nav-focus-link");

    const duration = REDUCED_MOTION?.matches ? 500 : 860;
    clearTimer = window.setTimeout(() => {
      focusTarget.classList.remove(FLASH_CLASS);
      sourceLink?.classList.remove("nav-focus-link");
    }, duration);
  }

  function waitForScrollEnd(target, callback) {
    cancelScrollWait?.();

    if (REDUCED_MOTION?.matches) {
      callback();
      return;
    }

    let finished = false;
    let hasScrolled = false;
    let idleTimer = null;
    let noScrollTimer = null;
    let safetyTimer = null;

    const cleanup = () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scrollend", finish);
      document.removeEventListener("scrollend", finish);
      clearTimeout(idleTimer);
      clearTimeout(noScrollTimer);
      clearTimeout(safetyTimer);
      if (cancelScrollWait === cleanup) cancelScrollWait = null;
    };

    const finish = () => {
      if (finished) return;
      finished = true;
      cleanup();
      callback();
    };

    const onScroll = () => {
      hasScrolled = true;
      clearTimeout(idleTimer);
      idleTimer = window.setTimeout(finish, 24);
    };

    cancelScrollWait = cleanup;
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("scrollend", finish, { once: true });
    document.addEventListener("scrollend", finish, { once: true });

    noScrollTimer = window.setTimeout(() => {
      if (!hasScrolled) finish();
    }, 70);

    safetyTimer = window.setTimeout(finish, 1100);
  }

  function handleNavigationClick(event) {
    const link = event.target.closest('.main-nav a[href^="#"]');
    if (!link) return;

    const hash = link.getAttribute("href");
    if (!hash || hash === "#") return;

    const target = document.querySelector(hash);
    if (!target) return;

    waitForScrollEnd(target, () => flashTarget(target, link));
  }

  function flashCurrentHash() {
    if (!window.location.hash) return;
    const target = document.querySelector(window.location.hash);
    if (!target) return;
    const link = document.querySelector(`.main-nav a[href="${CSS.escape(window.location.hash)}"]`);
    waitForScrollEnd(target, () => flashTarget(target, link));
  }

  function initNavFocus() {
    installStyles();
    document.addEventListener("click", handleNavigationClick);
    window.addEventListener("hashchange", flashCurrentHash);

    if (window.location.hash) flashCurrentHash();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initNavFocus, { once: true });
  } else {
    initNavFocus();
  }
})();
