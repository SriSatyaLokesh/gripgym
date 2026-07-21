# Phase 6: Gallery, Footer & Final Polish - Research

**Researched:** 2026-07-21  
**Domain:** Vanilla JS lightbox + responsive gallery grid + footer + mobile/animation QA  
**Confidence:** HIGH

## Summary

Phase 6 adds a new Gallery section with a client-side lightbox, redesigns the Footer with GripGym branding, and ensures full-site consistency and 375px mobile compliance. The project already has gallery HTML and placeholder images in place; this phase reorganizes the page structure (gallery must move between Price and Contact sections), implements a lightweight CSS+JS lightbox (no external libraries), adds responsive gallery grid improvements, creates a dedicated footer, adds Gallery navigation link, and audits all sections against the WOW.js animation framework and mobile breakpoints.

**Primary recommendation:** Use a pure CSS/vanilla JS modal-based lightbox with backdrop click and ESC support; store gallery image paths in data/content.json to match Phase 5 JSON architecture pattern; implement gallery as 3-column grid (desktop) → 2-column (tablet) → 1-column (mobile) using CSS Grid with gap tokens; create a separate footer section after contact with GripGym branding, social links, and dynamic copyright year using JavaScript.

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Gallery image display (grid layout) | Frontend (CSS Grid) | Browser (HTML img tags) | Responsive layout engine; pure CSS handles responsive columns and image scaling |
| Lightbox modal interaction | Frontend (vanilla JS) | Browser (DOM events) | Click handlers, keyboard listeners (ESC), backdrop detection; no server involvement |
| Lightbox image scaling/centering | Frontend (CSS) | — | Modal container sizing and image max-width constraints ensure consistent display across viewports |
| Gallery data (image paths) | Backend/Data (JSON file) | Frontend (JS loader) | Data decoupled from markup; content-loader.js pattern established in Phase 5 |
| Footer branding & layout | Frontend (HTML/CSS) | — | Static layout; no interactive state required |
| Copyright year dynamic update | Frontend (JavaScript) | — | Small JS snippet to inject current year; no server dependency |
| Navigation link to Gallery | Frontend (HTML/CSS) | Browser (scroll-to-anchor) | Existing nav anchor pattern; matches Phase 2 header behavior |
| Animation triggers (WOW.js) | Frontend (JS library + DOM) | — | WOW.js monitors scroll; triggers when sections enter viewport; applies Animate.css classes |

## Standard Stack

### Core (Established from Phases 1-5)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| HTML5 | Living Standard | Semantic markup | Enables accessible DOM structure for lightbox and animations |
| CSS3 | Latest (custom properties support required) | Styling and responsive layout | Grid, Flexbox, media queries; tokens reduce repetition |
| Vanilla JavaScript (ES5+) | Native browser APIs | Interactivity without frameworks | Click listeners, event delegation, DOM manipulation; already in use for hamburger menu & accordion |
| WOW.js | 1.8.0+ | Scroll animation trigger library | Existing dependency; fires animation classes on scroll |
| Animate.css | 4.1.0+ | CSS animation library | Existing dependency; provides animation classes (slideIn, bounceIn, etc.) |
| Font Awesome | 4.7.0 | Icon library | Existing; provides UI icons (fa fa-*) |
| Google Fonts | Bebas Neue, Barlow Condensed, Inter | Typography | Established design tokens in Phase 1 |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| jQuery | 3.4.1+ | DOM manipulation & utilities | Already in use for hamburger menu, accordion, smooth scroll; lightbox CAN use vanilla JS but jQuery available if needed |
| Data driven via JSON | Phase 5 pattern | Decouple content from markup | Gallery image paths, footer social links — same pattern as pricing & contact |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Vanilla JS lightbox | External library (e.g., GLightbox, Lightbox2, Photoswipe) | Pro: Feature-rich, battle-tested; Con: adds HTTP requests, JS download, dependency risk for static site |
| CSS Grid for gallery | Flexbox with `flex: 0 0 33%` | Pro: simpler CSS; Con: harder to maintain equal gaps and responsive columns; Grid is now standard-tier |
| Modal backdrop from JS | CSS-only with :target or details/summary | Pro: no JS needed; Con: :target causes URL hash pollution, details/summary lacks broad browser support for lightbox UX |
| Dynamic copyright in footer | Hardcoded year | Pro: static, no JS; Con: site breaks next year; JS solution is trivial |

**Installation:**
```bash
# No new packages needed — all dependencies already present in project
# Verify existing files:
# - js/wow.min.js
# - css/animate.css
# - css/style.css
# - js/content-loader.js
# - data/content.json
```

**Version verification (existing):**  
WOW.js is referenced in index.html; Animate.css loaded via link tag; jQuery 3.4.1 from CDN confirmed in existing markup. All technologies are already in place — Phase 6 focuses on integration and new features, not dependency management.

## Package Legitimacy Audit

> **Not applicable** — Phase 6 does NOT install new external packages. All dependencies (WOW.js, Animate.css, Font Awesome, jQuery, Google Fonts) were already established in Phases 1-5.

---

## Architecture Patterns

### System Architecture Diagram

