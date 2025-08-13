(async () => {
  function basePath(){
    const base = document.querySelector('base')?.getAttribute('href');
    if (base) return base;
    const p = location.pathname;
    return p.endsWith('/') ? p : p.substring(0, p.lastIndexOf('/')+1);
  }
  async function inject(selector, relUrl){
    const host = document.querySelector(selector);
    if (!host) return;
    const url = new URL(relUrl, location.origin + basePath()).pathname;
    try { const res = await fetch(url, { cache: "no-store" });
      if (res.ok) host.innerHTML = await res.text();
    } catch (e) { console.warn("Partial inject failed:", url, e); }
  }
  await inject("#site-header", "assets/partials/header.html");
  await inject("#site-footer", "assets/partials/footer.html");

  (function themeToggle(){
    const body = document.body;
    const key = "theme-preference";
    function apply(pref){
      body.classList.remove("theme-auto","theme-light","theme-dark");
      body.classList.add(pref);
      const btn = document.getElementById("themeToggle");
      if (btn) btn.setAttribute("aria-checked", pref === "theme-dark" ? "true" : "false");
    }
    let saved = localStorage.getItem(key);
    if (saved === "theme-auto") saved = null;
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = saved || (prefersDark ? "theme-dark" : "theme-light");
    apply(initial);
    localStorage.setItem(key, initial);
    document.addEventListener("click", (e) => {
      const btn = e.target.closest && e.target.closest("#themeToggle");
      if (!btn) return;
      const current = [...body.classList].find(c => c.startsWith("theme-")) || "theme-dark";
      const next = current === "theme-dark" ? "theme-light" : "theme-dark";
      apply(next);
      localStorage.setItem(key, next);
      body.style.setProperty("--x", (e.clientX||0) + "px");
      body.style.setProperty("--y", (e.clientY||0) + "px");
      body.classList.add("theme-toggle-anim");
      setTimeout(() => body.classList.remove("theme-toggle-anim"), 350);
    }, false);
  })();
})();