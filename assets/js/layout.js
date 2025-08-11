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

  // Mark active link
  const markActive = () => {
    const here = location.pathname.replace(/\/+$|index\.html$/g, "") || "/";
    document.querySelectorAll(".nav a").forEach(a => {
      const target = (a.getAttribute("href") || "").replace(/\/+$|index\.html$/g, "") || "/";
      a.classList.toggle("is-active", here === target || (target !== "/" && here.startsWith(target)));
    });
  };
  // Wait a tick to run after injection
  setTimeout(markActive, 0);
})();
