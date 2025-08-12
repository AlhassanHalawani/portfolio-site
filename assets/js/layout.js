(async () => {
  // --- Inject header/footer partials ---
  async function inject(selector, url){
    const host = document.querySelector(selector);
    if (!host) return null;
    try {
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) return null;
      const html = await res.text();
      host.innerHTML = html;
      return host;
    } catch (e) {
      console.warn("Partial inject failed:", url, e);
      return null;
    }
  }

  await inject("#site-header", "/assets/partials/header.html");
  await inject("#site-footer", "/assets/partials/footer.html");

  // --- Mark current nav link as active, if header is present ---
  (function highlightActive(){
    const nav = document.querySelector("#site-header .nav-links");
    if (!nav) return;
    const here = location.pathname.replace(/index\.html$/, "");
    nav.querySelectorAll("a[href]").forEach(a => {
      const href = a.getAttribute("href");
      if (!href) return;
      if (href === here || (href !== "/" && here.startsWith(href))) {
        a.setAttribute("aria-current", "page");
      }
    });
  })();

  // --- Theme: two-state toggle (light/dark) with ripple animation ---
  (function themeToggle(){
    const body = document.body;
    const btn = document.getElementById("themeToggle");
    const key = "theme-preference";

    function apply(pref){
      body.classList.remove("theme-light","theme-dark","theme-auto");
      body.classList.add(pref);
      if (btn) btn.setAttribute("aria-checked", pref === "theme-dark" ? "true" : "false");
    }

    let saved = localStorage.getItem(key);
    if (saved === "theme-auto") saved = null;
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = saved || (prefersDark ? "theme-dark" : "theme-light");
    apply(initial);
    localStorage.setItem(key, initial);

    if (btn) {
      btn.addEventListener("click", (e) => {
        const current = [...body.classList].find(c => c.startsWith("theme-")) || "theme-dark";
        const next = current === "theme-dark" ? "theme-light" : "theme-dark";
        apply(next);
        localStorage.setItem(key, next);
        if (e && typeof e.clientX === "number") {
          body.style.setProperty("--x", e.clientX + "px");
          body.style.setProperty("--y", e.clientY + "px");
          body.classList.add("theme-toggle-anim");
          setTimeout(() => body.classList.remove("theme-toggle-anim"), 350);
        }
      });
    }
  })();
})();