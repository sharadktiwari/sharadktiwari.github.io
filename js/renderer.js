import { loadJSON, createElement, getCurrentPage } from './utils.js';
import { createServiceCard } from './components/serviceCard.js';
import { createProjectCard } from './components/projectCard.js';
import { createTimelineItem } from './components/timeline.js';
import { createBlogCard } from './components/blogCard.js';
import { createCaseStudyCard } from './components/caseStudyCard.js';
import { createExpertiseBadge } from './components/expertiseBadge.js';

const renderMap = {
  about: renderAbout,
  services: renderServices,
  experience: renderExperience,
  'case-studies': renderCaseStudies,
  projects: renderProjects,
  blog: renderBlog
};

export async function initializeRenderer() {
  const page = getCurrentPage();
  const renderer = renderMap[page];
  if (renderer) {
    await renderer();
  }
}

async function renderAbout() {
  const placeholder = document.querySelector('[data-json="about"]');
  if (!placeholder) return;

  const about = await loadJSON('data/about.json');
  if (!about) return;

  const hero = createElement('div', { className: 'card' }, [
    createElement('h2', {}, [about.headline]),
    createElement('p', {}, [about.summary])
  ]);

  const principles = createElement('div', { className: 'section-grid grid-2' }, []);
  about.principles.forEach((item) => {
    principles.appendChild(
      createElement('article', { className: 'card scale-up' }, [
        createElement('h3', {}, [item.title]),
        createElement('p', {}, [item.description])
      ])
    );
  });

  placeholder.appendChild(hero);
  placeholder.appendChild(principles);
}

async function renderServices() {
  const placeholder = document.querySelector('[data-json="services"]');
  if (!placeholder) return;
  const services = await loadJSON('data/services.json');
  if (!services) return;

  const grid = createElement('div', { className: 'section-grid grid-2' });
  services.forEach((service) => {
    grid.appendChild(createServiceCard(service));
  });
  placeholder.appendChild(grid);
}

async function renderExperience() {
  await renderExperienceTimeline();
  await renderExperienceCaseStudies();
  await renderTechnologyStack();
  await renderEngineeringPrinciples();
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

async function renderExperienceCaseStudies() {
  const placeholder = document.querySelector('[data-json="experienceCaseStudies"]');
  if (!placeholder) return;
  const studies = await loadJSON('data/caseStudies.json');
  if (!studies) return;

  const preview = studies.slice(0, 3);
  const grid = createElement('div', { className: 'section-grid grid-3' }, preview.map((study) => createCaseStudyCard(study)));
  placeholder.appendChild(grid);
}

async function renderTechnologyStack() {
  const placeholder = document.querySelector('[data-json="technologyStack"]');
  if (!placeholder) return;
  const categories = await loadJSON('data/techCategories.json');
  if (!categories) return;

  const grid = createElement('div', { className: 'section-grid grid-3' }, categories.map((category) => createExpertiseBadge(category)));
  placeholder.appendChild(grid);
}

async function renderEngineeringPrinciples() {
  const placeholder = document.querySelector('[data-json="engineeringPrinciples"]');
  if (!placeholder) return;
  const principles = await loadJSON('data/principles.json');
  if (!principles) return;

  const grid = createElement('div', { className: 'section-grid grid-3' }, principles.map((item) => {
    return createElement('article', { className: 'card scale-up engineering-card' }, [
      createElement('h3', {}, [item.title]),
      createElement('p', {}, [item.description])
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

async function renderProjects() {
  const placeholder = document.querySelector('[data-json="projects"]');
  if (!placeholder) return;
  const projects = await loadJSON('data/projects.json');
  if (!projects) return;

  const grid = createElement('div', { className: 'section-grid grid-3' });
  projects.forEach((project) => {
    grid.appendChild(createProjectCard(project));
  });
  placeholder.appendChild(grid);
}

async function renderBlog() {
  const placeholder = document.querySelector('[data-json="blogs"]');
  if (!placeholder) return;
  const posts = await loadJSON('data/blogs.json');
  if (!posts) return;

  const grid = createElement('div', { className: 'section-grid grid-2' }, []);
  posts.forEach((post) => {
    grid.appendChild(createBlogCard(post));
  });

  placeholder.appendChild(grid);
}
