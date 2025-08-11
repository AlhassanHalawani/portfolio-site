(() => {
  const grid = document.getElementById("projectGrid");
  const chips = document.querySelectorAll(".chipbar .chip");
  const search = document.getElementById("projSearch");
  if (!grid || !chips.length) return;

  let active = "all";
  const normalize = s => (s || "").toLowerCase();

  function apply() {
    const q = normalize(search ? search.value : "");
    grid.querySelectorAll(".card").forEach(card => {
      const tags = normalize(card.getAttribute("data-tags"));
      const title = normalize(card.querySelector("h3")?.textContent);
      const text = normalize(card.querySelector("p")?.textContent);
      const matchTag = active === "all" || tags.includes(active);
      const matchSearch = !q || (title && title.includes(q)) || (text && text.includes(q)) || tags.includes(q);
      card.style.display = (matchTag && matchSearch) ? "" : "none";
    });
  }

  chips.forEach(btn => {
    btn.addEventListener("click", () => {
      chips.forEach(b => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      active = normalize(btn.dataset.filter);
      apply();
    });
  });

  if (search) search.addEventListener("input", apply);

  apply();
})();
