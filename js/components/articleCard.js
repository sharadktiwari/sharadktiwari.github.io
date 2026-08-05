import { createElement } from '../utils.js';

export function createArticleCard(article, options = {}) {
  const isFeatured = options.featured || false;
  const tags = Array.isArray(article.tags) ? article.tags : [];
  const categories = Array.isArray(article.categories) ? article.categories.join(' ') : article.category || '';
  const thumb = article.thumbnail || './assets/article-thumb-placeholder.jpg';
  const badge = isFeatured ? createElement('span', { className: 'article-badge' }, ['Featured']) : null;

  const normalizeCategory = (article.category || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  return createElement('article', { className: `card scale-up article-card ${isFeatured ? 'featured-article' : ''}`, 'data-category': normalizeCategory, 'data-tags': tags.join(' ').toLowerCase() }, [
    createElement('div', { className: 'article-card-media' }, [
      createElement('img', { className: 'article-thumbnail', src: thumb, alt: article.title, loading: 'lazy' }),
      badge
    ]),
    createElement('div', { className: 'article-card-content' }, [
      createElement('span', { className: 'article-category-label' }, [article.category || 'AI Engineering']),
      createElement('h3', {}, [article.title]),
      createElement('p', { className: 'article-summary' }, [article.summary]),
      createElement('div', { className: 'article-meta' }, [
        createElement('span', {}, [`${article.readingTime || '5 min'} • ${article.publishedDate || ''}`]),
        createElement('span', {}, [article.author || 'Sharad Tiwari'])
      ]),
      createElement('div', { className: 'article-tags' }, tags.map((tag) => createElement('span', { className: 'skill-badge' }, [tag]))),
      createElement('a', { className: 'btn btn-secondary', href: article.url || '#', role: 'link' }, ['Read Article'])
    ])
  ]);
}
