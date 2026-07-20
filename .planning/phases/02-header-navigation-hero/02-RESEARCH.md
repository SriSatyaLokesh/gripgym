# Phase 2: Header, Navigation & Hero — Research

**Researched:** 2026-07-20
**Domain:** Static HTML/CSS — header, nav panel, hero section
**Confidence:** HIGH (all findings from direct codebase reads)

---

## Summary

Phase 1 delivered a solid foundation: CSS tokens are live in `:root`, `body` carries the dark background color, fonts are loaded, and the logo HTML already reads `Grip<span>Gym</span>`. Phase 2 work is surgical — mostly CSS updates to token-ize the handful of remaining hardcoded color and font values, plus adding the gradient overlay, flex centering, and CTA button to the hero.

The two largest risks are (1) the gradient overlay technique, which must be applied to `background-image` as a stacked layer rather than via a pseudo-element to avoid disrupting the WOW.js `flash` animation on `.home`, and (2) the CTA button, which has no reusable standalone `.btn` class (all existing `.btn` rules are deeply scoped to their parent sections), so a new `.hero-cta` class is needed.

**Primary recommendation:** Follow the stacked `background-image` gradient approach from CONTEXT D-03 exactly; add `.hero-cta` as a standalone scoped class; leave all WOW.js class names and `css/animate.css` untouched.

---

## User Constraints (from CONTEXT.md)

### Locked Decisions
- **D-01:** Hero headline: `"Grip Gym"` — Bebas Neue, all-caps, large
- **D-02:** Hero sub-headline: `"Grip on Self"` — Barlow Condensed, styled punchy secondary line
- **D-03:** Dark gradient overlay: `linear-gradient(rgba(15,15,15,0.65), rgba(15,15,15,0.85))` stacked with `home.jpg`
- **D-04:** Hero content vertically centered (`align-items: center` or flex centering)
- **D-05:** No white flash — `background-color: var(--color-bg-primary)` already on `body` ✅
- **D-06:** CTA button text: `"Join Now"`, links to `#price`
- **D-07:** CTA: `background-color: var(--color-primary)`, white text, bold, no border-radius (squared)
- **D-08:** CTA hover: transparent background + `border: 1px solid #ffffff` + white text
- **D-09:** Logo `font-family: var(--font-heading)` explicitly set
- **D-10:** Nav panel background stays `var(--color-primary)` (intentional red)
- **D-11:** Nav link font: `var(--font-heading)`, letter-spacing tightened
- **D-12:** Hamburger spans already `#ffffff`; change to `var(--color-text-base)` for token consistency
- **D-13:** No nav label changes needed
- **D-14:** Hamburger toggle jQuery logic already functional; CSS-only changes
- **D-15:** Retain two `<h1>` structure with `wow slideInLeft` / `wow slideInRight`
- **D-16:** Second h1 kept as `<h1>` (preferred to preserve animation intact)
- **D-17:** All `wow`, `slideInLeft`, `slideInRight`, `flash` classes must be preserved
- **D-18:** No changes to `js/wow.min.js` or `css/animate.css`

### Claude's Discretion
- Exact px value for hero font sizes at mobile breakpoints
- Whether to add `text-shadow` to hero headlines for depth over overlay
- Spacing (padding/margin) between headline, sub-headline, and CTA button

### Deferred Ideas (OUT OF SCOPE)
- Desktop horizontal nav layout
- Hero video background
- Sticky header color-change on scroll

---

## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| NAV-01 | Header logo displays "GripGym" with brand styling | Logo HTML exists; `font-family` needs explicit token; `color: #ffffff` needs tokenizing to `var(--color-text-on-accent)` |
| NAV-02 | Navigation links updated if any labels change | No label changes per D-13; nav HTML is already correct |
| NAV-03 | Header uses dark theme (dark background, light text/links) | `header` already `var(--color-bg-primary)` ✅; nav link `color: #ffffff` needs tokenizing |
| NAV-04 | Mobile hamburger menu works correctly with new theme | jQuery toggle logic untouched; only CSS token swap on ham-burger span color |
| HERO-01 | Hero headline replaced with real GripGym tagline | First `<h1>` text → `"Grip Gym"` |
| HERO-02 | Hero sub-headline replaced with real supporting copy | Second `<h1>` text → `"Grip on Self"` |
| HERO-03 | Hero section uses dark & bold design | Gradient overlay + flex centering required; overlay technique documented below |
| HERO-04 | Hero CTA button links to appropriate section | New `<a href="#price" class="hero-cta">Join Now</a>` needed; `.hero-cta` CSS class needed |

