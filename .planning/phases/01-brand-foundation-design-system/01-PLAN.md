# Plan: Phase 1 — Brand Foundation & Design System

**Phase:** 1
**Goal:** Establish the GripGym brand identity at the CSS level so all subsequent phases build on a consistent foundation.
**Requirements:** BRAND-01, BRAND-02, BRAND-03, BRAND-04, BRAND-05
**Estimated tasks:** 6
**Planned:** 2026-07-20

---

## Phase Context

Phase 1 lays the entire design-token foundation for the project. The existing "Fitness Club" template ships with a partially dark palette but five sections have hardcoded white backgrounds and dark text that look broken against the new theme. This phase: renames the site to GripGym, loads three athletic Google Fonts via `<link>` tags, defines all design tokens in a `:root {}` block, and overrides every hardcoded light value so the page opens dark end-to-end. No layout, copy, or image changes happen here — those belong to Phases 2–6.

## Pre-conditions

- `index.html` and `css/style.css` exist as-is in the project root.
- No npm, no build tools, no preprocessors required — plain file edits only.
- `js/wow.min.js` and `css/animate.css` must remain untouched throughout.
- The inline `<style>.wow:first-child { visibility: hidden; }</style>` block in `<head>` must be preserved as-is.

---

## Tasks

### Task 01-01: Update HTML meta & branding
**File(s):** `index.html`
**Type:** edit
**Requires:** nothing (first task)

**What to do:**

1. Change `<title>Gym Website Template</title>` to:
   ```
   <title>GripGym — Train Harder. Grip Stronger.</title>
   ```
2. Add a `<meta name="description">` tag immediately after the `<title>` tag:
   ```
   <meta name="description" content="GripGym | Your Strength. Your Gym. Your Life.">
   ```
3. In the header logo anchor, replace `Fitness <span>Club</span>` with `Grip<span>Gym</span>`. The full line becomes:
   ```
   <a href="">Grip<span>Gym</span></a>
   ```
4. Search for any remaining occurrences of "Fitness Club" or "Gym Website Template" in the file and replace with "GripGym". (Per the research audit the header logo is the only visible text instance; the title is the only other occurrence.)

**Acceptance criteria:**
- [ ] `<title>` element reads exactly "GripGym — Train Harder. Grip Stronger."
- [ ] `<meta name="description">` tag is present in `<head>`
- [ ] The header logo text reads "Grip" followed by `<span>Gym</span>` (matching the existing color-span pattern)
- [ ] No remaining occurrence of "Fitness Club" or "Gym Website Template" anywhere in `index.html`
- [ ] The WOW.js inline `<style>` block is still present and unchanged

**Commit message:** `feat(01-01): rename site to GripGym, update title and meta description`

---

### Task 01-02: Add Google Fonts via HTML `<link>` and remove CSS `@import`
**File(s):** `index.html`, `css/style.css`
**Type:** edit
**Requires:** 01-01 (works on same `index.html`)

**What to do:**

**In `index.html`:** Add the following three `<link>` tags inside `<head>`, immediately before `<link rel="stylesheet" href="css/style.css">` (place them after the `<link rel="stylesheet" href="css/animate.css">` line and before the style.css link):

```
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;600;700;900&family=Inter:wght@400;500;600&display=swap">
```

**In `css/style.css`:** Remove the two Google Fonts `@import` lines at the top of the file. These are the lines to remove:
```
@import url('https://fonts.googleapis.com/css?family=Oswald:300,400,500,600,700&display=swap');
@import url('https://fonts.googleapis.com/css?family=Open+Sans&display=swap');
```
Leave the Font Awesome `@import` line in place:
```
@import url('https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
```

Do NOT move or modify the Font Awesome import; do NOT add the Google Fonts stylesheet to `style.css`. After this task `style.css` has exactly one `@import` line.

**Acceptance criteria:**
- [ ] `index.html` `<head>` contains two `rel="preconnect"` links for `fonts.googleapis.com` and `fonts.gstatic.com`
- [ ] `index.html` `<head>` contains the combined Google Fonts `<link>` for Bebas Neue, Barlow Condensed, and Inter
- [ ] `css/style.css` no longer contains any `@import` line for Oswald or Open Sans
- [ ] `css/style.css` still contains the Font Awesome `@import` as its only `@import` line
- [ ] The three `<link>` tags appear before `<link rel="stylesheet" href="css/style.css">` in HTML

**Commit message:** `feat(01-02): add Google Fonts link tags, remove old @import font lines`

---

### Task 01-03: Add CSS design tokens (`:root {}` block)
**File(s):** `css/style.css`
**Type:** edit
**Requires:** 01-02 (Font Awesome `@import` is now the only `@import`; `:root` goes after it)

