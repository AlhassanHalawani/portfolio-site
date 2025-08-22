/* Layout injector (always dark theme) */
(() => {
  async function inject(sel, url){
    const el = document.querySelector(sel);
    if (!el) return;
    try { const res = await fetch(url, {cache:'no-store'});
      if (res.ok) el.innerHTML = await res.text();
    } catch(e){ console.warn('Inject failed', sel, url, e); }
  }
  inject('#site-header', '/assets/partials/header.html').then(() => {
    // Nav active state
    const here = location.pathname.replace(/index\.html$/, '');
    document.querySelectorAll('.nav a[href]').forEach(a => {
      const href = a.getAttribute('href');
      if (!href) return;
      if (href === '/' && (here === '/' || here === '')) a.classList.add('is-active');
      else if (href !== '/' && here.endsWith(href)) a.classList.add('is-active');
    });
    // Burger
    const burger = document.getElementById('burger');
    const links = document.getElementById('navLinks');
    if (burger && links){
      burger.addEventListener('click', () => {
        const open = links.classList.toggle('open');
        burger.setAttribute('aria-expanded', String(open));
      });
    }
  });
  inject('#site-footer', '/assets/partials/footer.html');

  // Force dark class
  document.documentElement.classList.remove('theme-light','theme-auto');
  document.body.classList.remove('theme-light','theme-auto');
  document.body.classList.add('theme-dark');
})();