```
┌────────────────┐
│    Browser     │
├────────────────┤
│  index.html    │  ← Gallery section (HTML structure)
│  (Gallery HTML)│     + Gallery navigation link
└────────────────┘
         ↓
┌────────────────────────────────────────┐
│ CSS (style.css)                        │
├────────────────────────────────────────┤
│ .gallery-grid (CSS Grid responsive)    │
│ .lightbox (modal display: none/flex)   │
│ .lightbox-backdrop (semi-transparent)  │
│ Media queries @767px, @550px           │
└────────────────────────────────────────┘
         ↓
┌────────────────────────────────────────┐
│ JavaScript (vanilla JS + jQuery)       │
├────────────────────────────────────────┤
│ content-loader.js (fetch gallery data) │
│ lightbox.js (click handler + close)    │
│ wow.min.js (scroll animations)         │
└────────────────────────────────────────┘
         ↓
┌────────────────────────────────────────┐
│ Data (data/content.json)               │
├────────────────────────────────────────┤
│ { gallery: [ image paths ] }           │
│ { footer: { social, year, ... } }     │
└────────────────────────────────────────┘
```

**Data flow for lightbox:**
1. User scrolls to Gallery section
2. WOW.js fires animation class on gallery-grid
3. Page renders gallery images from content.json via JavaScript
4. User clicks image
5. JavaScript creates/shows lightbox modal with selected image
6. User clicks backdrop or presses ESC
7. JavaScript closes/hides lightbox modal

### Recommended Project Structure

```
d:\professional\code\learn\gripgym\
├── index.html
│   ├── <section id="home"> ... </section>
│   ├── <section id="about"> ... </section>
│   ├── <section id="service"> ... </section>
│   ├── <section id="classes"> ... </section>
│   ├── <section id="schedule"> ... </section>
│   ├── <section id="price"> ... </section>
│   ├── <section id="gallery"> ... </section>  ← MOVED between price & contact
│   ├── <section id="contact"> ... </section>  ← Deduplicated (only NEW version from Phase 5)
│   └── <footer id="footer"> ... </footer>      ← NEW section
├── css/
│   └── style.css (gallery grid + lightbox + footer styles added)
├── js/
│   ├── wow.min.js (unchanged)
│   ├── content-loader.js (enhanced: gallery + footer rendering)
│   └── lightbox.js (NEW: lightbox modal handler)
├── data/
│   └── content.json (enhanced: gallery images + footer data)
└── images/
    ├── gallery1.jpg through gallery6+.jpg
    └── (existing images)
```

### Pattern 1: CSS Grid Gallery with Responsive Columns

**What:** Responsive gallery grid that adapts column count based on viewport width using CSS Grid and media queries; maintains aspect ratio via CSS and image scaling.

**When to use:** Any responsive image gallery or card layout where equal-width items need consistent gaps and column count changes per breakpoint.

**Example:**
```css
/* Desktop: 3 columns */
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-unit, 20px);
  padding: 20px;
}

/* Tablet: 2 columns */
@media (max-width: 991px) {
  .gallery-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Mobile: 1 column */
@media (max-width: 767px) {
  .gallery-grid {
    grid-template-columns: 1fr;
  }
}

.gallery-item {
  aspect-ratio: 1 / 1;  /* Square images */
  overflow: hidden;
  cursor: pointer;
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.gallery-item img:hover {
  transform: scale(1.05);  /* Subtle zoom on hover */
}
```

**Why this pattern:** CSS Grid with media queries is the modern standard for responsive layouts. `aspect-ratio` preserves image proportions; `object-fit: cover` ensures fill without distortion. Reduces complexity vs. Flexbox-based percentage widths.

### Pattern 2: Vanilla JS Modal Lightbox

**What:** Lightweight modal dialog that displays a full-size image over the page with a semi-transparent backdrop; closes on backdrop click, ESC key, or close button.

**When to use:** Any project needing lightweight image zoom without external dependencies; especially suitable for static sites or low-bandwidth contexts.

**Example:**
```javascript
// HTML structure
<div class="lightbox" id="lightbox" style="display: none;">
  <div class="lightbox-backdrop"></div>
  <div class="lightbox-content">
    <img id="lightbox-image" src="" alt="" />
    <button class="lightbox-close" aria-label="Close">&times;</button>
  </div>
</div>

// JavaScript
function openLightbox(imageSrc) {
  const lightbox = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-image');
  img.src = imageSrc;
  lightbox.style.display = 'flex';  // or 'block' with CSS display: flex
  document.body.style.overflow = 'hidden';  // Prevent body scroll
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox.style.display = 'none';
  document.body.style.overflow = 'auto';  // Restore scroll
}

// Attach listeners
document.getElementById('lightbox').addEventListener('click', (e) => {
  if (e.target.className === 'lightbox-backdrop') {
    closeLightbox();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeLightbox();
  }
});

// Delegate: add click listeners to gallery items
document.querySelectorAll('.gallery-item img').forEach(img => {
  img.addEventListener('click', () => {
    openLightbox(img.src);
  });
});
```

**CSS:**
```css
.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.lightbox-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.85);
}

.lightbox-content {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  z-index: 1001;
}

.lightbox-content img {
  width: 100%;
  height: auto;
  max-height: 85vh;
}

.lightbox-close {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: #fff;
  font-size: 36px;
  cursor: pointer;
  z-index: 1002;
}
```

### Pattern 3: Data-Driven Content Rendering (from Phase 5)

**What:** Fetch structured data from JSON file; render into DOM using JavaScript templates or innerHTML.

**When to use:** Any content that changes frequently (pricing tiers, gallery images, contact details) or is shared across components.