**What to do:**

Insert the following `:root {}` block in `css/style.css` immediately after the Font Awesome `@import` line and immediately before the `body { }` rule. There must be one blank line between the `@import` and the `:root` block, and one blank line between the `:root` block and `body`:

```css
:root {
  /* Backgrounds */
  --color-bg-primary:   #0f0f0f;
  --color-bg-secondary: #1a1a1a;
  --color-bg-surface:   #242424;

  /* Brand accent */
  --color-primary:      #e8192c;
  --color-primary-dark: #b0111f;

  /* Text */
  --color-text-base:       #f0f0f0;
  --color-text-muted:      #8a8a8a;
  --color-text-on-accent:  #ffffff;

  /* Borders */
  --color-border:       #2e2e2e;
  --color-border-light: #444444;

  /* Typography */
  --font-display:  'Bebas Neue', sans-serif;
  --font-heading:  'Barlow Condensed', sans-serif;
  --font-body:     'Inter', sans-serif;

  /* Font weights */
  --fw-regular:  400;
  --fw-semibold: 600;
  --fw-bold:     700;
  --fw-black:    900;
}
```

Do not restructure any other part of the file. This is an insertion only.

**Acceptance criteria:**
- [ ] A `:root {}` block exists in `css/style.css`
- [ ] The block contains all 10 color tokens (`--color-bg-primary`, `--color-bg-secondary`, `--color-bg-surface`, `--color-primary`, `--color-primary-dark`, `--color-text-base`, `--color-text-muted`, `--color-text-on-accent`, `--color-border`, `--color-border-light`)
- [ ] The block contains the three font-stack tokens (`--font-display`, `--font-heading`, `--font-body`)
- [ ] The block contains the four font-weight tokens (`--fw-regular`, `--fw-semibold`, `--fw-bold`, `--fw-black`)
- [ ] The `:root {}` block appears after the Font Awesome `@import` and before the `body { }` rule

**Commit message:** `feat(01-03): add :root CSS design token block`

---

### Task 01-04: Update global font rules and body base styles
**File(s):** `css/style.css`
**Type:** edit
**Requires:** 01-03 (tokens must exist before `var()` references are used)

**What to do:**

Make the following targeted changes inside the existing rules in `css/style.css`. Do not restructure the file — edit only the specific property values listed.

**1. `body` rule** — add dark background and base text color properties:
```css
body {
  /* existing: margin, padding, overflow-x — keep all */
  background-color: var(--color-bg-primary);
  color: var(--color-text-base);
}
```

**2. `*` selector** — change `font-family` value only:
```css
* {
  /* existing: box-sizing, margin, padding — keep all */
  font-family: var(--font-heading);
}
```

**3. `.home h1`** — change `font-family` to display token:
```css
.home h1 {
  /* existing: color, font-size, font-weight, text-transform, margin — keep all */
  font-family: var(--font-display);
}
```

**4. Add body-text font-family overrides** — add these rules in the `body` rule block (or immediately after it as separate rules) to ensure paragraph and form text uses Inter:
```css
p,
li,
input,
textarea,
button,
.table td {
  font-family: var(--font-body);
}
```

**5. Fix `'Open-sans'` typo** — search `css/style.css` for every occurrence of `font-family: 'Open-sans'` (hyphenated, lowercase s) AND `font-family: 'Open Sans'` (correct spelling) and replace ALL of them with `font-family: var(--font-body)`. There are approximately 8 occurrences across `.about`, `.service`, `.service .body p`, `.classes .content .text p`, `.classes .content .class-items .item .item-text p`, `.start-today .content .text p`, `.price-package`, and `.contact`. Find and update every one.

**6. `.home h1 span`** — update the hardcoded `#c11325` accent color to use the token:
```css
.home h1 span {
  color: var(--color-primary);
}
```

**Acceptance criteria:**
- [ ] `body` rule includes `background-color: var(--color-bg-primary)` and `color: var(--color-text-base)`
- [ ] `*` selector sets `font-family: var(--font-heading)` (not 'Oswald')
- [ ] `.home h1` sets `font-family: var(--font-display)`
- [ ] A `p, li, input, textarea, button, .table td` rule sets `font-family: var(--font-body)`
- [ ] Zero remaining occurrences of `'Open-sans'` or `'Open Sans'` (either spelling) in `css/style.css`
- [ ] `.home h1 span` uses `var(--color-primary)` not a hardcoded hex value
- [ ] Opening `index.html` in a browser: page background is dark, hero text renders in Bebas Neue / Barlow Condensed

