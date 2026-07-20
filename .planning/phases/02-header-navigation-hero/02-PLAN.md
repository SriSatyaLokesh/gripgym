# Phase 2 Plan: Header, Navigation & Hero

**Goal:** First impression is GripGym-branded, dark, and bold — visitor knows immediately what site they're on.
**Granularity:** standard
**Requirements covered:** NAV-01, NAV-02, NAV-03, NAV-04, HERO-01, HERO-02, HERO-03, HERO-04
**Total tasks:** 5

---

## Tasks

### Task 02-01: Replace hero HTML copy and add CTA anchor
**File:** `index.html`
**Requirements satisfied:** HERO-01, HERO-02, HERO-04

**What to change:**

Inside `<section class="home wow flash" id="home">` → `<div class="container">`, replace the two existing `<h1>` elements and add a CTA anchor below them. Preserve every class on every element exactly as-is (per D-15, D-17).

Current state:
```html
<h1 class="wow slideInLeft" data-wow-delay="1s">It's <span>gym</span> time. Let's go</h1>
<h1 class="wow slideInRight" data-wow-delay="1s">We are ready to <span>fit you</span></h1>
```

Replace with:
```html
<h1 class="wow slideInLeft" data-wow-delay="1s">Grip<span>Gym</span></h1>
<h1 class="wow slideInRight" data-wow-delay="1s">Grip on Self</h1>
<a href="#price" class="hero-cta wow slideInLeft" data-wow-delay="1.5s">Join Now</a>
```

Rules:
- `data-wow-delay` values stay as-is on the `<h1>` elements (per D-17).
- The `.hero-cta` anchor gets a staggered `data-wow-delay="1.5s"` so it appears after the headlines without blocking them.
- Second `<h1>` keeps no `<span>` — "Grip on Self" is plain (per D-02; no accent color needed on sub-headline).
- Do NOT remove or alter the `.go-down` anchor that follows the container.

**Acceptance Criteria:**
- [ ] First h1 reads exactly `Grip<span>Gym</span>` with all existing classes/attributes intact
- [ ] Second h1 reads exactly `Grip on Self` with all existing classes/attributes intact
- [ ] `<a href="#price" class="hero-cta wow slideInLeft" data-wow-delay="1.5s">Join Now</a>` is present inside `.home .container`, after the second h1
- [ ] `.go-down` anchor is still present and unchanged
- [ ] No `wow`, `slideInLeft`, `slideInRight`, or `flash` class has been removed from any element

**Commit message:** `feat(02-01): replace hero copy and add CTA anchor`

---

### Task 02-02: Hero overlay, flex centering, and background fallback CSS
**File:** `css/style.css`
**Requirements satisfied:** HERO-03, HERO-04 (partial — layout groundwork for CTA visibility)

**What to change:**

Target selector: `.home` (line 185 region, `/*Home section*/` block).

1. **Replace `background-image`** — change the plain `url()` to a stacked gradient:

   Current:
   ```css
   background-image: url('../images/home.jpg');
   ```
   Replace with:
   ```css
   background-image: linear-gradient(rgba(15,15,15,0.65), rgba(15,15,15,0.85)), url('../images/home.jpg');
   background-color: var(--color-bg-primary);
   ```
   Add `background-color` on the line immediately after `background-image`. This is the D-05 no-flash fallback for when the image hasn't loaded yet.

2. **Add `align-items: center`** — per D-04, hero content must be vertically centered. Add it to the `.home` rule (after `display: flex;`):

   ```css
   align-items: center;
   ```

3. **Add `justify-content: center` to `.home .container`** (line 219 region). The container already has `display: flex; flex-direction: column; flex-grow: 1;`. Add:

   ```css
   justify-content: center;
   align-items: flex-start;
   ```
   `justify-content: center` vertically centers the stacked h1/h1/cta group within the container column. `align-items: flex-start` keeps the button left-aligned (prevents `inline-block` elements from stretching to full width).

Rules:
- Do NOT remove `background-size: cover` or `background-position` declarations.
- Do NOT touch the `.home .go-down` or `@keyframes goDown` rules.
- The `padding: 15px` on `.home` stays as-is.

