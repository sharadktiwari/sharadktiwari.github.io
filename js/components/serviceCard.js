import { createElement } from '../utils.js';

export function createServiceCard(service) {
  const technologies = Array.isArray(service.technologies) ? service.technologies : [];

  return createElement('article', { className: 'card scale-up service-card' }, [
    createElement('div', { className: 'service-card-head' }, [
      createElement('span', { className: 'service-icon' }, [service.icon || '🧩']),
      createElement('h3', {}, [service.title])
    ]),
    createElement('p', {}, [service.summary]),
    createElement('p', { className: 'small-copy service-value' }, [service.businessValue || 'Business value aligned to enterprise outcomes.']),
    createElement('div', { className: 'service-stack' }, technologies.map((label) => createElement('span', { className: 'skill-badge' }, [label])))
  ]);
}
