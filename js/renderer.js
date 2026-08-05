import { loadJSON, createElement, getCurrentPage, scrollToElement } from './utils.js';
import { siteConfig } from './config.js';
import { createServiceCard } from './components/serviceCard.js';
import { createProjectCard } from './components/projectCard.js';
import { createFeaturedProjectCard } from './components/featuredProjectCard.js';
import { createProjectModal } from './components/projectModal.js';
import { createTimelineItem } from './components/timeline.js';
import { createBlogCard } from './components/blogCard.js';
import { createCaseStudyCard } from './components/caseStudyCard.js';
import { createExpertiseBadge } from './components/expertiseBadge.js';
import { createProblemCard } from './components/problemCard.js';
import { createIndustryCard } from './components/industryCard.js';
import { createProcessStep } from './components/processStep.js';
import { createTechnologyBadge } from './components/technologyBadge.js';
import { createFaqAccordion } from './components/faqAccordion.js';
import { createCategoryFilterButton } from './components/categoryFilter.js';
import { createRepositoryCard } from './components/repositoryCard.js';
import { createArchitectureCard } from './components/architectureCard.js';
import { fetchGithubRepos } from './githubApi.js';

const renderMap = {
  about: renderAbout,
  services: renderServices,
  experience: renderExperience,
  'case-studies': renderCaseStudies,
  projects: renderSolutionsLab,
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
  await renderHero();
  await renderProblems();
  await renderCoreServices();
  await renderIndustries();
  await renderTechnologyStackServices();
  await renderDeliveryProcess();
  await renderWhyChooseMe();
  await renderFaq();
}

async function renderHero() {
  const placeholder = document.querySelector('[data-json="servicesHero"]');
  if (!placeholder) return;

  const hero = createElement('div', { className: 'hero-copy' }, [
    createElement('p', { className: 'eyebrow-label' }, ['AI Consulting Services']),
    createElement('h1', {}, ['AI Solutions That Deliver Measurable Business Results']),
    createElement('p', {}, [
      'Helping startups and businesses automate workflows, improve customer experiences and build production-grade AI systems using Generative AI, Machine Learning and Cloud Infrastructure.'
    ]),
    createElement('div', { className: 'hero-actions' }, [
      createElement('a', { className: 'btn btn-primary', href: 'contact.html' }, ['Schedule Consultation']),
      createElement('a', { className: 'btn btn-secondary', href: 'projects.html' }, ['View Projects'])
    ])
  ]);

  placeholder.appendChild(hero);
}

async function renderProblems() {
  const placeholder = document.querySelector('[data-json="problems"]');
  if (!placeholder) return;
  const problems = await loadJSON('data/problems.json');
  if (!problems) return;

  const grid = createElement('div', { className: 'section-grid grid-2' }, problems.map((problem) => createProblemCard(problem)));
  placeholder.appendChild(grid);
}

async function renderCoreServices() {
  const placeholder = document.querySelector('[data-json="services"]');
  if (!placeholder) return;
  const services = await loadJSON('data/services.json');
  if (!services) return;

  const grid = createElement('div', { className: 'section-grid grid-2' }, services.map((service) => createServiceCard(service)));
  placeholder.appendChild(grid);
}

async function renderIndustries() {
  const placeholder = document.querySelector('[data-json="industries"]');
  if (!placeholder) return;
  const industries = await loadJSON('data/industries.json');
  if (!industries) return;

  const grid = createElement('div', { className: 'section-grid grid-4' }, industries.map((industry) => createIndustryCard(industry)));
  placeholder.appendChild(grid);
}

async function renderTechnologyStackServices() {
  const placeholder = document.querySelector('[data-json="technologyStackServices"]');
  if (!placeholder) return;
  const categories = await loadJSON('data/technologyCategories.json');
  if (!categories) return;

  const grid = createElement('div', { className: 'section-grid grid-3' }, categories.map((category) => createTechnologyBadge(category)));
  placeholder.appendChild(grid);
}

async function renderDeliveryProcess() {
  const placeholder = document.querySelector('[data-json="process"]');
  if (!placeholder) return;
  const steps = await loadJSON('data/process.json');
  if (!steps) return;

  const grid = createElement('div', { className: 'section-grid grid-3' }, steps.map((step) => createProcessStep(step)));
  placeholder.appendChild(grid);
}

