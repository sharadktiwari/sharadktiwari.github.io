import { loadJSON, createElement, getCurrentPage, scrollToElement } from './utils.js';
import { siteConfig } from './config.js';
import { createProjectCard } from './components/projectCard.js';
import { createFeaturedProjectCard } from './components/featuredProjectCard.js';
import { createProjectModal } from './components/projectModal.js';
import { createTimelineItem } from './components/timeline.js';
import { createBlogCard } from './components/blogCard.js';
import { createCaseStudyCard } from './components/caseStudyCard.js';
import { createExpertiseBadge } from './components/expertiseBadge.js';
import { createProblemCard } from './components/problemCard.js';
import { createIndustryCard } from './components/industryCard.js';
import { createContactCard } from './components/contactCard.js';
import { createProcessStep } from './components/processStep.js';
import { createTechnologyBadge } from './components/technologyBadge.js';
import { createFaqAccordion } from './components/faqAccordion.js';
import { createCategoryFilterButton } from './components/categoryFilter.js';
import { createRepositoryCard } from './components/repositoryCard.js';
import { createArchitectureCard } from './components/architectureCard.js';
import { fetchGithubRepos } from './githubApi.js';
import { createArticleCard } from './components/articleCard.js';
import { createTopicCard } from './components/topicCard.js';
import { createPhilosophyCard } from './components/philosophyCard.js';
import { createValueCard } from './components/valueCard.js';
import { createInterestCard } from './components/interestCard.js';
import { createCertificationCard } from './components/certificationCard.js';
import { loadMarkdown, markdownToHtml } from './markdown.js';

const renderMap = {
  about: renderAbout,
  services: renderServices,
  experience: renderExperience,
  'case-studies': renderCaseStudies,
  projects: renderSolutionsLab,
  blog: renderBlog,
  article: renderArticle,
  contact: renderContact
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
  await renderLearningCertifications();
  await renderAwardsRecognition();
  await renderWorkingStyle();
  await renderFaqAbout();
  await renderAboutCta();
  // include selected contact blocks on the About page (merged view)
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
        }, [button.label])),
        createElement('a', { className: 'btn btn-primary', href: about.ctaButton.href }, [about.ctaButton.label])
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

async function renderEngineeringPhilosophy() {
  const placeholder = document.querySelector('[data-json="engineeringPhilosophy"]');
  if (!placeholder) return;
  const philosophy = await loadJSON('data/about_philosophy.json');
  if (!philosophy) return;

  placeholder.appendChild(createElement('div', { className: 'section-heading' }, [
    createElement('p', { className: 'eyebrow-label' }, ['Engineering Philosophy']),
    createElement('h2', {}, ['How I approach AI engineering'])
  ]));

  const grid = createElement('div', { className: 'section-grid grid-3 philosophy-grid' }, philosophy.map((item) => createPhilosophyCard(item)));
  placeholder.appendChild(grid);
}

async function renderCoreValues() {
  const placeholder = document.querySelector('[data-json="coreValues"]');
  if (!placeholder) return;
  const values = await loadJSON('data/about_values.json');
  if (!values) return;

  placeholder.appendChild(createElement('div', { className: 'section-heading' }, [
    createElement('p', { className: 'eyebrow-label' }, ['Core Values']),
    createElement('h2', {}, ['Principles that guide delivery and collaboration'])
  ]));

  const grid = createElement('div', { className: 'section-grid grid-3 values-grid' }, values.map((item) => createValueCard(item)));
  placeholder.appendChild(grid);
}

async function renderWhatIBuild() {
  const placeholder = document.querySelector('[data-json="whatIBuild"]');
  if (!placeholder) return;
  const interests = await loadJSON('data/about_interests.json');
  if (!interests) return;

  placeholder.appendChild(createElement('div', { className: 'section-heading' }, [
    createElement('p', { className: 'eyebrow-label' }, ['What I Enjoy Building']),
    createElement('h2', {}, ['AI systems that answer real business needs'])
  ]));

  const grid = createElement('div', { className: 'section-grid grid-3 interest-grid' }, interests.map((item) => createInterestCard(item)));
  placeholder.appendChild(grid);
}

