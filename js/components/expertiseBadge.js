import { createElement } from '../utils.js';

export function createExpertiseBadge(category) {
  return createElement('article', { className: 'card scale-up expertise-card' }, [
    createElement('h3', {}, [category.category]),
    createElement('div', { className: 'expertise-skills' }, category.skills.map((skill) => createElement('span', { className: 'skill-badge' }, [skill])))
  ]);
}