async function renderWhyChooseMe() {
  const placeholder = document.querySelector('[data-json="whyChooseMe"]');
  if (!placeholder) return;
  const items = await loadJSON('data/whyChooseMe.json');
  if (!items) return;

  const grid = createElement('div', { className: 'section-grid grid-3' }, items.map((item) => {
    return createElement('article', { className: 'card scale-up feature-card' }, [
      createElement('div', { className: 'feature-icon' }, ['★']),
      createElement('h3', {}, [item.title]),
      createElement('p', {}, [item.description])
    ]);
  }));

  placeholder.appendChild(grid);
}

async function renderFaq() {
  const placeholder = document.querySelector('[data-json="faq"]');
  if (!placeholder) return;
  const faqs = await loadJSON('data/faq.json');
  if (!faqs) return;

  const accordion = createElement('div', { className: 'faq-list' }, faqs.map((item) => createFaqAccordion(item)));
  placeholder.appendChild(accordion);
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

async function renderSolutionsLab() {
  await renderProjectsHero();
  await renderFeaturedSolutions();
  await renderArchitecturePrinciples();
  await renderProjectCategories();
  await renderSolutionsGrid();
  await renderOpenSource();
  await renderTechnologyStackProjects();
  await renderFaqProjects();
  await renderProjectsCta();
}

async function renderProjectsHero() {
  const placeholder = document.querySelector('[data-json="projectsHero"]');
  if (!placeholder) return;

  const hero = createElement('div', { className: 'hero-copy' }, [
    createElement('p', { className: 'eyebrow-label' }, ['Solutions Lab']),
    createElement('h1', { className: 'hero-title' }, ['Production AI Solutions Built for Real-World Problems']),
    createElement('p', {}, [
      'Explore production-ready AI applications demonstrating Generative AI, Agentic AI, Retrieval-Augmented Generation, Document Intelligence, Computer Vision and MLOps.'
    ]),
    createElement('div', { className: 'hero-actions' }, [
      createElement('a', { className: 'btn btn-primary', href: '#featured-solutions' }, ['View Featured Solutions']),
      createElement('a', { className: 'btn btn-secondary', href: `https://github.com/${siteConfig.githubUsername}`, target: '_blank', rel: 'noreferrer' }, ['GitHub Profile'])
    ])
  ]);

  placeholder.appendChild(hero);
}

async function renderFeaturedSolutions() {
  const placeholder = document.querySelector('[data-json="featuredSolutions"]');
  if (!placeholder) return;
  const projects = await loadJSON('data/projects.json');
  if (!projects) return;

  const featured = projects.filter((project) => project.businessProblem && project.businessValue);
  const grid = createElement('div', { className: 'section-grid grid-3 featured-grid' }, featured.slice(0, 3).map((project) => createFeaturedProjectCard(project)));
  placeholder.appendChild(grid);

  const modals = createElement('div', { className: 'project-modals' }, featured.slice(0, 3).map((project) => createProjectModal(project)));
  document.body.appendChild(modals);
}

async function renderArchitecturePrinciples() {
  const placeholder = document.querySelector('[data-json="architecturePrinciples"]');
  if (!placeholder) return;
  const principles = await loadJSON('data/architecture_principles.json');
  if (!principles) return;

  placeholder.appendChild(
    createElement('div', { className: 'section-heading' }, [
      createElement('p', { className: 'eyebrow-label' }, ['Architecture Principles']),
      createElement('h2', {}, ['Engineering philosophy for production AI products'])
    ])
  );

  const grid = createElement('div', { className: 'section-grid grid-3' }, principles.map((item) => createArchitectureCard(item)));
  placeholder.appendChild(grid);
}

async function renderProjectCategories() {
  const placeholder = document.querySelector('[data-json="projectCategories"]');
  if (!placeholder) return;
  const categories = await loadJSON('data/project_categories.json');
  if (!categories) return;

  const actions = createElement('div', { className: 'filter-bar' }, categories.map((category) => createCategoryFilterButton(category)));
  placeholder.appendChild(actions);
}

function bindProjectFilters() {
  const buttons = Array.from(document.querySelectorAll('[data-filter]'));
  const cards = Array.from(document.querySelectorAll('.project-card'));

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      buttons.forEach((btn) => btn.classList.toggle('active', btn === button));
      const filter = button.dataset.filter;
      cards.forEach((card) => {
        const categories = card.dataset.categories.split(' ');
        const visible = filter === 'all' || categories.includes(filter);
        card.style.display = visible ? 'grid' : 'none';
      });
    });
  });
}

