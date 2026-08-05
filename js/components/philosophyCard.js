import { createElement } from '../utils.js';

export function createPhilosophyCard(philosophy) {
  return createElement('article', { className: 'card scale-up philosophy-card' }, [
    createElement('div', { className: 'philosophy-icon' }, [philosophy.icon]),
    createElement('h3', {}, [philosophy.title]),
    createElement('p', {}, [philosophy.description])
  ]);
}
