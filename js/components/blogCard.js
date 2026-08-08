import { createElement } from '../utils.js';

export function createBlogCard(post) {
  return createElement('article', { className: 'card scale-up' }, [
    createElement('div', { className: 'blog-card-meta small-copy' }, [
      `${post.date} · ${post.readTime}`
    ]),
    createElement('h3', {}, [post.title]),
    createElement('div', { className: 'blog-tags' }, post.tags.map((tag) => createElement('span', { className: 'skill-badge' }, [tag]))),
    createElement('a', { className: 'btn btn-secondary', href: post.url || '#', role: 'link' }, ['Read More'])
  ]);
}
