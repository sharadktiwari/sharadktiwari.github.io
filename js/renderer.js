import { loadJSON, createElement, getCurrentPage } from './utils.js';
import { createTimelineItem } from './components/timeline.js';
import { createCaseStudyCard } from './components/caseStudyCard.js';
import { createExpertiseBadge } from './components/expertiseBadge.js';
import { createContactCard } from './components/contactCard.js';
import { createFaqAccordion } from './components/faqAccordion.js';
import { createArticleCard } from './components/articleCard.js';
import { createTopicCard } from './components/topicCard.js';
import { loadMarkdown, markdownToHtml } from './markdown.js';

const renderMap = {
  about: renderAbout,
  experience: renderExperience,
  'case-studies': renderCaseStudies,
  blog: renderBlog,
  article: renderArticle
};

export async function initializeRenderer() {
  const page = getCurrentPage();
  const renderer = renderMap[page];
  if (renderer) {
    await renderer();
  }
}

async function renderAbout() {
  await renderAboutHero();
  await renderContactAvailability();
  await renderContactMethods();
  await renderContactFaq();
}

async function renderAboutHero() {
  const placeholder = document.querySelector('[data-json="aboutHero"]');
  if (!placeholder) return;

  const about = await loadJSON('data/about.json');
  if (!about) return;

  const hero = createElement('div', { className: 'hero-grid' }, [
    createElement('div', { className: 'hero-copy' }, [
      createElement('p', { className: 'eyebrow-label' }, ['About'] ),
      createElement('h1', {}, [about.headline]),
      createElement('p', {}, [about.summary]),
      createElement('div', { className: 'hero-actions' }, [
        ...about.heroButtons.map((button) => createElement('a', {
          className: `btn btn-${button.type}`,
          href: button.href,
          target: button.external ? '_blank' : '_self',
          rel: button.external ? 'noreferrer' : undefined
        }, [button.label]))
      ])
    ]),
    createElement('div', { className: 'hero-visual' }, [
      createElement('div', { className: 'hero-surface about-hero-surface' }, [
        createElement('img', { className: 'profile-photo', src: about.heroImage, alt: 'Sharad Tiwari', loading: 'lazy' })
      ])
    ])
  ]);

  placeholder.appendChild(hero);
}

async function renderContactAvailability() {
  const placeholder = document.querySelector('[data-json="contactAvailability"]');
  if (!placeholder) return;
  const availability = await loadJSON('data/availability.json');
  if (!availability) return;

  placeholder.appendChild(createElement('div', { className: 'contact-availability-card' }, [
    createElement('p', { className: 'eyebrow-label' }, ['Availability']),
    createElement('h2', {}, [availability.currentAvailability]),
    createElement('ul', { className: 'contact-availability-list' }, [
      createElement('li', {}, [`Response time: ${availability.typicalResponseTime}`]),
      createElement('li', {}, [`Timezone: ${availability.timeZone}`]),
      createElement('li', {}, [`Collaboration: ${availability.remoteCollaboration}`])
    ]),
    createElement('div', { className: 'contact-engagement-list' }, availability.preferredEngagements.map((item) => createElement('span', { className: 'skill-badge' }, [item])))
  ]));
}

async function renderContactMethods() {
  const placeholder = document.querySelector('[data-json="contactMethods"]');
  if (!placeholder) return;
  const methods = await loadJSON('data/contact_methods.json');
  if (!methods) return;

  placeholder.appendChild(createElement('div', { className: 'section-heading' }, [
    createElement('p', { className: 'eyebrow-label' }, ['Get in Touch']),
    createElement('h2', {}, ['Choose the best way to reach me'])
  ]));

  placeholder.appendChild(createElement('div', { className: 'section-grid grid-3 contact-methods' }, methods.map((method) => createContactCard(method))));
}

