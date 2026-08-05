import { createElement } from '../utils.js';

export function createProjectCard(project) {
  const stack = Array.isArray(project.stack) ? project.stack : [];
  const github = project.github || '#';
  const demo = project.demo || '#';

  return createElement('article', { className: 'card scale-up project-card' }, [
    createElement('div', { className: 'project-card-media' }, [
      createElement('div', { className: 'project-image-placeholder' }, ['AI'])
    ]),
    createElement('h3', {}, [project.title]),
    createElement('p', {}, [project.description]),
    createElement('div', { className: 'project-stack' }, stack.map((tech) => createElement('span', { className: 'skill-badge' }, [tech]))),
    createElement('div', { className: 'project-actions' }, [
      createElement('a', { className: 'btn btn-secondary', href: github }, ['GitHub']),
      createElement('a', { className: 'btn btn-secondary', href: demo }, ['Live Demo']),
      createElement('button', { className: 'btn btn-primary', type: 'button' }, ['Details'])
    ])
  ]);
}
