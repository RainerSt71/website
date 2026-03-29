// ── CONTACT FORM ──
const form = document.querySelector('form');
form.addEventListener('submit', function() {
  alert('Thanks for your message! I will get back to you soon.');
});

// ── HAMBURGER MENU ──
function initHamburger() {
  console.log('initHamburger called');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  console.log('Elements found:', { hamburger, navLinks });
  if (!hamburger || !navLinks) {
    console.warn('Hamburger or nav-links not found');
    return;
  }
  hamburger.addEventListener('click', function() {
    console.log('Hamburger clicked');
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      console.log('Nav link clicked, closing menu');
      navLinks.classList.remove('open');
    });
  });
}

// Run after DOM is fully loaded
if (document.readyState === 'loading') {
  console.log('Adding DOMContentLoaded listener');
  document.addEventListener('DOMContentLoaded', initHamburger);
} else {
  console.log('DOM already loaded, calling initHamburger directly');
  initHamburger();
}