async function renderTechnologyExpertise() {
  const placeholder = document.querySelector('[data-json="technologyExpertise"]');
  if (!placeholder) return;
  const categories = await loadJSON('data/tech_stack.json');
  if (!categories) return;

  placeholder.appendChild(createElement('div', { className: 'section-heading' }, [
    createElement('p', { className: 'eyebrow-label' }, ['Technology Expertise']),
    createElement('h2', {}, ['Tools and platforms used to build reliable AI systems'])
  ]));

  const grid = createElement('div', { className: 'section-grid grid-3 technology-grid' }, categories.map((category) => createTechnologyBadge(category)));
  placeholder.appendChild(grid);
}

async function renderLearningCertifications() {
  const placeholder = document.querySelector('[data-json="learningCertifications"]');
  if (!placeholder) return;
  const certifications = await loadJSON('data/learning_certifications.json');
  if (!certifications) return;

  placeholder.appendChild(createElement('div', { className: 'section-heading' }, [
    createElement('p', { className: 'eyebrow-label' }, ['Learning & Certifications']),
    createElement('h2', {}, ['Continuous investment in AI and cloud expertise'])
  ]));

  const grid = createElement('div', { className: 'section-grid grid-3 certification-grid' }, certifications.map((item) => createCertificationCard(item)));
  placeholder.appendChild(grid);
}

async function renderAwardsRecognition() {
  const placeholder = document.querySelector('[data-json="awardsRecognition"]');
  if (!placeholder) return;
  const awards = await loadJSON('data/awards.json');
  if (!awards) return;

  placeholder.appendChild(createElement('div', { className: 'section-heading' }, [
    createElement('p', { className: 'eyebrow-label' }, ['Awards & Recognition']),
    createElement('h2', {}, ['Acknowledgements for impact and delivery'])
  ]));

  const grid = createElement('div', { className: 'section-grid grid-3 awards-grid' }, awards.map((award) => createElement('article', { className: 'card scale-up award-card' }, [
    createElement('div', { className: 'award-icon' }, [award.icon]),
    createElement('h3', {}, [award.title]),
    createElement('p', {}, [award.description]),
    createElement('p', { className: 'small-copy' }, [award.year])
  ])));
  placeholder.appendChild(grid);
}

async function renderWorkingStyle() {
  const placeholder = document.querySelector('[data-json="workingStyle"]');
  if (!placeholder) return;

  placeholder.appendChild(createElement('div', { className: 'section-heading' }, [
    createElement('p', { className: 'eyebrow-label' }, ['How I Like to Work']),
    createElement('h2', {}, ['A collaborative process for reliable AI delivery'])
  ]));

  const steps = [
    'Understand the business problem.',
    'Design the right architecture.',
    'Build an iterative prototype.',
    'Deploy with scalability in mind.',
    'Measure outcomes and improve continuously.'
  ];

  const processList = createElement('div', { className: 'section-grid grid-2 working-style-grid' }, steps.map((step, index) => createElement('article', { className: 'card scale-up process-card' }, [
    createElement('div', { className: 'process-step-number' }, [`${index + 1}`]),
    createElement('p', {}, [step])
  ])));

  placeholder.appendChild(processList);
}

async function renderFaqAbout() {
  const placeholder = document.querySelector('[data-json="faqAbout"]');
  if (!placeholder) return;
  const faqs = await loadJSON('data/about_faq.json');
  if (!faqs) return;

  placeholder.appendChild(createElement('div', { className: 'section-heading' }, [
    createElement('p', { className: 'eyebrow-label' }, ['Frequently Asked Questions']),
    createElement('h2', {}, ['Consulting, availability and delivery questions'])
  ]));
  placeholder.appendChild(createElement('div', { className: 'faq-list' }, faqs.map((item) => createFaqAccordion(item))));
}

