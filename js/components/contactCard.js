import { createElement } from '../utils.js';

export function createContactCard(method) {
  return createElement('article', { className: 'card scale-up contact-method-card' }, [
    createElement('div', { className: 'contact-icon' }, [method.icon]),
    createElement('h3', {}, [method.title]),
    createElement('p', {}, [method.description]),
    method.url ? createElement('a', { className: 'btn btn-secondary', href: method.url, target: '_blank', rel: 'noreferrer' }, [method.linkLabel]) : null
  ]);
}
