import { createElement } from '../utils.js';

export function renderFooter(config) {
  const footerRoot = document.querySelector('#footer-root');
  if (!footerRoot) return;

  const footer = createElement('footer', { className: 'footer' }, [
    createElement('div', { className: 'footer-inner container' }, [
      createElement('p', { className: 'footer-copy' }, [config.copyright]),
      createElement('div', { className: 'footer-links' }, config.links.map((link) => {
        return createElement('a', { href: link.href, className: 'navbar-link' }, [link.label]);
      }))
    ])
  ]);

  footerRoot.innerHTML = '';
  footerRoot.appendChild(footer);
}