async function renderAboutCta() {
  const placeholder = document.querySelector('[data-json="aboutCta"]');
  if (!placeholder) return;

  placeholder.appendChild(createElement('div', { className: 'cta-shell card scale-up about-cta' }, [
    createElement('div', {}, [
      createElement('p', { className: 'eyebrow-label' }, ['Let’s Build Something Meaningful']),
      createElement('h2', {}, ['Whether you’re exploring AI for the first time or scaling an enterprise AI platform, I’d be happy to discuss your goals and recommend the right approach.'])
    ]),
    createElement('div', { className: 'cta-actions' }, [
      createElement('a', { className: 'btn btn-primary', href: 'about.html' }, ['Book a Consultation']),
      createElement('a', { className: 'btn btn-secondary', href: 'projects.html' }, ['Explore My Solutions'])
    ])
  ]));
}

async function renderContact() {
  await renderContactHero();
  await renderContactFormOptions();
  await renderContactAvailability();
  await renderContactMethods();
  await renderContactProjectTypes();
  await renderContactIndustries();
  await renderContactFaq();
  await renderContactCta();
}

async function renderContactHero() {
  const placeholder = document.querySelector('[data-json="contactHero"]');
  if (!placeholder) return;
  const contact = await loadJSON('data/contact.json');
  if (!contact) return;

  const hero = createElement('div', { className: 'hero-grid' }, [
    createElement('div', { className: 'hero-copy' }, [
      createElement('p', { className: 'eyebrow-label' }, ['Start Your AI Project']),
      createElement('h1', {}, [contact.headline]),
      createElement('p', {}, [contact.subtitle]),
      createElement('div', { className: 'hero-actions' }, [
        createElement('a', { className: 'btn btn-primary', href: '#contact-form' }, ['Start the conversation']),
        createElement('a', { className: 'btn btn-secondary', href: 'services.html' }, ['Explore services'])
      ])
    ]),
    createElement('div', { className: 'hero-visual' }, [
      createElement('div', { className: 'hero-surface contact-hero-surface' }, [
        createElement('div', { className: 'hero-stats' }, contact.heroStats.map((stat) => createElement('div', { className: 'hero-stat' }, [stat])))
      ])
    ])
  ]);

  placeholder.appendChild(hero);
}

async function renderContactFormOptions() {
  const industrySelect = document.querySelector('#contact-industry');
  const projectTypeSelect = document.querySelector('#contact-project-type');
  if (!industrySelect || !projectTypeSelect) return;

  const industries = await loadJSON('data/industries.json');
  const projectTypes = await loadJSON('data/project_types.json');
  if (industries) {
    industries.forEach((industry) => {
      industrySelect.appendChild(createElement('option', { value: industry.id }, [industry.name]));
    });
  }
  if (projectTypes) {
    projectTypes.forEach((projectType) => {
      projectTypeSelect.appendChild(createElement('option', { value: projectType.id }, [projectType.label]));
    });
  }
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
    createElement('p', { className: 'eyebrow-label' }, ['Consultation Paths']),
    createElement('h2', {}, ['Choose the best way to share project details'])
  ]));

  placeholder.appendChild(createElement('div', { className: 'section-grid grid-3 contact-methods' }, methods.map((method) => createContactCard(method))));
}

async function renderContactProjectTypes() {
  const placeholder = document.querySelector('[data-json="contactProjectTypes"]');
  if (!placeholder) return;
  const projectTypes = await loadJSON('data/project_types.json');
  if (!projectTypes) return;

  placeholder.appendChild(createElement('div', { className: 'section-heading' }, [
    createElement('p', { className: 'eyebrow-label' }, ['Typical engagement types']),
    createElement('h2', {}, ['Project types I help companies launch'])
  ]));

  placeholder.appendChild(createElement('div', { className: 'section-grid grid-3 project-type-grid' }, projectTypes.map((item) => createElement('article', { className: 'card scale-up project-type-card' }, [
    createElement('h3', {}, [item.label])
  ]))));
}