async function renderContactFaq() {
  const placeholder = document.querySelector('[data-json="contactFaq"]');
  if (!placeholder) return;
  const faqs = await loadJSON('data/faq.json');
  if (!faqs) return;

  placeholder.appendChild(createElement('div', { className: 'section-heading' }, [
    createElement('p', { className: 'eyebrow-label' }, ['Frequently Asked Questions']),
    createElement('h2', {}, ['A few common questions'])
  ]));
  placeholder.appendChild(createElement('div', { className: 'faq-list' }, faqs.map((item) => createFaqAccordion(item))));
}

async function renderExperience() {
  await renderExperienceTimeline();
  await renderTechnologyStack();
  await renderCertifications();
  await renderAwards();
}

async function renderExperienceTimeline() {
  const placeholder = document.querySelector('[data-json="experienceTimeline"]');
  if (!placeholder) return;
  const experience = await loadJSON('data/experience.json');
  if (!experience) return;

  const timeline = createElement('div', { className: 'timeline-list' }, experience.map((item) => createTimelineItem(item)));
  placeholder.appendChild(timeline);
}

async function renderTechnologyStack() {
  const placeholder = document.querySelector('[data-json="technologyStack"]');
  if (!placeholder) return;
  const categories = await loadJSON('data/tech_stack.json');
  if (!categories) return;

  const grid = createElement('div', { className: 'section-grid grid-3' }, categories.map((category) => createExpertiseBadge(category)));
  placeholder.appendChild(grid);
}

async function renderCertifications() {
  const placeholder = document.querySelector('[data-json="certs"]');
  if (!placeholder) return;
  const certs = await loadJSON('data/certifications.json');
  if (!certs) return;

  const grid = createElement('div', { className: 'section-grid grid-3' }, certs.map((cert) => {
    return createElement('article', { className: 'card scale-up cert-card' }, [
      createElement('p', { className: 'case-study-pill' }, [cert.icon]),
      createElement('h3', {}, [cert.title]),
      createElement('p', { className: 'small-copy' }, [cert.issuer]),
      createElement('p', { className: 'small-copy' }, [cert.description]),
      createElement('p', { className: 'small-copy timeline-meta-text' }, [cert.year])
    ]);
  }));

  placeholder.appendChild(grid);
}

async function renderAwards() {
  const placeholder = document.querySelector('[data-json="awards"]');
  if (!placeholder) return;
  const awards = await loadJSON('data/awards.json');
  if (!awards) return;

  const grid = createElement('div', { className: 'section-grid grid-3' }, awards.map((award) => {
    return createElement('article', { className: 'card scale-up award-card' }, [
      createElement('p', { className: 'case-study-pill' }, [award.icon]),
      createElement('h3', {}, [award.title]),
      createElement('p', { className: 'small-copy' }, [award.description]),
      createElement('p', { className: 'small-copy timeline-meta-text' }, [award.year])
    ]);
  }));

  placeholder.appendChild(grid);
}

async function renderCaseStudies() {
  const placeholder = document.querySelector('[data-json="caseStudies"]');
  if (!placeholder) return;
  const studies = await loadJSON('data/caseStudies.json');
  if (!studies) return;

  const grid = createElement('div', { className: 'section-grid grid-2' }, studies.map((study) => createCaseStudyCard(study)));
  placeholder.appendChild(grid);
}

async function renderBlog() {
  await renderInsightsHero();
  await renderFeaturedArticles();
  await renderBrowseTopics();
  await renderLatestArticles();
  await renderInsightsCta();
}

async function renderInsightsHero() {
  const placeholder = document.querySelector('[data-json="insightsHero"]');
  if (!placeholder) return;

  const hero = createElement('div', { className: 'hero-copy' }, [
    createElement('p', { className: 'eyebrow-label' }, ['AI Engineering Insights']),
    createElement('h1', { className: 'hero-title' }, ['Practical Notes on Building Reliable AI Systems']),
    createElement('p', {}, [
      'Clear, technical perspectives on Generative AI, machine learning, MLOps, and the decisions that make AI systems reliable in production.'
    ])
  ]);

  placeholder.appendChild(hero);
}

