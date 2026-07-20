# Research: Phase 1 — Brand Foundation & Design System

**Researched:** 2026-07-20
**Phase:** 1 — Brand Foundation & Design System
**Requirements:** BRAND-01, BRAND-02, BRAND-03, BRAND-04, BRAND-05
**Confidence:** HIGH

---

## Summary

The existing "Fitness Club" template already uses a partially dark palette (`#000000` header, `#222222` dark cards, `#c11325` red accent) but five sections have white/light backgrounds with dark text that must be inverted. The path to a complete GripGym dark theme is: (1) define CSS custom properties in `:root` at the top of `style.css`, (2) load new Google Fonts via `<link>` tags in HTML, (3) replace the ~12 hardcoded light-color values in the existing CSS with `var()` references. WOW.js and Animate.css are entirely unaffected by color or font changes — they operate only on `visibility` and animation class toggling.

**Primary recommendation:** Replace the two Google Fonts `@import` lines in `style.css` with a single multi-family `<link>` in the HTML `<head>`, add a `:root {}` token block immediately below the Font Awesome `@import`, then target the five light-background sections with dark overrides. No new JS, no new files needed.

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| BRAND-01 | Site name "Fitness Club" replaced with "GripGym" in all visible locations | Section 8 lists every occurrence found in index.html |
| BRAND-02 | Dark color palette defined via CSS custom properties | Section 2 + Section 4 provide full `:root` token set |
| BRAND-03 | Athletic font pairing applied (display heading + clean body) | Section 3 provides verified Google Fonts with exact `<link>` URL |
| BRAND-04 | Consistent dark & bold visual theme applied across all sections | Section 5 enumerates every hardcoded light value that needs overriding |
| BRAND-05 | `<title>` and meta description updated | Section 8 notes current `<title>` value and meta description is absent |
</phase_requirements>

---

## 1. CSS Custom Properties Naming Convention

**Convention used:** Category-property two-level naming (`--category-property` or `--category-property-modifier`).

This is the pattern used by Bootstrap 5, Material Design 3, and the broader CSS token community. It is readable, predictable, and works well in a single-file project. [ASSUMED — community convention, not a formal spec]

### Recommended token names for GripGym

```css
:root {
  /* ---- Backgrounds ---- */
  --color-bg-primary:   #0f0f0f;   /* main page background */
  --color-bg-secondary: #1a1a1a;   /* slightly elevated sections */
  --color-bg-surface:   #242424;   /* cards, accordions, table cells */

  /* ---- Brand ---- */
  --color-primary:      #e8192c;   /* red accent — buttons, tags, highlights */
  --color-primary-dark: #b0111f;   /* darker red for hover states */

  /* ---- Text ---- */
  --color-text-base:    #f0f0f0;   /* primary readable text (not pure white) */
  --color-text-muted:   #8a8a8a;   /* secondary/supporting text */
  --color-text-on-accent: #ffffff; /* text placed on red accent backgrounds */

  /* ---- Borders / Dividers ---- */
  --color-border:       #2e2e2e;   /* default borders */
  --color-border-light: #444444;   /* lighter separator lines */

  /* ---- Typography ---- */
  --font-display:  'Bebas Neue', sans-serif;       /* hero h1 only */
  --font-heading:  'Barlow Condensed', sans-serif; /* h2, h3, nav, labels */
  --font-body:     'Inter', sans-serif;            /* p, li, form, table */

  /* ---- Font Weights ---- */
  --fw-regular:  400;
  --fw-semibold: 600;
  --fw-bold:     700;
  --fw-black:    900;
}
```

**Naming rules:**
- Always `--color-` prefix for colors, `--font-` for font stacks, `--fw-` for weights.
- Modifier suffix (`-secondary`, `-muted`, `-dark`) describes the role, not a specific hex value.
- REQUIREMENTS.md names `--color-bg`, `--color-primary`, `--color-accent`, `--color-text` as bare minimums; the table above is a superset that satisfies those while being more expressive. The planner may alias short names if preferred.

**Where `:root` goes:** Immediately after all `@import` lines and before the first rule set. See Section 4.

---

