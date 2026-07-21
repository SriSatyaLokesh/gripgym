# Roadmap: GripGym

## Overview

Transform the generic "Fitness Club" template into a polished GripGym branded website with a dark & bold design, real copy, and a new Gallery section. Six phases progress from brand foundation through section-by-section redesign to gallery build and final polish.

## Phases

- [x] **Phase 1: Brand Foundation & Design System** - Establish dark theme CSS design tokens, typography, and GripGym naming
- [x] **Phase 2: Header, Navigation & Hero** - Rebrand header/nav and redesign hero section with real copy
- [x] **Phase 3: About & Services** - Redesign About cards and Services accordion with dark theme and real content
- [x] **Phase 4: Classes & Schedule** - Redesign Classes cards and Schedule timetable with real GripGym data
- [ ] **Phase 5: Pricing & Contact** - Redesign Pricing plans and Contact section with real details
- [ ] **Phase 6: Gallery, Footer & Final Polish** - Add Gallery section, redesign Footer, full consistency QA

## Phase Details

### Phase 1: Brand Foundation & Design System
**Goal**: Establish the GripGym brand identity at the CSS level so all subsequent phases build on a consistent foundation.
**Depends on**: Nothing (first phase)
**Requirements**: BRAND-01, BRAND-02, BRAND-03, BRAND-04, BRAND-05
**Success Criteria** (what must be TRUE):
  1. Opening `index.html` — page `<title>` reads "GripGym"
  2. `style.css` has a CSS custom properties block (`--color-bg`, `--color-primary`, `--color-accent`, etc.) that is used throughout
  3. Body background is dark (not white) on first load
  4. Athletic heading and body fonts load and render correctly
  5. WOW.js animations still trigger on scroll
**Plans**: 1 plan (01-PLAN.md)

Plans:
- [ ] 01-01: Update HTML meta & branding (title, meta description, logo text)
- [ ] 01-02: Add Google Fonts link tags; remove old @import font lines
- [ ] 01-03: Add :root CSS design token block (10 colors, 3 fonts, 4 weights)
- [ ] 01-04: Update global font rules and body base styles; fix Open-sans typo
- [ ] 01-05: Apply dark theme overrides to light-background sections
- [x] 01-06: Token-update already-dark sections (housekeeping, no visual change)

### Phase 2: Header, Navigation & Hero
**Goal**: First impression is GripGym-branded, dark, and bold — visitor knows immediately what site they're on.
**Depends on**: Phase 1
**Requirements**: NAV-01, NAV-02, NAV-03, NAV-04, HERO-01, HERO-02, HERO-03, HERO-04
**Success Criteria** (what must be TRUE):
  1. Logo displays "GripGym" in the correct font and brand color
  2. Nav links are legible on dark background; hover states visible
  3. Hamburger menu opens/closes correctly on 375px mobile viewport
  4. Hero headline and sub-headline contain real GripGym copy (no Lorem Ipsum)
  5. Hero CTA button is styled and scrolls to correct section on click
  6. No white flash on page load
**Plans**: 1 plan (02-PLAN.md)

Plans:
- [ ] 02-01: Replace hero HTML copy and add CTA anchor
- [ ] 02-02: Hero overlay, flex centering, and background fallback CSS
- [ ] 02-03: Tokenize hero h1 CSS and set container gap
- [ ] 02-04: Add .hero-cta CSS class with hover state + responsive overrides
- [ ] 02-05: Tokenize header CSS — logo, nav links, hamburger
**Goal**: Core "who we are" and "what we offer" sections match GripGym brand and contain real content.
**Depends on**: Phase 2
**Requirements**: ABOUT-01, ABOUT-02, ABOUT-03, SERVICE-01, SERVICE-02, SERVICE-03, SERVICE-04
**Success Criteria** (what must be TRUE):
  1. About section renders on dark background with three styled cards
  2. All three About card headings and body copy are real GripGym content (no Lorem Ipsum)
  3. Services accordion opens and closes correctly
  4. All accordion items contain real service names and descriptions
  5. "Start Now" button links to the correct section anchor
**Plans**: TBD

### Phase 4: Classes & Schedule
**Goal**: Visitors can see real class offerings and when they happen.
**Depends on**: Phase 3
**Requirements**: CLASSES-01, CLASSES-02, SCHEDULE-01, SCHEDULE-02
**Success Criteria** (what must be TRUE):
  1. Classes section renders on dark background with at least 4 class cards
  2. All class cards contain real names, descriptions, and trainer info
  3. Schedule section shows at least one full week of real GripGym class times
  4. Schedule is readable on 375px mobile viewport
**Plans**: TBD

### Phase 5: Pricing & Contact
**Goal**: Visitors can see membership options and reach GripGym directly.
**Depends on**: Phase 4
**Requirements**: PRICING-01, PRICING-02, PRICING-03, CONTACT-01, CONTACT-02
**Success Criteria** (what must be TRUE):
  1. Pricing section shows 4 real membership tiers with real prices
  2. No Lorem Ipsum in any pricing feature list
  3. Pricing CTA buttons link to `#contact`
  4. Contact section shows real GripGym address, phone, and email
  5. Contact form is styled correctly (static, no backend required)
**Plans**: 3 plans (05-01, 05-02, 05-03)

Plans:
- [ ] 05-01-PLAN.md — Create data/content.json with pricing tiers and contact data
- [ ] 05-02-PLAN.md — Add Pricing & Contact sections with JSON-driven rendering
- [ ] 05-03-PLAN.md — Style sections and verification

### Phase 6: Gallery, Footer & Final Polish
**Goal**: Add the new Gallery section, finalize the footer, and ensure the full site is polished, consistent, and content-complete.
**Depends on**: Phase 5
**Requirements**: GALLERY-01, GALLERY-02, GALLERY-03, GALLERY-04, FOOTER-01, FOOTER-02, FOOTER-03
**Success Criteria** (what must be TRUE):
  1. Gallery section appears between Pricing and Contact in page flow
  2. Gallery displays at least 6 photos in a responsive grid
  3. Clicking a gallery photo opens it in a lightbox without a page reload
  4. Navigation includes a working "Gallery" anchor link
  5. Footer shows "GripGym" branding and current copyright year
  6. Zero Lorem Ipsum remaining anywhere in `index.html`
  7. All sections pass mobile layout check at 375px width
  8. WOW.js scroll animations fire correctly on all sections
**Plans**: TBD

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Brand Foundation & Design System | 6/6 | Executed | 2026-07-20 |
| 2. Header, Navigation & Hero | 5/5 | Executed | 2026-07-20 |
| 3. About & Services | 4/4 | Executed | 2026-07-20 |
| 4. Classes & Schedule | 5/5 | Executed | 2026-07-20 |
| 5. Pricing & Contact | 5/5 | Planned | 2026-07-21 |
| 6. Gallery, Footer & Final Polish | 0/TBD | Not started | - |

---
*Roadmap created: 2026-07-20*
*Last updated: 2026-07-21 — Phase 5 planned with JSON architecture*
