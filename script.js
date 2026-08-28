// ── CONTACT FORM ──
function initContactForm() {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if (!form || !status) return;

  form.addEventListener('submit', function(event) {
    event.preventDefault();
    status.textContent = 'Sending...';
    status.className = '';

    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    })
      .then(response => {
        if (response.ok) {
          status.textContent = 'Thanks for your message! I will get back to you soon.';
          status.className = 'success';
          form.reset();
        } else {
          status.textContent = 'Something went wrong. Please try again or email me directly.';
          status.className = 'error';
        }
      })
      .catch(() => {
        status.textContent = 'Something went wrong. Please try again or email me directly.';
        status.className = 'error';
      });
  });
}

// ── HAMBURGER MENU ──
function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', function() {
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });
}

// Run after DOM is fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
    initHamburger();
  });
} else {
  initContactForm();
  initHamburger();
}
