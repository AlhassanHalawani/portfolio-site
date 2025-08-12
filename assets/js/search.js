(async () => {
  const q = document.getElementById("q");
  const out = document.getElementById("results");
  if (!q || !out) return;

  // fetch data sources
  const [projects, posts] = await Promise.all([
    fetch("/data/projects.json").then(r => r.json()).catch(() => []),
    fetch("/data/posts.json").then(r => r.json()).catch(() => [])
  ]);

  function render(list) {
    out.innerHTML = list.map(item => `
      <article class="card">
        <a class="card-media" href="${item.url}">
          <img loading="lazy" src="${item.image || '/public/images/placeholder.jpg'}" alt="${item.title}">
        </a>
        <div class="card-body">
          <h3><a href="${item.url}">${item.title}</a></h3>
          <p class="muted">${item.type} ${item.year ? "· " + item.year : ""} ${item.tags ? "· " + item.tags.join(", ") : ""}</p>
          <p>${item.summary || ""}</p>
          <a class="btn" href="${item.url}">Open</a>
        </div>
      </article>
    `).join("");
  }

  // Build a unified index
  const index = [
    ...projects.map(p => ({ ...p, type: "project" })),
    ...posts.map(p => ({ ...p, type: "post" }))
  ];

  const norm = s => (s || "").toLowerCase();

  function apply() {
    const term = norm(q.value);
    if (!term) { render(index); return; }
    const r = index.filter(i => {
      const hay = norm(`${i.title} ${i.summary} ${(i.tags||[]).join(" ")} ${i.stack||[]}`);
      return hay.includes(term);
    });
    render(r);
  }

  q.addEventListener("input", apply);
  render(index);
})();