---

## 1. Header CSS Audit

All findings from direct read of `css/style.css` lines 60–180.

### `.logo a` (line 76)

| Property | Current Value | Status | Action |
|----------|---------------|--------|--------|
| `font-size` | `30px` | OK | Keep; can increase to `32px` for punch if desired (discretion) |
| `color` | `#ffffff` | Hardcoded | Change to `var(--color-text-on-accent)` |
| `font-weight` | `700` | Hardcoded | Change to `var(--fw-bold)` |
| `font-family` | *(not set — inherits `var(--font-heading)` from `*` selector)* | Implicit | Add explicit `font-family: var(--font-heading)` per D-09 |
| `text-decoration` | `none` | OK | Keep |

### `.logo a span` (line 82)

| Property | Current Value | Status | Action |
|----------|---------------|--------|--------|
| `color` | `var(--color-primary)` | ✅ Tokenized | None |

### `.nav` (line 88)

| Property | Current Value | Status | Action |
|----------|---------------|--------|--------|
| `background-color` | `var(--color-primary)` | ✅ Tokenized | None — intentional red per D-10 |
| `width` | `280px` | OK | Keep |
| `transform` | `translateX(100%)` + transition | OK | Keep — slide-in behavior correct |

### `.nav ul li a` (line 107)

| Property | Current Value | Status | Action |
|----------|---------------|--------|--------|
| `font-size` | `30px` | OK | Keep |
| `font-weight` | `400` | Acceptable | Consider `var(--fw-semibold)` (600) for impact — discretion |
| `color` | `#ffffff` | Hardcoded | Change to `var(--color-text-on-accent)` |
| `font-family` | *(not set — inherits `var(--font-heading)`)* | Implicit | Add explicit `font-family: var(--font-heading)` per D-11 |
| `letter-spacing` | *(not set)* | Missing | Add `letter-spacing: -0.02em` per D-11 |

### `.nav ul li a::before` and `a.active::before`

Hover highlight uses `background-color: var(--color-bg-primary)` with `opacity: 0.2` — this is an overlay reveal effect. Correct and already tokenized. No changes needed.

### `.ham-burger span` (line 153)

| Property | Current Value | Status | Action |
|----------|---------------|--------|--------|
| `background-color` | `#ffffff` | Hardcoded | Change to `var(--color-text-base)` per D-12 |
| `height` | `3px` | OK | Keep |
| `width` | `30px` | OK | Keep |

### `.ham-burger.active` transform animations

Already correct X-shape transforms. No changes.

---

## 2. Hero CSS Audit

All findings from `css/style.css` lines 195–245.

### `.home` (line 195)

| Property | Current Value | Status | Action |
|----------|---------------|--------|--------|
| `height` | `100vh` | ✅ | Keep |
| `background-image` | `url('../images/home.jpg')` | Incomplete | Add gradient layer (see Section 3) |
| `background-size` | `cover` | ✅ | Keep |
| `padding` | `15px` | OK | Keep |
| `display` | `flex` | ✅ | Keep |
| `position` | `relative` | ✅ Required by `.go-down` | Keep |
| `align-items` | *(not set)* | **Missing** | Add `align-items: center` per D-04 |
| `background-color` | *(not set on `.home` — body has it)* | OK | Optional: add `background-color: var(--color-bg-primary)` as a fallback for when image loads slowly |

### `.home .container` (line 226)

| Property | Current Value | Status | Action |
|----------|---------------|--------|--------|
| `display` | `flex` | ✅ | Keep |
| `flex-direction` | `column` | ✅ | Keep |
| `flex-grow` | `1` | ✅ | Keep |
| `justify-content` | *(not set)* | **Missing** | Add `justify-content: center` to vertically center headlines per D-04 |
| `align-items` | *(not set — default: stretch)* | OK | Optionally add `align-items: flex-start` for left-aligned text |
| `gap` | *(not set)* | Missing | Add `gap: 16px` or `gap: 1.5rem` to space headline, sub-headline, and CTA — discretion |