async function renderFeaturedArticles() {
  const placeholder = document.querySelector('[data-json="featuredArticles"]');
  if (!placeholder) return;

  const allArticles = await loadJSON('data/blogs.json');
  if (!allArticles) return;

  const featured = allArticles.filter((article) => article.featured === true);
  if (!featured.length) return;

  placeholder.appendChild(createElement('div', { className: 'section-heading' }, [
    createElement('p', { className: 'eyebrow-label' }, ['Featured Articles']),
    createElement('h2', {}, ['Practical guidance for technical leaders and delivery teams.'])
  ]));

  const grid = createElement('div', { className: 'section-grid grid-3 featured-article-grid', id: 'featured-articles' }, featured.map((article) => createArticleCard(article, { featured: true })));
  placeholder.appendChild(grid);
}

async function renderBrowseTopics() {
  const placeholder = document.querySelector('[data-json="browseTopics"]');
  if (!placeholder) return;
  const topics = await loadJSON('data/categories.json');
  if (!topics) return;

  placeholder.appendChild(createElement('div', { className: 'section-heading' }, [
    createElement('p', { className: 'eyebrow-label' }, ['Explore by Topic']),
    createElement('h2', {}, ['Browse insights by AI discipline and delivery challenge.'])
  ]));

  const topicGrid = createElement('div', { className: 'section-grid grid-3 topic-grid' }, topics.map((topic) => createTopicCard(topic)));
  placeholder.appendChild(topicGrid);

  topicGrid.addEventListener('click', (event) => {
    const button = event.target.closest('[data-topic]');
    if (!button) return;
    const topic = button.dataset.topic;
    document.querySelectorAll('[data-topic]').forEach((item) => item.classList.toggle('active', item === button));
    filterArticleCards({ topic });
  });
}

function filterArticleCards(filters = {}) {
  const searchTerm = document.querySelector('.article-search-input')?.value?.toLowerCase() || '';
  const sortValue = document.querySelector('.article-sort-select')?.value || 'latest';
  const topic = filters.topic || document.querySelector('.topic-grid .active')?.dataset.topic || 'all';

  const cards = Array.from(document.querySelectorAll('.article-card'));
  cards.forEach((card) => {
    const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
    const tags = card.dataset.tags || '';
    const category = (card.dataset.category || '').toLowerCase();
    const titleMatch = !searchTerm || title.includes(searchTerm) || tags.includes(searchTerm);
    const categoryMatch = topic === 'all' || category.includes(topic);
    card.style.display = titleMatch && categoryMatch ? 'grid' : 'none';
  });

  const articleList = document.querySelector('.article-list');
  if (!articleList) return;

  const visibleCards = Array.from(articleList.querySelectorAll('.article-card')).filter((card) => card.style.display !== 'none');
  if (sortValue === 'readingTime') {
    visibleCards.sort((a, b) => {
      const aTime = parseInt(a.dataset.readingTime, 10) || 0;
      const bTime = parseInt(b.dataset.readingTime, 10) || 0;
      return aTime - bTime;
    });
  } else {
    visibleCards.sort((a, b) => {
      const aDate = new Date(a.dataset.publishedDate);
      const bDate = new Date(b.dataset.publishedDate);
      return bDate - aDate;
    });
  }

  visibleCards.forEach((card) => articleList.appendChild(card));
}