## 2. Dark Gym Brand Color Palette

### Recommended Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-bg-primary` | `#0f0f0f` | Page body background |
| `--color-bg-secondary` | `#1a1a1a` | About, Classes, Pricing section backgrounds |
| `--color-bg-surface` | `#242424` | Cards, accordion bodies, pricing box inners |
| `--color-primary` | `#e8192c` | CTAs, price tags, accent blocks |
| `--color-primary-dark` | `#b0111f` | Hover state for primary accent |
| `--color-text-base` | `#f0f0f0` | All body copy and headings on dark BG |
| `--color-text-muted` | `#8a8a8a` | Supporting text, timestamps, captions |
| `--color-text-on-accent` | `#ffffff` | Text on red backgrounds (price tags, service section) |
| `--color-border` | `#2e2e2e` | Table borders, card dividers |
| `--color-border-light` | `#444444` | Lighter rule lines, schedule separators |

**Why `#0f0f0f` not `#000000`:** Pure black creates a harsh hard edge where images and panels meet. A near-black with a faint warm cast (`#0f0f0f`) looks intentional and feels premium. The current header already uses `#000000` — this should be updated to `var(--color-bg-primary)` for consistency. [ASSUMED — UX dark-mode best practice]

**Why `#f0f0f0` not `#ffffff`:** Pure white text on dark causes halation/bloom on OLED/AMOLED screens and contributes to eye fatigue. Material Design's dark-theme spec recommends off-white primary text. `#f0f0f0` passes WCAG AA (contrast ~17:1 against `#0f0f0f`). [ASSUMED — based on Material Design 3 dark theme guidance]

**Existing accent red (`#c11325`) vs `#e8192c`:** The existing red is desaturated and relatively dim — it can disappear against very dark backgrounds. `#e8192c` is brighter and more energetic while remaining clearly red. If the user prefers to keep `#c11325`, it still works fine; both pass WCAG AA against `#0f0f0f`. [ASSUMED]

### Common pitfalls with dark themes [ASSUMED]

1. **Gray text fails contrast** — `#888888` on `#0f0f0f` is approximately 5.5:1 (passes AA). Going darker than `#7a7a7a` on `#0f0f0f` starts to fail. Always check muted text.
2. **Borders vanish** — on a dark background, a `#dfdfdf` border (currently in the schedule table) will be invisible. Every border color must be explicitly overridden.
3. **`background-color: #ffffff` on cards** — `.price-package .content .box .inner` uses `#f0f0f0`. This creates bright white card boxes on a dark page. Must override.
4. **`filter: grayscale(100%)`** on gallery images renders images very dark on dark backgrounds. This may need revisiting in Phase 6.
5. **White flash on page load** — if `body` background is not set in CSS before fonts load, browser default white background flashes momentarily. Setting `background-color: var(--color-bg-primary)` on `body` directly prevents this.

---

## 3. Google Fonts Recommendations

All three fonts below are confirmed present on Google Fonts. [VERIFIED: fonts.google.com]

### Font 1 — Hero display: Bebas Neue

| Property | Value |
|----------|-------|
| URL | https://fonts.google.com/specimen/Bebas+Neue |
| Designer | Ryoichi Tsunekawa |
| Weights available | Regular 400 only |
| Style tags | Rugged, Loud, Excited, Futuristic, Stiff |
| Best use | `h1` hero headline, oversized display text |
| Limitation | ALL CAPS rendering only; no lowercase glyphs; only one weight |

Bebas Neue is the standard choice for gym/athletic hero headlines. It renders in uppercase only, which suits punchy taglines like "TRAIN HARDER. GRIP STRONGER." Do not use it for body copy or multi-sentence text.

### Font 2 — Section headings: Barlow Condensed

| Property | Value |
|----------|-------|
| URL | https://fonts.google.com/specimen/Barlow+Condensed |
| Designer | Jeremy Tribby |
| Weights available | Thin 100 → Black 900 (plus italics) |
| Style tags | Rugged, Active, Loud, Compact |
| Best use | `h2`, `h3`, nav links, labels, class names |
| Advantage | Full weight range — use 700/900 for headings, 400/600 for nav |