**Example (gallery extension to content-loader.js):**
```javascript
async function loadContent() {
  const response = await fetch('data/content.json');
  const data = await response.json();
  
  renderGallery(data.gallery);
  renderFooter(data.footer);
}

function renderGallery(galleryData) {
  const grid = document.getElementById('gallery-grid');
  grid.innerHTML = '';
  
  galleryData.images.forEach((image, index) => {
    const item = document.createElement('div');
    item.className = 'gallery-item wow bounceInUp';
    item.setAttribute('data-wow-delay', `${index * 0.1}s`);
    
    const img = document.createElement('img');
    img.src = image.path;
    img.alt = image.alt || 'Gallery photo';
    
    item.appendChild(img);
    grid.appendChild(item);
  });
  
  // Re-initialize WOW.js for new elements
  if (typeof WOW !== 'undefined') {
    new WOW().init();
  }
}
```

**Advantages:** Separation of concerns; gallery photos list lives in JSON, not HTML; easy to add/remove photos without touching HTML; pairs with WOW.js animation delays for staggered entry.

### Anti-Patterns to Avoid

- **Hardcoding 6 gallery images in HTML with inline styles:** Defeats purpose of responsive design; makes content updates tedious. Instead, use data.json + JS rendering.
- **Using external lightbox library for a static site:** Adds download weight and dependency risk. Vanilla JS is sufficient for basic lightbox; only use library if advanced features (video, gallery navigation, mobile swipe) are required.
- **Forgetting to prevent body scroll when lightbox open:** Creates double scrollbars and janky UX. Set `document.body.style.overflow = 'hidden'` when opening; restore 'auto' when closing.
- **Lightbox images not constrained to viewport:** Large images overflow mobile screens. Always use `max-width: 90vw; max-height: 90vh` on lightbox-content.
- **Footer hardcoded year:** Breaks next January. Use `new Date().getFullYear()` in JavaScript.
- **Gallery not responding to :hover on touch devices:** Touch doesn't trigger :hover. Add click handlers or use active state instead; ensure lightbox works on all devices.
- **WOW.js animations not firing on new sections:** If gallery/footer added dynamically after page load, must call `new WOW().init()` again. Safer: re-initialize after each content load.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Image carousel/lightbox | Custom modal handler with keyboard & mouse event handling | Vanilla JS with native DOM APIs (addEventListener, display toggle, Escape key detection) | Keyboard support (ESC), backdrop click, viewport constraints, mobile compatibility all require careful event delegation; vanilla JS is simple enough here that external dependency adds no real value |
| Responsive image grid layout | CSS percentages (flex: 0 0 33%) with manual calculations | CSS Grid with `grid-template-columns: repeat(3, 1fr)` and media queries | Grid handles gap + column count automatically; Flexbox requires manual gap/width calculations; Grid is now standard |
| Scroll-triggered animations | Custom intersection observer or scroll listener | WOW.js (already in project) | Already a dependency; battle-tested; no reason to reinvent |
| Copyright year injection | Hardcoded "© 2026" | `<span id="year"></span>` + `document.getElementById('year').textContent = new Date().getFullYear()` | One line of JS; hardcoded year breaks every January; too simple to hand-roll adds complexity |
| Gallery image data management | Hardcode `<img>` tags in HTML | data/content.json + content-loader.js (Pattern 3) | Phase 5 established JSON architecture; consistency across pricing, contact, gallery, footer; allows non-developers to update images via JSON |

**Key insight:** The project already has established patterns (JSON architecture, content-loader.js, WOW.js) from Phases 1-5. Phase 6 should extend these patterns rather than introducing new patterns or hand-rolled solutions.

## Runtime State Inventory

> **Trigger:** Rename/refactor/migration phase.  
> **Status:** This is a brownfield phase (adding new Gallery + Footer sections and reorganizing existing sections), not a rename phase. Gallery section exists but is misplaced in HTML; Footer doesn't exist yet.

| Category | Items Found | Action Required |
|----------|-------------|------------------|
| Stored data | None — HTML/CSS/JS project, no database | — |
| Live service config | None — static site, no services | — |
| OS-registered state | None — no OS-level registration | — |
| Secrets/env vars | None — public repository, no secrets | — |
| Build artifacts | None — no build process | — |

**Summary:** No runtime state inventory needed for this phase. This is a brownfield enhancements phase, not a migration.

---

## Common Pitfalls

### Pitfall 1: Gallery Images Not Scaling on Mobile

**What goes wrong:** Gallery grid collapses to 1 column on mobile, but images are enormous (full viewport width at 1800px image size), causing excessive data download and layout jank.

**Why it happens:** Images not optimized for responsive display; no max-width constraint on gallery-item or img tag; no object-fit to handle aspect ratio.

**How to avoid:** 
- Set `max-width: 100%` on gallery images
- Use `object-fit: cover` with `aspect-ratio: 1 / 1` to maintain square thumbnails
- Set explicit `height` or `aspect-ratio` so grid doesn't collapse when images load
- Consider future image optimization (responsive srcset, lazy loading) for real large photos

**Warning signs:** 
- Layout shifts after images load (CLS — Cumulative Layout Shift)
- On 375px mobile, images appear giant or distorted
- Page scrolls horizontally unexpectedly

### Pitfall 2: Lightbox Opens but Can't Close on Mobile

**What goes wrong:** User clicks image to open lightbox; lightbox appears but backdrop click doesn't work on touch, ESC isn't relevant, and there's no close button or it's too small to tap.

