import { createElement } from '../utils.js';

export function createValueCard(value) {
  return createElement('article', { className: 'card scale-up value-card' }, [
    createElement('div', { className: 'value-icon' }, [value.icon]),
    createElement('h3', {}, [value.title]),
    createElement('p', {}, [value.description])
  ]);
}
