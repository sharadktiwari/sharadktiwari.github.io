import { createElement } from '../utils.js';

export function createCertificationCard(certification) {
  return createElement('article', { className: 'card scale-up certification-card' }, [
    createElement('div', { className: 'certification-icon' }, [certification.icon || '🎓']),
    createElement('div', { className: 'certification-meta' }, [
      createElement('h3', {}, [certification.title]),
      createElement('p', { className: 'small-copy' }, [certification.issuer]),
      createElement('p', { className: 'small-copy certification-date' }, [certification.dateRange])
    ]),
    createElement('p', {}, [certification.description])
  ]);
}