### `.home h1` (line 231)

| Property | Current Value | Status | Action |
|----------|---------------|--------|--------|
| `color` | `#ffffff` | Hardcoded | Change to `var(--color-text-on-accent)` |
| `font-size` | `60px` | OK | Keep at desktop |
| `font-weight` | `700` | Hardcoded | Change to `var(--fw-bold)` |
| `text-transform` | `uppercase` | ✅ | Keep |
| `font-family` | `var(--font-display)` | ✅ | Keep (Bebas Neue per D-01) |

### `.home h1 span` (line 237)

| Property | Current Value | Status | Action |
|----------|---------------|--------|--------|
| `color` | `var(--color-primary)` | ✅ Tokenized | Keep — red accent on "Gym" word is the brand statement |

### Missing entirely

- No overlay on `background-image` → text is hard to read over photo
- No CTA button element or class
- No `justify-content: center` on `.home .container` → content sits at top of viewport
- No `text-shadow` on `.home h1` (discretion — recommend adding after overlay is in place)

---

## 3. Hero Overlay Technique

### Approach: Stacked CSS `background-image` (LOCKED per D-03)

```css
/* BEFORE (current) */
.home {
  background-image: url('../images/home.jpg');
}

/* AFTER — gradient stacked on top of the photo */
.home {
  background-image: 
    linear-gradient(rgba(15, 15, 15, 0.65), rgba(15, 15, 15, 0.85)),
    url('../images/home.jpg');
  background-color: var(--color-bg-primary); /* fallback if image fails */
}
```

**How CSS stacking works:** In `background-image`, the first value is the topmost layer. The gradient renders on top of the photo, darkening it from 65% opacity at the top to 85% at the bottom. The photo remains partially visible as context/atmosphere.

### Why not `::before` pseudo-element?

A `::before` approach would require:
```css
.home::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(...);
  z-index: 0;
}
.home .container { position: relative; z-index: 1; }
```

This adds two CSS rules and a z-index dependency chain. The stacked `background-image` approach achieves the same result in one property change with zero z-index risk. Preferred for this no-build stack.

### WOW `flash` compatibility

The WOW.js `flash` class on `.home` triggers the Animate.css `flash` keyframe, which pulses the **entire element's opacity**. The `background-image` gradient is a CSS background property — it is painted at the element level and will animate in sync with the element's opacity during the flash. This is the **correct** behavior: the photo and overlay flash together as one unit. No conflict.

---

## 4. CTA Button

### Existing `.btn` class audit

**Result: No standalone `.btn` class exists in `style.css`.** All `.btn` occurrences are deeply scoped:

| Selector | Line | `background-color` | Notes |
|----------|------|--------------------|-------|
| `.service .content .text .btn` | 321 | `var(--color-bg-surface)` | Dark surface, not red |
| `.start-today .content .text .btn` | 548 | `var(--color-primary)` | Red — closest to hero CTA style |
| `.price-package .content .box .inner .text .btn` | 731 | `var(--color-bg-surface)` | Dark surface |

**Conclusion:** These cannot be reused by the hero CTA — the selectors require specific parent ancestry that the hero section doesn't have.

### Recommended: Add `.hero-cta` class

```css
/* Hero CTA button — standalone, not scoped to parent selector */
.hero-cta {
  display: inline-block;
  padding: 12px 40px;
  background-color: var(--color-primary);
  color: var(--color-text-on-accent);
  font-family: var(--font-heading);
  font-weight: var(--fw-bold);
  font-size: 18px;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border: 2px solid var(--color-primary);
  cursor: pointer;
  -webkit-transition: all 0.4s ease;
  transition: all 0.4s ease;
  margin-top: 24px; /* space below sub-headline — adjust via discretion */
}

.hero-cta:hover {
  background-color: transparent;
  color: var(--color-text-on-accent);
  border-color: var(--color-text-on-accent);
}
```

