/* ============================================================
   main.js — Shared nav + footer injector & all shared logic
   
   Usage in any page:
     1. Add <link rel="stylesheet" href="style.css"> in <head>
     2. Add <script src="main.js" defer></script> before </body>
     3. Place <div id="site-nav"></div> at the top of <body>
        for pages that need the footer too, also add:
        <div id="site-footer"></div> before </body>
   
   The script auto-detects which placeholders exist and injects only what's present.
============================================================ */

/* ============================================================
   DATA
============================================================ */
const wc26HostCountries = [
  { code: "ca", name: "Canada",        shortName: "Canada" },
  { code: "mx", name: "Mexico",        shortName: "Mexico" },
  { code: "us", name: "United States", shortName: "USA"   }
];

const wc26Languages = ["English", "Español", "Français"];

const wc26LocationGroups = [
  {
    group: null,
    items: [
      { label: "All" },
      { label: "Canada" },
      { label: "Mexico" },
      { label: "United States" }
    ]
  },
  {
    group: "Western Region",
    items: [
      { label: "BC Place Vancouver" },
      { label: "Los Angeles Stadium" },
      { label: "San Francisco Bay Area Stadium" },
      { label: "Seattle Stadium" }
    ]
  },
  {
    group: "Central Region",
    items: [
      { label: "Dallas Stadium" },
      { label: "Guadalajara Stadium" },
      { label: "Houston Stadium" },
      { label: "Kansas City Stadium" },
      { label: "Mexico City Stadium" }
    ]
  },
  {
    group: "Eastern Region",
    items: [
      { label: "Atlanta Stadium" },
      { label: "Boston Stadium" },
      { label: "Miami Stadium" },
      { label: "New York/New Jersey Stadium" },
      { label: "Philadelphia Stadium" }
    ]
  }
];

const wc26Teams = [
  { name: "United States", code: "us" },
  { name: "Canada", code: "ca" },
  { name: "Mexico", code: "mx" },
  { name: "Argentina", code: "ar" },
  { name: "Brazil", code: "br" },
  { name: "Colombia", code: "co" },
  { name: "Ecuador", code: "ec" },
  { name: "Paraguay", code: "py" },
  { name: "Uruguay", code: "uy" },
  { name: "England", code: "gb-eng" },
  { name: "France", code: "fr" },
  { name: "Germany", code: "de" },
  { name: "Portugal", code: "pt" },
  { name: "Spain", code: "es" },
  { name: "Netherlands", code: "nl" },
  { name: "Belgium", code: "be" },
  { name: "Croatia", code: "hr" },
  { name: "Switzerland", code: "ch" },
  { name: "Austria", code: "at" },
  { name: "Norway", code: "no" },
  { name: "Scotland", code: "gb-sct" },
  { name: "Türkiye", code: "tr" },
  { name: "Italy", code: "it" },
  { name: "Poland", code: "pl" },
  { name: "Japan", code: "jp" },
  { name: "South Korea", code: "kr" },
  { name: "Iran", code: "ir" },
  { name: "Saudi Arabia", code: "sa" },
  { name: "Jordan", code: "jo" },
  { name: "Qatar", code: "qa" },
  { name: "Australia", code: "au" },
  { name: "Uzbekistan", code: "uz" },
  { name: "Morocco", code: "ma" },
  { name: "Tunisia", code: "tn" },
  { name: "Egypt", code: "eg" },
  { name: "Algeria", code: "dz" },
  { name: "Ghana", code: "gh" },
  { name: "Senegal", code: "sn" },
  { name: "Ivory Coast", code: "ci" },
  { name: "South Africa", code: "za" },
  { name: "Cape Verde", code: "cv" },
  { name: "New Zealand", code: "nz" },
  { name: "Panama", code: "pa" },
  { name: "Costa Rica", code: "cr" },
  { name: "Haiti", code: "ht" },
  { name: "Curaçao", code: "cw" },
  { name: "Jamaica", code: "jm" }
];

const wc26StagesData = [
  { label: "All" },
  { label: "Group Stage Matches" },
  { label: "Round of 32" },
  { label: "Round of 16" },
  { label: "Quarter-Finals" },
  { label: "Semi-Finals" },
  { label: "Bronze Final" },
  { label: "Final" }
];

