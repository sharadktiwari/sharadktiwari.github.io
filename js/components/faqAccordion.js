import { createElement } from '../utils.js';

export function createFaqAccordion(item) {
  const answer = createElement('div', { className: 'faq-answer' }, [
    createElement('p', {}, [item.answer])
  ]);

  return createElement('details', { className: 'faq-item' }, [
    createElement('summary', { className: 'faq-question' }, [item.question]),
    answer
  ]);
}
