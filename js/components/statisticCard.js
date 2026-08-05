import { createElement } from '../utils.js';

export function createStatisticCard(statistic) {
  const numeric = Number(String(statistic.value).replace(/[^0-9]/g, '')) || 0;
  const suffix = String(statistic.value).replace(/[0-9]/g, '');

  return createElement('article', { className: 'card' }, [
    createElement('p', { className: 'eyebrow-label' }, [statistic.label]),
    createElement('h3', { 'data-counter': numeric, 'data-suffix': suffix }, ['0' + suffix]),
    createElement('p', { className: 'small-copy' }, [statistic.description])
  ]);
}