**Acceptance Criteria:**
- [ ] `.home` `background-image` value starts with `linear-gradient(rgba(15,15,15,0.65), rgba(15,15,15,0.85)),` followed by the original `url()`
- [ ] `.home` has `background-color: var(--color-bg-primary)`
- [ ] `.home` has `align-items: center`
- [ ] `.home .container` has `justify-content: center`
- [ ] `background-size: cover` is still present on `.home`
- [ ] Opening the site in a browser shows the gym photo is still visible under a dark tint

**Commit message:** `style(02-02): add hero overlay gradient, flex centering, background fallback`

---

### Task 02-03: Tokenize hero h1 CSS and set container gap
**File:** `css/style.css`
**Requirements satisfied:** HERO-01, HERO-02, HERO-03

**What to change:**

Target selectors: `.home h1` (line 226 region) and `.home .container` (line 219 region).

1. **Tokenize `.home h1` color and font-weight:**

   Current:
   ```css
   .home h1{
       color:#ffffff;
       font-size: 60px;
       font-weight: 700;
       text-transform: uppercase;
       margin:0;
       font-family: var(--font-display);
   }
   ```
   Change to:
   ```css
   .home h1{
       color: var(--color-text-on-accent);
       font-size: 60px;
       font-weight: var(--fw-bold);
       text-transform: uppercase;
       margin:0;
       font-family: var(--font-display);
   }
   ```
   Only `color` and `font-weight` change. `font-family`, `font-size`, `text-transform`, and `margin` are untouched.

2. **Add `gap` to `.home .container`** to space the two h1 elements and the CTA anchor apart. Add `gap: 12px;` to the `.home .container` rule (after the existing `flex-direction: column;` line):

   ```css
   gap: 12px;
   ```
   This gives uniform vertical spacing between h1 #1, h1 #2, and the `.hero-cta` button without needing per-element margins.

