import { createElement } from '../utils.js';

export function createCategoryFilterButton(category) {
  return createElement('button', {
    className: `filter-pill ${category.id === 'all' ? 'active' : ''}`,
    type: 'button',
    'data-filter': category.id
  }, [category.title]);
}