const wc26Locations = [
  "Atlanta, USA", "Boston, USA", "Dallas, USA", "Houston, USA", "Kansas City, USA",
  "Los Angeles, USA", "Miami, USA", "New York/New Jersey, USA", "Philadelphia, USA",
  "San Francisco Bay Area, USA", "Seattle, USA",
  "Mexico City, Mexico", "Guadalajara, Mexico",
  "BC Place Vancouver, Canada"
];


/* ============================================================
   ACTIVE PAGE DETECTION
============================================================ */
function getActivePage() {
  const p = window.location.pathname;
  if (p.includes('single-matches'))    return 'single-matches';
  if (p.includes('private-suites'))    return 'match-offerings';
  if (p.includes('suites-essentials')) return 'match-offerings';
  if (p.includes('match-offerings'))   return 'match-offerings';
  if (p.includes('faq'))               return 'faq';
  if (p.includes('about'))             return 'about';
  if (p.includes('venues'))            return 'venues';
  if (p.includes('blog'))              return 'blog';
  if (p.includes('schedule'))          return 'schedule';
  if (p.includes('login'))             return 'login';
  return 'home';
}


/* ============================================================
   HEADER HTML
============================================================ */
function buildHeaderHTML() {
  const active = getActivePage();
  return `
<header class="header">

  <!-- LEFT: logos + brand + country + nav (desktop) -->
  <div class="hd-left" style="display:flex;align-items:center;gap:0">

    <a href="index.html">
      <div class="desktop-logo">
        <img src="images/FIFA_26_logo.webp" alt="" style="height: 70px;" >
        <div class="hd-div"></div>
        <img src="images/on_location_logo.webp" alt="" style="height: 60px;">
      </div>

      <div class="mobile-logo">
        <img src="images/FIFA_26_logo.webp" alt="" style="height: 70px;">
        <div class="hd-div"></div>
        <img src="images/68a5c8c222445431e291f6aa_OnLocation icon.svg" alt="" style="height: 40px;">
      </div>
    </a>

    <!-- country pill – desktop -->
    <div class="hd-country" id="hdCountry">
      <img src="https://flagcdn.com/w40/us.png" alt="USA flag" id="hdCountryFlag">
      <span id="hdCountryName">USA</span>
      <i class="fa-solid fa-chevron-down"></i>
    </div>

    <!-- country pill – mobile only -->
    <div class="mob-country-pill" id="mobCountryPill" style="display:none">
      <img src="https://flagcdn.com/w40/us.png" alt="USA flag" id="mobCountryFlag">
      <span id="mobCountryName">USA</span>
      <i class="fa-solid fa-chevron-down"></i>
    </div>

    <nav class="hd-nav">
      <a href="single-matches.html">Single Matches</a>

      <div class="hd-nav-item" id="navMatchOfferings">
        Match Offerings <i class="fa-solid fa-chevron-down"></i>
        <div class="hd-nav-submenu" id="navMatchOfferingsMenu">
          <a href="#"> Private Suites</a>
          <a href="#"> Suites Essentials</a>
        </div>
      </div>

      <a href="#">FAQ</a>

      <div class="hd-nav-item" id="navMore">
        More <i class="fa-solid fa-chevron-down"></i>
        <div class="hd-nav-submenu" id="navMoreMenu">
          <a href="#">About</a>
          <a href="#">Venues</a>
          <a href="#"></i> Blog</a>
        </div>
      </div>

      <button class="hd-schedule">Schedule <i class="fa-regular fa-calendar"></i></button>
    </nav>

  </div>

  <!-- RIGHT: desktop items -->
  <div class="hd-right">
    <span class="hd-visa"><img src="images/VISA - FIFA.webp" alt="" style="height: 50px;"></span>
    <span class="hd-lang" id="hdLang">English <i class="fa-solid fa-chevron-down"></i>
      <div class="hd-lang-dropdown" id="hdLangDropdown"></div>
    </span>
    <span class="hd-login">Log In / Sign Up</span>
  </div>

  <!-- MOBILE RIGHT: VISA + trophy + hamburger -->
  <div class="mob-header-right" style="display:none">
    <img src="images/VISA - FIFA.webp" alt="" style="height: 50px;">
    <button class="hd-hamburger" id="hamburgerBtn" aria-label="Open menu">
      <span></span><span></span><span></span>
    </button>
  </div>

</header>

<!-- MOBILE DRAWER -->
<div class="mob-drawer" id="mobDrawer">
  <div class="mob-drawer-backdrop" id="drawerBackdrop"></div>
  <div class="mob-drawer-panel">
    <nav class="mob-drawer-nav">
      <a href="single-matches.html">Single Matches</a>

      <div class="mob-nav-item" id="mobNavMatchOfferings">
        Match Offerings <i class="fa-solid fa-chevron-down"></i>
      </div>
      <div class="mob-nav-submenu" id="mobNavMatchOfferingsMenu">
        <a href="private-suites.html"><i class="fa-solid fa-couch"></i> Private Suites</a>
        <a href="suites-essentials.html"><i class="fa-solid fa-chair"></i> Suites Essentials</a>
      </div>

      <a href="faq.html">FAQ</a>

      <div class="mob-nav-item" id="mobNavMore">
        More <i class="fa-solid fa-chevron-down"></i>
      </div>
      <div class="mob-nav-submenu" id="mobNavMoreMenu">
        <a href="about.html"><i class="fa-solid fa-circle-info"></i> About</a>
        <a href="venues.html"><i class="fa-solid fa-location-dot"></i> Venues</a>
        <a href="blog.html"><i class="fa-solid fa-newspaper"></i> Blog</a>
      </div>

      <div class="mob-lang-row">English <i class="fa-solid fa-chevron-down"></i></div>
      <a href="login.html" class="mob-login-row">Log In / Sign Up</a>
    </nav>

    <div class="mob-drawer-footer">
      <a href="schedule.html" class="mob-schedule-btn">
        Schedule
        <i class="fa-regular fa-calendar"></i>
      </a>
    </div>
  </div>
</div>

<!-- COUNTRY MODAL -->
<div class="country-modal-backdrop" id="countryModalBackdrop">
  <div class="country-modal" id="countryModal">
    <button class="country-modal-close" id="countryModalClose" aria-label="Close">
      <i class="fa-solid fa-xmark"></i>
    </button>
    <div class="country-modal-grid">
      <div class="country-modal-text">
        <h2 class="country-modal-title">Choose Country</h2>
        <p class="country-modal-desc">Please select the host country in which you're purchasing hospitality packages. The price will be in the respective country's currency.</p>
        <p class="country-modal-note">Packages taking place in different countries require separate transactions.</p>
      </div>
      <div class="country-modal-options" id="countryModalOptions"></div>
    </div>
  </div>
</div>
`;
}


