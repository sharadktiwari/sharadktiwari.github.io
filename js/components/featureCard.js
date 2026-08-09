import { createElement } from '../utils.js';

export function createFeatureCard(feature) {
  return createElement('article', { className: 'card scale-up feature-card' }, [
    createElement('div', { className: 'feature-icon' }, [feature.icon]),
    createElement('h3', {}, [feature.title]),
    createElement('p', {}, [feature.description])
  ]);
}