async function renderContactIndustries() {
  const placeholder = document.querySelector('[data-json="contactIndustries"]');
  if (!placeholder) return;
  const industries = await loadJSON('data/industries.json');
  if (!industries) return;

  placeholder.appendChild(createElement('div', { className: 'section-heading' }, [
    createElement('p', { className: 'eyebrow-label' }, ['Industries Served']),
    createElement('h2', {}, ['Industry contexts where AI creates meaningful advantage'])
  ]));

  placeholder.appendChild(createElement('div', { className: 'section-grid grid-3 industry-grid' }, industries.map((industry) => createIndustryCard(industry))));
}

async function renderContactFaq() {
  const placeholder = document.querySelector('[data-json="contactFaq"]');
  if (!placeholder) return;
  const faqs = await loadJSON('data/faq_contact.json');
  if (!faqs) return;

  placeholder.appendChild(createElement('div', { className: 'section-heading' }, [
    createElement('p', { className: 'eyebrow-label' }, ['Consulting FAQs']),
    createElement('h2', {}, ['Common questions for AI project planning'])
  ]));

  placeholder.appendChild(createElement('div', { className: 'faq-list' }, faqs.map((item) => createFaqAccordion(item))));
}

async function renderContactCta() {
  const placeholder = document.querySelector('[data-json="contactCta"]');
  if (!placeholder) return;

  placeholder.appendChild(createElement('div', { className: 'cta-shell card scale-up' }, [
    createElement('div', {}, [
      createElement('p', { className: 'eyebrow-label' }, ['Ready to move forward?']),
      createElement('h2', {}, ['Share your project details, and I’ll help you shape a practical AI roadmap.'])
    ]),
    createElement('div', { className: 'cta-actions' }, [
      createElement('a', { className: 'btn btn-primary', href: '#contact-form' }, ['Submit your inquiry']),
      createElement('a', { className: 'btn btn-secondary', href: 'services.html' }, ['Review service offerings'])
    ])
  ]));
}

async function renderServices() {
  await renderHero();
  await renderProblems();
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
      createElement('a', { className: 'btn btn-primary', href: 'about.html' }, ['Schedule Consultation']),
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
      createElement('a', { className: 'btn btn-primary', href: 'about.html' }, ['Book Consultation']),
      createElement('a', { className: 'btn btn-secondary', href: 'services.html' }, ['Explore Services'])
    ])
  ]));
}

async function renderBlog() {
  await renderInsightsHero();
  await renderFeaturedArticles();
  await renderBrowseTopics();
  await renderLatestArticles();
  await renderPopularReads();
  await renderNewsletterPlaceholder();
  await renderFaqInsights();
  await renderInsightsCta();
}

async function renderInsightsHero() {
  const placeholder = document.querySelector('[data-json="insightsHero"]');
  if (!placeholder) return;

  const hero = createElement('div', { className: 'hero-copy' }, [
    createElement('p', { className: 'eyebrow-label' }, ['AI Engineering Insights']),
    createElement('h1', { className: 'hero-title' }, ['Practical Insights from Building Production AI Systems']),
    createElement('p', {}, [
      'Articles covering Generative AI, Machine Learning, MLOps, Cloud AI and engineering best practices drawn from real-world experience.'
    ]),
    createElement('div', { className: 'hero-actions' }, [
      createElement('a', { className: 'btn btn-primary', href: '#featured-articles' }, ['Read Featured Articles']),
      createElement('a', { className: 'btn btn-secondary', href: 'services.html' }, ['Explore AI Solutions'])
    ])
  ]);

  placeholder.appendChild(hero);
}

