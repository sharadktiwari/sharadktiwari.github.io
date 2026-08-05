import { createElement } from '../utils.js';

export function createTimelineItem(item) {
  return createElement('article', { className: 'timeline-card' }, [
    createElement('div', { className: 'timeline-card-header' }, [
      createElement('div', { className: 'timeline-logo' }, [item.logo || item.company.charAt(0)]),
      createElement('div', { className: 'timeline-card-meta' }, [
        createElement('p', { className: 'eyebrow-label' }, [item.company]),
        createElement('h3', {}, [item.role]),
        createElement('p', { className: 'small-copy timeline-meta-text' }, [`${item.location} · ${item.dateRange}`])
      ])
    ]),
    createElement('p', { className: 'timeline-summary' }, [item.summary]),
    createElement('div', { className: 'timeline-outcomes' }, item.outcomes.map((outcome) => createElement('p', { className: 'timeline-outcome' }, [outcome]))),
    createElement('div', { className: 'timeline-tech' }, item.technologies.map((tech) => createElement('span', { className: 'skill-badge' }, [tech])))
  ]);
}
