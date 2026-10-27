// Wspólne zachowania stron postaci: język PL/EN, komunikaty, podgląd obrazków,
// pojawianie się sekcji przy przewijaniu i podświetlanie bieżącej sekcji w menu.

const CHAR = (() => {
  const root = document.documentElement;
  const listeners = [];

  const lang = () => root.dataset.lang;

  function setLang(l) {
    root.dataset.lang = l;
    root.lang = l;
    try { localStorage.setItem("lang", l); } catch (e) {}
    document.querySelectorAll("[data-set-lang]").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.setLang === l)));
    // Atrybuty, których nie da się przełączyć samym CSS
    document.querySelectorAll("[data-pl-alt]").forEach(el => el.alt = el.dataset[l + "Alt"]);
    document.querySelectorAll("[data-pl-label]").forEach(el => el.setAttribute("aria-label", el.dataset[l + "Label"]));
    listeners.forEach(fn => fn(l));
  }

  // Tekst zależny od języka: t({ pl: "…", en: "…" })
  const t = pair => pair[lang()] ?? pair.en;

  let toastTimer;
  function toast(msg) {
    let el = document.querySelector(".toast");
    if (!el) {
      el = document.createElement("div");
      el.className = "toast";
      el.setAttribute("role", "status");
      document.body.append(el);
    }
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 1800);
  }

  async function copy(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (e) {
      return false;
    }
  }

  function initLightbox() {
    const triggers = document.querySelectorAll(".zoom");
    if (!triggers.length) return;
    const dlg = document.createElement("dialog");
    dlg.className = "lightbox";
    dlg.innerHTML = '<button type="button" aria-label="Zamknij / Close">✕</button><img alt=""><p></p>';
    document.body.append(dlg);
    const img = dlg.querySelector("img");
    const cap = dlg.querySelector("p");
    dlg.querySelector("button").addEventListener("click", () => dlg.close());
    dlg.addEventListener("click", e => { if (e.target === dlg) dlg.close(); });
    triggers.forEach(btn => btn.addEventListener("click", () => {
      img.src = btn.dataset.full;
      img.alt = btn.dataset.caption || "";
      cap.textContent = btn.dataset.caption || "";
      dlg.showModal();
    }));
  }

  function initReveal() {
    const items = document.querySelectorAll("[data-reveal]");
    if (!("IntersectionObserver" in window)) {
      items.forEach(el => el.classList.add("in"));
      return;
    }
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        e.target.classList.add("in");
        obs.unobserve(e.target);
      });
    }, { rootMargin: "0px 0px -12% 0px" });
    items.forEach(el => obs.observe(el));
  }

  function initNav() {
    const links = [...document.querySelectorAll("nav a[href^='#']")];
    if (!links.length) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        links.forEach(a => a.toggleAttribute("aria-current", a.hash === "#" + e.target.id));
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    links.forEach(a => {
      const sec = document.querySelector(a.hash);
      if (sec) obs.observe(sec);
    });
  }

  function init() {
    document.querySelectorAll("[data-set-lang]").forEach(b => b.addEventListener("click", () => setLang(b.dataset.setLang)));
    initLightbox();
    initReveal();
    initNav();
    setLang(lang());
  }

  return { init, t, toast, copy, lang, onLang: fn => listeners.push(fn) };
})();
