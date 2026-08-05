import { createElement } from '../utils.js';

export function createProblemCard(problem) {
  return createElement('article', { className: 'card scale-up problem-card' }, [
    createElement('h3', {}, [problem.title]),
    createElement('p', { className: 'small-copy problem-explanation' }, [problem.explanation]),
    createElement('div', { className: 'problem-meta' }, [
      createElement('p', { className: 'problem-label' }, ['Business impact']),
      createElement('p', { className: 'problem-value' }, [problem.impact])
    ]),
    createElement('p', { className: 'problem-solution' }, [problem.solution])
  ]);
}