/* ============================================================
   FOOTER HTML
============================================================ */
function buildFooterHTML() {
  return `
<footer class="site-footer">
  <div class="footer-container">

    <div class="footer-left">
      <div class="footer-branding">
        <img src="images/68a5b84cd5c2daf5cba1b609_FIFA_OL_Logo.webp" alt="FIFA On Location Logo">
      </div>
      <div class="footer-social">
        <a href="#" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
        <a href="#" aria-label="X / Twitter"><i class="fa-brands fa-x-twitter"></i></a>
        <a href="#" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
        <a href="#" aria-label="TikTok"><i class="fa-brands fa-tiktok"></i></a>
      </div>
    </div>

    <div class="footer-center">
      <h4>Home</h4>
      <div class="footer-links">
        <a href="#">About Us</a>
        <a href="#">My Account</a>
        <a href="#">My Orders</a>
        <a href="#">FAQ</a>
        <a href="#">FIFA World Cup 26™ Sales Agents</a>
        <a href="#">Contact Us</a>
        <a href="#">Request Accessible Hospitality</a>
      </div>
    </div>

    <div class="footer-right">
      <h4>NOT READY TO MAKE<br>A PURCHASE?</h4>
      <a href="#" class="register-btn">Register Interest</a>
    </div>

  </div>

  <div class="footer-bottom">
    <div class="copyright">© 2025 On Location Events, LLC | All Rights Reserved</div>
    <div class="legal-links">
      <a href="#">Privacy Policy</a>
      <a href="#">FIFA Ticket Terms of Use</a>
      <a href="#">On Location Terms of Use</a>
      <a href="#">Hospitality Sales Regulations</a>
      <a href="#">Deposit Terms</a>
      <a href="#">Cookie Policy</a>
      <a href="#">Do Not Sell My Personal Info</a>
      <a href="#">Cookies Settings/Preferences</a>
    </div>
    <div class="footer-phone">
      Interested in packages not available online? Please call:<br>
      U.S.A. +1-844-652-1685 &nbsp;|&nbsp;
      Canada +1-888-502-7844 &nbsp;|&nbsp;
      Mexico +52 80 0283 3520
    </div>
  </div>
</footer>
`;
}


