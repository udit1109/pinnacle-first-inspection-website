document.addEventListener('DOMContentLoaded', () => {
  const year = document.querySelectorAll('[data-year]');
  year.forEach((element) => { element.textContent = new Date().getFullYear(); });

  const menuButton = document.querySelector('.menu-btn');
  const navigation = document.querySelector('.nav-links');
  if (menuButton && navigation) {
    menuButton.addEventListener('click', () => {
      const open = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!open));
      navigation.classList.toggle('open', !open);
      menuButton.textContent = open ? 'MENU' : 'CLOSE';
    });
    navigation.addEventListener('click', (event) => {
      if (event.target.closest('a')) {
        navigation.classList.remove('open');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.textContent = 'MENU';
      }
    });
  }

  const currentPage = window.location.pathname.split('/').pop() || 'pinnacle-first-inspection.html';
  document.querySelectorAll('.nav-links a').forEach((link) => {
    if (link.getAttribute('href') === currentPage) {
      link.setAttribute('aria-current', 'page');
    }
  });

  document.querySelectorAll('[data-mailto-form]').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const fields = new FormData(form);
      const body = Array.from(fields.entries())
        .map(([key, value]) => `${key.replaceAll('_', ' ')}: ${String(value).trim() || 'Not provided'}`)
        .join('\n');
      const recipient = form.dataset.recipient || 'info@pinnaclefirstinspection.com';
      const subject = form.dataset.subject || 'Website inquiry';
      window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  });
});
