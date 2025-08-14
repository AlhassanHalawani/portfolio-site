/* Simple search page logic */
(() => {
  const q = document.getElementById("q");
  const results = document.getElementById("results");
  if (!q || !results) return;

  const idxEl = document.getElementById("searchIndex");
  const index = idxEl ? JSON.parse(idxEl.textContent || "[]") : [];

  const norm = s => (s || "").toLowerCase().trim();
  function render(list){
    if (!list.length){ results.innerHTML = `<p>No results.</p>`; return; }
    results.innerHTML = list.map(i => `
      <article class="card">
        <h3 class="card-title"><a href="${i.url}">${i.title}</a></h3>
        <p class="card-text">${i.summary || ""}</p>
        ${i.tags ? `<div class="chipbar">${i.tags.map(t => `<span class='chip'>${t}</span>`).join('')}</div>` : ""}
      </article>
    `).join("");
  }

  function apply(){
    const term = norm(q.value);
    if (!term){ render(index); return; }
    const out = index.filter(i => norm(`${i.title} ${i.summary} ${(i.tags||[]).join(' ')} ${(i.stack||[]).join(' ')}`).includes(term));
    render(out);
  }
  q.addEventListener("input", apply);
  render(index);
})();