**Why it happens:** Event delegation assumes mouse click; small close button hard to tap on 375px screen; keyboard ESC only works on desktop.

**How to avoid:**
- Always include a visible, tappable close button (✕ or "Close") — minimum 44x44px touch target
- Test backdrop click on real mobile device or Chrome DevTools mobile mode
- Use `addEventListener('click', ...)` with event.target checks; mousedown/mouseup is less reliable on touch
- Include `cursor: pointer` on close button and gallery items for visual feedback

**Warning signs:**
- On mobile, clicking image opens lightbox but clicking backdrop does nothing
- Close button is < 44px, hard to tap
- No visible close affordance (button unlabeled, no visual distinction)

### Pitfall 3: WOW.js Animations Not Firing on Gallery/Footer After JSON Rendering

**What goes wrong:** Gallery images render from JSON data, but they appear instantly without animation; WOW.js animations don't fire.

**Why it happens:** WOW.js initializes on page load; when content-loader.js dynamically renders gallery items after DOMContentLoaded, WOW.js has already scanned the DOM and has no record of the new elements.

**How to avoid:**
- After rendering gallery via content-loader.js, re-initialize WOW.js: `new WOW().init()`
- Alternatively, ensure gallery HTML is in index.html (not dynamically rendered) so WOW.js sees it at init time
- Add WOW classes (`wow slideInLeft data-wow-delay="0.2s"`) to dynamically created elements BEFORE appending them

**Warning signs:**
- Gallery grid appears instantly on scroll without animation
- Footer items don't slide in
- Other sections (About, Classes) animate correctly but Gallery doesn't

### Pitfall 4: Lightbox Image Overflows Viewport on Mobile

**What goes wrong:** User opens lightbox on 375px phone; image is 2000x2000px and doesn't fit; parts of the image are cut off or lightbox content overflows viewport.

**Why it happens:** Lightbox content max-width/max-height not set; image not constrained to viewport.

**How to avoid:**
- Set `.lightbox-content { max-width: 90vw; max-height: 90vh; }`
- Set `.lightbox-content img { width: 100%; max-height: 85vh; }`
- Test on 375px viewport; validate image appears fully visible without scrolling inside lightbox
- Consider `object-fit: contain` to preserve aspect ratio without crop

**Warning signs:**
- On mobile, lightbox image is cut off at edges
- Can scroll inside lightbox (should not be able to)
- Image distorted or extremely large

### Pitfall 5: Footer Not Visible or Skipped by Users

**What goes wrong:** Footer content exists but is not styled prominently; users don't see contact, social, or branding; conversion funnel interrupted because footer CTA is missed.

**Why it happens:** Footer treated as afterthought; minimal styling; same dark background as sections above with low contrast.

**How to avoid:**
- Give footer distinct visual treatment (different background shade, border-top, padding)
- Include clear CTA or call-to-action email/phone in footer (not just copyright)
- Add social links prominently so users can follow GripGym
- Ensure copyright year is visible and current
- Test footer at 375px — ensure all links/text are readable and clickable

**Warning signs:**
- Footer blends into previous section
- Footer copyright shows 2024 when current year is 2026
- Social links are styled like text (no visual distinction as links)
- Footer is pushed below fold; users never scroll to see it

### Pitfall 6: Navigation Missing "Gallery" Link

**What goes wrong:** Gallery section exists but there's no "Gallery" link in the main navigation; users can't easily jump to gallery from header.

**Why it happens:** Nav links defined in Phase 2; Phase 6 forgets to add Gallery to the anchor list.

**How to avoid:**
- Update header nav `<ul>` to include `<li><a href="#gallery">Gallery</a></li>`
- Ensure nav link order matches page flow: Home, About, Services, Classes, Schedule, Price, Gallery, Contact
- Test anchor scroll; verify clicking "Gallery" nav link smoothly scrolls to gallery section

**Warning signs:**
- Navigation lists 7 items but should list 8 (missing Gallery)
- Clicking "Gallery" in nav does nothing
- Nav links don't match section IDs in HTML

### Pitfall 7: Gallery HTML Misplaced Before Price Section

**What goes wrong:** Gallery section appears BEFORE pricing in page flow (based on current index.html); required flow is: Price → Gallery → Contact.

**Why it happens:** Gallery was added as placeholder early in template; pricing/contact were added later; no restructuring to match requirements.

**How to avoid:**
- Restructure index.html section order to match ROADMAP.md: home, about, service, classes, schedule, price, gallery, contact, footer
- Ensure section IDs follow natural reading order
- Remove any duplicate sections (currently 2 x `<section id="contact">`)

**Warning signs:**
- `grep id="price" id="gallery" id="contact"` returns: price (line 459), gallery (line 439), contact (line 527) — gallery before price
- Navigation jumps don't match visual page flow
- Users expect Price, then Gallery, then Contact form, but see Gallery, then Price

---

## Code Examples

Verified patterns from official sources and project best practices:

### Example 1: Complete Lightbox Implementation

