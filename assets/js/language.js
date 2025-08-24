// Language toggle functionality
class LanguageManager {
  constructor() {
    this.currentLanguage = localStorage.getItem('language') || 'en';
    this.translations = {
      en: {
        // Header
        home: 'Home',
        projects: 'Projects',
        blog: 'Blog',
        about: 'About',
        contact: 'Contact',
        
        // Hero section
        heroTitle: 'Hi, my name is Alhassan.',
        heroDescription: 'Raspberry Pi clusters, Home Assistant, security tools, a VPN server with DDNS for reliable secure remote access, and web apps. I like making useful things that feel great to use.',
        seeProjects: 'See projects',
        aboutMe: 'About me',
        
        // Featured projects (Home page)
        featuredProjects: 'Featured Projects',
        k3sTitle: 'k3s Portfolio Hosting',
        k3sDescription: 'Static site on Nginx behind cert-manager & Cloudflare DDNS.',
        homeAssistantTitle: 'Home Assistant Dashboard',
        homeAssistantDescription: 'Energy, media, and alerts with custom cards and automations.',
        piIdsTitle: 'Raspberry Pi IDS',
        piIdsDescription: 'Snort + Flask alerts; anomaly detection on home traffic.',
        vpnTitle: 'VPN with DDNS',
        vpnDescription: 'WireGuard server + Cloudflare API for resilient IP updates.',
        readMore: 'Read more',
        
        // Projects page
        projectsTitle: 'Projects',
        searchEverything: 'Search Everything',
        searchProjectsAndPosts: 'Search projects & posts…',
        filterProjects: 'Filter Projects',
        allFilter: 'All',
        searchProjects: 'Search projects…',
        caseStudy: 'Case study',
        screenshotsAndNotes: 'Screenshots & notes',
        writeUp: 'Write-up',
        setupGuide: 'Setup guide',
        
        // Project descriptions (detailed)
        k3sDetailedDescription: 'Deployed on Raspberry Pi 5 cluster with Nginx Ingress, cert-manager, and Cloudflare DDNS script.',
        homeAssistantDetailedDescription: 'Energy overview, media center, IDS alerts, and automations. Built with custom cards.',
        piIdsDetailedDescription: 'Snort + Flask + HA integration. Python log analyzer flags anomalies & suspicious IPs.',
        vpnDetailedDescription: 'WireGuard + Cloudflare API keeps hostname reachable through IP changes.',
        
        // About page
        aboutTitle: 'About',
        aboutIntro: 'I\'m an electronics tech & security enthusiast. I build on Raspberry Pi clusters, automate with Home Assistant, and tinker with network tooling. I like performant, maintainable code and UIs with tasteful motion.',
        aboutSiteDescription: 'This site is a multi-page static site with shared CSS/JS. Simple, fast, and easy to host on Nginx.',
        cvTitle: 'Curriculum Vitae',
        cvDescription: 'Download a PDF version of my CV below.',
        downloadPDF: 'Download PDF',
        openInNewTab: 'Open in new tab',
        highlightsTitle: 'Highlights',
        highlight1: 'k3s on Raspberry Pi cluster with Nginx Ingress + cert-manager.',
        highlight2: 'Home Assistant automations + dashboards.',
        highlight3: 'WireGuard VPN with Cloudflare DDNS.',
        
        // Language toggle
        switchToArabic: 'Switch to Arabic',
        switchToEnglish: 'Switch to English'
      },
      ar: {
        // Header
        home: 'الرئيسية',
        projects: 'المشاريع',
        blog: 'المدونة',
        about: 'عنّي',
        contact: 'تواصل',
        
        // Hero section
        heroTitle: 'مرحباً، اسمي الحسن.',
        heroDescription: 'مجموعات راسبيري باي، هوم أسيستانت، أدوات الحماية، خادم VPN مع DDNS للوصول الآمن والموثوق عن بُعد، وتطبيقات الويب. أحب صنع أشياء مفيدة وممتعة الاستخدام.',
        seeProjects: 'عرض المشاريع',
        aboutMe: 'عنّي',
        
        // Featured projects (Home page)
        featuredProjects: 'المشاريع المميزة',
        k3sTitle: 'استضافة k3s للمحفظة',
        k3sDescription: 'موقع ثابت على Nginx خلف cert-manager و Cloudflare DDNS.',
        homeAssistantTitle: 'لوحة تحكم هوم أسيستانت',
        homeAssistantDescription: 'الطاقة والوسائط والتنبيهات مع بطاقات وأتمتة مخصصة.',
        piIdsTitle: 'نظام كشف التطفل راسبيري باي',
        piIdsDescription: 'تنبيهات Snort + Flask؛ كشف الشذوذ في حركة المرور المنزلية.',
        vpnTitle: 'VPN مع DDNS',
        vpnDescription: 'خادم WireGuard + Cloudflare API لتحديثات IP المرنة.',
        readMore: 'اقرأ المزيد',
        
        // Projects page
        projectsTitle: 'المشاريع',
        searchEverything: 'البحث في كل شيء',
        searchProjectsAndPosts: 'البحث في المشاريع والمنشورات...',
        filterProjects: 'تصفية المشاريع',
        allFilter: 'الكل',
        searchProjects: 'البحث في المشاريع...',
        caseStudy: 'دراسة حالة',
        screenshotsAndNotes: 'لقطات شاشة وملاحظات',
        writeUp: 'مقالة',
        setupGuide: 'دليل الإعداد',
        
        // Project descriptions (detailed)
        k3sDetailedDescription: 'نُشر على مجموعة راسبيري باي 5 مع Nginx Ingress وcert-manager وسكريبت Cloudflare DDNS.',
        homeAssistantDetailedDescription: 'نظرة عامة على الطاقة ومركز الوسائط وتنبيهات IDS والأتمتة. مبني ببطاقات مخصصة.',
        piIdsDetailedDescription: 'تكامل Snort + Flask + HA. محلل السجلات بـPython يعلم الشذوذ والعناوين المشبوهة.',
        vpnDetailedDescription: 'WireGuard + Cloudflare API يحافظ على إمكانية الوصول لاسم المضيف عند تغيير IP.',
        
        // About page
        aboutTitle: 'عنّي',
        aboutIntro: 'أنا تقني إلكترونيات ومتحمس للأمان السيبراني. أبني على مجموعات راسبيري باي، وأتمتة مع هوم أسيستانت، وأعبث بأدوات الشبكة. أحب الكود الأداء والقابل للصيانة وواجهات المستخدم مع الحركة اللذيذة.',
        aboutSiteDescription: 'هذا الموقع هو موقع ثابت متعدد الصفحات مع CSS/JS مشترك. بسيط وسريع وسهل الاستضافة على Nginx.',
        cvTitle: 'السيرة الذاتية',
        cvDescription: 'حمل نسخة PDF من سيرتي الذاتية أدناه.',
        downloadPDF: 'حمل PDF',
        openInNewTab: 'فتح في تبويب جديد',
        highlightsTitle: 'أبرز النقاط',
        highlight1: 'k3s على مجموعة راسبيري باي مع Nginx Ingress + cert-manager.',
        highlight2: 'أتمتة ولوحات تحكم هوم أسيستانت.',
        highlight3: 'WireGuard VPN مع Cloudflare DDNS.',
        
        // Language toggle
        switchToArabic: 'التبديل إلى العربية',
        switchToEnglish: 'Switch to English'
      }
    };
    
    this.init();
  }
  
