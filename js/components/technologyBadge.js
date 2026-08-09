import { createElement } from '../utils.js';

export function createTechnologyBadge(category) {
  return createElement('article', { className: 'card scale-up technology-card' }, [
    createElement('h3', { className: 'technology-title' }, [category.category]),
    createElement('div', { className: 'technology-badges' }, category.skills.map((skill) => {
      return category.link
        ? createElement('a', { className: 'skill-badge technology-badge', href: category.link, target: '_blank', rel: 'noreferrer' }, [skill])
        : createElement('span', { className: 'skill-badge technology-badge' }, [skill]);
    }))
  ]);
}
