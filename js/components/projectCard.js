import { createElement } from '../utils.js';

export function createProjectCard(project) {
  const stack = Array.isArray(project.stack) ? project.stack : project.technologies || [];
  const tags = Array.isArray(project.tags) ? project.tags : [];
  const categories = Array.isArray(project.categories) ? project.categories.join(' ') : '';

  return createElement('article', { className: 'card scale-up project-card', 'data-categories': categories }, [
    createElement('div', { className: 'project-card-media' }, [
      createElement('div', { className: 'project-image-placeholder' }, [project.title.split(' ').map((word) => word[0]).join('').slice(0, 3).toUpperCase()])
    ]),
    createElement('h3', {}, [project.title]),
    createElement('p', {}, [project.summary || project.description || 'A production-ready AI solution.']),
    createElement('div', { className: 'project-tags' }, tags.map((tag) => createElement('span', { className: 'project-tag' }, [tag]))),
    createElement('div', { className: 'project-stack' }, stack.map((tech) => createElement('span', { className: 'skill-badge' }, [tech]))),
    createElement('div', { className: 'project-actions' }, [
      createElement('button', { className: 'btn btn-primary', type: 'button', 'data-modal-open': project.id }, ['Explore Pattern'])
    ])
  ]);
}
