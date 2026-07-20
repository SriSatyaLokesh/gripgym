# Requirements: GripGym

**Defined:** 2026-07-20
**Core Value:** A visually striking, dark-themed gym website that authentically represents the GripGym brand and compels visitors to join.

---

## v1 Requirements

Requirements for initial release. All sections retain current structure; rebrand + redesign + real content throughout.

### Brand & Design System

- [ ] **BRAND-01**: Site name "Fitness Club" replaced with "GripGym" in all visible locations (header logo, page title, footer, meta tags)
- [ ] **BRAND-02**: Dark color palette defined via CSS custom properties (`--color-bg`, `--color-primary`, `--color-accent`, `--color-text`, etc.)
- [ ] **BRAND-03**: Athletic font pairing applied (strong display font for headings, clean sans-serif for body)
- [ ] **BRAND-04**: Consistent dark & bold visual theme applied across all sections
- [ ] **BRAND-05**: `<title>` and meta description updated to reflect GripGym brand

### Header & Navigation

- [ ] **NAV-01**: Header logo displays "GripGym" with brand styling
- [ ] **NAV-02**: Navigation links updated if any labels change
- [ ] **NAV-03**: Header uses dark theme (dark background, light text/links)
- [ ] **NAV-04**: Mobile hamburger menu works correctly with new theme

### Hero Section

- [ ] **HERO-01**: Hero headline replaced with real GripGym tagline (user-supplied)
- [ ] **HERO-02**: Hero sub-headline replaced with real supporting copy (user-supplied)
- [ ] **HERO-03**: Hero section uses dark & bold design (background, typography, CTA button)
- [ ] **HERO-04**: Hero call-to-action button links to an appropriate section (e.g., #classes or #price)

### About Section

- [ ] **ABOUT-01**: About section redesigned with dark theme
- [ ] **ABOUT-02**: Three About cards updated with real GripGym content (headings + body copy, user-supplied)
- [ ] **ABOUT-03**: About images replaced or retained with GripGym-appropriate visuals

### Services Section

- [ ] **SERVICE-01**: Services section redesigned with dark theme
- [ ] **SERVICE-02**: Services intro text replaced with real GripGym copy (user-supplied)
- [ ] **SERVICE-03**: Accordion items updated with real service names and descriptions (user-supplied)
- [ ] **SERVICE-04**: "Start Now" CTA button links to appropriate section

### Classes Section

- [ ] **CLASSES-01**: Classes section redesigned with dark theme
- [ ] **CLASSES-02**: Class names, descriptions, and details replaced with real GripGym class offerings (user-supplied)

### Schedule Section

- [ ] **SCHEDULE-01**: Schedule section redesigned with dark theme
- [ ] **SCHEDULE-02**: Schedule data replaced with real GripGym class timetable (user-supplied)

### Pricing Section

- [ ] **PRICING-01**: Pricing section redesigned with dark theme
- [ ] **PRICING-02**: Pricing plan names, features, and rates replaced with real GripGym membership tiers (user-supplied)
- [ ] **PRICING-03**: Pricing CTA buttons link to contact section or sign-up flow

### Gallery Section *(New)*

- [ ] **GALLERY-01**: New Gallery section added to the site between Pricing and Contact
- [ ] **GALLERY-02**: Gallery displays at least 6 gym photos in a responsive grid layout
- [ ] **GALLERY-03**: Clicking a gallery image opens it in a lightbox (CSS/JS only — no external library unless tiny)
- [ ] **GALLERY-04**: Navigation menu includes a "Gallery" link anchored to the new section

### Contact Section

- [ ] **CONTACT-01**: Contact section redesigned with dark theme
- [ ] **CONTACT-02**: Contact details (address, phone, email) replaced with real GripGym info (user-supplied)

### Footer

- [ ] **FOOTER-01**: Footer redesigned with GripGym branding
- [ ] **FOOTER-02**: Footer copy, links, and social handles updated with real GripGym details (user-supplied)
- [ ] **FOOTER-03**: Copyright year updated to current year

---

## v2 Requirements

Deferred to future releases. Tracked but not in current roadmap.

### Extended Features

- **V2-01**: Online class booking / reservation system
- **V2-02**: Member portal / login
- **V2-03**: Blog / news section
- **V2-04**: WhatsApp / social media chat integration
- **V2-05**: CMS integration for content management

---

## Out of Scope

Explicitly excluded for v1. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| Backend / server-side | Pure static site — no server needed for v1 |
| Class booking system | Complexity out of scope; v2 consideration |
| Blog / news | Not required for gym website MVP |
| External JS dependencies | Avoid adding weight; lightbox built in-house |

---

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| BRAND-01 to BRAND-05 | Phase 1 | Pending |
| NAV-01 to NAV-04 | Phase 2 | Pending |
| HERO-01 to HERO-04 | Phase 2 | Pending |
| ABOUT-01 to ABOUT-03 | Phase 3 | Pending |
| SERVICE-01 to SERVICE-04 | Phase 3 | Pending |
| CLASSES-01 to CLASSES-02 | Phase 4 | Pending |
| SCHEDULE-01 to SCHEDULE-02 | Phase 4 | Pending |
| PRICING-01 to PRICING-03 | Phase 5 | Pending |
| CONTACT-01 to CONTACT-02 | Phase 5 | Pending |
| GALLERY-01 to GALLERY-04 | Phase 6 | Pending |
| FOOTER-01 to FOOTER-03 | Phase 6 | Pending |

**Coverage:**
- v1 requirements: 35 total
- Mapped to phases: 35
- Unmapped: 0 ✓

---
*Requirements defined: 2026-07-20*
*Last updated: 2026-07-20 — Project initialized*
