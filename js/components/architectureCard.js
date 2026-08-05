import { createElement } from '../utils.js';

export function createArchitectureCard(item) {
  return createElement('article', { className: 'card scale-up architecture-card' }, [
    createElement('h3', {}, [item.title]),
    createElement('p', {}, [item.description])
  ]);
}
