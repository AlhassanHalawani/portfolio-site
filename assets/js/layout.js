(async () => {
  const inject = async (selector, url) => {
    const host = document.querySelector(selector);
    if (!host) return;
    try {
      const res = await fetch(url, { cache: "no-store" });
      if (res.ok) host.innerHTML = await res.text();
    } catch {}
  };
  await inject("#site-header", "/assets/partials/header.html");
  await inject("#site-footer", "/assets/partials/footer.html");
  const y = document.querySelector("#year"); if (y) y.textContent = new Date().getFullYear();

  // set active link
  const here = location.pathname.replace(/\/+$/, "") || "/";
  document.querySelectorAll(".menu a").forEach(a => {
    const target = a.getAttribute("href").replace(/\/+$/, "") || "/";
    if (target === here) a.classList.add("active");
    if (target !== "/" && here.startsWith(target)) a.classList.add("active");
  });
})();