**Commit message:** `feat(01-04): update global font rules to CSS tokens, fix Open-sans typo`

---

### Task 01-05: Apply dark theme to light-background sections
**File(s):** `css/style.css`
**Type:** edit
**Requires:** 01-04 (tokens and base styles must be in place)

**What to do:**

Add a clearly labelled override section at the end of `css/style.css`, immediately before the `/* Responsive */` block (or at the very end of the file if no responsive block exists). Insert these overrides:

```css
/* ===== Dark Theme Overrides ===== */

/* --- Sections: light backgrounds → dark --- */
.about {
  background-color: var(--color-bg-secondary);
}

.classes {
  background-color: var(--color-bg-secondary);
}

.schedule {
  background-color: var(--color-bg-primary);
}

.gallery {
  background-color: var(--color-bg-primary);
}

.price-package {
  background-color: var(--color-bg-secondary);
}

.price-package .content .box .inner {
  background-color: var(--color-bg-surface);
}

/* --- Text: formerly-white-section dark text → light --- */
.classes .content .text h2,
.classes .content .text p {
  color: var(--color-text-base);
}

.schedule .content .text h2 {
  color: var(--color-text-base);
}

.schedule .content .text p {
  color: var(--color-text-muted);
}

.schedule .content .timing .table td {
  color: var(--color-text-base);
  border-color: var(--color-border);
}

.gallery h2 {
  color: var(--color-text-base);
}

.price-package h2 {
  color: var(--color-text-base);
}

.price-package .title-p {
  color: var(--color-text-muted);
}

.price-package .content .box .inner .text h3 {
  color: var(--color-text-base);
}

.price-package .content .box .inner .text p {
  color: var(--color-text-muted);
}

.price-package .content .box .inner .text .btn:hover {
  border-color: var(--color-text-base);
  color: var(--color-text-base);
}
```

Do not modify any existing rules above this block — these are additive overrides only. The `/* ===== Dark Theme Overrides ===== */` comment must be present as a visual section marker.

**Acceptance criteria:**
- [ ] A `/* ===== Dark Theme Overrides ===== */` comment section exists at or near the end of `css/style.css`
- [ ] All 6 background-color overrides are present (`.about`, `.classes`, `.schedule`, `.gallery`, `.price-package`, `.price-package .content .box .inner`)
- [ ] All 11 text-color overrides are present (matching the table in RESEARCH.md Section 5)
- [ ] Schedule table `border-color` is overridden to `var(--color-border)` (preventing the harsh `#dfdfdf` border on dark BG)
- [ ] Opening `index.html` in a browser: no section has a white or light-grey background visible
- [ ] Opening `index.html` in a browser: text in About, Classes, Schedule, Gallery, and Pricing sections is readable on dark background
- [ ] Cross-check: verify the 11-selector list against RESEARCH.md Section 5 to confirm `.about` has no additional text-color selectors requiring an override

**Commit message:** `feat(01-05): add dark theme overrides for light-background sections`

---

### Task 01-06: Token-update already-dark sections (no visual change)
**File(s):** `css/style.css`
**Type:** edit
**Requires:** 01-05 (all other token usage is in place; this is a housekeeping pass)

**What to do:**

Replace hardcoded hex values in sections that are already dark. These changes produce no visual difference — they swap hex literals for token references so that future theme changes only require updating `:root`. Make all replacements within the existing rules (do not restructure):

| Location | Find | Replace with |
|----------|------|--------------|
| `header { background-color: #000000; }` | `#000000` | `var(--color-bg-primary)` |
| `.about .content .box .inner { background-color: #222222; }` | `#222222` | `var(--color-bg-surface)` |
| `.start-today { background-color: #222222; }` | `#222222` | `var(--color-bg-surface)` |
| `.contact { background-color: #222222; }` (if present) | `#222222` | `var(--color-bg-surface)` |
| `header .logo a span { color: #c11325; }` | `#c11325` | `var(--color-primary)` |
| `header .nav { background-color: #c11325; }` | `#c11325` | `var(--color-primary)` |
| `.service { background-color: #c11325; }` | `#c11325` | `var(--color-primary)` |
| `.service .content .text .btn { background-color: #222222; }` | `#222222` | `var(--color-bg-surface)` |
| `.service .content .accordian-container.active .head { background-color: #222222; }` | `#222222` | `var(--color-bg-surface)` |
| `.service .content .accordian-container .body { background-color: #222222; }` | `#222222` | `var(--color-bg-surface)` |
| `.classes .content .class-items .item:nth-child(1) { background-color: #222222; }` | `#222222` | `var(--color-bg-surface)` |
| `.classes .content .class-items .item:nth-child(1) .item-img .price { background-color: #c11325; }` | `#c11325` | `var(--color-primary)` |
| `.classes .content .class-items .item:nth-child(2) { background-color: #c11325; }` | `#c11325` | `var(--color-primary)` |
| `.classes .content .class-items .item:nth-child(2) .item-img .price { background-color: #222222; }` | `#222222` | `var(--color-bg-surface)` |
| `header .nav ul li a::before { background-color: #000000; }` | `#000000` | `var(--color-bg-primary)` |
| `.active::before { background-color: #000000; }` (or equivalent active-nav pseudo-element) | `#000000` | `var(--color-bg-primary)` |

