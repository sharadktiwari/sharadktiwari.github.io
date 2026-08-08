import { createElement } from '../utils.js';

export function renderNavbar(items) {
  const navRoot = document.querySelector('#navbar-root');
  if (!navRoot) return;

  const nav = createElement('nav', { className: 'navbar', role: 'navigation', 'aria-label': 'Site navigation' }, [
    createElement('div', { className: 'navbar-inner' }, [
      createElement('a', { className: 'navbar-brand', href: 'index.html' }, ['Sharad Tiwari'] ),
      createElement('button', {
        className: 'navbar-toggle',
        type: 'button',
        'data-nav-toggle': 'true',
        'aria-label': 'Toggle navigation'
      }, ['Menu']),
      createElement('div', { className: 'navbar-links' }, items.map((item) => {
        return createElement('a', {
          className: 'navbar-link',
          href: item.href
        }, [item.label]);
      }))
    ])
  ]);

  navRoot.innerHTML = '';
  navRoot.appendChild(nav);
}