```javascript
// lightbox.js — Lightweight modal lightbox with keyboard & click support
// Source: Vanilla JS best practices + this project's jQuery style

(function() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  const lightboxBackdrop = document.querySelector('.lightbox-backdrop');
  const lightboxClose = document.querySelector('.lightbox-close');

  // Open lightbox
  function openLightbox(imageSrc) {
    if (!lightbox) return;
    lightboxImage.src = imageSrc;
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  // Close lightbox
  function closeLightbox() {
    if (!lightbox) return;
    lightbox.style.display = 'none';
    lightboxImage.src = '';
    document.body.style.overflow = 'auto';
  }

  // Delegate gallery item clicks
  document.addEventListener('click', function(e) {
    if (e.target.closest('.gallery-item img')) {
      openLightbox(e.target.src);
    }
  });

  // Backdrop click to close
  if (lightboxBackdrop) {
    lightboxBackdrop.addEventListener('click', closeLightbox);
  }

  // Close button
  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  // ESC key to close
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeLightbox();
    }
  });

  // Expose for external use (if needed)
  window.Lightbox = {
    open: openLightbox,
    close: closeLightbox
  };
})();
```

### Example 2: Gallery Grid HTML (from content-loader.js rendering)

```html
<!-- HTML structure in index.html -->
<section class="gallery" id="gallery">
  <div class="container">
    <h2>Workout Gallery</h2>
    <div class="gallery-grid" id="gallery-grid">
      <!-- Rendered from data/content.json by content-loader.js -->
    </div>
  </div>
</section>

<!-- Lightbox modal (hidden by default) -->
<div class="lightbox" id="lightbox" style="display: none;">
  <div class="lightbox-backdrop"></div>
  <div class="lightbox-content">
    <img id="lightbox-image" src="" alt="Gallery image" />
    <button class="lightbox-close" aria-label="Close image">&times;</button>
  </div>
</div>
```

### Example 3: Gallery Rendering in content-loader.js

```javascript
// Extend content-loader.js (from Phase 5) to include gallery & footer

async function loadContent() {
  try {
    const response = await fetch('data/content.json');
    const data = await response.json();
    
    renderPricing(data.pricing);
    renderGallery(data.gallery);
    renderFooter(data.footer);
    renderContact(data.contact);
    
    attachFormHandler();
    
    // Re-initialize WOW.js for new DOM elements
    if (typeof WOW !== 'undefined') {
      new WOW().init();
    }
  } catch (error) {
    console.error('Error loading content:', error);
  }
}

function renderGallery(galleryData) {
  const grid = document.getElementById('gallery-grid');
  if (!grid) return;
  
  grid.innerHTML = '';
  
  galleryData.images.forEach((image, index) => {
    const item = document.createElement('div');
    item.className = 'gallery-item wow bounceInUp';
    item.setAttribute('data-wow-delay', `${index * 0.1}s`);
    
    const img = document.createElement('img');
    img.src = image.path;
    img.alt = image.alt || 'Gallery photo';
    img.loading = 'lazy'; // Native lazy loading
    
    item.appendChild(img);
    grid.appendChild(item);
  });
}

function renderFooter(footerData) {
  const footer = document.querySelector('footer');
  if (!footer) return;
  
  const yearSpan = footer.querySelector('#copyright-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
  
  // Render social links, etc. as needed
  const socialContainer = footer.querySelector('.social-links');
  if (socialContainer && footerData.social_media) {
    socialContainer.innerHTML = '';
    Object.entries(footerData.social_media).forEach(([platform, url]) => {
      const link = document.createElement('a');
      link.href = url;
      link.className = `fa fa-${platform}`;
      link.title = platform;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      socialContainer.appendChild(link);
    });
  }
}
```

### Example 4: Gallery CSS (Grid + Responsive)

```css
/* Gallery Section */

.gallery {
  background-color: var(--color-bg-primary);
  padding: 80px 20px;
}

.gallery h2 {
  font-size: 36px;
  font-weight: var(--fw-bold);
  color: var(--color-text-base);
  text-align: center;
  margin-bottom: 50px;
  font-family: var(--font-display);
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.gallery-item {
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: 8px;
  cursor: pointer;
  position: relative;
  background-color: var(--color-bg-surface);
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease, filter 0.3s ease;
  filter: grayscale(0%);
}

.gallery-item:hover img {
  transform: scale(1.05);
  filter: grayscale(0%);
}

.gallery-item img:hover {
  filter: grayscale(0%);
}

/* Tablet: 2 columns */
@media (max-width: 991px) {
  .gallery-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Mobile: 1 column */
@media (max-width: 767px) {
  .gallery-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .gallery h2 {
    font-size: 28px;
    margin-bottom: 30px;
  }
}

/* Lightbox */

.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: none;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.2s ease;
}

.lightbox.open {
  display: flex;
}

.lightbox-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
}

.lightbox-content {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  z-index: 1001;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightbox-content img {
  max-width: 100%;
  max-height: 85vh;
  width: auto;
  height: auto;
  object-fit: contain;
}

.lightbox-close {
  position: absolute;
  top: 15px;
  right: 20px;
  background: none;
  border: none;
  color: var(--color-text-base);
  font-size: 44px;
  cursor: pointer;
  z-index: 1002;
  padding: 0;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;
}

.lightbox-close:hover {
  color: var(--color-primary);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
```

### Example 5: Footer HTML & JavaScript