3. **Add `text-shadow` to `.home h1`** (Claude's discretion — improves legibility over the photo):
   Add after `margin:0;`:
   ```css
   text-shadow: 0 2px 8px rgba(0,0,0,0.6);
   ```

Rules:
- `.home h1 span` rule (line 235 region) stays unchanged — `color: var(--color-primary)` is already correct.
- Do NOT alter the responsive `.home h1` overrides at `max-width: 767px` or `max-width: 550px`.

**Acceptance Criteria:**
- [ ] `.home h1` `color` is `var(--color-text-on-accent)` (no hardcoded `#ffffff`)
- [ ] `.home h1` `font-weight` is `var(--fw-bold)` (no hardcoded `700`)
- [ ] `.home .container` has `gap: 12px`
- [ ] `.home h1 span` `color` is still `var(--color-primary)` and is otherwise unchanged
- [ ] Hero headlines are visually separated from each other and from the CTA button in the browser

**Commit message:** `style(02-03): tokenize hero h1 color/weight, add container gap`

---

### Task 02-04: Add .hero-cta CSS class with hover state
**File:** `css/style.css`
**Requirements satisfied:** HERO-04

**What to change:**

No reusable `.btn` class is scoped broadly enough to inherit here — all existing `.btn` rules are nested under their section selectors. Add a new standalone `.hero-cta` rule block immediately after the `.home h1 span` rule (after line 238 region, still within the `/*Home section*/` block).

Add the following two rule blocks:

```css
.hero-cta{
    display: inline-block;
    padding: 12px 32px;
    background-color: var(--color-primary);
    color: var(--color-text-on-accent);
    font-family: var(--font-heading);
    font-size: 18px;
    font-weight: var(--fw-bold);
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border: 2px solid var(--color-primary);
    border-radius: 0;
    margin-top: 8px;
    -webkit-transition: background-color .3s ease, color .3s ease, border-color .3s ease;
    transition: background-color .3s ease, color .3s ease, border-color .3s ease;
}
.hero-cta:hover{
    background-color: transparent;
    color: var(--color-text-on-accent);
    border-color: var(--color-text-on-accent);
}
```

Design intent notes:
- `border-radius: 0` enforces the squared/boxy look per D-07.
- Base state: solid red background per D-07 — uses `var(--color-primary)` for both `background-color` and `border-color` so hover transition is seamless.
- Hover state: transparent background + white border + white text per D-08. `border-color: #ffffff` is explicit white because no token for hover-border exists.
- `font-family: var(--font-heading)` makes the CTA consistent with nav links.
- `display: inline-block` keeps the button naturally sized by its content — does not stretch to full column width.

Rules:
- Do NOT modify any existing `.btn` rule.
- Place these rules within the `/*Home section*/` block so they stay co-located with `.home` rules.
- **Also add responsive overrides** in the existing `@media(max-width: 767px)` block:
  ```css
  .hero-cta{ font-size: 16px; padding: 10px 28px; }
  ```
  And in `@media(max-width: 550px)` block:
  ```css
  .hero-cta{ display: block; width: fit-content; text-align: center; }
  ```

**Acceptance Criteria:**
- [ ] `.hero-cta` rule exists in `css/style.css` with `background-color: var(--color-primary)`, `border-radius: 0`, and `color: var(--color-text-on-accent)`
- [ ] `.hero-cta:hover` rule exists with `background-color: transparent` and `border-color: var(--color-text-on-accent)`
- [ ] Responsive `.hero-cta` overrides added in `@media(max-width: 767px)` and `@media(max-width: 550px)` blocks
- [ ] CTA button renders visually as a solid red rectangle in the browser
- [ ] Hovering the button reveals transparent background with white border
- [ ] No existing `.btn` rule has been modified

**Commit message:** `style(02-04): add .hero-cta class with hover state`

---

### Task 02-05: Tokenize header CSS — logo, nav links, hamburger
**File:** `css/style.css`
**Requirements satisfied:** NAV-01, NAV-02, NAV-03, NAV-04

**What to change:**

Three targeted edits within the `header` rules (lines 72–180 region):

**Edit A — `header .logo a` (line 76 region):**

Current:
```css
header .logo a{
    font-size: 30px;
    text-decoration: none;
    color:#ffffff;
    font-weight: 700;
}
```
Replace with:
```css
header .logo a{
    font-size: 30px;
    text-decoration: none;
    color: var(--color-text-on-accent);
    font-weight: var(--fw-bold);
    font-family: var(--font-heading);
}
```
Changes: `color` tokenized, `font-weight` tokenized, `font-family` added explicitly per D-09. `font-size` and `text-decoration` unchanged.

**Edit B — `header .nav ul li a` (line 111 region):**

Current:
```css
header .nav ul li a{
    text-decoration: none;
    font-size: 30px;
    font-weight: 400;
    color:#ffffff;
    display: block;
    position: relative;
    padding:10px 30px;
}
```
Replace with:
```css
header .nav ul li a{
    text-decoration: none;
    font-size: 30px;
    font-weight: var(--fw-semibold);
    color: var(--color-text-on-accent);
    font-family: var(--font-heading);
    letter-spacing: -0.02em;
    display: block;
    position: relative;
    padding:10px 30px;
}
```
Changes: `color` tokenized, `font-weight` upgraded to `var(--fw-semibold)` (600) for visual punch, `font-family` added explicitly, `letter-spacing` added per D-11. `font-size`, `display`, `position`, `padding` unchanged.

**Edit C — `header .ham-burger span` (line 154 region):**

Current:
```css
header .ham-burger span{
    height: 3px;
    margin-bottom:8px;
    display: block;
    background-color:#ffffff;
    width:30px;
    ...
}
```
Replace `background-color:#ffffff;` with `background-color: var(--color-text-base);` per D-12. All other properties unchanged.

Rules:
- Do NOT touch `.logo a span` — `color: var(--color-primary)` is already correct.
- Do NOT touch `.nav` background — stays `var(--color-primary)` per D-10.
- Do NOT touch `.ham-burger.active span` transform rules.
- Do NOT change `.nav ul li a::before`, `.nav ul li a.active::before`, or `:hover::before` rules.

**Acceptance Criteria:**
- [ ] `header .logo a` `color` is `var(--color-text-on-accent)`, `font-weight` is `var(--fw-bold)`, `font-family: var(--font-heading)` is present
- [ ] `header .nav ul li a` `color` is `var(--color-text-on-accent)`, has `font-family: var(--font-heading)`, has `letter-spacing: -0.02em`
- [ ] `header .ham-burger span` `background-color` is `var(--color-text-base)` (no hardcoded `#ffffff`)
- [ ] Nav panel `background-color` is still `var(--color-primary)` (red)
- [ ] Hamburger menu opens and closes correctly when tested at 375px viewport width
- [ ] `grep -n '#ffffff' css/style.css` shows no remaining `#ffffff` hits inside the `header` block

**Commit message:** `style(02-05): tokenize header logo, nav links, hamburger to CSS tokens`

---

## Verification Checklist

- [ ] **SC-1 (NAV-01/NAV-03):** Logo displays "GripGym" in Barlow Condensed, white text — `font-family: var(--font-heading)` and `color: var(--color-text-on-accent)` confirmed in DevTools computed styles
- [ ] **SC-2 (NAV-04):** At 375px viewport, hamburger icon shows white lines, tap opens red slide-in nav panel, nav links render in Barlow Condensed, tap on link closes panel
- [ ] **SC-3 (HERO-01/HERO-02):** Hero section shows "Grip Gym" as headline and "Grip on Self" as sub-headline, both in Bebas Neue uppercase
- [ ] **SC-4 (HERO-03):** Gym photo is visible but darkened by gradient overlay; both h1 elements are legible without needing to squint
- [ ] **SC-5 (HERO-04):** "Join Now" button is visible below the headlines, renders as a solid red rectangle, clicking it scrolls to the `#price` section
- [ ] **SC-6 (HERO-04 hover):** Hovering the "Join Now" button transitions to transparent background with white outline and white text
- [ ] **SC-7 (D-17):** WOW.js entrance animations fire — headline 1 slides in from left, headline 2 slides in from right, hero section flashes on page load

---

## Threat Model

### What Could Go Wrong

| Risk | Task | Mitigation |
|------|------|------------|
| Gradient breaks WOW `flash` animation on `.home` | 02-02 | Apply gradient only via `background-image` stacking, not a `::before` overlay — the `flash` WOW animation targets opacity, not pseudo-elements; stacking in `background-image` is safe |
| `align-items: center` vertically miscenters if `.home` height calc is off | 02-02 | `.home` has `height: 100vh` which is absolute — flex centering inside a fixed viewport height is predictable |
| CTA anchor steals `wow slideInLeft` animation slot intended for h1 | 02-01 | Staggered `data-wow-delay="1.5s"` on `.hero-cta` means it animates 0.5s after the h1 elements — no visual collision |
| `.hero-cta` `display: inline-block` wraps awkwardly at narrow widths | 02-04 | Add `max-width: 100%` in responsive block if needed — button text "Join Now" is short (8 chars) and won't wrap at any realistic mobile width |
| Hardcoded `#ffffff` left in header after tokenization | 02-05 | Acceptance criterion mandates `grep -n '#ffffff' css/style.css` scan for remaining hits in the header block before committing |
| Editing wrong `.home h1` responsive override | 02-03 | Only the base `.home h1` rule (outside all `@media` blocks) is modified; responsive overrides at 767px and 550px are untouched |

---

## Canonical Refs

- `.planning/REQUIREMENTS.md` — NAV-01 through NAV-04 and HERO-01 through HERO-04 requirement definitions
- `.planning/phases/01-brand-foundation-design-system/01-CONTEXT.md` — locked design tokens (CSS custom properties defined in Phase 1)
- `.planning/phases/02-header-navigation-hero/02-CONTEXT.md` — Phase 2 locked decisions D-01 through D-18
- `.planning/phases/02-header-navigation-hero/02-RESEARCH.md` — technical audit of `css/style.css` lines 60–180 and hero HTML
- `index.html` — HTML to modify (Tasks 02-01)
- `css/style.css` — CSS to modify (Tasks 02-02, 02-03, 02-04, 02-05)
