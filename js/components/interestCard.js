import { createElement } from '../utils.js';

function createList(items) {
  return createElement('ul', { className: 'interest-list' }, items.map((item) => createElement('li', {}, [item])));
}

export function createInterestCard(interest) {
  return createElement('article', { className: 'card scale-up interest-card' }, [
    createElement('h3', {}, [interest.title]),
    createElement('p', { className: 'interest-description' }, [interest.description]),
    createElement('div', { className: 'interest-section' }, [
      createElement('h4', {}, ['Typical use cases']),
      createList(interest.useCases)
    ]),
    createElement('div', { className: 'interest-section' }, [
      createElement('h4', {}, ['Business outcomes']),
      createList(interest.outcomes)
    ])
  ]);
}
