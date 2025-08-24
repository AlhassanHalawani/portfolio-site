// Year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Theme toggle is initialized in layout.js AFTER header injection.

// Mobile menu toggle (handled by layout.js after header injection)

// Active link based on current page (kept for non-partial pages)
(function setActive() {
  const path = (location.pathname.split('/').pop() || "index.html").toLowerCase();
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (!href) return;
    const target = href.split('/').pop().toLowerCase();
    const isHome = (path === "" || path === "index.html") && (target === "index.html" || target === "#/");
    const match = isHome || path === target;
    a.classList.toggle('is-active', match);
  });
})();

// Intersection reveal
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => e.isIntersecting && e.target.classList.add("is-visible"));
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

// Split heading on pages that have .split
document.querySelectorAll(".split").forEach(h => {
  if (h.dataset.split === "1") return;
  const words = h.innerHTML.split(" ");
  h.innerHTML = words.map(w => `<span class="reveal" style="display:inline-block">${w}&nbsp;</span>`).join("");
  h.dataset.split = "1";
  h.querySelectorAll(".reveal").forEach(el => io.observe(el));
});

// Parallax dots (only when .parallax exists)
(function initParallax(){
  const parallax = document.querySelector(".parallax");
  if (!parallax) return;
  function onMove(e){
    const { innerWidth:w, innerHeight:h } = window;
    const x = (e.clientX - w/2) / (w/2);
    const y = (e.clientY - h/2) / (h/2);
    parallax.querySelectorAll(".dot").forEach((dot, i) => {
      const strength = (i + 1) * 4;
      dot.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    });
  }
  window.addEventListener("mousemove", onMove, { passive: true });
})();

// Contact: copy email button (delegated)
document.addEventListener("click", (e) => {
  const t = e.target;
  if (t.matches("[data-copy]")) {
    const txt = t.getAttribute("data-copy");
    navigator.clipboard.writeText(txt).then(() => {
      t.textContent = "Copied ✔";
      setTimeout(() => t.textContent = "Copy email", 1200);
    });
  }
});

// --- NEW: Register Service Worker for PWA + offline
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    (()=>{const base=document.querySelector("base")?.href||location.pathname;const swUrl=new URL("sw.js",base).pathname;const scope=new URL(".",base).pathname;navigator.serviceWorker.register(swUrl,{scope});})()
      .catch(err => console.warn("SW register failed:", err));
  });
}