**HTML to add inside `.home .container`** (after the two `<h1>` elements, before the closing `</div>`):
```html
<a href="#price" class="hero-cta">Join Now</a>
```

### Why `border: 2px` not `border: 1px`?

The `font-weight: bold` + uppercase letter-spacing makes the text visually heavy. A 2px border matches the visual weight better and is more visible on mobile. Adjust at discretion.

---

## 5. WOW.js Compatibility

### Animation class inventory on affected elements

| Element | WOW Classes | Animate.css Effect | Risk |
|---------|-------------|---------------------|------|
| `<section class="home">` | `wow flash` | Pulses opacity on scroll/load | None — overlay in `background-image` pulses with the element correctly |
| `<h1 class="wow slideInLeft">` | `wow slideInLeft` | Slides from left | None — no structural changes to this element |
| `<h1 class="wow slideInRight">` | `wow slideInRight` | Slides from right | None — text content change only, class preserved |
| `<a class="hero-cta">` (new) | *(none)* | None — static element | None — no WOW class means WOW.js ignores it entirely |

### Inline style preservation

```html
<!-- MUST remain in <head> — do not remove -->
<style>
  .wow:first-child {
    visibility: hidden;
  }
</style>
```

This hides the **first** `.wow` element (the `.home` section) until WOW.js initializes. If removed, the section flashes visible before WOW.js fires. Phase 2 makes no changes to this inline style.

### Confirmed safe operations

- Replacing h1 text content → does not affect WOW.js (WOW targets class names, not text)
- Adding `<a class="hero-cta">` without a `wow` class → WOW.js ignores it completely
- Changing `background-image` to include a gradient → CSS property, invisible to WOW.js
- Adding `justify-content: center` to `.home .container` → layout only, no WOW impact

### One risk to avoid

**Do NOT add `overflow: hidden` to `.home`.** Some centering guides suggest this, but it would clip the `slideInLeft`/`slideInRight` h1 animations as they enter from off-screen. The existing `.home` has no `overflow` set, which allows slide animations to work correctly.

---

## 6. Responsive Breakpoints

### Existing `@media` blocks (from `css/style.css` lines 965–1100)

| Breakpoint | Width | Relevant Rules |
|------------|-------|----------------|
| Tablet | `max-width: 991px` | `.home { background-position: center }` — ensures gym photo is centered on narrower viewport |
| Mobile | `max-width: 767px` | `.home h1 { font-size: 40px }` |
| Small mobile | `max-width: 550px` | `.home h1 { font-size: 30px }` |

**There is no explicit 375px breakpoint.** The 550px block covers 375px devices (375 < 550), so `font-size: 30px` applies at 375px width.

### Header responsive behaviour

No `@media` blocks exist for the header. This is by design — the header is always the mobile sliding panel layout (`.nav` is always `position: fixed; transform: translateX(100%)`). There is no desktop-only nav layout. This is intentional and consistent with the deferred decision to add a desktop horizontal nav in Phase 6 polish.

### Recommended additions for Phase 2

The `.hero-cta` button and sub-headline need responsive sizing. Add inside the existing `@media(max-width: 767px)` block:

```css
@media(max-width: 767px) {
  /* existing rules... */
  .hero-cta {
    font-size: 16px;
    padding: 10px 28px;
  }
}
```

And in the `@media(max-width: 550px)` block (covers 375px):
```css
@media(max-width: 550px) {
  /* existing rules... */
  .hero-cta {
    display: block;
    text-align: center;
    width: fit-content;
  }
}
```

---

## 7. No-Flash-on-Load Analysis

### Current body background

```css
/* css/style.css line 36 */
body {
  background-color: var(--color-bg-primary); /* #0f0f0f — confirmed present in Phase 1 */
}
```

**Status: ✅ Dark background already applied on body.** Phase 1 delivered D-05. No white flash from body background.

### Remaining flash risk vectors

