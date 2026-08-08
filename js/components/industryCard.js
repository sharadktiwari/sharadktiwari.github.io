import { createElement } from '../utils.js';

export function createIndustryCard(industry) {
  return createElement('article', { className: 'card scale-up industry-card' }, [
    createElement('h3', {}, [industry.name]),
    createElement('p', { className: 'industry-summary' }, [industry.opportunity]),
    createElement('div', { className: 'industry-usecases' }, industry.opportunities.map((item) => createElement('span', { className: 'skill-badge' }, [item])))
  ]);
}
