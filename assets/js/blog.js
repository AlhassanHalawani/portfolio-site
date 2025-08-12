(() => {
  const grid = document.getElementById("postGrid");
  const tagBar = document.getElementById("tagBar");
  const search = document.getElementById("postSearch");
  if (!grid || !tagBar) return;

  const normalize = s => (s || "").toLowerCase();
  let active = "all";
  let posts = [];

  function renderCards(list) {
    grid.innerHTML = list.map(p => `
      <article class="card">
        <a class="card-media" href="${p.url}">
          <img loading="lazy" src="${p.image || '/public/images/placeholder.jpg'}" alt="${p.title}">
        </a>
        <div class="card-body">
          <h3><a href="${p.url}">${p.title}</a></h3>
          <p class="muted">${p.date} · ${p.tags.join(", ")}</p>
          <p>${p.summary}</p>
          <a class="btn" href="${p.url}">Read</a>
        </div>
      </article>
    `).join("");
  }

  function buildTagBar(allPosts) {
    const tags = Array.from(new Set(allPosts.flatMap(p => p.tags))).sort();
    tags.forEach(t => {
      const btn = document.createElement("button");
      btn.className = "chip";
      btn.dataset.filter = t.toLowerCase();
      btn.role = "tab";
      btn.textContent = t;
      tagBar.appendChild(btn);
    });
    tagBar.addEventListener("click", e => {
      const btn = e.target.closest(".chip");
      if (!btn) return;
      [...tagBar.querySelectorAll(".chip")].forEach(b => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      active = btn.dataset.filter || "all";
      apply();
    });
  }

  function apply() {
    const q = normalize(search?.value);
    const filtered = posts.filter(p => {
      const tags = p.tags.map(normalize).join(",");
      const matchTag = active === "all" || tags.includes(active);
      const hay = `${p.title} ${p.summary} ${tags}`.toLowerCase();
      const matchSearch = !q || hay.includes(q);
      return matchTag && matchSearch;
    });
    renderCards(filtered);
  }

  fetch("/data/posts.json", { cache: "no-store" })
    .then(r => r.json())
    .then(data => {
      posts = data;
      buildTagBar(posts);
      renderCards(posts);
    })
    .catch(() => { grid.innerHTML = "<p>Unable to load posts right now.</p>"; });

  if (search) search.addEventListener("input", apply);
})();
