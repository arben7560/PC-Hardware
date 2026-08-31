(() => {
  const STYLE_ID = "frameforge-nav-focus-style";
  const FLASH_CLASS = "nav-focus-flash";
  const REDUCED_MOTION = window.matchMedia?.("(prefers-reduced-motion: reduce)");
  let clearTimer = null;

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
          radial-gradient(circle at 18% 24%, rgba(101,243,255,.20), transparent 34%),
          linear-gradient(105deg, rgba(101,243,255,.05), rgba(139,115,255,.13), rgba(101,243,255,.02));
        box-shadow:
          inset 0 0 0 1px rgba(101,243,255,.46),
          inset 0 0 42px rgba(101,243,255,.07),
          0 0 32px rgba(101,243,255,.08);
        animation: frameforgeTargetFlash 760ms cubic-bezier(.18,.76,.22,1) both;
      }

      @keyframes frameforgeTargetFlash {
        0%   { opacity: 0; filter: brightness(1); }
        12%  { opacity: .92; filter: brightness(1.055); }
        36%  { opacity: .30; }
        56%  { opacity: .52; filter: brightness(1.025); }
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
        animation: frameforgeNavDot 620ms ease-out both;
      }

      @keyframes frameforgeNavDot {
        0% { opacity: 0; transform: translateX(-50%) scale(.4); }
        24% { opacity: 1; transform: translateX(-50%) scale(1); }
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

    // For broad layout wrappers, focus the first meaningful panel inside them.
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

    // Restart the animation even when the same section is selected twice.
    void focusTarget.offsetWidth;
    focusTarget.classList.add(FLASH_CLASS);
    sourceLink?.classList.add("nav-focus-link");

    const duration = REDUCED_MOTION?.matches ? 500 : 900;
    clearTimer = window.setTimeout(() => {
      focusTarget.classList.remove(FLASH_CLASS);
      sourceLink?.classList.remove("nav-focus-link");
    }, duration);
  }

  function handleNavigationClick(event) {
    const link = event.target.closest('.main-nav a[href^="#"]');
    if (!link) return;

    const hash = link.getAttribute("href");
    if (!hash || hash === "#") return;

    const target = document.querySelector(hash);
    if (!target) return;

    // Let native smooth-scroll begin, then trigger the visual cue as the
    // destination enters the user's focal area.
    const delay = REDUCED_MOTION?.matches ? 0 : 260;
    window.setTimeout(() => flashTarget(target, link), delay);
  }

  function flashCurrentHash() {
    if (!window.location.hash) return;
    const target = document.querySelector(window.location.hash);
    if (!target) return;
    const link = document.querySelector(`.main-nav a[href="${CSS.escape(window.location.hash)}"]`);
    window.setTimeout(() => flashTarget(target, link), 120);
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
