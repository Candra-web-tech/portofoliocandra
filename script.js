// ============================================
// INISIALISASI — DOM READY
// ============================================
document.addEventListener('DOMContentLoaded', function () {
  initThemeToggle();
  initHamburger();
  initTypingEffect();
  initNavbarScroll();
  initActiveNavLink();
  initSkillBars();
  initPortfolioFilter();
  initContactForm();
  initScrollTop();
  initFooterProcess();
});
// ============================================
// AKHIR INISIALISASI
// ============================================


// ============================================
// TOGGLE DARK / LIGHT MODE
// ============================================
function initThemeToggle() {
  const btn       = document.getElementById('themeToggle');
  const labelEl   = document.getElementById('themeLabel');
  const html      = document.documentElement;

  // Ambil preferensi tersimpan
  const saved = localStorage.getItem('theme') || 'dark';
  html.setAttribute('data-theme', saved);
  updateLabel(saved, labelEl);

  btn.addEventListener('click', function () {
    const current = html.getAttribute('data-theme');
    const next    = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateLabel(next, labelEl);
  });
}

function updateLabel(theme, el) {
  el.textContent = theme === 'dark' ? '[ light ]' : '[ dark ]';
}
// ============================================
// AKHIR TOGGLE DARK / LIGHT MODE
// ============================================


// ============================================
// HAMBURGER MENU (MOBILE)
// ============================================
function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.getElementById('navMenu');
  const navLinks  = document.querySelectorAll('.nav-tab');

  hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('open');
  });

  // Tutup saat link diklik
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      hamburger.classList.remove('active');
      navMenu.classList.remove('open');
    });
  });
}
// ============================================
// AKHIR HAMBURGER MENU
// ============================================


// ============================================
// TYPING EFFECT — HERO ROLE
// ============================================
function initTypingEffect() {
  const roles = [
    'Web Developer',
    'UI/UX Enthusiast',
    'Frontend Developer',
    'Problem Solver',
    'Mahasiswa IT'
  ];

  const el = document.getElementById('typingRole');
  if (!el) return;

  let rIdx    = 0;
  let cIdx    = 0;
  let deleting = false;

  function tick() {
    const current = roles[rIdx];

    if (deleting) {
      el.textContent = current.substring(0, cIdx - 1);
      cIdx--;
    } else {
      el.textContent = current.substring(0, cIdx + 1);
      cIdx++;
    }

    let delay = deleting ? 55 : 95;

    if (!deleting && cIdx === current.length) {
      delay    = 1800;
      deleting = true;
    } else if (deleting && cIdx === 0) {
      deleting = false;
      rIdx     = (rIdx + 1) % roles.length;
      delay    = 350;
    }

    setTimeout(tick, delay);
  }

  tick();
}
// ============================================
// AKHIR TYPING EFFECT
// ============================================


// ============================================
// NAVBAR — SHADOW SAAT SCROLL
// ============================================
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', function () {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });
}
// ============================================
// AKHIR NAVBAR SCROLL
// ============================================


// ============================================
// ACTIVE NAV LINK BERDASARKAN SCROLL
// ============================================
function initActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const tabs     = document.querySelectorAll('.nav-tab');

  window.addEventListener('scroll', function () {
    let current = '';
    const offset = window.scrollY + 80;

    sections.forEach(function (sec) {
      if (offset >= sec.offsetTop) {
        current = sec.getAttribute('id');
      }
    });

    tabs.forEach(function (tab) {
      tab.classList.toggle(
        'active',
        tab.getAttribute('href') === '#' + current
      );
    });
  });
}
// ============================================
// AKHIR ACTIVE NAV LINK
// ============================================


// ============================================
// ANIMASI SKILL BAR (INTERSECTION OBSERVER)
// ============================================
function initSkillBars() {
  const section = document.querySelector('.skills');
  const bars    = document.querySelectorAll('.sk-bar');
  let done      = false;

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting && !done) {
        bars.forEach(function (bar) {
          const pct = bar.closest('.skill-row').getAttribute('data-width');
          bar.style.width = pct + '%';
        });
        done = true;
      }
    });
  }, { threshold: 0.25 });

  if (section) observer.observe(section);
}
// ============================================
// AKHIR ANIMASI SKILL BAR
// ============================================


// ============================================
// FILTER PORTFOLIO
// ============================================
function initPortfolioFilter() {
  const btns  = document.querySelectorAll('.f-btn');
  const cards = document.querySelectorAll('.port-card');

  btns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      btns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      cards.forEach(function (card) {
        const cat = card.getAttribute('data-category');
        card.classList.toggle('hidden', filter !== 'all' && cat !== filter);
      });
    });
  });
}
// ============================================
// AKHIR FILTER PORTFOLIO
// ============================================


// ============================================
// FORM KONTAK
// ============================================
function initContactForm() {
  const form   = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name    = document.getElementById('f-name').value.trim();
    const email   = document.getElementById('f-email').value.trim();
    const subject = document.getElementById('f-subject').value.trim();
    const message = document.getElementById('f-message').value.trim();

    if (!name || !email || !subject || !message) {
      setStatus(status, '// error: semua field wajib diisi', 'error');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus(status, '// error: format email tidak valid', 'error');
      return;
    }

    setStatus(status, '// sending...', '');

    setTimeout(function () {
      setStatus(status, '// success: pesan terkirim. terima kasih, ' + name + '!', 'success');
      form.reset();
    }, 1400);
  });
}

function setStatus(el, msg, type) {
  el.textContent  = msg;
  el.className    = 'form-status ' + type;
}
// ============================================
// AKHIR FORM KONTAK
// ============================================


// ============================================
// TOMBOL SCROLL TO TOP
// ============================================
function initScrollTop() {
  const btn = document.getElementById('scrollTop');

  window.addEventListener('scroll', function () {
    btn.classList.toggle('visible', window.scrollY > 400);
  });

  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
// ============================================
// AKHIR TOMBOL SCROLL TO TOP
// ============================================


// ============================================
// FOOTER — ANIMASI PROCESS BAR
// ============================================
function initFooterProcess() {
  const el = document.getElementById('processAnim');
  if (!el) return;

  const chars  = '█░';
  const total  = 20;
  let   filled = 0;
  let   dir    = 1;

  setInterval(function () {
    filled += dir;
    if (filled >= total || filled <= 0) dir *= -1;

    const bar = chars[0].repeat(filled) + chars[1].repeat(total - filled);
    el.textContent = '[' + bar + '] ' + Math.round((filled / total) * 100) + '%';
  }, 120);
}
// ============================================
// AKHIR FOOTER PROCESS BAR
// ============================================