// Year
document.getElementById("year").textContent = new Date().getFullYear();

// Theme toggle: auto/light/dark cycle
const body = document.body;
const key = "themePref"; // "auto" | "light" | "dark"
const btn = document.getElementById("themeToggle");
const cycle = { "theme-auto": "theme-light", "theme-light": "theme-dark", "theme-dark": "theme-auto" };

function applyTheme(pref) {
  body.classList.remove("theme-auto", "theme-light", "theme-dark");
  body.classList.add(pref);
}
applyTheme(localStorage.getItem(key) || "theme-auto");
btn.addEventListener("click", () => {
  const next = cycle[[...body.classList].find(c => c.startsWith("theme-"))] || "theme-auto";
  applyTheme(next);
  localStorage.setItem(key, next);
});

// Section reveal
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => e.isIntersecting && e.target.classList.add("is-visible"));
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

// Split heading stagger (simple)
document.querySelectorAll(".split").forEach(h => {
  const words = h.innerHTML.split(" ");
  h.innerHTML = words.map(w => `<span class="reveal" style="display:inline-block">${w}&nbsp;</span>`).join("");
  h.querySelectorAll(".reveal").forEach(el => io.observe(el));
});

// Parallax dots follow mouse subtly
const parallax = document.querySelector(".parallax");
if (parallax) {
  window.addEventListener("mousemove", (e) => {
    const { innerWidth:w, innerHeight:h } = window;
    const x = (e.clientX - w/2) / (w/2);
    const y = (e.clientY - h/2) / (h/2);
    parallax.querySelectorAll(".dot").forEach((dot, i) => {
      const strength = (i + 1) * 4;
      dot.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    });
  }, { passive: true });
}
