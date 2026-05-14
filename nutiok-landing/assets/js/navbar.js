(function () {
  const nav = document.querySelector(".site-nav");
  const toggle = document.querySelector(".nav-toggle");
  const overlay = document.querySelector(".nav-overlay");
  const links = document.querySelectorAll(".site-nav__link");
  const focusableSelector = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

  if (!nav || !toggle) return;

  let lastToggleLabel = toggle.getAttribute("aria-label") || "Abrir menú";

  function setOpen(open) {
    nav.classList.toggle("is-open", open);
    overlay?.classList.toggle("is-open", open);
    overlay?.setAttribute("aria-hidden", open ? "false" : "true");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Cerrar menú" : lastToggleLabel);
    document.body.style.overflow = open ? "hidden" : "";

    if (open) {
      const first = nav.querySelector(focusableSelector);
      first?.focus();
    }
  }

  toggle.addEventListener("click", () => {
    setOpen(!nav.classList.contains("is-open"));
  });

  overlay?.addEventListener("click", () => setOpen(false));

  links.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth < 1025) setOpen(false);
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("is-open")) {
      setOpen(false);
      toggle.focus();
    }
  });

  const sectionSelector = ["#inicio", "#funcionalidades", "#como-funciona", "#contacto", "#chatbot"];
  const sections = sectionSelector
    .map((id) => document.querySelector(id))
    .filter(Boolean);

  function setActive(hash) {
    links.forEach((link) => {
      const href = link.getAttribute("href") || "";
      const isMatch = href === hash || (hash === "" && href === "#inicio");
      link.classList.toggle("is-active", isMatch);
    });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      const top = entries.find((e) => e.isIntersecting && e.intersectionRatio > 0.2);
      if (top?.target?.id) {
        setActive(`#${top.target.id}`);
      }
    },
    { rootMargin: "-20% 0px -55% 0px", threshold: [0, 0.15, 0.35, 0.5] }
  );

  sections.forEach((sec) => observer.observe(sec));

  window.addEventListener("hashchange", () => {
    if (window.location.hash) setActive(window.location.hash);
  });

  if (window.location.hash) setActive(window.location.hash);
  else setActive("#inicio");
})();