async function renderSolutionsGrid() {
  const placeholder = document.querySelector('[data-json="solutionsGrid"]');
  if (!placeholder) return;
  const projects = await loadJSON('data/projects.json');
  if (!projects) return;

  const grid = createElement('div', { className: 'section-grid grid-3', id: 'solutions-grid' });
  projects.forEach((project) => {
    grid.appendChild(createProjectCard(project));
  });
  placeholder.appendChild(grid);

  setTimeout(bindProjectFilters, 200);
}

async function renderOpenSource() {
  const placeholder = document.querySelector('[data-json="openSource"]');
  if (!placeholder) return;
  const openSource = await loadJSON('data/open_source.json');
  if (!openSource) return;

  const section = createElement('div', { className: 'open-source-shell' }, [
    createElement('div', { className: 'section-heading' }, [
      createElement('p', { className: 'eyebrow-label' }, ['Open Source Contributions']),
      createElement('h2', {}, ['Public repositories and contribution activity'])
    ]),
    createElement('div', { className: 'repo-stats' }, [
      createElement('div', { className: 'stat-card' }, [createElement('h3', {}, [openSource.statistics.repositories]), createElement('p', {}, ['Repositories'])]),
      createElement('div', { className: 'stat-card' }, [createElement('h3', {}, [openSource.statistics.stars]), createElement('p', {}, ['Stars'])]),
      createElement('div', { className: 'stat-card' }, [createElement('h3', {}, [openSource.statistics.contributions]), createElement('p', {}, ['Contribution Activity'])])
    ]),
    createElement('div', { className: 'section-grid grid-3' }, openSource.pinned.map((repo) => createRepositoryCard(repo)))
  ]);

  placeholder.appendChild(section);
}

async function renderTechnologyStackProjects() {
  const placeholder = document.querySelector('[data-json="technologyStackProjects"]');
  if (!placeholder) return;
  const categories = await loadJSON('data/tech_stack.json');
  if (!categories) return;

  const cards = createElement('div', { className: 'section-grid grid-3' }, categories.map((category) => {
    return createElement('article', { className: 'card scale-up technology-card filter-badge', 'data-filter': category.filter }, [
      createElement('h3', { className: 'technology-title' }, [category.category]),
      createElement('div', { className: 'technology-badges' }, category.skills.map((skill) => createElement('span', { className: 'skill-badge' }, [skill])))
    ]);
  }));

  placeholder.appendChild(createElement('div', { className: 'section-heading' }, [
    createElement('p', { className: 'eyebrow-label' }, ['Technology Stack']),
    createElement('h2', {}, ['Technologies powering the Solutions Lab'])
  ]));
  placeholder.appendChild(cards);
}

async function renderFaqProjects() {
  const placeholder = document.querySelector('[data-json="faqProjects"]');
  if (!placeholder) return;
  const faqs = await loadJSON('data/faq_projects.json');
  if (!faqs) return;

  placeholder.appendChild(createElement('div', { className: 'section-heading' }, [
    createElement('p', { className: 'eyebrow-label' }, ['FAQ']),
    createElement('h2', {}, ['Frequently asked questions about the Solutions Lab'])
  ]));
  placeholder.appendChild(createElement('div', { className: 'faq-list' }, faqs.map((item) => createFaqAccordion(item))));
}

async function renderProjectsCta() {
  const placeholder = document.querySelector('[data-json="projectsCta"]');
  if (!placeholder) return;

  placeholder.appendChild(createElement('div', { className: 'cta-shell card scale-up' }, [
    createElement('div', {}, [
      createElement('p', { className: 'eyebrow-label' }, ['Have a Similar AI Idea?']),
      createElement('h2', {}, ['Whether you are building an AI product from scratch or improving an existing workflow, let’s discuss how we can create a solution tailored to your business.'])
    ]),
    createElement('div', { className: 'cta-actions' }, [
      createElement('a', { className: 'btn btn-primary', href: 'contact.html' }, ['Book Consultation']),
      createElement('a', { className: 'btn btn-secondary', href: 'services.html' }, ['Explore Services'])
    ])
  ]));
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