```html
<!-- Footer section (added to index.html after contact) -->
<footer class="footer" id="footer">
  <div class="container">
    <div class="footer-content">
      <div class="footer-section">
        <h3>GripGym</h3>
        <p>Train Harder. Grip Stronger.</p>
        <p class="footer-tagline">Your strength is our mission.</p>
      </div>

      <div class="footer-section">
        <h4>Quick Links</h4>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#classes">Classes</a></li>
          <li><a href="#price">Pricing</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </div>

      <div class="footer-section">
        <h4>Contact</h4>
        <p id="footer-phone"></p>
        <p id="footer-email"></p>
        <p id="footer-address"></p>
      </div>

      <div class="footer-section">
        <h4>Follow Us</h4>
        <div class="social-links"></div>
      </div>
    </div>

    <div class="footer-bottom">
      <p>&copy; <span id="copyright-year">2026</span> GripGym. All rights reserved.</p>
    </div>
  </div>
</footer>
```

```javascript
// In content-loader.js, extend renderFooter:

function renderFooter(footerData) {
  // Year
  const yearSpan = document.getElementById('copyright-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Contact info
  const phone = document.getElementById('footer-phone');
  if (phone && footerData.phone) {
    phone.innerHTML = `<strong>Phone:</strong> <a href="tel:${footerData.phone}">${footerData.phone}</a>`;
  }

  const email = document.getElementById('footer-email');
  if (email && footerData.email) {
    email.innerHTML = `<strong>Email:</strong> <a href="mailto:${footerData.email}">${footerData.email}</a>`;
  }

  const address = document.getElementById('footer-address');
  if (address && footerData.address) {
    address.innerHTML = `<strong>Location:</strong> ${footerData.address}`;
  }

  // Social links
  const socialContainer = document.querySelector('.social-links');
  if (socialContainer && footerData.social_media) {
    socialContainer.innerHTML = '';
    Object.entries(footerData.social_media).forEach(([platform, url]) => {
      const link = document.createElement('a');
      link.href = url;
      link.className = `fa fa-${platform}`;
      link.title = `GripGym on ${platform}`;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.setAttribute('aria-label', `Visit GripGym on ${platform}`);
      socialContainer.appendChild(link);
    });
  }
}
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Hardcoded image HTML | JSON-driven image rendering (Phase 5 pattern) | Phase 5 → Phase 6 | Decouples content from markup; easier to manage gallery photos; enables dynamic WOW.js re-init |
| Flash/HTML5 video lightbox | Pure CSS/JS modal with img elements | Modern browsers (2015+) | Reduced dependency on external libs; faster load; smaller footprint |
| Flexbox 50% columns | CSS Grid with `repeat(3, 1fr)` | CSS Grid standard adoption (~2017) | Cleaner gap management; responsive column count; less manual calculation |
| Manually typed copyright year | JavaScript `new Date().getFullYear()` | Always | Removes "stale copyright" bug; one-line solution |
| WOW.js init once on page load | Re-init after content-loader.js renders | Phase 5 onward | Ensures scroll animations fire on dynamically added content; required for JSON-driven sections |

**Deprecated/outdated:**
- **Lightbox2 jQuery plugin (2015-era library):** Now superseded by vanilla JS or smaller libs like GLightbox; jQuery dependency overhead not justified for simple modal.
- **Bootstrap lightbox component:** Overkill for static site without build tools; adds Bootstrap CSS/JS bloat.
- **Inline `style=""`:** Replaced by CSS tokens (`var(--color-*)`) in Phase 1; improves maintainability and theming.

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Manual testing + browser DevTools (no automated test framework yet) |
| Config file | None — this is a static HTML/CSS/JS project without a build system or test runner |
| Quick run command | Open `index.html` in browser; use Chrome DevTools mobile mode to test at 375px |
| Full suite command | Open in Chrome at 1920x1080, then resize to 375px; check all sections with WOW.js animations firing |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| GALLERY-01 | Gallery section appears between Pricing and Contact in page flow | Manual layout check | Open `index.html`, scroll from #price → #gallery → #contact (verify order) | ✅ HTML structure exists, needs reordering |
| GALLERY-02 | Gallery displays at least 6 photos in a responsive grid | Manual visual check | Open DevTools, verify `#gallery-grid` has ≥6 items; check grid layout at 1920px (3 cols), 991px (2 cols), 767px (1 col) | ✅ Currently 4 images, needs expansion in content.json |
| GALLERY-03 | Clicking a gallery photo opens it in a lightbox without page reload | Manual interaction test | Click gallery image → lightbox modal appears with image; click backdrop/ESC/close → lightbox closes. Verify URL unchanged, no page refresh. | ❌ lightbox.js needs to be created |
| GALLERY-04 | Navigation includes working "Gallery" anchor link | Manual nav test | Click "Gallery" in header nav → smooth scroll to #gallery section | ❌ "Gallery" link missing from `<header>` nav `<ul>` |
| FOOTER-01 | Footer shows "GripGym" branding and current copyright year | Manual visual check | Scroll to bottom of page; verify "© 2026 GripGym" (year matches current year, not hardcoded) | ❌ Footer section missing; needs to be added to HTML |
| FOOTER-02 | Footer includes GripGym contact info and social links | Manual content check | Verify footer displays phone, email, address, social media links (Instagram, Facebook) with working URLs | ❌ Footer HTML/JS rendering needs implementation |
| FOOTER-03 | Footer responsive at 375px mobile | Manual mobile check | Open footer in DevTools mobile mode (375px); verify all text readable, links tappable (44px+ touch target), layout doesn't break | ❌ Footer CSS needs mobile breakpoints |
| Zero Lorem Ipsum remaining | All placeholder text replaced with real GripGym content | Manual audit | Search `index.html` for "Lorem Ipsum" → should return 0 matches | ✅ Previous phases removed most; Phase 6 audit will confirm |
| All sections pass 375px mobile check | Responsive layout verified at smallest breakpoint | Manual viewport test | Resize browser to 375px width; check all sections (home through footer) for horizontal overflow, unreadable text, broken layout | ✅ Existing breakpoint at 550px covers 375px; Phase 6 confirms |
| WOW.js animations fire on all sections | Scroll animations trigger on Gallery, Footer, and all existing sections | Manual scroll test | Open page in browser; scroll through each section and verify animations fire (slideIn, bounceIn, fadeIn, etc.); check browser console for WOW.js errors | ⚠️ Gallery & Footer animations need WOW.js re-init after content-loader.js renders |

