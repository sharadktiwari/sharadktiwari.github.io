import { siteConfig } from './config.js';
import { initNavigation } from './navigation.js';
import { initAnimations } from './animations.js';
import { initializeRenderer } from './renderer.js';
import { initializeHomepage } from './homepage.js';
import { initModal } from './modal.js';
import { initContactForm } from './contact.js';
import { renderNavbar } from './components/navbar.js';
import { renderFooter } from './components/footer.js';

window.addEventListener('DOMContentLoaded', () => {
  renderNavbar(siteConfig.navigation);
  renderFooter(siteConfig.footer);
  initNavigation();
  initModal();
  initializeHomepage();
  initAnimations();
  initContactForm();
  initializeRenderer();
});
