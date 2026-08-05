import { createElement } from '../utils.js';

export function createFeaturedProjectCard(project) {
  return createElement('article', { className: 'featured-card scale-up' }, [
    createElement('div', { className: 'featured-card-media' }, [
      createElement('div', { className: 'project-image-placeholder' }, [project.heroLabel || 'Featured'])
    ]),
    createElement('div', { className: 'featured-card-content' }, [
      createElement('p', { className: 'eyebrow-label' }, [project.heroLabel || 'Featured Solution']),
      createElement('h3', {}, [project.title]),
      createElement('p', { className: 'featured-summary' }, [project.summary]),
      createElement('div', { className: 'featured-meta-grid' }, [
        createElement('div', { className: 'featured-meta-card' }, [
          createElement('h4', {}, ['Business Problem']),
          createElement('p', {}, [project.businessProblem])
        ]),
        createElement('div', { className: 'featured-meta-card' }, [
          createElement('h4', {}, ['Business Value']),
          createElement('ul', { className: 'project-list' }, project.businessValue.map((value) => createElement('li', {}, [value])))
        ])
      ]),
      createElement('div', { className: 'project-stack' }, project.technologies.map((tech) => {
        return createElement('span', { className: 'skill-badge' }, [tech]);
      })),
      createElement('div', { className: 'project-actions' }, [
        createElement('a', { className: 'btn btn-secondary', href: project.github, target: '_blank', rel: 'noreferrer' }, ['GitHub']),
        createElement('a', { className: 'btn btn-secondary', href: project.demo, target: '_blank', rel: 'noreferrer' }, ['Live Demo']),
        createElement('button', { className: 'btn btn-primary', type: 'button', 'data-modal-open': project.id }, ['Technical Details'])
      ])
    ])
  ]);
}