Barlow Condensed provides the same energetic condensed feel as Bebas Neue but with lowercase support and a full weight range, making it practical for everything except hero display and body paragraphs.

### Font 3 — Body text: Inter

| Property | Value |
|----------|-------|
| URL | https://fonts.google.com/specimen/Inter |
| Designer | Rasmus Andersson |
| Weights available | Thin 100 → Black 900 (variable font) |
| Style tags | Competent, Business, Neo-Grotesque |
| Best use | `p`, `li`, form inputs, table content, captions |
| Advantage | Optimized for screen readability at 14–18px; variable font |

Inter replaces the existing Open Sans for body text. It is more contemporary and renders sharply on high-DPI screens.

### Google Fonts `<link>` tag

Place these two tags in `<head>` before `<link rel="stylesheet" href="css/style.css">`:

```html
<!-- Google Fonts preconnect (performance) -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- GripGym font families -->
<link rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;600;700;900&family=Inter:wght@400;500;600&display=swap">
```

**Note on existing fonts:** `style.css` currently `@import`s Oswald and Open Sans. These `@import` lines must be removed when the new `<link>` tag is added — leaving both in place will load redundant fonts and slow the page.

**Font Awesome:** The existing `@import url('https://stackpath.bootstrapcdn.com/.../font-awesome.min.css')` should be left in place (or moved to a `<link>` in HTML for consistency — both work). Phase 1 scope does not require changing FA loading method.

---

## 4. CSS Architecture for Single-File Redesign

### Current `style.css` structure (as-built)

```
@import Google Fonts (Oswald)          ← REMOVE in Phase 1
@import Font Awesome                   ← keep (or move to HTML)
@import Google Fonts (Open Sans)       ← REMOVE in Phase 1
body { }
* { font-family: 'Oswald', sans-serif }
/* Header */
/* Home section */
/* About section */
...
/* Responsive */
```

### Target structure after Phase 1

```
@import Font Awesome                   ← keep as-is
:root { --color-... --font-... }       ← INSERT HERE (new)
body { background-color: var(--color-bg-primary); color: var(--color-text-base); }
* { font-family: var(--font-heading); }
/* Header */
/* Home section */
/* About section — override light backgrounds */
/* Classes section — override light backgrounds */
/* Schedule section — override dark text */
/* Gallery section — override heading color */
/* Price section — override white card BG and text */
/* Responsive */
```