| Risk | Source | Mitigated? |
|------|--------|-----------|
| White body flash before CSS loads | Race condition: HTML renders before stylesheet | ✅ `<link rel="stylesheet" href="css/style.css">` is in `<head>` — CSS is render-blocking, so body color applies before paint |
| White flash from `.home` image loading | `home.jpg` loads async | ✅ Adding `background-color: var(--color-bg-primary)` to `.home` directly as a fallback ensures the dark overlay gradient shows even before the photo loads |
| FOUT (Flash of Unstyled Text) | Bebas Neue / Barlow Condensed load async from Google Fonts | ⚠️ **Not a white flash but a font swap.** `display=swap` parameter in the Google Fonts URL means fallback sans-serif shows first. Not a visual regression risk — standard web font loading behavior. Mitigated by `font-display: swap` being on by default via the `?display=swap` query param. |
| WOW.js pre-init flash | `.home` section visible before WOW fires | ✅ Handled by the existing inline `<style>.wow:first-child { visibility: hidden; }</style>` in `<head>` |

**Action required:** Add `background-color: var(--color-bg-primary)` to `.home` as a fallback so the section is never white even if `home.jpg` is slow to load.

---

## 8. Suggested Task Breakdown

Ordered by logical dependency. Each task is independently committable.

### Task 1 — Update Hero HTML Copy & CTA Element
**Files:** `index.html`
**Changes:**
- First `<h1>`: replace `It's <span>gym</span> time. Let's go` with `Grip <span>Gym</span>`
- Second `<h1>`: replace `We are ready to <span>fit you</span>` with `Grip on Self`
- Add `<a href="#price" class="hero-cta">Join Now</a>` after the second `<h1>`, inside `.home .container`

**Acceptance criteria for HERO-01, HERO-02, HERO-04:**
- [ ] First h1 reads "Grip Gym" with "Gym" in red span
- [ ] Second h1 reads "Grip on Self" (no Lorem Ipsum)
- [ ] CTA element is present in DOM with `href="#price"`
- [ ] Both h1 WOW classes (`slideInLeft`, `slideInRight`) are unchanged

---

### Task 2 — Hero Section Dark Overlay + Centering
**Files:** `css/style.css` — `.home` and `.home .container` blocks

**Changes to `.home`:**
```css
background-image: 
  linear-gradient(rgba(15, 15, 15, 0.65), rgba(15, 15, 15, 0.85)),
  url('../images/home.jpg');
background-color: var(--color-bg-primary); /* fallback */
align-items: center;
```

**Changes to `.home .container`:**
```css
justify-content: center;
gap: 16px;
```

**Changes to `.home h1`:**
```css
color: var(--color-text-on-accent);  /* was #ffffff */
font-weight: var(--fw-bold);          /* was 700 */
```

**Acceptance criteria for HERO-03:**
- [ ] Hero background photo visible but darkened — text legible without any background
- [ ] Hero content is vertically centered in the 100vh section
- [ ] `background-color: var(--color-bg-primary)` present as fallback on `.home`

---

### Task 3 — Add `.hero-cta` CSS
**Files:** `css/style.css` — new rule added in the `/* Home section */` block

**Add:**
```css
.hero-cta {
  display: inline-block;
  padding: 12px 40px;
  background-color: var(--color-primary);
  color: var(--color-text-on-accent);
  font-family: var(--font-heading);
  font-weight: var(--fw-bold);
  font-size: 18px;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border: 2px solid var(--color-primary);
  -webkit-transition: all 0.4s ease;
  transition: all 0.4s ease;
}
.hero-cta:hover {
  background-color: transparent;
  color: var(--color-text-on-accent);
  border-color: var(--color-text-on-accent);
}
```

**Acceptance criteria for HERO-04:**
- [ ] Button is red (`var(--color-primary)`) at rest
- [ ] Button has white text, bold, uppercase, no border-radius
- [ ] Hover state: transparent background, white border, white text
- [ ] Click scrolls to `#price` section

---

### Task 4 — Tokenize Header CSS (Logo + Nav)
**Files:** `css/style.css` — `header .logo a`, `header .nav ul li a`, `header .ham-burger span`

**Changes:**

`header .logo a`:
- `color: #ffffff` → `color: var(--color-text-on-accent)`
- `font-weight: 700` → `font-weight: var(--fw-bold)`
- Add: `font-family: var(--font-heading)` (makes implicit inheritance explicit per D-09)

`header .nav ul li a`:
- `color: #ffffff` → `color: var(--color-text-on-accent)`
- Add: `font-family: var(--font-heading)` (explicit per D-11)
- Add: `letter-spacing: -0.02em` (tightened per D-11)

