import { createElement } from '../utils.js';

function createList(items) {
  return createElement(
    'ul',
    { className: 'case-study-list' },
    items.map((item) => createElement('li', {}, [item]))
  );
}

export function createCaseStudyCard(study) {
  const card = createElement('article', { className: 'card scale-up case-study-card' }, [
    createElement('div', { className: 'case-study-card-head' }, [
      createElement('span', { className: 'case-study-pill' }, [study.category || 'Enterprise AI']),
      study.projectType ? createElement('span', { className: 'case-study-pill' }, [study.projectType]) : null,
      createElement('h3', {}, [study.title])
    ]),
    createElement('p', { className: 'case-study-summary small-copy' }, [study.businessProblem]),
    createElement('div', { className: 'case-study-impact' }, [
      createElement('p', { className: 'case-study-impact-label' }, ['Key outcome']),
      createElement('p', {}, [study.impact[0]])
    ]),
    createElement('div', { className: 'case-study-meta' }, [
      createElement('p', { className: 'small-copy' }, [study.businessContext]),
      createElement('div', { className: 'case-study-stack' }, study.technologies.map((tech) => createElement('span', { className: 'skill-badge' }, [tech])))
    ]),
    createElement('div', { className: 'case-study-actions' }, [
      createElement('button', { className: 'btn btn-secondary', type: 'button', 'data-modal-open': study.id }, ['View Case Study']),
      study.repositoryUrl ? createElement('a', { className: 'btn btn-primary', href: study.repositoryUrl, target: '_blank', rel: 'noopener noreferrer' }, ['View GitHub Repository']) : null
    ])
  ]);

  const modal = createElement('div', { className: 'modal', 'data-modal': study.id }, [
    createElement('div', { className: 'modal-content' }, [
      createElement('button', { className: 'modal-close', 'data-modal-close': 'true', type: 'button' }, ['×']),
      createElement('h2', {}, [study.title]),
      createElement('p', { className: 'eyebrow-label' }, [study.category || 'Enterprise AI']),
      study.projectType ? createElement('p', { className: 'small-copy' }, [study.projectType]) : null,
      createElement('div', { className: 'modal-section' }, [
        createElement('h3', {}, ['Business Problem']),
        createElement('p', {}, [study.businessProblem])
      ]),
      createElement('div', { className: 'modal-section' }, [
        createElement('h3', {}, ['Business Context']),
        createElement('p', {}, [study.businessContext])
      ]),
      createElement('div', { className: 'modal-section' }, [
        createElement('h3', {}, ['Challenges']),
        createList(study.challenges)
      ]),
      createElement('div', { className: 'modal-section' }, [
        createElement('h3', {}, ['High-Level Solution']),
        createElement('p', {}, [study.solution])
      ]),
      createElement('div', { className: 'modal-section' }, [
        createElement('h3', {}, ['My Responsibilities']),
        createList(study.responsibilities)
      ]),
      createElement('div', { className: 'modal-section' }, [
        createElement('h3', {}, ['Technology Stack']),
        createElement('div', { className: 'case-study-stack' }, study.technologies.map((tech) => createElement('span', { className: 'skill-badge' }, [tech])))
      ]),
      createElement('div', { className: 'modal-section' }, [
        createElement('h3', {}, ['Business Impact']),
        createList(study.impact)
      ]),
      createElement('div', { className: 'modal-section' }, [
        createElement('h3', {}, ['Lessons Learned']),
        createList(study.lessons)
      ]),
      createElement('p', { className: 'confidentiality-note small-copy' }, [study.confidentialityNotice])
    ])
  ]);

  return createElement('div', { className: 'case-study-wrapper' }, [card, modal]);
}
