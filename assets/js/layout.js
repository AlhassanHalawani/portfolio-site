(async () => {
  // Injects header/footer partials into placeholders
  const inject = async (selector, url) => {
    const host = document.querySelector(selector);
    if (!host) return;
    try {
      const res = await fetch(url, { cache: "no-store" });
      if (res.ok) host.innerHTML = await res.text();
    } catch (e) {
      console.warn("Partial inject failed:", url, e);
    }
  };

  await inject("#site-header", "/assets/partials/header.html");
  await inject("#site-footer", "/assets/partials/footer.html");

  // Delay to ensure injected content is in DOM
  setTimeout(() => {
    // Footer year
    const y = document.querySelector("#year");
    if (y) y.textContent = new Date().getFullYear();

    // Mark active nav link
    const here = location.pathname.replace(/\/+$|index\.html$/g, "") || "/";
    document.querySelectorAll(".nav a").forEach(a => {
      const target = (a.getAttribute("href") || "").replace(/\/+$|index\.html$/g, "") || "/";
      a.classList.toggle("is-active", here === target || (target !== "/" && here.startsWith(target)));
    });

    // Theme toggle setup
    const body = document.body;
    const key = "themePref";
    const cycle = {
      "theme-auto": "theme-light",
      "theme-light": "theme-dark",
      "theme-dark": "theme-auto"
    };

    function applyTheme(pref) {
      body.classList.remove("theme-auto", "theme-light", "theme-dark");
      body.classList.add(pref);
    }

    // Set initial theme from localStorage
    applyTheme(localStorage.getItem(key) || "theme-auto");

    // Theme toggle button click
    const themeBtn = document.getElementById("themeToggle");
    if (themeBtn) {
      themeBtn.addEventListener("click", () => {
        const current = [...body.classList].find(c => c.startsWith("theme-")) || "theme-auto";
        const next = cycle[current] || "theme-auto";
        applyTheme(next);
        localStorage.setItem(key, next);
      });
    }
  }, 100);
})();
