import { createElement } from '../utils.js';

export function createContactCard(method) {
  return createElement('article', { className: 'card scale-up contact-method-card' }, [
    createElement('div', { className: 'contact-icon' }, [method.icon]),
    createElement('h3', {}, [method.title]),
    createElement('p', {}, [method.description]),
    method.url ? createElement('div', { className: 'email-action' }, [
      createElement('a', method.url.startsWith('mailto:')
        ? { className: 'btn btn-secondary', href: method.url }
        : { className: 'btn btn-secondary', href: method.url, target: '_blank', rel: 'noopener noreferrer' }, [method.linkLabel]),
      method.gmailUrl && method.outlookUrl ? createElement('p', { className: 'email-fallback' }, [
        'Prefer webmail? ',
        createElement('a', { href: method.gmailUrl, target: '_blank', rel: 'noopener noreferrer' }, ['Gmail']),
        ' or ',
        createElement('a', { href: method.outlookUrl, target: '_blank', rel: 'noopener noreferrer' }, ['Outlook'])
      ]) : null
    ]) : null
  ]);
}
