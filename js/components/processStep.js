import { createElement } from '../utils.js';

export function createProcessStep(step) {
  return createElement('article', { className: 'card scale-up process-step' }, [
    createElement('div', { className: 'process-step-number' }, [step.step]),
    createElement('h3', {}, [step.title]),
    createElement('p', {}, [step.description])
  ]);
}
