# Phase 2: Header, Navigation & Hero — Context

**Gathered:** 2026-07-20
**Status:** Ready for planning
**Source:** User-supplied copy + inline context from Phase 1 artifacts

<domain>
## Phase Boundary

Phase 2 delivers the first visual impact of the GripGym rebrand: a polished header/nav and a hero section with real copy. Scope is strictly `header`, `.nav`, and `.home` CSS + the HTML inside those elements in `index.html`.

**In scope:**
- Logo styling in header (font, color, weight, hover)
- Navigation panel styling (dark theme, link styles, mobile hamburger)
- Hero headline and sub-headline replaced with real GripGym copy
- Hero section dark overlay on background image (readable text over photo)
- Hero CTA button (new element — styled, links to `#classes`)
- Responsive behaviour at 375px for header and hero

**Out of scope (later phases):**
- About, Services, Classes, Schedule, Pricing, Contact, Gallery sections
- Footer
- Any backend or form handling

</domain>

<decisions>
## Implementation Decisions

### Hero Copy (User-Supplied — LOCKED)
- **D-01:** Hero headline (HERO-01): **"Grip Gym"** — displayed in Bebas Neue, all-caps, large
- **D-02:** Hero sub-headline (HERO-02): **"Grip on Self"** — displayed in Barlow Condensed, mixed case, styled as a punchy secondary line

### Hero Section Design (HERO-03)
- **D-03:** Dark gradient overlay on `home.jpg` background — `linear-gradient(rgba(15,15,15,0.65), rgba(15,15,15,0.85))` so the gym photo remains visible but text is legible
- **D-04:** Hero content vertically centered in the viewport (`align-items: center` or flex centering)
- **D-05:** No white flash on load — `background-color: var(--color-bg-primary)` already set on `body`

### Hero CTA Button (HERO-04)
- **D-06:** Add one CTA button below the hero headlines: text "Join Now" — links to `#price`
- **D-07:** CTA button styled with `background-color: var(--color-primary)`, white text, bold, no border-radius (squared) — consistent with brand aesthetic
- **D-08:** CTA button hover: invert to transparent background + white border + white text

### Header / Navigation (NAV-01 to NAV-04)
- **D-09:** Logo `Grip<span>Gym</span>` — already done in Phase 1; Phase 2 applies `font-family: var(--font-heading)` and increases weight if needed for visual punch
- **D-10:** Nav panel background stays `var(--color-primary)` (red slide-in from right) — bold brand statement; this is intentional, not a bug
- **D-11:** Nav link font: `var(--font-heading)` (Barlow Condensed), letter-spacing tightened for compactness
- **D-12:** Hamburger spans use `var(--color-text-base)` (#f0f0f0) for white lines — already `#ffffff` in Phase 1; no change needed if rendering correctly
- **D-13:** Nav label "Price" → keep as-is (matches existing section anchor `#price`); no other nav labels need changing
- **D-14:** Hamburger menu and nav transitions tested at 375px — existing jQuery toggle logic already functional; only CSS changes needed

### Two h1 vs One h1 + p Structure
- **D-15:** Retain the two `<h1>` structure from the template (both carry `wow slideInLeft/Right` animations); first h1 = main headline, second h1 = sub-headline
- **D-16:** Second h1 can be kept as h1 semantically (WOW.js targeting by class, not tag) or changed to `<p class="hero-sub">` — prefer keeping h1 to preserve animation intact

### Animation Preservation
- **D-17:** All `wow`, `slideInLeft`, `slideInRight`, `flash` classes on `.home` elements must be preserved — do not remove or rename
- **D-18:** No changes to `js/wow.min.js` or `css/animate.css`

### Claude's Discretion
- Exact px value for hero font size at mobile breakpoints (responsive block)
- Whether to add a subtle text-shadow to hero headlines for depth over the overlay
- Spacing (padding/margin) between headline, sub-headline, and CTA button

</decisions>

<specifics>
## Specific Ideas

- Hero overlay technique: add `background-image: linear-gradient(...), url('../images/home.jpg')` — stacks gradient on top of photo in one `background-image` declaration
- Logo in header could gain a subtle letter-spacing: `letter-spacing: 0.03em` for Barlow Condensed
- CTA button class: reuse `.btn` if it exists in style.css, otherwise add `.hero-cta` — check first
- The existing `.go-down` scroll arrow must be preserved (points to `#about`)
- Tagline from user: "Grip Gym - grip on self" → maps to h1 line 1 = "Grip Gym", h1 line 2 = "Grip on Self"

</specifics>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project Scope & Requirements
- `.planning/PROJECT.md` — project context, constraints, tech stack (HTML/CSS/JS only)
- `.planning/REQUIREMENTS.md` — NAV-01, NAV-02, NAV-03, NAV-04, HERO-01, HERO-02, HERO-03, HERO-04

### Phase 1 Deliverables (Foundation This Phase Builds On)
- `.planning/phases/01-brand-foundation-design-system/01-CONTEXT.md` — all 23 design token decisions (LOCKED)
- `.planning/phases/01-brand-foundation-design-system/01-SUMMARY.md` — what was delivered and verified in Phase 1
- `css/style.css` — current state with `:root {}` tokens and dark overrides already applied
- `index.html` — current state (GripGym logo, Google Fonts linked, hero copy still Lorem-adjacent)

</canonical_refs>

<deferred>
## Deferred Ideas

- Nav desktop layout (Phase 2 is mobile-first; if a desktop horizontal nav layout is needed, that's Phase 6 polish)
- Hero video background (out of scope — static image only, Phase 6 at earliest)
- Sticky header color-change on scroll (enhancement — not in requirements for this phase)

</deferred>

---
*Phase: 02-header-navigation-hero*
*Context gathered: 2026-07-20 — User supplied tagline "Grip Gym - grip on self"*