async function renderFeaturedArticles() {
  const placeholder = document.querySelector('[data-json="featuredArticles"]');
  if (!placeholder) return;
  const featured = await loadJSON('data/featured_articles.json');
  if (!featured) return;

  placeholder.appendChild(createElement('div', { className: 'section-heading' }, [
    createElement('p', { className: 'eyebrow-label' }, ['Featured Articles']),
    createElement('h2', {}, ['Technical insights for engineering decision makers'])
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
    createElement('p', { className: 'eyebrow-label' }, ['Browse by Topic']),
    createElement('h2', {}, ['Filter articles by AI engineering topic'])
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
    createElement('p', { className: 'eyebrow-label' }, ['Latest Articles']),
    createElement('h2', {}, ['Insights and engineering guidance'])
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

async function renderPopularReads() {
  const placeholder = document.querySelector('[data-json="popularReads"]');
  if (!placeholder) return;
  const articles = await loadJSON('data/blogs.json');
  if (!articles) return;

  const popular = articles.slice().sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate)).slice(0, 4);

  placeholder.appendChild(createElement('div', { className: 'section-heading' }, [
    createElement('p', { className: 'eyebrow-label' }, ['Popular Reads']),
    createElement('h2', {}, ['The most useful technical resources'])
  ]));

  const grid = createElement('div', { className: 'section-grid grid-4 popular-grid' }, popular.map((article) => {
    const card = createElement('article', { className: 'card scale-up popular-card' }, [
      createElement('h3', {}, [article.title]),
      createElement('p', { className: 'article-summary' }, [article.summary]),
      createElement('div', { className: 'article-meta' }, [
        createElement('span', {}, [`${article.readingTime || '5 min'} • ${article.publishedDate || ''}`]),
        createElement('span', {}, [article.category || 'AI'])
      ]),
      createElement('div', { className: 'article-tags' }, (article.tags || []).map((tag) => createElement('span', { className: 'skill-badge' }, [tag]))),
      createElement('a', { className: 'btn btn-secondary', href: article.url || '#', role: 'link' }, ['Read More'])
    ]);
    return card;
  }));

  placeholder.appendChild(grid);
}

async function renderNewsletterPlaceholder() {
  const placeholder = document.querySelector('[data-json="newsletterPlaceholder"]');
  if (!placeholder) return;

  placeholder.appendChild(createElement('div', { className: 'card scale-up newsletter-card' }, [
    createElement('div', {}, [
      createElement('p', { className: 'eyebrow-label' }, ['Newsletter']),
      createElement('h2', {}, ['Stay Updated with Practical AI Engineering Insights']),
      createElement('p', {}, ['Future newsletter functionality will deliver curated AI engineering content, research highlights, and product-ready guidance.'])
    ]),
    createElement('div', { className: 'newsletter-placeholder' }, [
      createElement('p', {}, ['Newsletter signup coming soon.'])
    ])
  ]));
}

async function renderFaqInsights() {
  const placeholder = document.querySelector('[data-json="faqInsights"]');
  if (!placeholder) return;
  const faqs = await loadJSON('data/faq_insights.json');
  if (!faqs) return;

  placeholder.appendChild(createElement('div', { className: 'section-heading' }, [
    createElement('p', { className: 'eyebrow-label' }, ['FAQ']),
    createElement('h2', {}, ['Frequently asked questions about AI Engineering Insights'])
  ]));
  placeholder.appendChild(createElement('div', { className: 'faq-list' }, faqs.map((item) => createFaqAccordion(item))));
}

async function renderInsightsCta() {
  const placeholder = document.querySelector('[data-json="insightsCta"]');
  if (!placeholder) return;

  placeholder.appendChild(createElement('div', { className: 'cta-shell card scale-up' }, [
    createElement('div', {}, [
      createElement('p', { className: 'eyebrow-label' }, ['Looking for AI Expertise Beyond Tutorials?']),
      createElement('h2', {}, ['If you are planning an AI initiative or need help building production-ready AI systems, let’s discuss your project.'])
    ]),
    createElement('div', { className: 'cta-actions' }, [
      createElement('a', { className: 'btn btn-primary', href: 'about.html' }, ['Book Consultation']),
      createElement('a', { className: 'btn btn-secondary', href: 'services.html' }, ['Explore Services'])
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
      createElement('span', {}, [article.publishedDate || '']),
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
    createElement('p', {}, ['Sharad Tiwari is an AI consultant and engineering leader specializing in production AI systems for enterprise clients.'])
  ]);

  contentPlaceholder.appendChild(articleBody);
  contentPlaceholder.appendChild(related);
  contentPlaceholder.appendChild(author);
}
