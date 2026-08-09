import { createElement } from '../utils.js';

export function createTestimonialCard(testimonial) {
  return createElement('article', { className: 'card scale-up testimonial-card' }, [
    createElement('div', { className: 'testimonial-header' }, [
      createElement('div', { className: 'testimonial-avatar' }, [testimonial.name.charAt(0)]),
      createElement('div', { className: 'testimonial-meta' }, [
        createElement('h3', {}, [testimonial.name]),
        createElement('p', { className: 'small-copy' }, [`${testimonial.role}, ${testimonial.company}`])
      ])
    ]),
    createElement('p', { className: 'testimonial-feedback' }, [testimonial.feedback]),
    createElement('div', { className: 'testimonial-stars' }, Array.from({ length: testimonial.rating }, () => createElement('span', { className: 'testimonial-star' }, ['★'])))
  ]);
}
