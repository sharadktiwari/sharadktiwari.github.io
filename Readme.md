# Sharad Tiwari Portfolio — Phase 1 Foundation

## Overview
This repository contains the foundation for a premium AI consulting portfolio website built with static HTML, CSS, and vanilla JavaScript.

The architecture follows a strict separation of concerns:
- `index.html`, `services.html`, `experience.html`, `case-studies.html`, `projects.html`, `blog.html`, `about.html` — page templates (contact merged into About).
- `css/` — modular styling, variables, layout, typography, components, animations, utilities, responsive rules.
- `js/` — ES6 modules with clear feature responsibilities.
- `js/components/` — reusable DOM component constructors.
- `data/` — JSON-driven content schemas.
- `assets/` — asset directories for images, icons, logos, videos, and diagrams.
- `favicon/` — placeholder folder for favicon assets.

## Architecture
### HTML
Each page is a lightweight shell with a shared navigation and footer rendered by JavaScript.

### CSS
Styles are organized into:
- `variables.css`
- `reset.css`
- `layout.css`
- `typography.css`
- `components.css`
- `animations.css`
- `utilities.css`
- `responsive.css`

### JavaScript
JavaScript responsibilities are separated into:
- `config.js` — site metadata and navigation configuration.
- `utils.js` — generic helpers for DOM creation, JSON loading, and scroll behavior.
- `navigation.js` — mobile menu, sticky header, and navigation interactions.
- `animations.js` — reveal-on-scroll and animation utilities.
- `modal.js` — modal open/close behavior.
- `renderer.js` — JSON rendering scaffolding.
- `github.js` — GitHub-specific helpers.
- `contact.js` — contact form and validation hooks.
- `js/components/` — reusable component constructors.

### JSON
The `data/` folder stores schema-driven content for:
- projects
- services
- experience
- blogs
- testimonials
- certifications
- achievements

## Getting Started
1. Open the `portfolio` folder in your editor.
2. Serve the site from a static server or GitHub Pages.
3. Update `js/config.js` with the live site settings.
4. Add content to the JSON files in `data/`.
5. Build page sections by rendering JSON data through `js/renderer.js`.

## Development Notes
- No framework is used.
- No inline CSS or inline JavaScript.
- All page content can be driven from `data/*.json`.
- The structure is designed for future additions like blog articles, case studies, and public projects.

## Next Steps
- Implement shared navigation rendering in `js/components/navbar.js`.
- Add footer content in `js/components/footer.js`.
- Build out page-specific renderers for services, projects, and experience.
- Add favicon assets and SEO metadata as part of production deployment.
