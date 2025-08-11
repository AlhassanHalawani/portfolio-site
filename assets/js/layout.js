(async () => {
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

  // Year in footer
  const y = document.querySelector("#year"); if (y) y.textContent = new Date().getFullYear();

  // After a tick (to allow header injection), set active nav link
  setTimeout(() => {
    const here = location.pathname.replace(/\/+$/, "") || "/";
    document.querySelectorAll(".nav a").forEach(a => {
      const target = (a.getAttribute("href") || "").replace(/\/+$/, "") || "/";
      if (target === here) a.classList.add("is-active");
      // also mark section parents (e.g., /projects.html for /projects/... pages)
      if (target !== "/" && here.startsWith(target.replace(".html",""))) {
        a.classList.add("is-active");
      }
    });
  }, 0);
})();