/* ============================================================
   INJECT NAV + FOOTER
============================================================ */
(function inject() {
  // Header
  const navSlot = document.getElementById('site-nav');
  if (navSlot) {
    navSlot.outerHTML = buildHeaderHTML();
  }

  // Footer (optional – only inject if placeholder exists)
  const footerSlot = document.getElementById('site-footer');
  if (footerSlot) {
    footerSlot.outerHTML = buildFooterHTML();
  }
})();


/* ============================================================
   UTILS
============================================================ */
function closeAllDropdowns() {
  document.querySelectorAll(
    '.fc-dropdown.open, .hd-lang-dropdown.open, .kbyg-dropdown.open, .hd-country-dropdown.open, .sm-filter-dropdown.open'
  ).forEach(d => d.classList.remove('open'));
  document.querySelectorAll('.fc-value.open, .mob-filter-input.open, .sm-filter-btn.open')
    .forEach(v => v.classList.remove('open'));
  document.querySelectorAll('.hd-nav-submenu.open').forEach(m => m.classList.remove('open'));
  document.querySelectorAll('.hd-nav-item.open').forEach(i => i.classList.remove('open'));
}
document.addEventListener('click', closeAllDropdowns);


/* ============================================================
   HEADER — country pill click → opens modal (desktop + mobile)
============================================================ */
(function initCountryPillClick() {
  // Wire up after DOM is ready (injection already happened)
  function bindPill(id) {
    const el = document.getElementById(id);
    if (el) el.addEventListener('click', e => { e.stopPropagation(); openCountryModal(); });
  }
  bindPill('hdCountry');
  bindPill('mobCountryPill');
})();


/* ============================================================
   HEADER — language switcher
============================================================ */
(function initLangDropdown() {
  const hdLang     = document.getElementById('hdLang');
  const hdLangDrop = document.getElementById('hdLangDropdown');
  if (!hdLang || !hdLangDrop) return;

  wc26Languages.forEach((lang, i) => {
    const el = document.createElement('div');
    el.className = 'hd-lang-item' + (i === 0 ? ' selected' : '');
    el.textContent = lang;
    el.addEventListener('click', e => {
      e.stopPropagation();
      const textNode = hdLang.childNodes[0];
      if (textNode) textNode.textContent = lang + ' ';
      hdLangDrop.querySelectorAll('.hd-lang-item').forEach(x => x.classList.remove('selected'));
      el.classList.add('selected');
      closeAllDropdowns();
    });
    hdLangDrop.appendChild(el);
  });

  hdLang.addEventListener('click', e => {
    e.stopPropagation();
    const isOpen = hdLangDrop.classList.contains('open');
    closeAllDropdowns();
    if (!isOpen) hdLangDrop.classList.add('open');
  });
})();


/* ============================================================
   HEADER — desktop nav submenus (Match Offerings / More)
============================================================ */
function setupNavSubmenu(itemId, menuId) {
  const item = document.getElementById(itemId);
  const menu = document.getElementById(menuId);
  if (!item || !menu) return;
  item.addEventListener('click', e => {
    e.stopPropagation();
    const isOpen = menu.classList.contains('open');
    closeAllDropdowns();
    if (!isOpen) { menu.classList.add('open'); item.classList.add('open'); }
  });
}
setupNavSubmenu('navMatchOfferings', 'navMatchOfferingsMenu');
setupNavSubmenu('navMore', 'navMoreMenu');


