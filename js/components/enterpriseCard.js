import { createElement } from '../utils.js';

export function createEnterpriseCard(experience) {
  return createElement('article', { className: 'card scale-up enterprise-card' }, [
    createElement('div', { className: 'enterprise-card-header' }, [
      createElement('div', { className: 'enterprise-logo' }, [experience.company.charAt(0)]),
      createElement('div', { className: 'enterprise-meta' }, [
        createElement('p', { className: 'eyebrow-label' }, [experience.role]),
        createElement('p', { className: 'small-copy' }, [experience.company])
      ])
    ]),
    createElement('p', { className: 'enterprise-duration small-copy' }, [experience.dateRange]),
    createElement('p', {}, [experience.summary]),
    createElement('button', {
      className: 'btn btn-secondary btn-block',
      type: 'button',
      'data-modal-open': experience.id
    }, ['View details'])
  ]);
}
