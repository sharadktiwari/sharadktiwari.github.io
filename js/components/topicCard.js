import { createElement } from '../utils.js';

export function createTopicCard(topic) {
  return createElement('button', {
    className: 'topic-card',
    type: 'button',
    'data-topic': topic.id
  }, [
    createElement('div', { className: 'topic-card-title' }, [topic.title]),
    createElement('p', { className: 'topic-card-description' }, [topic.description])
  ]);
}