`header .ham-burger span`:
- `background-color: #ffffff` → `background-color: var(--color-text-base)`

**Acceptance criteria for NAV-01, NAV-02, NAV-03, NAV-04:**
- [ ] Logo reads "GripGym" with "Gym" in red — no visual change expected (font was already inherited)
- [ ] Nav links render in Barlow Condensed
- [ ] Hamburger bars visible against dark header background
- [ ] At 375px: hamburger taps open the sliding nav panel; second tap / nav-link click closes it

---

### Task 5 — Responsive Updates for CTA + Hero
**Files:** `css/style.css` — existing `@media` blocks

**Add inside `@media(max-width: 767px)`:**
```css
.hero-cta {
  font-size: 16px;
  padding: 10px 28px;
}
```

**Add inside `@media(max-width: 550px)`:**
```css
.hero-cta {
  display: block;
  text-align: center;
  width: fit-content;
}
```

**Acceptance criteria:**
- [ ] At 375px viewport, CTA button is legible and fully visible (not clipped)
- [ ] At 375px, hero headlines are readable (`font-size: 30px` from existing rule)

---

## Common Pitfalls

### Pitfall 1: Adding `overflow: hidden` to `.home` for centering
**What goes wrong:** `slideInLeft`/`slideInRight` animations on h1 elements enter from off-screen. `overflow: hidden` clips the slide-in path, making headlines pop rather than slide.
**Prevention:** Never add `overflow: hidden` to `.home`. Use `justify-content: center` on the container instead.

### Pitfall 2: Removing the WOW class from `.home`
**What goes wrong:** The WOW `flash` class on `.home` controls the section's initial visibility via the `.wow:first-child { visibility: hidden }` inline style. Removing `wow` makes the section permanently hidden until something else reveals it.
**Prevention:** Keep all WOW class names intact on all existing elements.

### Pitfall 3: Using a generic `<button>` tag for the CTA
**What goes wrong:** Browser default button styles (grey background, system font, border, padding) will override custom styles unless fully reset. `<a>` tag has no default style baggage.
**Prevention:** Use `<a href="#price" class="hero-cta">` not `<button>`.

### Pitfall 4: Hero content invisible behind overlay pseudo-element
**What goes wrong:** If using `::before` for the overlay with `z-index: 1`, the `.home .container` content will sit beneath it unless explicitly given `position: relative; z-index: 2`.
**Prevention:** Not an issue with the stacked `background-image` approach. This pitfall only applies if someone switches to a pseudo-element approach — avoid it.

### Pitfall 5: `gap` on flex column doesn't work in Safari < 14
**What goes wrong:** `gap` on flex containers was buggy pre-Safari 14. For the no-build static site targeting wide browser support, `margin-bottom` on h1 is safer.
**Prevention:** Use `margin-bottom: 16px` on `.home h1` as an alternative to `gap` on `.home .container`, or use both for redundancy.

---

## Sources

### Primary (HIGH confidence)
- Direct read of `css/style.css` — all selector values and line numbers confirmed
- Direct read of `index.html` — element structure, class names, href values confirmed
- Direct read of `.planning/phases/02-header-navigation-hero/02-CONTEXT.md` — locked decisions

### Secondary (confirmed from Phase 1 artifacts)
- `.planning/phases/01-brand-foundation-design-system/01-CONTEXT.md` — token definitions and what Phase 1 delivered

---

## Metadata

**Confidence breakdown:**
- Header CSS Audit: HIGH — read directly from source file
- Hero CSS Audit: HIGH — read directly from source file
- Overlay technique: HIGH — standard CSS `background-image` layering, no external dependency
- CTA button: HIGH — `.btn` absence confirmed by grep across all selectors in style.css
- WOW.js risks: HIGH — animation class names verified in HTML; Animate.css behavior is well-understood
- Responsive breakpoints: HIGH — all three `@media` blocks read directly
- No-flash analysis: HIGH — `body { background-color }` confirmed present

**Research date:** 2026-07-20
**Valid until:** N/A — all findings from codebase reads, not web research; valid until files change
