const navSelector = '#navbar-root';
const activeClass = 'is-open';

export function initNavigation() {
  const navRoot = document.querySelector(navSelector);
  if (!navRoot) return;

  navRoot.addEventListener('click', (event) => {
    const toggleButton = event.target.closest('[data-nav-toggle]');
    if (toggleButton) {
      const menu = navRoot.querySelector('.navbar-links');
      menu?.classList.toggle(activeClass);
    }
  });

  window.addEventListener('scroll', () => {
    const header = navRoot.querySelector('.navbar');
    if (window.scrollY > 30) {
      header?.classList.add('sticky-header');
    } else {
      header?.classList.remove('sticky-header');
    }
  });
}
