(() => {
  const STYLE_ID = "frameforge-nav-focus-style";
  const FLASH_CLASS = "nav-focus-flash";
  const REDUCED_MOTION = window.matchMedia?.("(prefers-reduced-motion: reduce)");
  let clearTimer = null;
  let scrollTimer = null;

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
          radial-gradient(circle at 18% 24%, rgba(101,243,255,.22), transparent 36%),
          linear-gradient(105deg, rgba(101,243,255,.055), rgba(139,115,255,.15), rgba(101,243,255,.025));
        box-shadow:
          inset 0 0 0 1px rgba(101,243,255,.48),
          inset 0 0 48px rgba(101,243,255,.08),
          0 0 36px rgba(101,243,255,.09);
        animation: frameforgeTargetFlash 1180ms cubic-bezier(.18,.76,.22,1) both;
      }

      @keyframes frameforgeTargetFlash {
        0%   { opacity: 0; filter: brightness(1); }
        10%  { opacity: .88; filter: brightness(1.055); }
        34%  { opacity: .42; }
        58%  { opacity: .58; filter: brightness(1.028); }
        78%  { opacity: .24; }
        100% { opacity: 0; filter: brightness(1); }
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
        animation: frameforgeNavDot 900ms ease-out both;
      }

      @keyframes frameforgeNavDot {
        0% { opacity: 0; transform: translateX(-50%) scale(.4); }
        22% { opacity: 1; transform: translateX(-50%) scale(1); }
        100% { opacity: 0; transform: translateX(-50%) scale(.35); }
      }

      @media (prefers-reduced-motion: reduce) {
        .nav-focus-flash::after {
          animation: none;
          opacity: .18;
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

    const duration = REDUCED_MOTION?.matches ? 650 : 1320;
    clearTimer = window.setTimeout(() => {
      focusTarget.classList.remove(FLASH_CLASS);
      sourceLink?.classList.remove("nav-focus-link");
    }, duration);
  }

  function distanceToTarget(target) {
    const top = target.getBoundingClientRect().top;
    return Math.abs(top - 18);
  }

  function waitForScrollEnd(target, callback) {
    clearTimeout(scrollTimer);

    if (REDUCED_MOTION?.matches) {
      callback();
      return;
    }

    let lastY = window.scrollY;
    let stableFrames = 0;
    let frameCount = 0;
    const maxFrames = 120;

    function check() {
      frameCount += 1;
      const currentY = window.scrollY;
      const delta = Math.abs(currentY - lastY);
      const nearTarget = distanceToTarget(target) < 30;

      if (delta < 0.5 && nearTarget) stableFrames += 1;
      else stableFrames = 0;

      lastY = currentY;

      if (stableFrames >= 5 || frameCount >= maxFrames) {
        scrollTimer = window.setTimeout(callback, 90);
        return;
      }

      requestAnimationFrame(check);
    }

    requestAnimationFrame(check);
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
