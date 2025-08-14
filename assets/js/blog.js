/* Blog index filter/search */
(() => {
  const grid = document.getElementById("postGrid");
  const tagBar = document.getElementById("tagBar");
  const search = document.getElementById("postSearch");
  if (!grid || !tagBar) return;

  const norm = s => (s || "").toLowerCase().trim();
  let active = "all";
  let posts = [];

  function renderCards(list) {
    grid.innerHTML = list.map(p => `
      <article class="card">
        <a class="card-media" href="${p.url}">
          <img loading="lazy" src="${p.image || '/public/images/placeholder.jpg'}" alt="${p.title}">
        </a>
        <div class="card-body">
          <h3 class="card-title"><a href="${p.url}">${p.title}</a></h3>
          <p class="card-text">${p.summary || ""}</p>
          <div class="chipbar">
            ${(p.tags||[]).map(t => `<span class="chip" data-tag="${t}">${t}</span>`).join("")}
          </div>
        </div>
      </article>
    `).join("");
  }

  function apply() {
    const term = norm(search && search.value);
    let list = posts;
    if (active !== "all") list = list.filter(p => (p.tags||[]).map(norm).includes(norm(active)));
    if (term) {
      list = list.filter(p => norm(`${p.title} ${p.summary} ${(p.tags||[]).join(' ')} ${(p.stack||[]).join(' ')}`).includes(term));
    }
    renderCards(list);
  }

  // Hydrate from inline JSON <script id="postIndex" type="application/json">...</script>
  const dataEl = document.getElementById("postIndex");
  if (dataEl) posts = JSON.parse(dataEl.textContent || "[]");
  renderCards(posts);

  tagBar.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-filter]");
    if (!btn) return;
    tagBar.querySelectorAll(".chip").forEach(c => c.classList.remove("is-active"));
    btn.classList.add("is-active");
    active = btn.getAttribute("data-filter") || "all";
    apply();
  });
  if (search) search.addEventListener("input", apply);
})();