**Hard rule:** `@import` statements must appear before all other CSS rules (CSS 2.1 spec). The `:root {}` block goes immediately after the last `@import`. [CITED: https://developer.mozilla.org/en-US/docs/Web/CSS/@import]

**Do not restructure the rest of the file.** Preserve all existing rules in their current order. Only: (1) remove two font @imports, (2) insert `:root {}` block, (3) add dark-theme overrides at the end of each section's comment block or as a separate "Dark Theme Overrides" section at the end of the file before the Responsive block. Either approach works; a dedicated "Dark Theme Overrides" section is easiest to review.

### CSS custom property usage pattern [CITED: https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties]

```css
/* Authoring pattern — replace hardcoded hex with var() */
.about {
  background-color: var(--color-bg-secondary);  /* was: #ffffff */
}
```

**Fallback syntax** (optional, adds resilience for very old browsers):

```css
background-color: var(--color-bg-secondary, #1a1a1a);
```

CSS custom properties have >97% browser support as of mid-2026; fallbacks are optional for this project. [ASSUMED — based on known browser support trajectory]

---

## 5. Dark Theme Base Styles

### Sections with white/light backgrounds — must override

A code audit of `style.css` reveals 5 sections with hardcoded light backgrounds:

| Selector | Current value | Override needed |
|----------|--------------|-----------------|
| `.about` | `background-color: #ffffff` | `var(--color-bg-secondary)` |
| `.classes` | `background-color: #ffffff` | `var(--color-bg-secondary)` |
| `.schedule` | *(no bg set — inherits white from body)* | `background-color: var(--color-bg-primary)` |
| `.gallery` | *(no bg set — inherits white from body)* | `background-color: var(--color-bg-primary)` |
| `.price-package` | `background-color: #ffffff` | `var(--color-bg-secondary)` |
| `.price-package .content .box .inner` | `background-color: #f0f0f0` | `var(--color-bg-surface)` |

### Text colors on formerly-white sections — must override

| Selector | Current value | Override needed |
|----------|--------------|-----------------|
| `.classes .content .text h2` | `color: #000000` | `var(--color-text-base)` |
| `.classes .content .text p` | `color: #000000` | `var(--color-text-base)` |
| `.schedule .content .text h2` | `color: #000000` | `var(--color-text-base)` |
| `.schedule .content .text p` | `color: #222222` | `var(--color-text-muted)` |
| `.schedule .content .timing .table td` | `color: #222222` | `var(--color-text-base)` |
| `.schedule .content .timing .table td` | `border-color: #dfdfdf` | `var(--color-border)` |
| `.gallery h2` | `color: #000000` | `var(--color-text-base)` |
| `.price-package h2` | `color: #000000` | `var(--color-text-base)` |
| `.price-package .title-p` | `color: #222222` | `var(--color-text-muted)` |
| `.price-package .content .box .inner .text h3` | `color: #222222` | `var(--color-text-base)` |
| `.price-package .content .box .inner .text p` | `color: #222222` | `var(--color-text-muted)` |
| `.price-package .content .box .inner .text .btn:hover` | `border-color: #222222; color: #222222` | `border-color: var(--color-text-base); color: var(--color-text-base)` |

### Sections already dark — verify/adjust only

These sections already have dark backgrounds and white text. No background overrides needed in Phase 1 (full redesign in later phases):

| Section | Current background | Action |
|---------|-------------------|--------|
| `header` | `#000000` | Update to `var(--color-bg-primary)` for token consistency |
| `.service` | `#c11325` | Leave — Phase 3 redesign |
| `.about .content .box .inner` | `#222222` | Update to `var(--color-bg-surface)` |
| `.start-today` | `#222222` | Update to `var(--color-bg-surface)` |
| `.contact` | `#222222` | Update to `var(--color-bg-surface)` |

### Global font-family change

The `*` selector currently sets `font-family: 'Oswald', sans-serif` universally. After Phase 1:

```css
* {
  font-family: var(--font-heading);  /* Barlow Condensed replaces Oswald */
}

body {
  font-family: var(--font-body);     /* Inter — overrides * for body element */
}

p, li, input, textarea, button, .table td {
  font-family: var(--font-body);     /* ensures paragraph/form text uses Inter */
}

h1 {
  font-family: var(--font-display);  /* Bebas Neue for hero h1 only */
}
```

---

## 6. WOW.js / Animate.css Compatibility

**Verdict: No compatibility issues.** [VERIFIED: wowjs.uk/docs.html + source code inspection]

### How WOW.js works (relevant to dark theme)

1. On page load, WOW.js finds all elements with class `wow` and sets them to `visibility: hidden`.
2. As the user scrolls, WOW.js adds the `animateClass` ('animated' by default) to each element as it enters the viewport.
3. Animate.css triggers the animation on the `animated` class via CSS keyframes.
4. After the animation completes, the element becomes fully visible.

**None of these steps involve color, background, or font properties.** A CSS dark theme only modifies visual presentation properties — it cannot interfere with `visibility` toggling or `@keyframes` definitions.

### Specific checks

| Change | Affect WOW.js? | Reason |
|--------|---------------|--------|
| `background-color` overrides | No | WOW.js never reads or sets background |
| `color` overrides | No | WOW.js never reads or sets text color |
| `font-family` change | No | Animation timing is not font-dependent |
| Removing font `@import` from CSS | No | WOW.js does not reference font names |
| Adding `:root {}` block | No | WOW.js does not parse CSS custom properties |

### Existing inline style to preserve

The template already has this inline `<style>` block in `<head>`:

```html
<style>
  .wow:first-child {
    visibility: hidden;
  }
</style>
```

**Do not remove this.** It is a workaround for a WOW.js quirk where the first `.wow` element on the page may flash visible on initial load before WOW.js initialises. This style must be retained as-is.

### WOW.js configuration in index.html

```js
wow = new WOW({
  animateClass: 'animated',
  offset: 0,
  // ... (full config not shown — see bottom of index.html)
})
```

No changes to this block are needed in Phase 1 (or any later phase, unless animations are being redesigned).

### Animate.css note

Animate.css is loaded from `css/animate.css` (a local copy). It is purely a collection of CSS `@keyframes` and utility classes. Dark theme changes cannot break keyframe animation definitions. No action needed.

---

## 7. Implementation Approach

Recommended execution order for the planner:

### Step 1 — HTML `<head>` updates (BRAND-01, BRAND-03, BRAND-05)

1. Change `<title>Gym Website Template</title>` → `<title>GripGym</title>`
2. Add `<meta name="description" content="GripGym — Train harder. Grip stronger. A premium strength gym.">` (or user-supplied copy)
3. Add Google Fonts `<link rel="preconnect">` and `<link rel="stylesheet">` tags (see Section 3)
4. Do NOT touch the existing `<style>` block (WOW.js workaround)

### Step 2 — Remove font `@import` from style.css (BRAND-03)

Remove these two lines from the top of `style.css`:
```css
@import url('https://fonts.googleapis.com/css?family=Oswald:300,400,500,600,700&display=swap');
@import url('https://fonts.googleapis.com/css?family=Open+Sans&display=swap');
```
Leave the Font Awesome `@import` in place.

### Step 3 — Insert `:root {}` token block (BRAND-02)

Insert the full `:root {}` block (from Section 1) immediately after the Font Awesome `@import` line and before `body { }`.

### Step 4 — Update global selectors (BRAND-03, BRAND-04)

In the `body` rule: add `background-color: var(--color-bg-primary); color: var(--color-text-base);`

In the `*` rule: change `font-family: 'Oswald', sans-serif` → `font-family: var(--font-heading);`

Add `font-family: var(--font-body);` to `p` and form elements.

Add `font-family: var(--font-display);` to `.home h1`.

### Step 5 — Override light-section backgrounds (BRAND-04)

Apply overrides to the 6 selectors listed in Section 5's "white/light backgrounds" table.

### Step 6 — Override text colors on formerly-white sections (BRAND-04)

Apply overrides to the 11 selectors listed in Section 5's "text colors" table.

### Step 7 — Update brand colors to use tokens (BRAND-02)

Replace hardcoded `#c11325` references with `var(--color-primary)`. There are approximately 15 occurrences across header nav, service section, classes items, contact, and social buttons. Update `#222222` used for surfaces to `var(--color-bg-surface)`. Update `#000000` used for the header background to `var(--color-bg-primary)`.

### Step 8 — Replace "Fitness Club" text in HTML (BRAND-01)

```html
<!-- header logo — line ~21 in index.html -->
<a href="">Grip<span>Gym</span></a>
```

Search `index.html` for all occurrences of "Fitness Club" and "Gym Website Template". Based on the current file: the only visible occurrence is the header logo. The `<title>` is "Gym Website Template" (covered in Step 1).

---

## 8. Risks & Pitfalls

### Risk 1 — Simultaneous `@import` and `<link>` for same font family

**What goes wrong:** If the Google Fonts `@import` lines are left in `style.css` while the new `<link>` tags are added to HTML, both Oswald/Open Sans AND Bebas Neue/Barlow Condensed/Inter will be downloaded. Page weight doubles, CSS font-family references may conflict.

**Prevention:** Remove the two Google Font `@import` lines from `style.css` in the same commit that adds the `<link>` tags to HTML.

### Risk 2 — `*` selector font-family override order

**What goes wrong:** `*` is very low specificity. Any element with an explicit `font-family` in an existing rule will correctly override it. But if `body { font-family: var(--font-body) }` is added BEFORE the `*` rule, the `*` rule wins (later in cascade).

**Prevention:** The `body` override must come AFTER the `*` rule in the stylesheet, OR use `font-family: var(--font-body) !important` on `body` (avoid). Best: keep the existing `*` rule, update its value, then add explicit `font-family: var(--font-body)` in the `p` / form element rules as they already exist in the stylesheet.

### Risk 3 — Bebas Neue only has Regular 400

**What goes wrong:** Setting `font-weight: 700` on a Bebas Neue element causes the browser to simulate bold (font synthesis), which looks poor on screen.

**Prevention:** Use Bebas Neue ONLY for `.home h1` with `font-weight: 400`. Barlow Condensed handles all other heading weights.

### Risk 4 — Schedule table border disappears

**What goes wrong:** `.schedule .content .timing .table td` currently uses `border: 1px solid #dfdfdf`. On a dark background, `#dfdfdf` is near-white and will be extremely visible (too high contrast), not invisible. It looks harsh.

**Prevention:** Override to `border-color: var(--color-border)` (`#2e2e2e`) on the table td.

### Risk 5 — Gallery `filter: grayscale(100%)` on dark BG

**What goes wrong:** Gallery images are already desaturated with `filter: grayscale(100%)`. On a dark background, grayscale images with dark content may barely be distinguishable from the background.

**Prevention:** For Phase 1, the gallery background override is sufficient. Full gallery redesign is in Phase 6 where image presentation can be reassessed. Flag for planner as a Phase 6 concern.

### Risk 6 — `font-family: 'Open-sans'` (typo in existing CSS)

**What goes wrong:** The existing `style.css` has multiple occurrences of `font-family: 'Open-sans', sans-serif` (hyphenated, lowercase 's') — a typo. The correct name is `'Open Sans'` (two words, capital S). These rules currently fail silently and fall back to the sans-serif generic.

**Prevention:** When replacing Open Sans with Inter, search for both `'Open Sans'` AND `'Open-sans'` in `style.css` to ensure all instances are caught. Replace all with `var(--font-body)`.

---

## Sources

### Primary (VERIFIED)
- [VERIFIED: fonts.google.com/specimen/Bebas+Neue] — Exists, Regular 400 only, tags: Rugged/Loud/Excited
- [VERIFIED: fonts.google.com/specimen/Barlow+Condensed] — Exists, Thin 100–Black 900, tags: Rugged/Active/Loud
- [VERIFIED: fonts.google.com/specimen/Inter] — Exists, variable font, tags: Competent/Business
- [VERIFIED: wowjs.uk/docs.html] — WOW.js mechanism documented; uses visibility + animateClass only
- [VERIFIED: codebase inspection] — style.css read in full; all hardcoded color/font values catalogued above

### Secondary (CITED)
- [CITED: developer.mozilla.org/en-US/docs/Web/CSS/@import] — @import must precede all other rules
- [CITED: developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties] — var() syntax and fallback pattern

### Tertiary (ASSUMED)
- Dark theme near-black/off-white palette rationale — [ASSUMED — Material Design 3 dark theme guidance, not fetched]
- CSS custom property naming convention — [ASSUMED — community consensus, not a formal W3C spec]
- `#e8192c` vs `#c11325` brightness preference — [ASSUMED — visual judgment]
- >97% browser support for CSS custom properties — [ASSUMED — based on known browser support trajectory]

---

## Confidence Assessment

| Area | Confidence | Reason |
|------|-----------|--------|
| Font verification (Bebas Neue, Barlow Condensed, Inter on Google Fonts) | HIGH | Directly fetched from fonts.google.com |
| WOW.js / Animate.css compatibility | HIGH | wowjs.uk docs + source code inspection confirms visibility-only mechanism |
| Hardcoded color inventory | HIGH | style.css read in full; every light-background rule catalogued |
| CSS custom property syntax | HIGH | MDN spec cited |
| Color palette values (`#0f0f0f`, `#f0f0f0`, etc.) | MEDIUM | Sound rationale but not verified via user research or A/B testing |
| Font pairing recommendation | MEDIUM | Verified fonts exist; aesthetic judgment is assumed |
| `#e8192c` preferred over existing `#c11325` | LOW | Aesthetic preference; user may override |

**Research valid until:** ~2026-08-20 (Google Fonts catalogue is stable; no expiry concern for this static site scope)