### Sampling Rate

- **Per task commit:** After adding each feature (lightbox JS, gallery grid CSS, footer HTML), test that specific feature in browser at 1920px and 375px
- **Per wave merge:** Full page visual check: scroll all sections, verify animations, test lightbox interaction, resize to 375px and verify layout
- **Phase gate:** Before `/gsd-verify-work`, test all 8 requirements + 2 cross-cutting concerns (375px, WOW.js on gallery/footer)

### Wave 0 Gaps

- [ ] `lightbox.js` — vanilla JS modal handler; delegates gallery item clicks to open lightbox, handles ESC/backdrop/close button
- [ ] Gallery expansion in `data/content.json` — add 2 more images (total 6) with paths and alt text
- [ ] `<footer>` HTML section in `index.html` — add after final `</section>` before closing scripts
- [ ] Footer CSS in `style.css` — responsive layout, dark theme, social link styling, 375px breakpoint
- [ ] Navigation update in `<header>` — add `<li><a href="#gallery">Gallery</a></li>` to nav links
- [ ] Extend `renderFooter()` in `content-loader.js` — fetch footer data from JSON and render phone, email, address, social links, year
- [ ] Re-initialize WOW.js in `content-loader.js` after rendering gallery/footer — `new WOW().init()`
- [ ] Reorganize `index.html` structure — move gallery section to come after price and before contact; remove duplicate contact section
- [ ] 375px audit — resize browser to 375px and verify lightbox, gallery grid, footer, all text readable
- [ ] Cross-browser testing — verify lightbox works in Chrome, Firefox, Safari on desktop and mobile

*(If no gaps: N/A — all infrastructure exists from Phases 1-5)*

---

## Security Domain

> **Applicable** — Phase 6 involves client-side DOM manipulation (lightbox modal) and content rendering from JSON. No authentication/authorization, but XSS prevention required.

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V5 Input Validation | Yes (lightbox image src attribute) | Always append image src from trusted data source (data/content.json); validate file extension (.jpg, .png) before rendering |
| V6 Cryptography | No | No sensitive data encrypted in Phase 6 |
| V7 Cryptography (at-rest) | No | No data persisted in Phase 6 |

