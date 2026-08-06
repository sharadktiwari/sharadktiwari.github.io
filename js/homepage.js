import { createElement, getCurrentPage } from './utils.js';
import { trustPartners, statistics, businessOutcomes, technologyExpertise, whyCards, testimonials, latestArticles } from './homeData.js';
import { createServiceCard } from './components/serviceCard.js';
import { createStatisticCard } from './components/statisticCard.js';
import { createTestimonialCard } from './components/testimonialCard.js';
import { createExpertiseBadge } from './components/expertiseBadge.js';
import { createInterestCard } from './components/interestCard.js';
import { createFeatureCard } from './components/featureCard.js';
import { createBlogCard } from './components/blogCard.js';

export function initializeHomepage() {
  if (getCurrentPage() !== 'home') return;
  renderTrustPartners();
  renderStatistics();
  renderBusinessOutcomes();
  renderServices();
  renderTechnologyExpertise();
  renderWhatIBuild();
  renderWhyWorkWithMe();
  renderTestimonials();
  renderLatestArticles();
}

async function renderWhatIBuild() {
  const container = document.querySelector('[data-home-section="whatIBuild"]');
  if (!container) return;
  try {
    const res = await fetch('data/about_interests.json');
    if (!res.ok) return;
    const interests = await res.json();
    const grid = createElement('div', { className: 'section-grid grid-3 interest-grid' }, interests.map((item) => createInterestCard(item)));
    container.appendChild(grid);
  } catch (e) {
    // ignore
  }
}

function renderTrustPartners() {
  const container = document.querySelector('[data-home-section="trust"]');
  if (!container) return;
  const grid = createElement('div', { className: 'trust-grid' }, trustPartners.map((partner) => {
    return createElement('div', { className: 'trust-pill' }, [partner.name]);
  }));

  container.appendChild(grid);
}

function renderStatistics() {
  const container = document.querySelector('[data-home-section="statistics"]');
  if (!container) return;
  const grid = createElement('div', { className: 'section-grid grid-4' }, statistics.map((stat) => createStatisticCard(stat)));
  container.appendChild(grid);
  animateCounters();
}

function animateCounters() {
  const items = document.querySelectorAll('[data-counter]');
  const observer = new IntersectionObserver((entries, observerRef) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const element = entry.target;
      const targetValue = Number(element.dataset.counter);
      const suffix = element.dataset.suffix || '';
      let current = 0;
      const step = Math.max(1, Math.floor(targetValue / 30));
      const interval = setInterval(() => {
        current += step;
        if (current >= targetValue) {
          element.textContent = `${targetValue}${suffix}`;
          clearInterval(interval);
        } else {
          element.textContent = `${current}${suffix}`;
        }
      }, 24);
      observerRef.unobserve(element);
    });
  }, { threshold: 0.3 });

  items.forEach((item) => observer.observe(item));
}

function renderBusinessOutcomes() {
  const container = document.querySelector('[data-home-section="outcomes"]');
  if (!container) return;
  const grid = createElement('div', { className: 'section-grid grid-3' }, businessOutcomes.map((outcome) => {
    return createElement('article', { className: 'card scale-up outcome-card' }, [
      createElement('h3', {}, [outcome.title]),
      createElement('p', {}, [outcome.description])
    ]);
  }));
  container.appendChild(grid);
}

async function renderServices() {
  const container = document.querySelector('[data-home-section="services"]');
  if (!container) return;
  try {
    const res = await fetch('data/services.json');
    if (!res.ok) return;
    const services = await res.json();
    const grid = createElement('div', { className: 'section-grid grid-2' }, services.map((service) => createServiceCard(service)));
    container.appendChild(grid);
  } catch (e) {
    // ignore
  }
}

function renderTechnologyExpertise() {
  const container = document.querySelector('[data-home-section="expertise"]');
  if (!container) return;
  const grid = createElement('div', { className: 'expertise-grid' }, technologyExpertise.map((category) => createExpertiseBadge(category)));
  container.appendChild(grid);
}

function renderWhyWorkWithMe() {
  const container = document.querySelector('[data-home-section="why"]');
  if (!container) return;
  const grid = createElement('div', { className: 'section-grid grid-4' }, whyCards.map((item) => createFeatureCard(item)));
  container.appendChild(grid);
}

function renderTestimonials() {
  const container = document.querySelector('[data-home-section="testimonials"]');
  if (!container) return;
  const grid = createElement('div', { className: 'section-grid grid-3' }, testimonials.map((testimonial) => createTestimonialCard(testimonial)));
  container.appendChild(grid);
}

function renderLatestArticles() {
  const container = document.querySelector('[data-home-section="articles"]');
  if (!container) return;
  const grid = createElement('div', { className: 'section-grid grid-3' }, latestArticles.map((article) => createBlogCard(article)));
  container.appendChild(grid);
}