/* ============================================================
   HEADER — mobile drawer
============================================================ */
(function initDrawer() {
  const drawer       = document.getElementById('mobDrawer');
  const backdrop     = document.getElementById('drawerBackdrop');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const headerEl     = document.getElementById('site-header-el');
  if (!drawer || !hamburgerBtn) return;

  function setDrawerOffset() {
    if (headerEl) {
      document.documentElement.style.setProperty('--mob-header-h', headerEl.offsetHeight + 'px');
    }
  }
  setDrawerOffset();
  window.addEventListener('resize', setDrawerOffset);

  function openDrawer() {
    setDrawerOffset();
    drawer.classList.add('open');
    hamburgerBtn.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }
  function closeDrawer() {
    drawer.classList.remove('open');
    hamburgerBtn.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  hamburgerBtn.addEventListener('click', () => {
    drawer.classList.contains('open') ? closeDrawer() : openDrawer();
  });
  if (backdrop) backdrop.addEventListener('click', closeDrawer);

  // Mobile drawer submenus
  function setupMobSubmenu(itemId, menuId) {
    const item = document.getElementById(itemId);
    const menu = document.getElementById(menuId);
    if (!item || !menu) return;
    item.addEventListener('click', () => {
      const isOpen = menu.classList.contains('open');
      menu.classList.toggle('open', !isOpen);
      item.classList.toggle('open', !isOpen);
    });
  }
  setupMobSubmenu('mobNavMatchOfferings', 'mobNavMatchOfferingsMenu');
  setupMobSubmenu('mobNavMore', 'mobNavMoreMenu');
})();


/* ============================================================
   COUNTRY MODAL
============================================================ */
let selectedCountryCode = 'us';

function renderCountryModalOptions() {
  const optionsEl = document.getElementById('countryModalOptions');
  if (!optionsEl) return;

  optionsEl.innerHTML = wc26HostCountries.map(c => `
    <div class="country-modal-option ${c.code === selectedCountryCode ? 'selected' : ''}" data-code="${c.code}">
      <div class="country-modal-option-left">
        <img src="https://flagcdn.com/w40/${c.code}.png" alt="${c.name} flag">
        <span>${c.name}</span>
      </div>
      <i class="fa-solid fa-chevron-right"></i>
    </div>
  `).join('');

  optionsEl.querySelectorAll('.country-modal-option').forEach(el => {
    el.addEventListener('click', () => {
      const code    = el.dataset.code;
      const country = wc26HostCountries.find(c => c.code === code);
      selectedCountryCode = code;

      // Update desktop pill
      const hdF = document.getElementById('hdCountryFlag');
      const hdN = document.getElementById('hdCountryName');
      if (hdF) { hdF.src = `https://flagcdn.com/w40/${code}.png`; hdF.alt = `${country.name} flag`; }
      if (hdN) hdN.textContent = country.shortName;

      // Update mobile pill
      const mobF = document.getElementById('mobCountryFlag');
      const mobN = document.getElementById('mobCountryName');
      if (mobF) { mobF.src = `https://flagcdn.com/w40/${code}.png`; mobF.alt = `${country.name} flag`; }
      if (mobN) mobN.textContent = country.shortName;

      closeCountryModal();
    });
  });
}

function openCountryModal() {
  renderCountryModalOptions();
  const backdrop = document.getElementById('countryModalBackdrop');
  if (backdrop) backdrop.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCountryModal() {
  const backdrop = document.getElementById('countryModalBackdrop');
  if (backdrop) backdrop.classList.remove('open');
  document.body.style.overflow = '';
}

(function initCountryModal() {
  const closeBtn  = document.getElementById('countryModalClose');
  const backdrop  = document.getElementById('countryModalBackdrop');

  if (closeBtn)  closeBtn.addEventListener('click', closeCountryModal);
  if (backdrop)  backdrop.addEventListener('click', e => { if (e.target === backdrop) closeCountryModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeCountryModal(); });
})();