# Roadmap: GripGym v1.0 — Rebrand & Redesign

**Milestone:** v1.0
**Goal:** Transform the generic "Fitness Club" template into a polished GripGym branded website with a dark & bold design, real content, and a new Gallery section.
**Granularity:** Medium (3–5 days per phase)
**Tech:** HTML5 / CSS3 / Vanilla JS

---

## Phase Overview

| Phase | Title | Requirements | Estimate |
|-------|-------|-------------|----------|
| 1 | Brand Foundation & Design System | BRAND-01 to BRAND-05 | 3 days |
| 2 | Header, Navigation & Hero | NAV-01 to NAV-04, HERO-01 to HERO-04 | 3 days |
| 3 | About & Services Sections | ABOUT-01 to ABOUT-03, SERVICE-01 to SERVICE-04 | 4 days |
| 4 | Classes & Schedule Sections | CLASSES-01 to CLASSES-02, SCHEDULE-01 to SCHEDULE-02 | 4 days |
| 5 | Pricing & Contact Sections | PRICING-01 to PRICING-03, CONTACT-01 to CONTACT-02 | 3 days |
| 6 | Gallery, Footer & Final Polish | GALLERY-01 to GALLERY-04, FOOTER-01 to FOOTER-03 | 5 days |

---

## Phase 1 — Brand Foundation & Design System

**Goal:** Establish the GripGym brand identity at the CSS level so all subsequent phases build on a consistent foundation.

**Deliverables:**
- CSS custom properties (design tokens) for dark theme: background colors, primary accent, typography scale, spacing
- Google Font import (or system font stack) for the athletic heading/body pairing
- Page `<title>` and meta description updated to "GripGym"
- Base body/html styles updated to dark theme defaults
- WOW.js + Animate.css remain intact; new design tokens wired into existing styles

**Requirements covered:** BRAND-01, BRAND-02, BRAND-03, BRAND-04, BRAND-05

**UAT Criteria:**
- Open `index.html` — page title reads "GripGym"
- Inspect `style.css` — CSS custom properties block is present and used
- Body background is dark (not white)
- Fonts load correctly for headings and body text

---

## Phase 2 — Header, Navigation & Hero

**Goal:** First impression is GripGym-branded, dark, and bold. Visitor immediately knows what site they're on.

**Deliverables:**
- Header logo updated to "GripGym" with brand styling
- Navigation dark theme applied (dark bg, light links, hover states)
- Mobile hamburger menu tested and working with new theme
- Hero headline and sub-headline replaced with real GripGym taglines (user-supplied before phase starts)
- Hero background updated (dark overlay or new image)
- Hero CTA button styled with accent color and links to `#classes` or `#price`
- Hero scroll-down indicator styled

**Requirements covered:** NAV-01 to NAV-04, HERO-01 to HERO-04

**UAT Criteria:**
- Logo shows "GripGym" in correct font/color
- Nav links visible and legible on dark background
- Hamburger works on mobile viewport (< 768px)
- Hero headline reads real GripGym copy (not Lorem Ipsum)
- CTA button is styled and links to correct anchor
- No white flash on page load (dark base color set in Phase 1)

---

## Phase 3 — About & Services Sections

**Goal:** Core "who we are" and "what we offer" sections match the GripGym brand and contain real content.

**Deliverables:**
- About section: dark theme, updated card headings and body copy (user-supplied)
- About images: replaced or confirmed appropriate
- Services section: dark theme, updated intro text (user-supplied), "Start Now" CTA wired
- Services accordion: updated with real service names and descriptions (user-supplied)
- Accordion open/close behavior verified

**Requirements covered:** ABOUT-01 to ABOUT-03, SERVICE-01 to SERVICE-04

**UAT Criteria:**
- About section has dark background with readable card content
- All three About cards have real content (no Lorem Ipsum)
- Services accordion opens/closes correctly
- All accordion items have real service descriptions
- "Start Now" button links to an appropriate section

---

## Phase 4 — Classes & Schedule Sections

**Goal:** Visitors can see real class offerings and when they happen.

**Deliverables:**
- Classes section: dark theme applied, class cards updated with real names, descriptions, trainer info (user-supplied)
- Schedule section: dark theme applied, real GripGym timetable populated (user-supplied)
- Schedule layout: responsive grid or table that works on mobile

**Requirements covered:** CLASSES-01 to CLASSES-02, SCHEDULE-01 to SCHEDULE-02

**UAT Criteria:**
- Classes section renders on dark background
- At least 4 class cards with real content
- Schedule shows at least one week of real classes
- Schedule is readable on mobile viewport

---

## Phase 5 — Pricing & Contact Sections

**Goal:** Visitors can see membership options and reach GripGym directly.

**Deliverables:**
- Pricing section: dark theme, real membership tiers (names, features, monthly/annual rates — user-supplied)
- Pricing CTA buttons styled and linked to contact section
- Contact section: dark theme, real GripGym address/phone/email (user-supplied)
- Contact form: styled with dark theme (form submission is static — no backend)

**Requirements covered:** PRICING-01 to PRICING-03, CONTACT-01 to CONTACT-02

**UAT Criteria:**
- Pricing cards show 2–4 real membership tiers
- No Lorem Ipsum in any pricing plan feature list
- "Join Now" / CTA buttons link to `#contact`
- Contact section shows real GripGym contact details
- Contact form renders and is styled correctly (static — no live submission needed for v1)

---

## Phase 6 — Gallery, Footer & Final Polish

**Goal:** Add the new Gallery section, finalize the footer, and ensure the full site is polished and consistent.

**Deliverables:**
- Gallery section: responsive photo grid (min 6 images), CSS lightbox on image click
- Gallery added to navigation menu as a link
- Footer: GripGym branding, updated links, social handles, copyright year
- Full cross-section style consistency audit
- Mobile responsiveness verified across all sections (320px – 1440px)
- Browser test: Chrome, Firefox, Edge
- All Lorem Ipsum instances confirmed removed
- WOW.js animations confirmed working on all sections

**Requirements covered:** GALLERY-01 to GALLERY-04, FOOTER-01 to FOOTER-03

**UAT Criteria:**
- Gallery section renders between Pricing and Contact
- Clicking a photo opens it in a lightbox (no page reload)
- Navigation "Gallery" link scrolls to section
- Footer shows "GripGym" branding and current year
- Zero Lorem Ipsum remaining in the site
- All sections pass mobile layout check at 375px width
- Animations trigger correctly on scroll

---

## Definition of Done

The v1.0 milestone is complete when:

1. All 35 v1 requirements are checked off in REQUIREMENTS.md
2. All 6 phases are marked complete in STATE.md
3. The live `index.html` loads without errors in Chrome, Firefox, and Edge
4. Zero Lorem Ipsum text remains anywhere in the site
5. Mobile layout is functional at 375px minimum width
6. Gallery lightbox works without external library dependencies
7. Final commit tagged `v1.0`

---
*Roadmap created: 2026-07-20*
*Last updated: 2026-07-20 — Project initialized*