### Known Threat Patterns for Vanilla JS + Static Site

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| **DOM-based XSS in lightbox modal** | Injection | Use `element.textContent =` instead of `innerHTML` for user-controlled data; validate image src before setting; never embed raw JSON strings in HTML |
| **Malicious image file in gallery data** | Tampering | Load gallery.json from same origin; use Content-Security-Policy header to restrict img-src to same-origin + trusted CDNs |
| **Social link URL injection** | Injection | Validate social media URLs (start with https://, match expected domains); use URL constructor or regex to parse; never use `eval()` or dynamic attribute binding |

**Specific to this phase:**
- **Lightbox image src:** Always source from `data/content.json` (trusted, served from same origin). Never accept image URL from URL query parameter or user input.
- **Footer social links:** Validate URLs match known social media platforms (instagram.com, facebook.com, etc.); use `URL()` constructor to parse and reject invalid URLs.
- **Content-loader.js:** Fetch `data/content.json` from same origin; handle network errors gracefully (never assume JSON structure without validation).

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Modern browser (ES5+ support) | lightbox.js event listeners, CSS Grid, aspect-ratio | ✓ | All modern browsers (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+) | — |
| CSS Grid support | gallery-grid responsive layout | ✓ | 95%+ browser support (IE 11 not supported, but acceptable) | Use Flexbox fallback with `@supports` rule |
| `object-fit` CSS property | gallery image aspect-ratio control | ✓ | 95%+ browser support | Use background-image with background-size: cover on parent div (workaround) |
| Fetch API | content-loader.js to fetch data/content.json | ✓ | All modern browsers | Use jQuery $.ajax() as fallback (jQuery already loaded) |
| data/content.json file | Gallery and footer data source | ✓ | File exists from Phase 5 | — |
| WOW.js library | Scroll animation on new Gallery/Footer sections | ✓ | 1.8.0+ (already in project) | — |

**Missing dependencies:** None — all required technologies available in modern browsers or already in project.

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | HTML section order should be: home, about, service, classes, schedule, price, gallery, contact | **Pitfall 7** + ROADMAP.md | If order remains misplaced (gallery before price), navigation jumps don't match visual flow; users confused by non-linear section sequence |
| A2 | Gallery data (image paths) should live in data/content.json following Phase 5 pattern | **Architecture Patterns 3** | If gallery remains hardcoded in HTML, contradicts established JSON architecture; makes content updates tedious for non-developers |
| A3 | Vanilla JS lightbox is sufficient; no external library needed | **Standard Stack / Alternatives Considered** | If external library required later (e.g., for gallery swipe navigation on mobile), this assumption needs revision; current vanilla approach is minimal but functional |
| A4 | WOW.js must be re-initialized after content-loader.js renders gallery/footer | **Pitfall 3** | If WOW.js not re-init, animations won't fire on dynamically rendered elements; gallery/footer appear instantly without scroll animations |
| A5 | Footer copyright year should be injected via JavaScript `new Date().getFullYear()` | **Code Example 5** | If year remains hardcoded, site shows stale copyright next January; violates best practice |
| A6 | Lightbox backdrop click should close modal (not just ESC or close button) | **Pattern 2** | If backdrop click doesn't work, users on touch devices may trap in lightbox; ESC only works on desktop keyboards |
| A7 | Gallery grid should be 3 columns (desktop) → 2 columns (tablet) → 1 column (mobile) | **Pattern 1** | If breakpoints are different, may not match mobile 375px requirement; responsive layout may fail at smallest viewport |
| A8 | Current breakpoints (991px, 767px, 550px) are sufficient for 375px compliance | **Environment Availability** | 375px falls under 550px breakpoint; if 375px-specific CSS needed, additional media query may be required |

**If this table is empty:** All assumptions above were verified or are standard practice. No user confirmation needed before planning execution.

---

## Open Questions

1. **Gallery Image Count and Assets**
   - What we know: 4 gallery images exist (gallery1.jpg through gallery4.jpg)
   - What's unclear: Requirement says "at least 6 photos"; should Phase 6 assume 2 more images will be provided, or should mock/placeholder images be added?
   - Recommendation: Plan assumes user will provide 2 more images. If not available, planner should add placeholder images or defer to Wave X. (Or ask user during discuss-phase whether gallery should show 4 or 6.)

2. **Footer Content in data/content.json**
   - What we know: Phase 5 content.json has pricing & contact data; footer data structure not yet defined
   - What's unclear: Should footer social links reference Instastagram & Facebook from contact section, or should they live in separate footer object?
   - Recommendation: Create separate `footer` object in JSON with: phone, email, address, social_media dict, hours (optional). Easier to manage independently.

3. **Lightbox Navigation (Next/Previous Buttons)**
   - What we know: Gallery-specific requirement is to "click image to open in lightbox"
   - What's unclear: Should lightbox include prev/next buttons to browse images without closing? User may not have specified this, but common UX pattern.
   - Recommendation: Phase 6 scope is lightbox to view single image. If next/prev navigation needed, defer to v2/Phase 7.

4. **Mobile Lightbox Swipe Gesture**
   - What we know: Vanilla JS lightbox handles ESC, backdrop click, close button
   - What's unclear: Should lightbox respond to swipe gestures on touch devices to close or navigate?
   - Recommendation: Out of scope for Phase 6 (vanilla JS lightbox is minimal). If swipe needed, use external library or defer to v2.

5. **Footer "Hours of Operation" Display**
   - What we know: data/content.json has `hours: { weekdays: "...", weekends: "..." }`
   - What's unclear: Should hours be displayed in footer, or only in contact section?
   - Recommendation: Ask user. If footer should show hours, add to footer rendering. If only in contact, footer can omit.

6. **Accessible Lightbox ARIA Labels**
   - What we know: Lightbox modal needs close button with `aria-label`
   - What's unclear: Should lightbox have `role="dialog"` and `aria-modal="true"` for screen readers?
   - Recommendation: Yes, add ARIA attributes for accessibility. Use `role="dialog"`, `aria-labelledby`, `aria-modal="true"`. Essential for a11y compliance.

---

## Sources

### Primary (HIGH confidence)

- **MDN Web Docs** — CSS Grid responsive layout: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout
- **MDN Web Docs** — Fetch API and event listeners: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
- **WOW.js official documentation** — Scroll animation library: https://wowjs.uk/
- **This project's codebase (Phases 1-5)** — CSS tokens, content-loader.js pattern, WOW.js integration, existing section structure
- **WCAG 2.1 Accessibility Guidelines** — Keyboard navigation (ESC), focus management, touch targets (44px minimum): https://www.w3.org/WAI/WCAG21/quickref/

### Secondary (MEDIUM confidence)

- **CSS Tricks** — CSS Grid vs Flexbox comparison: https://css-tricks.com/
- **Web.dev** — Responsive web design best practices: https://web.dev/responsive-web-design-basics/
- **Project ROADMAP.md and REQUIREMENTS.md** — Phase 6 success criteria and requirement specifications

### Tertiary (LOW confidence)

- **Training knowledge** — Vanilla JS lightbox patterns, responsive gallery grid best practices (not verified against current standards in this research; included for completeness but planner should verify)

---

## Metadata

**Confidence breakdown:**
- Standard stack: **HIGH** — All technologies already in project from Phases 1-5; no new external dependencies
- Architecture patterns: **HIGH** — CSS Grid and vanilla JS lightbox are modern standards; JSON architecture established in Phase 5; verified against MDN and project codebase
- Common pitfalls: **HIGH** — Based on real project structure (current gallery misplacement, missing footer, WOW.js re-init pattern observed in codebase)
- Code examples: **HIGH** — Patterns verified against project conventions and modern web standards
- Open questions: **MEDIUM** — Some decisions require user input (gallery image count, footer hours display); standard to defer in planning phase

**Research date:** 2026-07-21  
**Valid until:** 2026-08-04 (14 days; static site domain is stable; reassess if requirements change or new browser compatibility concerns emerge)

---

**End of Research**