  init() {
    // Set initial language state
    this.applyLanguage(this.currentLanguage);
    
    // Bind toggle button
    const toggleButton = document.getElementById('languageToggle');
    if (toggleButton) {
      toggleButton.addEventListener('click', () => this.toggleLanguage());
      this.updateToggleButton();
    }
  }
  
  toggleLanguage() {
    this.currentLanguage = this.currentLanguage === 'en' ? 'ar' : 'en';
    localStorage.setItem('language', this.currentLanguage);
    this.applyLanguage(this.currentLanguage);
    this.updateToggleButton();
  }
  
  applyLanguage(lang) {
    const body = document.body;
    const html = document.documentElement;
    
    if (lang === 'ar') {
      body.classList.add('rtl-mode');
      html.setAttribute('lang', 'ar');
      html.setAttribute('dir', 'rtl');
    } else {
      body.classList.remove('rtl-mode');
      html.setAttribute('lang', 'en');
      html.setAttribute('dir', 'ltr');
    }
    
    this.updateContent(lang);
  }
  
  updateContent(lang) {
    const translations = this.translations[lang];
    
    // Update navigation links
    const navLinks = {
      'Home': 'home',
      'Projects': 'projects', 
      'Blog': 'blog',
      'About': 'about',
      'Contact': 'contact'
    };
    
    document.querySelectorAll('.nav-links a').forEach(link => {
      const text = link.textContent.trim();
      Object.keys(navLinks).forEach(key => {
        if (text === key || text === translations[navLinks[key]]) {
          link.textContent = translations[navLinks[key]];
        }
      });
    });
    
    // Update hero section
    const typewriter = document.getElementById('typewriter');
    if (typewriter) {
      typewriter.innerHTML = `<span class="sr-only">${translations.heroTitle}</span>`;
      // Restart typewriter animation
      if (window.startTypewriter) {
        window.startTypewriter(translations.heroTitle);
      }
    }
    
    const leadText = document.querySelector('.hero .lead');
    if (leadText) {
      leadText.textContent = translations.heroDescription;
    }
    
    // Update CTA buttons
    const seeProjectsBtn = document.querySelector('.btn-primary');
    if (seeProjectsBtn && seeProjectsBtn.textContent.includes('projects')) {
      seeProjectsBtn.textContent = translations.seeProjects;
    }
    
    const aboutMeBtn = document.querySelector('.btn-ghost');
    if (aboutMeBtn && aboutMeBtn.textContent.toLowerCase().includes('about')) {
      aboutMeBtn.textContent = translations.aboutMe;
    }
    
    // Update section titles - handle both home and projects pages
    const sectionTitle = document.querySelector('section:not(.hero) .section-title');
    if (sectionTitle) {
      if (sectionTitle.textContent.includes('Projects') || sectionTitle.textContent.includes('المشاريع')) {
        if (document.querySelector('#projectGrid')) {
          // Projects page
          sectionTitle.textContent = translations.projectsTitle;
        } else {
          // Home page - Featured Projects
          sectionTitle.textContent = translations.featuredProjects;
        }
      }
    }
    
    // Projects page specific elements
    if (document.querySelector('#projectGrid')) {
      // Search Everything heading
      const searchEverythingHeading = document.querySelector('.proj-controls h3');
      if (searchEverythingHeading && searchEverythingHeading.textContent.includes('Search Everything')) {
        searchEverythingHeading.textContent = translations.searchEverything;
      }
      
      // Filter Projects heading
      const filterProjectsHeading = document.querySelectorAll('.proj-controls h3')[1];
      if (filterProjectsHeading && filterProjectsHeading.textContent.includes('Filter Projects')) {
        filterProjectsHeading.textContent = translations.filterProjects;
      }
      
      // Search placeholders
      const searchInput = document.getElementById('q');
      if (searchInput) {
        searchInput.placeholder = translations.searchProjectsAndPosts;
      }
      
      const projSearchInput = document.getElementById('projSearch');
      if (projSearchInput) {
        projSearchInput.placeholder = translations.searchProjects;
      }
      
      // Filter buttons
      const allFilterBtn = document.querySelector('[data-filter="all"]');
      if (allFilterBtn) {
        allFilterBtn.textContent = translations.allFilter;
      }
      
      // Project cards on projects page
      const projectCards = document.querySelectorAll('#projectGrid .card');
      const projectPageData = [
        { titleKey: 'k3sTitle', descKey: 'k3sDetailedDescription', linkKey: 'caseStudy' },
        { titleKey: 'homeAssistantTitle', descKey: 'homeAssistantDetailedDescription', linkKey: 'screenshotsAndNotes' },
        { titleKey: 'piIdsTitle', descKey: 'piIdsDetailedDescription', linkKey: 'writeUp' },
        { titleKey: 'vpnTitle', descKey: 'vpnDetailedDescription', linkKey: 'setupGuide' }
      ];
      
      projectCards.forEach((card, index) => {
        if (projectPageData[index]) {
          const titleLink = card.querySelector('h3 a');
          const description = card.querySelector('.card-body p:not(.muted)');
          const actionLink = card.querySelector('.chip');
          
          if (titleLink) titleLink.textContent = translations[projectPageData[index].titleKey];
          if (description) description.textContent = translations[projectPageData[index].descKey];
          if (actionLink) actionLink.textContent = translations[projectPageData[index].linkKey];
        }
      });
    } else {
      // Home page project cards
      const projectCards = document.querySelectorAll('.card');
      const projectData = [
        { titleKey: 'k3sTitle', descKey: 'k3sDescription' },
        { titleKey: 'homeAssistantTitle', descKey: 'homeAssistantDescription' },
        { titleKey: 'piIdsTitle', descKey: 'piIdsDescription' },
        { titleKey: 'vpnTitle', descKey: 'vpnDescription' }
      ];
      
      projectCards.forEach((card, index) => {
        if (projectData[index]) {
          const title = card.querySelector('h3');
          const description = card.querySelector('p');
          const readMoreLink = card.querySelector('.chip');
          
          if (title) title.textContent = translations[projectData[index].titleKey];
          if (description) description.textContent = translations[projectData[index].descKey];
          if (readMoreLink) readMoreLink.textContent = translations.readMore;
        }
      });
    }
    
    // About page specific elements
    if (document.querySelector('section .section-title') && 
        (document.querySelector('section .section-title').textContent.includes('About') || 
         document.querySelector('section .section-title').textContent.includes('عنّي'))) {
      
      // About page title
      const aboutTitle = document.querySelector('section .section-title');
      if (aboutTitle && (aboutTitle.textContent.includes('About') || aboutTitle.textContent.includes('عنّي'))) {
        aboutTitle.textContent = translations.aboutTitle;
      }
      
      // About page content
      const aboutParagraphs = document.querySelectorAll('section p');
      if (aboutParagraphs.length >= 2) {
        // First paragraph - intro
        aboutParagraphs[0].textContent = translations.aboutIntro;
        // Second paragraph - site description
        aboutParagraphs[1].textContent = translations.aboutSiteDescription;
      }
      
      // CV section title
      const cvTitle = document.querySelectorAll('section h2')[1];
      if (cvTitle && (cvTitle.textContent.includes('Curriculum Vitae') || cvTitle.textContent.includes('السيرة الذاتية'))) {
        cvTitle.textContent = translations.cvTitle;
      }
      
      // CV description
      const cvDesc = document.querySelectorAll('section p')[2];
      if (cvDesc && (cvDesc.textContent.includes('Download a PDF') || cvDesc.textContent.includes('حمل نسخة PDF'))) {
        cvDesc.textContent = translations.cvDescription;
      }
      
      // CV buttons
      const downloadBtn = document.querySelector('.btn-primary');
      if (downloadBtn && (downloadBtn.textContent.includes('Download PDF') || downloadBtn.textContent.includes('حمل PDF'))) {
        downloadBtn.textContent = translations.downloadPDF;
      }
      
      const openTabBtn = document.querySelector('.btn-ghost');
      if (openTabBtn && (openTabBtn.textContent.includes('Open in new tab') || openTabBtn.textContent.includes('فتح في تبويب جديد'))) {
        openTabBtn.textContent = translations.openInNewTab;
      }
      
      // Highlights section
      const highlightsTitle = document.querySelector('h3');
      if (highlightsTitle && (highlightsTitle.textContent.includes('Highlights') || highlightsTitle.textContent.includes('أبرز النقاط'))) {
        highlightsTitle.textContent = translations.highlightsTitle;
      }
      
      // Highlights list items
      const highlightsList = document.querySelector('ul li');
      if (highlightsList) {
        const listItems = document.querySelectorAll('ul li');
        if (listItems.length >= 3) {
          listItems[0].textContent = translations.highlight1;
          listItems[1].textContent = translations.highlight2;
          listItems[2].textContent = translations.highlight3;
        }
      }
    }
  }
  
  updateToggleButton() {
    const button = document.getElementById('languageToggle');
    const langText = button?.querySelector('.lang-text');
    
    if (langText) {
      if (this.currentLanguage === 'en') {
        langText.textContent = 'عربي';
        button.setAttribute('title', this.translations.en.switchToArabic);
      } else {
        langText.textContent = 'EN';
        button.setAttribute('title', this.translations.ar.switchToEnglish);
      }
    }
  }
}

// Initialize when DOM is loaded and header is available
function initializeLanguageManager() {
  if (!window.languageManagerInitialized) {
    new LanguageManager();
    window.languageManagerInitialized = true;
  }
}

// Wait for both DOM and header to be loaded
document.addEventListener('DOMContentLoaded', () => {
  // Check if header is already loaded
  if (document.getElementById('languageToggle')) {
    initializeLanguageManager();
  } else {
    // Wait for header to be loaded
    document.addEventListener('headerLoaded', initializeLanguageManager);
    // Fallback timeout in case headerLoaded event doesn't fire
    setTimeout(() => {
      if (document.getElementById('languageToggle') && !window.languageManagerInitialized) {
        initializeLanguageManager();
      }
    }, 500);
  }
});

// Export for use in other scripts
window.LanguageManager = LanguageManager;
