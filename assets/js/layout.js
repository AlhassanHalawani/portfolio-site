/* Layout + Partials Injector + Theme + Nav */
(() => {
  async function inject(selector, url){
    const host = document.querySelector(selector);
    if (!host) return;
    try {
      const res = await fetch(url, { cache: "no-store" });
      if (res.ok) host.innerHTML = await res.text();
    } catch (e) {
      console.warn("Inject failed:", selector, url, e);
    }
  }

  // Always use root-absolute paths so nested routes work
  inject("#site-header", "/assets/partials/header.html").then(setupAfterHeader);
  inject("#site-footer", "/assets/partials/footer.html");

  function setupAfterHeader(){
    // Active nav link
    const here = location.pathname.replace(/index\.html$/, "");
    document.querySelectorAll(".nav a[href]").forEach(a => {
      const href = a.getAttribute("href");
      if (!href) return;
      if (href === "/" && (here === "/" || here === "")) a.classList.add("is-active");
      else if (href !== "/" && here.endsWith(href)) a.classList.add("is-active");
    });

    // Burger menu
    const burger = document.getElementById("burger");
    const links = document.getElementById("navLinks");
    if (burger && links){
      burger.addEventListener("click", () => {
        const open = links.classList.toggle("open");
        burger.setAttribute("aria-expanded", String(open));
      });
    }

    // Theme toggle with localStorage
    const key = "site-theme";
    const body = document.body;
    function apply(theme){
      body.classList.remove("theme-dark","theme-light","theme-auto");
      body.classList.add(theme);
    }
    const saved = localStorage.getItem(key);
    if (saved) apply(saved);
    const toggle = document.getElementById("themeToggle");
    if (toggle){
      toggle.addEventListener("click", (e) => {
        const current = [...body.classList].find(c => c.startsWith("theme-")) || "theme-auto";
        const next = current === "theme-dark" ? "theme-light" : "theme-dark";
        apply(next);
        localStorage.setItem(key, next);
      });
    }
  }
})();