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
    
    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
      // Get current theme from localStorage or default to dark
      const currentTheme = localStorage.getItem('theme') || 'dark';
      applyTheme(currentTheme);
      
      themeToggle.addEventListener('click', () => {
        const isDark = document.body.classList.contains('theme-dark');
        const newTheme = isDark ? 'light' : 'dark';
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
      });
    }
    
    function applyTheme(theme) {
      document.body.classList.remove('theme-light', 'theme-dark');
      document.documentElement.classList.remove('theme-light', 'theme-dark');
      
      if (theme === 'light') {
        document.body.classList.add('theme-light');
        document.documentElement.classList.add('theme-light');
        if (themeToggle) themeToggle.setAttribute('aria-checked', 'false');
      } else {
        document.body.classList.add('theme-dark');
        document.documentElement.classList.add('theme-dark');
        if (themeToggle) themeToggle.setAttribute('aria-checked', 'true');
      }
    }
  });
  inject('#site-footer', '/assets/partials/footer.html');

  // Initialize theme from localStorage or default to dark
  const savedTheme = localStorage.getItem('theme') || 'dark';
  if (savedTheme === 'light') {
    document.documentElement.classList.add('theme-light');
    document.body.classList.add('theme-light');
  } else {
    document.documentElement.classList.add('theme-dark');
    document.body.classList.add('theme-dark');
  }
})();
