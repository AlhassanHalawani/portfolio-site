(async () => {
  const target = document.querySelector("#projects-list");
  if (!target) return;
  try {
    const res = await fetch("/data/projects.json", { cache: "no-store" });
    const items = res.ok ? await res.json() : [];
    target.innerHTML = items.map(p => `
      <article class="card">
        <a class="card-media" href="${p.url}">
          <img loading="lazy" src="${p.image || '/public/images/placeholder.jpg'}" alt="${p.title}">
        </a>
        <div class="card-body">
          <h3><a href="${p.url}">${p.title}</a></h3>
          <p class="muted">${p.year} · ${p.stack.join(", ")}</p>
          <p>${p.summary}</p>
          <a class="btn" href="${p.url}">View project</a>
        </div>
      </article>
    `).join("");
  } catch (e) {
    target.innerHTML = "<p>Unable to load projects right now.</p>";
  }
})();
