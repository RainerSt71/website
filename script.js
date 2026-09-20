// ── KONTAKTFORMULAR ──
function initContactForm() {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if (!form || !status) return;

  const fehler = 'Etwas ist schiefgelaufen. Bitte versuche es erneut oder schreib mir direkt eine E-Mail.';

  form.addEventListener('submit', function(event) {
    event.preventDefault();
    status.textContent = 'Wird gesendet …';
    status.className = '';

    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    })
      .then(response => {
        if (response.ok) {
          status.textContent = 'Vielen Dank für deine Nachricht! Ich melde mich bald bei dir.';
          status.className = 'success';
          form.reset();
        } else {
          status.textContent = fehler;
          status.className = 'error';
        }
      })
      .catch(() => {
        status.textContent = fehler;
        status.className = 'error';
      });
  });
}

// ── HAMBURGER-MENÜ ──
function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  if (!hamburger || !navLinks) return;
  const nav = navLinks.closest('nav');

  function setOpen(open) {
    nav.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', String(open));
    hamburger.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
  }

  hamburger.addEventListener('click', () => setOpen(!nav.classList.contains('open')));
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setOpen(false));
  });
}

// ── SCROLL-ANIMATIONEN ──
function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) return;
  document.documentElement.classList.add('js');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  items.forEach((el, i) => {
    el.style.transitionDelay = (i % 3) * 90 + 'ms';
    observer.observe(el);
  });
}

function init() {
  initContactForm();
  initHamburger();
  initReveal();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
