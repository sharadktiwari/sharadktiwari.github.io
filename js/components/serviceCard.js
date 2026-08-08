import { createElement } from '../utils.js';

function createList(items) {
  return createElement('ul', { className: 'service-list' }, items.map((item) => createElement('li', {}, [item])));
}

export function createServiceCard(service) {
  const technologies = Array.isArray(service.technologies) ? service.technologies : [];
  const outcomes = Array.isArray(service.outcomes) ? service.outcomes : [];
  const deliverables = Array.isArray(service.deliverables) ? service.deliverables : [];

  return createElement('article', { className: 'card scale-up service-card' }, [
    createElement('div', { className: 'service-card-head' }, [
      createElement('span', { className: 'service-icon' }, [service.icon || '🧩']),
      createElement('div', {}, [
        createElement('h3', {}, [service.title]),
        createElement('p', { className: 'small-copy service-duration' }, [service.duration || '8–12 weeks'])
      ])
    ]),
    createElement('p', { className: 'service-description' }, [service.description]),
    createElement('div', { className: 'service-section' }, [
      createElement('h4', {}, ['Business outcomes']),
      createList(outcomes)
    ]),
    createElement('div', { className: 'service-section' }, [
      createElement('h4', {}, ['Typical deliverables']),
      createList(deliverables)
    ]),
    createElement('div', { className: 'service-section' }, [
      createElement('h4', {}, ['Technologies used']),
      createElement('div', { className: 'service-stack' }, technologies.map((label) => createElement('span', { className: 'skill-badge' }, [label])))
    ])
  ]);
}