async function renderLatestArticles() {
  const placeholder = document.querySelector('[data-json="latestArticles"]');
  if (!placeholder) return;
  const articles = await loadJSON('data/blogs.json');
  if (!articles) return;

  placeholder.appendChild(createElement('div', { className: 'section-heading' }, [
    createElement('p', { className: 'eyebrow-label' }, ['Latest Insights']),
    createElement('h2', {}, ['Architecture, delivery, and production guidance.'])
  ]));

  const controls = createElement('div', { className: 'article-controls' }, [
    createElement('input', { className: 'search-input article-search-input', type: 'search', placeholder: 'Search by title or tag', 'aria-label': 'Search articles' }),
    createElement('select', { className: 'sort-select article-sort-select', 'aria-label': 'Sort articles' }, [
      createElement('option', { value: 'latest' }, ['Sort by latest']),
      createElement('option', { value: 'readingTime' }, ['Sort by reading time'])
    ])
  ]);
  placeholder.appendChild(controls);

  const list = createElement('div', { className: 'section-grid grid-3 article-list' }, articles.map((article) => {
    const card = createArticleCard(article);
    card.dataset.readingTime = article.readingTime?.replace(/\D/g, '') || '0';
    card.dataset.publishedDate = article.publishedDate || '';
    return card;
  }));
  placeholder.appendChild(list);

  controls.querySelector('.article-search-input').addEventListener('input', () => filterArticleCards({}));
  controls.querySelector('.article-sort-select').addEventListener('change', () => filterArticleCards({}));
}

async function renderInsightsCta() {
  const placeholder = document.querySelector('[data-json="insightsCta"]');
  if (!placeholder) return;

  placeholder.appendChild(createElement('div', { className: 'cta-shell card scale-up' }, [
    createElement('div', {}, [
      createElement('p', { className: 'eyebrow-label' }, ['Interested in more than the write-up?']),
      createElement('h2', {}, ['If you\'d like to talk through the technical details, my experience, or a potential opportunity, feel free to reach out.'])
    ]),
    createElement('div', { className: 'cta-actions' }, [
      createElement('a', { className: 'btn btn-primary', href: 'about.html' }, ['Get in Touch']),
      createElement('a', { className: 'btn btn-secondary', href: 'experience.html' }, ['View Experience'])
    ])
  ]));
}

async function renderArticle() {
  const placeholder = document.querySelector('[data-json="articleHero"]');
  const contentPlaceholder = document.querySelector('[data-json="articleContent"]');
  if (!placeholder || !contentPlaceholder) return;

  const articles = await loadJSON('data/blogs.json');
  if (!articles) return;

  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug');
  const article = articles.find((item) => item.id === slug);
  if (!article) {
    placeholder.appendChild(createElement('div', { className: 'card scale-up' }, [
      createElement('h2', {}, ['Article not found']),
      createElement('p', {}, ['The requested insight could not be loaded.'])
    ]));
    return;
  }

  document.title = article.seoTitle || article.title;
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', article.seoDescription || article.summary);
  }

  placeholder.appendChild(createElement('div', { className: 'article-hero-copy' }, [
    createElement('p', { className: 'eyebrow-label' }, [article.category]),
    createElement('h1', {}, [article.title]),
    createElement('div', { className: 'article-meta' }, [
      createElement('span', {}, [article.readingTime || '5 min']),
      createElement('br'),
      createElement('span', {}, [article.publishedDate || '']),
      createElement('br'),
      createElement('span', {}, [article.author || 'Sharad Tiwari'])
    ]),
    createElement('div', { className: 'article-tags' }, (article.tags || []).map((tag) => createElement('span', { className: 'skill-badge' }, [tag])))
  ]));

  const markdown = await loadMarkdown(article.markdownPath);
  const html = markdown ? markdownToHtml(markdown) : '<p>Article content is unavailable.</p>';
  const articleBody = createElement('article', { className: 'article-detail' }, []);
  articleBody.innerHTML = html;

  const related = createElement('div', { className: 'related-articles card scale-up' }, [
    createElement('h3', {}, ['Related Articles']),
    createElement('div', { className: 'section-grid grid-2' }, articles.filter((item) => item.id !== article.id && item.category === article.category).slice(0, 2).map((item) => createArticleCard(item)))
  ]);

  const author = createElement('div', { className: 'author-box card scale-up' }, [
    createElement('h3', {}, ['About the author']),
    createElement('p', {}, ['Sharad Tiwari is an AI/ML engineer specializing in production AI systems and reliable machine learning delivery.'])
  ]);

  contentPlaceholder.appendChild(articleBody);
  contentPlaceholder.appendChild(related);
  contentPlaceholder.appendChild(author);
}