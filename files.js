// Wspólne zachowania kart postaci: język PL/EN, podgląd obrazków, kopiowanie kolorów, numer strony, druk.

const FILES = (() => {
  const root = document.documentElement;
  const listeners = [];

  const lang = () => root.dataset.lang;

  function setLang(l) {
    root.dataset.lang = l;
    root.lang = l;
    try { localStorage.setItem("lang", l); } catch (e) {}
    document.querySelectorAll("[data-set-lang]").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.setLang === l)));
    // Atrybuty, których nie da się ukryć przez CSS (alt, aria-label, title)
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
    const dlg = document.createElement("dialog");
    dlg.className = "lightbox";
    dlg.innerHTML = '<button type="button" aria-label="Zamknij / Close">✕</button><img alt=""><p></p>';
    document.body.append(dlg);
    const img = dlg.querySelector("img");
    const cap = dlg.querySelector("p");
    dlg.querySelector("button").addEventListener("click", () => dlg.close());
    dlg.addEventListener("click", e => { if (e.target === dlg) dlg.close(); });
    document.querySelectorAll(".zoom").forEach(btn => btn.addEventListener("click", () => {
      const inner = btn.querySelector("img");
      img.src = btn.dataset.full;
      img.alt = inner ? inner.alt : "";
      cap.textContent = btn.dataset.caption || "";
      dlg.showModal();
    }));
  }

  function initSwatches() {
    document.querySelectorAll(".swatch[data-hex]").forEach(sw => sw.addEventListener("click", async () => {
      const ok = await copy(sw.dataset.hex);
      toast(ok ? t({ pl: "Skopiowano " + sw.dataset.hex, en: "Copied " + sw.dataset.hex }) : sw.dataset.hex);
    }));
  }

  function initPageCounter() {
    const out = document.getElementById("pageNo");
    const sheets = document.querySelectorAll(".sheet[data-page]");
    if (!out || !sheets.length) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) out.textContent = e.target.dataset.page; });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sheets.forEach(s => obs.observe(s));
  }

  function init() {
    document.querySelectorAll("[data-set-lang]").forEach(b => b.addEventListener("click", () => setLang(b.dataset.setLang)));
    document.querySelectorAll("[data-print]").forEach(b => b.addEventListener("click", () => window.print()));
    initLightbox();
    initSwatches();
    initPageCounter();
    setLang(lang());
  }

  return { init, t, toast, lang, onLang: fn => listeners.push(fn) };
})();
