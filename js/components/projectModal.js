import { createElement } from '../utils.js';

function createSection(title, content) {
  return createElement('section', { className: 'modal-section' }, [
    createElement('h3', {}, [title]),
    content
  ]);
}

function createPlaceholderBlock(label) {
  return createElement('div', { className: 'modal-placeholder' }, [
    createElement('span', {}, [label])
  ]);
}

export function createProjectModal(project) {
  const features = project.features || [];
  const architecture = project.architecture || [];
  const stack = project.technologies || [];
  const decisions = project.decisions || [];
  const challenges = project.challenges || [];
  const performance = project.performance || [];
  const security = project.security || [];
  const deployment = project.deployment || [];
  const improvements = project.improvements || [];

  return createElement('div', { className: 'modal', 'data-modal': project.id }, [
    createElement('div', { className: 'modal-content' }, [
      createElement('button', { className: 'modal-close', type: 'button', 'data-modal-close': 'true', 'aria-label': 'Close modal' }, ['×']),
      createElement('div', { className: 'modal-header' }, [
        createElement('p', { className: 'eyebrow-label' }, ['Project Details']),
        createElement('h2', {}, [project.title]),
        createElement('p', {}, [project.summary])
      ]),
      createElement('div', { className: 'modal-body' }, [
        createSection('Overview', createElement('p', {}, [project.overview || project.summary])),
        createSection('Business Problem', createElement('p', {}, [project.businessProblem])),
        createSection('Solution Overview', createElement('p', {}, [project.solutionOverview || project.summary])),
        createSection('Architecture Diagram', createPlaceholderBlock('Architecture diagram placeholder')),
        createSection('Workflow Diagram', createPlaceholderBlock('Workflow diagram placeholder')),
        createSection('Screenshots', createPlaceholderBlock('Screenshots placeholder')),
        createSection('Features', createElement('ul', { className: 'modal-list' }, features.map((feature) => createElement('li', {}, [feature])))),
        createSection('Technical Stack', createElement('div', { className: 'modal-stack' }, stack.map((item) => createElement('span', { className: 'skill-badge' }, [item])))),
        createSection('Key Engineering Decisions', createElement('ul', { className: 'modal-list' }, decisions.map((item) => createElement('li', {}, [item])))),
        createSection('Challenges Faced', createElement('ul', { className: 'modal-list' }, challenges.map((item) => createElement('li', {}, [item])))),
        createSection('Performance Considerations', createElement('ul', { className: 'modal-list' }, performance.map((item) => createElement('li', {}, [item])))),
        createSection('Security Considerations', createElement('ul', { className: 'modal-list' }, security.map((item) => createElement('li', {}, [item])))),
        createSection('Deployment Strategy', createElement('ul', { className: 'modal-list' }, deployment.map((item) => createElement('li', {}, [item])))),
        createSection('Future Improvements', createElement('ul', { className: 'modal-list' }, improvements.map((item) => createElement('li', {}, [item])))),
        createElement('div', { className: 'modal-links' }, [
          createElement('a', { className: 'btn btn-secondary', href: project.github, target: '_blank', rel: 'noreferrer' }, ['GitHub Repository']),
          createElement('a', { className: 'btn btn-secondary', href: project.demo, target: '_blank', rel: 'noreferrer' }, ['Live Demo']),
          createElement('a', { className: 'btn btn-secondary', href: project.readme, target: '_blank', rel: 'noreferrer' }, ['README'])
        ])
      ])
    ])
  ]);
}