After this task the only hardcoded hex values remaining in `style.css` should be inside the `/* Responsive */` block or layout-specific values unrelated to brand colors (e.g., `rgba(0,0,0,0.2)` overlay tints).

**Acceptance criteria:**
- [ ] `header { background-color }` uses `var(--color-bg-primary)` not `#000000`
- [ ] `.about .content .box .inner { background-color }` uses `var(--color-bg-surface)` not `#222222`
- [ ] `.start-today { background-color }` uses `var(--color-bg-surface)` not `#222222`
- [ ] `header .nav { background-color }` uses `var(--color-primary)` not `#c11325`
- [ ] `.service { background-color }` uses `var(--color-primary)` not `#c11325`
- [ ] `header .nav ul li a::before` and `.active::before` pseudo-elements use `var(--color-bg-primary)` not `#000000`
- [ ] Opening `index.html` in a browser: page looks identical to after Task 01-05 (no visual change expected)
- [ ] `grep -c '#c11325\|#222222\|#000000' css/style.css` returns 0 for brand-identity uses (any remaining occurrences are intentional non-brand values like opacity overlays)

**Commit message:** `refactor(01-06): replace hardcoded brand hex values with CSS token references`

---

## Verification Checklist

Run through this checklist after all 6 tasks are complete:

- [ ] **SC-1** — Open `index.html` directly in a browser: page `<title>` tab reads "GripGym — Train Harder. Grip Stronger."
- [ ] **SC-2** — Page background on first load is visibly dark (not white, not grey — near-black `#0f0f0f`)
- [ ] **SC-3** — Header logo reads "Grip**Gym**" with "Gym" in red/accent color
- [ ] **SC-4** — Hero `h1` text renders in an all-caps condensed display font (Bebas Neue), visually distinct from the rest of the headings
- [ ] **SC-5** — Section headings (`h2`, `h3`) render in a condensed athletic font (Barlow Condensed); body paragraphs render in a clean sans-serif (Inter)
- [ ] **SC-6** — Scroll down: no section has a white or light-cream background; all sections are dark
- [ ] **SC-7** — Text in About, Classes, Schedule, Gallery, and Pricing sections is light-coloured and readable
- [ ] **SC-8** — Scroll to bottom and back to top: WOW.js animations trigger correctly on all `.wow` elements (elements start hidden, animate in on scroll)
- [ ] **SC-9** — Open browser DevTools → Network tab → Fonts: Bebas Neue, Barlow Condensed, and Inter all load from fonts.gstatic.com; Oswald and Open Sans do NOT appear

---

## Threat Model

| Threat | Mitigation |
|--------|-----------|
| White flash on page load | `body { background-color: var(--color-bg-primary) }` is set in the stylesheet, not JavaScript — applies before any render paint |
| WOW.js animations breaking | No changes to `js/wow.min.js` or `css/animate.css`; the existing inline `<style>.wow:first-child { visibility: hidden; }</style>` is explicitly preserved |
| Font FOUT (Flash of Unstyled Text) | `display=swap` in the Google Fonts URL ensures text renders immediately with fallback font until web font loads; no invisible text |
| Broken font references (`'Open-sans'` typo) | Task 01-04 explicitly searches for both `'Open-sans'` and `'Open Sans'` spellings and replaces all with `var(--font-body)` |
| Redundant font downloads (both `@import` and `<link>`) | Tasks 01-02 removes the CSS `@import` lines in the same step that adds the HTML `<link>` tags |
| Schedule table border overpowering dark BG | Task 01-05 overrides `border-color` on `.schedule .content .timing .table td` to `var(--color-border)` (`#2e2e2e`) |
| Bebas Neue bold synthesis artefacts | Bebas Neue used only on `.home h1` with `font-weight: 400` — browser never attempts to synthesise a bold variant |
| CSS specificity conflicts (overrides not applying) | All overrides in Task 01-05 use the same or higher specificity as the original rules; the Dark Theme section appears last in the file, ensuring cascade order wins |
