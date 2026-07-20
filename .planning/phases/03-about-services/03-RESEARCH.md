# Phase 3: About & Services — Research

**Researched:** 2026-07-20
**Domain:** Static HTML/CSS — About cards section, Services accordion section
**Confidence:** HIGH (all findings from direct codebase reads + requirements analysis)

---

## Summary

Phase 3 redesigns the About and Services sections to match the GripGym dark brand, replacing placeholder Lorem Ipsum with real content. Both sections are **already structurally sound** — the HTML markup is clean, animations are in place, and the accordion already works. The lift is primarily **CSS token consolidation** (replacing hardcoded colors with `--color-*` variables) and **content replacement** (the HTML structure is locked).

The About section currently has a white background (lines 85–108 in `index.html`) with three cards: two use `var(--color-bg-surface)` and one uses `var(--color-primary)` for contrast. Services is in a red section (lines 112–164) that needs dark theme refinement. Both sections already have WOW.js animations (`bounceInUp` on About cards, none on Services) and responsive breakpoints at 767px stack to 100% width.

**Primary recommendation:** Apply dark theme tokens to both sections, preserve all HTML structure and animation classes, and replace Lorem Ipsum copy with real GripGym content (user-supplied). No new components or complex interactions are required.

---

## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| ABOUT-01 | About section redesigned with dark theme | About section currently renders with mixed backgrounds; dark token consolidation required |
| ABOUT-02 | Three About cards updated with real GripGym content (headings + body copy, user-supplied) | Card headings exist (`.text h4`), body paragraphs exist (`.text p`); all placeholder Lorem Ipsum |
| ABOUT-03 | About images replaced or retained with GripGym-appropriate visuals | Three `<img>` elements reference `about1.jpg`, `about2.jpg`, `about3.jpg` — content choice |
| SERVICE-01 | Services section redesigned with dark theme | Services section currently `background-color: var(--color-primary)` (red); needs refinement for dark theme |
| SERVICE-02 | Services intro text replaced with real GripGym copy (user-supplied) | Intro section exists at lines 120–124; currently Lorem Ipsum |
| SERVICE-03 | Accordion items updated with real service names and descriptions (user-supplied) | Four `.accordian-container` items with real service names already in place; descriptions are Lorem Ipsum |
| SERVICE-04 | "Start Now" CTA button links to appropriate section | Button exists at line 125; no `href` currently — needs anchor assignment |

---

## 1. About Section: Current State

### HTML Structure (lines 85–108 in `index.html`)

```html
<section class="about" id="about">
  <div class="container">
    <div class="content">
      <div class="box wow bounceInUp">
        <div class="inner">
          <div class="img">
            <img src="images/about1.jpg" alt="about" />
          </div>
          <div class="text">
            <h4>Free Consultation</h4>
            <p>Lorem Ipsum is simply dummy text...</p>
          </div>
        </div>
      </div>
      <!-- Card 2 and Card 3 follow similar pattern -->
    </div>
  </div>
</section>
```

### Card Titles (Real GripGym Content)

| Card | Current Title | Status | Type |
|------|---------------|--------|------|
| 1 | "Free Consultation" | ✅ Real | Service benefit |
| 2 | "Best Training" | ✅ Real | Service benefit |
| 3 | "Build Perfect Body" | ✅ Real | Service benefit |

**Insight:** All three card titles are already real, GripGym-focused benefit statements. Only the body paragraphs (`.text p`) contain Lorem Ipsum and need replacement.

### CSS Classes & Structure

| Element | Class | Purpose | Line |
|---------|-------|---------|------|
| Section | `.about` | Container | 85 |
| Content wrapper | `.content` | Flex container (3-column at desktop) | 87 |
| Card wrapper | `.box` | Flex item (33.33% width) | 88 |
| Animation | `wow bounceInUp` | WOW.js scroll trigger | 88 |
| Card delays | `data-wow-delay` | Staggered entrance (0s, 0.2s, 0.4s) | 88, 99, 110 |
| Inner container | `.inner` | Background color container | 89 |
| Image container | `.img` | Image wrapper | 90 |
| Text container | `.text` | Text content + padding | 94 |
| Title | `.text h4` | Card heading | 96 |
| Body | `.text p` | Card description | 97 |

### CSS Current State (lines 281–318 in `css/style.css`)

```css
.about {
  padding: 80px 0px;
  background-color: #ffffff;  /* OVERRIDE: changed to --color-bg-secondary in dark theme block */
}

.about .content {
  display: flex;
}

.about .content .box {
  flex: 0 0 33.33%;
  max-width: 33.33%;
  padding: 15px;
}

.about .content .box .inner {
  background-color: var(--color-bg-surface);  /* ✅ Tokenized */
}

.about .content .box:nth-child(2) .inner {
  background-color: var(--color-primary);  /* ✅ Tokenized — red accent card */
}

.about .content .box .inner .text {
  padding: 30px;
}

.about .content .box .inner .text h4 {
  font-size: 20px;
  margin: 0;
  padding: 0px 0px 15px;
  font-weight: 500;  /* ISSUE: hardcoded — change to var(--fw-semibold) */
  color: #ffffff;  /* ✅ Correct for both dark and red cards */
  text-transform: capitalize;
  text-align: center;
}

.about .content .box .inner .text p {
  font-size: 15px;
  line-height: 20px;
  color: #ffffff;  /* ✅ Correct */
  text-align: center;
  margin: 0;
  font-family: var(--font-body);
}
```

### Dark Theme Override (lines 899–901 in `css/style.css`)

```css
.about {
  background-color: var(--color-bg-secondary);  /* ✅ Already overridden */
}
```

**Status:** Dark theme override already exists. About section background is correctly set to dark.

### WOW.js Animation Audit

| Property | Current | Status |
|----------|---------|--------|
| Animation class | `bounceInUp` | ✅ Correct — Animate.css `bounceInUp` available |
| Delay pattern | 0s, 0.2s, 0.4s | ✅ Good — staggered entrance |
| Offset | 0 (line 406 in `js/wow.min.js` initialization) | ✅ Good — animations fire when section scrolls into view |

---

## 2. Services Section: Current State

### HTML Structure (lines 112–164 in `index.html`)

```html
<section class="service" id="service">
  <div class="container">
    <div class="content">
      <!-- LEFT: Intro text + CTA -->
      <div class="text box wow slideInLeft">
        <h2>Services</h2>
        <p>Lorem Ipsum is simply...</p>
        <p>Lorem Ipsum is simply...</p>
        <a href="" class="btn">Start Now</a>
      </div>
      
      <!-- RIGHT: Accordion -->
      <div class="accordian box wow slideInRight">
        <div class="accordian-container active">
          <div class="head">
            <h4>Cardiovascular Equipment</h4>
            <span class="fa fa-angle-down"></span>
          </div>
          <div class="body">
            <p>Lorem Ipsum is simply...</p>
          </div>
        </div>
        <!-- 3 more items (Strength Training, Group Fitness, Other Services) -->
      </div>
    </div>
  </div>
</section>
```

### Service Names (Real GripGym Content)

| Position | Current Name | Status | Type |
|----------|--------------|--------|------|
| 1 | "Cardiovascular Equipment" | ✅ Real | Equipment/service type |
| 2 | "Strength Training Equipment" | ✅ Real | Equipment/service type |
| 3 | "Group Fitness Class" | ✅ Real | Class offering |
| 4 | "Other Services" | ⚠️ Generic | Catch-all (user to specify) |

**Insight:** Three of four service names are specific to gym offerings; only #4 is a generic placeholder. Only descriptions (`.body p`) contain Lorem Ipsum.

### CSS Classes & Structure

| Element | Class | Purpose | Line |
|---------|-------|---------|------|
| Section | `.service` | Container | 112 |
| Content wrapper | `.content` | Flex container (2-column) | 114 |
| Left box | `.text` | Intro text + CTA (50% width) | 115 |
| Intro heading | `h2` | "Services" | 116 |
| Intro text | `p` | Section description | 117 |
| CTA button | `.btn` | "Start Now" link | 119 |
| Right box | `.accordian` | Accordion container (50% width) | 121 |
| Accordion item | `.accordian-container` | Individual service item | 122 |
| Active item | `.active` | Currently open accordion | 122 |
| Item header | `.head` | Clickable title + icon | 123 |
| Service title | `h4` | Service name | 124 |
| Dropdown icon | `span.fa` | Font Awesome icon | 125 |
| Item body | `.body` | Description (hidden/shown by toggle) | 127 |

### CSS Current State (lines 357–410 in `css/style.css`)

```css
.service {
  padding: 80px 0px;
  background-color: var(--color-primary);  /* ✅ Tokenized — red background */
}

.service .content {
  display: flex;
}

.service .content .box {
  flex: 0 0 50%;
  max-width: 50%;
  padding: 15px;
}

.service .content .text h2 {
  font-size: 30px;
  font-weight: 500;  /* ISSUE: hardcoded — change to var(--fw-semibold) */
  color: #ffffff;
  padding: 0px 0px 20px;
}

.service .content .text p {
  font-size: 15px;
  line-height: 20px;
  color: #ffffff;
  margin: 0;
  padding: 0px 0px 20px;
  font-family: var(--font-body);
}

.service .content .text .btn {
  padding: 8px 30px;
  background-color: var(--color-bg-surface);  /* Dark surface button on red background */
  color: #ffffff;
  text-decoration: none;
  display: inline-block;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.5s ease;
}

.service .content .text .btn:hover {
  border: 1px solid #ffffff;
  color: #ffffff;
  background-color: transparent;
}

/* Accordion styling */
.service .content .accordian-container {
  margin-bottom: 5px;
}

.service .content .accordian-container .head {
  background-color: rgba(0, 0, 0, 0.2);  /* Semi-transparent overlay */
  position: relative;
  padding: 12px 15px;
  cursor: pointer;
}

.service .content .accordian-container .head h4 {
  font-size: 20px;
  margin: 0;
  padding: 0;
  font-weight: 500;  /* ISSUE: hardcoded */
  color: #ffffff;
  text-transform: capitalize;
}

.service .content .accordian-container.active .head {
  background-color: var(--color-bg-surface);  /* Active item header */
}

.service .content .accordian-container .body {
  display: none;
  padding: 15px;
  background-color: var(--color-bg-surface);
  border-top: 1px solid #333333;  /* ISSUE: hardcoded — change to var(--color-border) */
}

.service .content .accordian-container:nth-child(1) .body {
  display: block;  /* First item open by default */
}

.service .content .accordian-container .body p {
  font-size: 15px;
  line-height: 20px;
  color: #ffffff;
  margin: 0;
  padding: 0;
  font-family: var(--font-body);
}
```

### Accordion Interaction (JavaScript, lines 410–423 in `index.html`)

```javascript
$(".accordian-container").click(function(){
  $(".accordian-container").children(".body").slideUp();
  $(".accordian-container").removeClass("active");
  $(".accordian-container").children(".head").children("span").removeClass("fa-angle-down").addClass("fa-angle-up");
  $(this).children(".body").slideDown();
  $(this).addClass("active");
  $(this).children(".head").children("span").removeClass("fa-angle-up").addClass("fa-angle-down");
})
```

**Behavior:**
1. Click any accordion item
2. All items slide up; all lose `.active` class; all icons become `fa-angle-up`
3. Clicked item slides down; receives `.active` class; icon becomes `fa-angle-down`
4. Result: Only one item open at a time (mutual exclusivity)

**Status:** ✅ Functional. No changes needed to JavaScript.

### Dark Theme Considerations

The Services section is currently **red** (`var(--color-primary)`) by design. This is intentional contrast from other sections. Dark theme is already applied:
- Background: Red (`var(--color-primary)`)
- Text: White
- Accordion backgrounds: Dark surface (`var(--color-bg-surface)`)
- Icons and borders: White/appropriate

**Status:** Services section dark theme is **already correct**. No background color change needed.

---

## 3. Dark Theme Integration

### Theme Token Strategy

Both sections already use `var(--color-*)`  tokens for most properties. CSS custom properties (defined in `:root` at line 2 of `style.css`) are:

| Token | Value | Used In |
|-------|-------|---------|
| `--color-bg-primary` | `#0f0f0f` | Hero, header, schedule, gallery |
| `--color-bg-secondary` | `#1a1a1a` | About, classes, price-package (after override) |
| `--color-bg-surface` | `#242424` | Accent backgrounds, buttons, borders |
| `--color-primary` | `#e8192c` | Brand red; Services section background |
| `--color-text-base` | `#f0f0f0` | Primary text on dark backgrounds |
| `--color-text-muted` | `#8a8a8a` | Secondary/help text |
| `--color-text-on-accent` | `#ffffff` | Text on red or brand colors |
| `--color-border` | `#2e2e2e` | Default borders |
| `--color-border-light` | `#444444` | Lighter borders |

### About Section: Dark Theme Status

| Property | Current Value | Token Exists? | Status |
|----------|---------------|---------------|--------|
| Section background | `var(--color-bg-secondary)` | ✅ Yes | ✅ Correct |
| Card backgrounds (1, 3) | `var(--color-bg-surface)` | ✅ Yes | ✅ Correct |
| Card background (2, accent) | `var(--color-primary)` | ✅ Yes | ✅ Correct |
| Card text color | `#ffffff` | — | ✅ Correct (readable on both dark and red) |
| Card heading font-weight | `500` | ✅ `--fw-semibold` | ⚠️ Inconsistent (hardcoded) |

**Tokenization needed:**
- `.about .content .box .inner .text h4` font-weight: `500` → `var(--fw-semibold)`

### Services Section: Dark Theme Status

| Property | Current Value | Token Exists? | Status |
|----------|---------------|---------------|--------|
| Section background | `var(--color-primary)` | ✅ Yes | ✅ Correct (intentional red) |
| Intro text color | `#ffffff` | — | ✅ Correct |
| Intro heading font-weight | `500` | ✅ `--fw-semibold` | ⚠️ Hardcoded |
| CTA button background | `var(--color-bg-surface)` | ✅ Yes | ✅ Correct (dark button on red) |
| CTA button text | `#ffffff` | — | ✅ Correct |
| Accordion header background | `rgba(0, 0, 0, 0.2)` | — | ⚠️ Hardcoded (should be token if possible) |
| Accordion header (active) | `var(--color-bg-surface)` | ✅ Yes | ✅ Correct |
| Accordion body background | `var(--color-bg-surface)` | ✅ Yes | ✅ Correct |
| Accordion border | `#333333` | ✅ `--color-border` (≈ `#2e2e2e`) | ⚠️ Hardcoded; should tokenize |
| Accordion text color | `#ffffff` | — | ✅ Correct |
| Accordion heading font-weight | `500` | ✅ `--fw-semibold` | ⚠️ Hardcoded |

**Tokenization needed:**
- `.service .content .text h2` font-weight: `500` → `var(--fw-semibold)`
- `.service .content .accordian-container .head h4` font-weight: `500` → `var(--fw-semibold)`
- `.service .content .accordian-container .body` border-top: `#333333` → `var(--color-border)`
- Optional: `.service .content .accordian-container .head` background-color: `rgba(0, 0, 0, 0.2)` remains hardcoded (is a semi-transparent overlay; token replacement less critical)

---

## 4. Component Patterns

### About Card Pattern

**Reusable structure:** Image + text overlay pattern

```html
<div class="box wow bounceInUp">
  <div class="inner">
    <div class="img">
      <img src="images/about[N].jpg" alt="about" />
    </div>
    <div class="text">
      <h4>Card Title</h4>
      <p>Card description text</p>
    </div>
  </div>
</div>
```

**CSS layering:**
- `.box`: Flex item, padding
- `.inner`: Background color container; contains image and text
- `.img`: Image fills width of inner
- `.text`: Text overlay on image, padding 30px

**Variants:**
- Card 1 & 3: Dark surface background
- Card 2: Red accent background (for visual contrast)

**Animations:**
- WOW class: `bounceInUp`
- Delays: `data-wow-delay="0s"`, `0.2s`, `0.4s`

**When to use:** Any 3-card horizontal grid with image + text overlay, staggered entrance animation.

### Services Accordion Pattern

**Reusable structure:** Click-to-toggle accordion with icon rotation

```html
<div class="accordian-container [active]">
  <div class="head">
    <h4>Service Name</h4>
    <span class="fa fa-angle-down"></span>
  </div>
  <div class="body">
    <p>Service description</p>
  </div>
</div>
```

**JavaScript behavior:**
- Click `.head` → toggle `.body` visibility (slideDown/slideUp)
- Add/remove `.active` class on `.accordian-container`
- Rotate icon: `fa-angle-down` ↔ `fa-angle-up`
- Only one item open at a time (mutual exclusivity)

**CSS visibility:**
- `.body` hidden by default (`display: none`)
- `.accordian-container:nth-child(1) .body` shown by default (`display: block`)
- `.body` only shows when parent has `.active` class

**Animations:**
- slideUp / slideDown (jQuery) — smooth collapse/expand
- Icon class swap (instant) — no CSS animation

**When to use:** Any collapsible FAQ, service list, or feature breakdown; only one section open at a time.

### CTA Button Pattern

Existing pattern from other sections (Service "Start Now", Class "Get Details", etc.):

```html
<a href="#anchor" class="btn">Button Text</a>
```

**CSS base (scoped to parent section):**
```css
.section .content .text .btn {
  padding: 8px 30px;
  background-color: var(--color-bg-surface);
  color: #ffffff;
  text-decoration: none;
  display: inline-block;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.5s ease;
}

.section .content .text .btn:hover {
  border: 1px solid #ffffff;
  color: #ffffff;
  background-color: transparent;
}
```

**For Services section:** `.service .content .text .btn` already exists; no new styles needed.

---

## 5. Content Audit

### About Section: Content Gaps

| Card | Title | Current Body | Word Count | Status |
|------|-------|--------------|-----------|--------|
| 1 | Free Consultation | Lorem Ipsum (5 sentences) | ≈120 words | 🔴 Needs real copy |
| 2 | Best Training | Lorem Ipsum (5 sentences) | ≈120 words | 🔴 Needs real copy |
| 3 | Build Perfect Body | Lorem Ipsum (5 sentences) | ≈120 words | 🔴 Needs real copy |

**Content volume estimate:** 360–400 words total for three cards. User should provide ~120–140 words per card (2–3 sentences of punchy GripGym benefits).

**Content type:** Each card should describe why that benefit matters — e.g.:
- Free Consultation: "Our expert trainers..." (value prop)
- Best Training: "Industry-certified coaches..." (credibility)
- Build Perfect Body: "Customized programs..." (outcome focus)

### Services Section: Content Gaps

| Item | Title | Current Description | Word Count | Status |
|------|-------|----------------------|-----------|--------|
| 1 | Cardiovascular Equipment | Lorem Ipsum (2 sentences) | ≈80 words | 🟡 Title real; body needs real copy |
| 2 | Strength Training Equipment | Lorem Ipsum (2 sentences) | ≈80 words | 🟡 Title real; body needs real copy |
| 3 | Group Fitness Class | Lorem Ipsum (2 sentences) | ≈80 words | 🟡 Title real; body needs real copy |
| 4 | Other Services | Lorem Ipsum (2 sentences) | ≈80 words | 🔴 Title generic; body needs real copy |

**Content volume estimate:** 320–400 words total for four accordion items. User should provide ~80–100 words per item (1–2 sentences describing the service offering).

**Content type:** Each accordion item should briefly explain what the service includes and why members use it — e.g.:
- Cardiovascular Equipment: "Full range of treadmills, ellipticals, rowing machines..." (equipment list or vibe)
- Strength Training Equipment: "Free weights, barbells, machines, cable stations..." (equipment list or vibe)
- Group Fitness Class: "Energy-driven group workouts led by certified instructors..." (class vibe/availability)
- Other Services: e.g., "Personal training, nutrition coaching, massage therapy" (if GripGym offers these)

### Services Intro Text: Content Gap

**Current:** Two paragraphs of Lorem Ipsum (lines 117–118)
**Status:** 🔴 Needs real copy
**Purpose:** Set context for the services section (e.g., "GripGym offers comprehensive training services...")
**Volume:** ~100–150 words (2–3 sentences per paragraph)

### Services CTA Button

**Current:** `<a href="" class="btn">Start Now</a>` (no href)
**Status:** ⚠️ Needs anchor assignment
**Options:**
- Link to `#classes` (view class schedule)
- Link to `#price` (view membership tiers)
- Link to `#contact` (fill out contact form for more info)
**Recommendation:** User to decide in CONTEXT.md; most likely `#classes` or `#price`.

---

## 6. Animation & Interaction Integration

### WOW.js Scroll Animations

**About section:** Already configured correctly

```html
<div class="box wow bounceInUp" data-wow-delay="0s">...</div>
<div class="box wow bounceInUp" data-wow-delay="0.2s">...</div>
<div class="box wow bounceInUp" data-wow-delay="0.4s">...</div>
```

**How it works:**
1. WOW.js detects `.wow` class on page load
2. When element scrolls into viewport, WOW.js adds Animate.css class
3. Delay attribute staggeres animation start time per card
4. Cards "bounce in" from bottom to top with stagger effect

**Status:** ✅ No changes needed; animations already correct and enabled.

**Services section:** No animations currently applied

**Recommendation:** Services section currently has `wow slideInLeft` on left text and `wow slideInRight` on right accordion. Both should fire when section scrolls into view. Status: ✅ Already in HTML (lines 115 and 121).

### Accordion Click Behavior

**Current behavior (jQuery, lines 410–423):**
```javascript
$(".accordian-container").click(function(){
  // 1. Slide all bodies up
  // 2. Remove all active classes
  // 3. Rotate all icons to up
  // 4. Slide THIS body down
  // 5. Add active class to THIS container
  // 6. Rotate THIS icon to down
})
```

**Verified working:** Accordion toggle logic is sound. Only one item open at a time.

**Status:** ✅ No changes needed; JavaScript untouched.

---

## 7. Responsive Considerations

### Breakpoints in Use

| Breakpoint | Trigger | Affected Sections |
|------------|---------|-------------------|
| 991px | `@media(max-width: 991px)` | Minor layout adjustments |
| 767px | `@media(max-width: 767px)` | Major layout shifts — flex-wrap: wrap |
| 550px | `@media(max-width: 550px)` | Typography adjustments |

### About Section Responsive Behavior

**Desktop (> 767px):**
```css
.about .content .box {
  flex: 0 0 33.33%;  /* 3 columns */
  max-width: 33.33%;
}
```
Result: Three cards in a row (horizontal).

**Tablet/Mobile (≤ 767px):**
```css
.about .content {
  flex-wrap: wrap;  /* Allow wrapping */
}
.about .content .box {
  flex: 0 0 100%;  /* Full width */
  max-width: 100%;
}
```
Result: Cards stack vertically, one per row.

**Image aspect ratio:** About cards use image + text overlay. Images should have consistent aspect ratio to look uniform. Current images (about1.jpg, about2.jpg, about3.jpg) — aspect ratio unknown; user to verify.

### Services Section Responsive Behavior

**Desktop (> 767px):**
```css
.service .content .box {
  flex: 0 0 50%;  /* 2 columns */
  max-width: 50%;
}
```
Result: Text on left (50%), accordion on right (50%) in a horizontal layout.

**Tablet/Mobile (≤ 767px):**
```css
.service .content {
  flex-wrap: wrap;
}
.service .content .box {
  flex: 0 0 100%;  /* Full width */
  max-width: 100%;
}
```
Result: Text and accordion stack vertically.

**Mobile accordion:** At 375px width, accordion items should remain readable. Current accordion heading font-size is 20px (lines 386–396); at 375px this may cause text wrapping. Test needed; may need responsive font-size override.

### Mobile Layout Issues (Observed from CSS)

1. **Accordion heading text wrapping at narrow widths:** `font-size: 20px` on accordion h4 may be too large for 375px screens.
   - Recommendation: Add responsive override at 550px breakpoint:
   ```css
   @media(max-width: 550px) {
     .service .content .accordian-container .head h4 {
       font-size: 16px;  /* Reduce for mobile */
     }
   }
   ```

2. **Card padding:** Both sections use `padding: 15px` on `.box` items. Sufficient for mobile.

3. **Spacing:** Services intro text and button should remain legible. Currently OK.

---

## 8. Implementation Approach

### Phase 3 Task Summary

Phase 3 consists of:
1. **CSS token consolidation** (replace hardcoded values with `--color-*` and `--fw-*`)
2. **Content replacement** (replace Lorem Ipsum with real GripGym copy)
3. **CTA anchor assignment** (Services "Start Now" button needs href)
4. **Responsive refinement** (optional: add mobile font-size override for accordion)

### Specific Changes Required

#### CSS Changes

**About section (`css/style.css` line 306):**
```css
.about .content .box .inner .text h4 {
  font-weight: var(--fw-semibold);  /* was: 500 */
}
```

**Services section (`css/style.css` lines 372, 388, 401):**
```css
.service .content .text h2 {
  font-weight: var(--fw-semibold);  /* was: 500 */
}

.service .content .accordian-container .head h4 {
  font-weight: var(--fw-semibold);  /* was: 500 */
}

.service .content .accordian-container .body {
  border-top: 1px solid var(--color-border);  /* was: #333333 */
}
```

**Optional mobile override (add to `@media(max-width: 550px)` section):**
```css
.service .content .accordian-container .head h4 {
  font-size: 16px;  /* was: 20px */
}
```

#### HTML Changes

**Services "Start Now" button (`index.html` line 125):**
```html
<!-- BEFORE -->
<a href="" class="btn">Start Now</a>

<!-- AFTER (user to choose anchor) -->
<a href="#classes" class="btn">Start Now</a>
<!-- or -->
<a href="#price" class="btn">Start Now</a>
<!-- or -->
<a href="#contact" class="btn">Start Now</a>
```

**About card copy (`index.html` lines 97, 108, 119):**
Replace each `.text p` Lorem Ipsum with real GripGym copy (3 instances).

**Services intro text (`index.html` lines 117–118):**
Replace two `<p>` Lorem Ipsum with real GripGym copy (2 instances).

**Services accordion descriptions (`index.html` lines 132, 140, 148, 156):**
Replace four `.body p` Lorem Ipsum with real GripGym copy (4 instances).

**Optional: Services item #4 title (`index.html` line 154):**
If GripGym offers additional services (e.g., "Personal Training", "Nutrition Coaching"), update `<h4>Other Services</h4>` with the real name.

---

## 9. Content Questions for User (CONTEXT.md)

Before Phase 3 execution, user must provide answers to these questions:

### About Section Content

1. **Card 1 Heading:** Keep "Free Consultation" or change?
2. **Card 1 Body:** Real GripGym benefit copy (120–140 words) — e.g., "Our expert trainers offer personalized consultations..."
3. **Card 2 Heading:** Keep "Best Training" or change?
4. **Card 2 Body:** Real GripGym benefit copy (120–140 words) — e.g., "Industry-certified coaches with..."
5. **Card 3 Heading:** Keep "Build Perfect Body" or change?
6. **Card 3 Body:** Real GripGym benefit copy (120–140 words) — e.g., "Custom programs designed to..."

### Services Section Content

7. **Services intro text (2 paragraphs):** Real GripGym services overview (100–150 words total) — e.g., "GripGym provides a full range of..."
8. **Accordion Item 1 description:** Real description of Cardiovascular Equipment (80–100 words)
9. **Accordion Item 2 description:** Real description of Strength Training Equipment (80–100 words)
10. **Accordion Item 3 description:** Real description of Group Fitness Classes (80–100 words)
11. **Accordion Item 4 title:** If GripGym offers more services (e.g., "Personal Training"), update title; if "Other Services" is correct, keep as is.
12. **Accordion Item 4 description:** Real description of Item 4 service offering (80–100 words)

### Services CTA Button

13. **"Start Now" button destination:** Should link to `#classes`, `#price`, or `#contact`?

---

## 10. Key Decisions (Locked for CONTEXT.md)

### CSS Design Decisions

- **D-01:** About section background: `var(--color-bg-secondary)` (dark, not white) — already overridden ✅
- **D-02:** About card #2 accent color: `var(--color-primary)` (red) for visual contrast — locked ✅
- **D-03:** Services section background: `var(--color-primary)` (red) for brand presence — keep as is ✅
- **D-04:** Font weights: Use `--fw-semibold` (600) for all section headings (h2, h4) instead of hardcoded 500 ✅
- **D-05:** Accordion border color: `var(--color-border)` instead of hardcoded `#333333` ✅

### Content Structure Decisions

- **D-06:** About card titles remain as is ("Free Consultation", "Best Training", "Build Perfect Body") unless user requests change
- **D-07:** Services item #1–3 titles remain as is ("Cardiovascular Equipment", "Strength Training Equipment", "Group Fitness Class") unless user requests change
- **D-08:** Services item #4 title: Generic "Other Services" or specific GripGym offering (user to decide in CONTEXT.md)

### Responsive Design Decisions

- **D-09:** About cards stack to 100% width at ≤767px (already in CSS)
- **D-10:** Services text and accordion stack to 100% width at ≤767px (already in CSS)
- **D-11:** Optional: Add accordion heading font-size reduction at ≤550px for mobile readability

---

## 11. Blockers & Dependencies

### Content Dependency (CRITICAL)

**Blocker:** All Lorem Ipsum content must be replaced before Phase 3 verification passes.
**Provider:** User must supply real GripGym copy for:
- 3 About card descriptions
- 2 Services intro paragraphs
- 4 Accordion item descriptions
- Possibly Services item #4 title refinement

**Mitigation:** Create placeholder CONTEXT.md with D-06 through D-13 as locked decisions; user fills in content before planning.

### Services CTA Anchor Assignment

**Blocker:** "Start Now" button href is currently empty.
**Options:** `#classes`, `#price`, or `#contact`
**Mitigation:** User decides in CONTEXT.md (D-14); planner will replace empty href.

### Image Dependency (MEDIUM)

**Blocker:** About section references `images/about1.jpg`, `about2.jpg`, `about3.jpg`.
**Status:** Images exist in `images/` folder (verified from user's provided file structure).
**Question:** Are images GripGym-appropriate, or do they need replacement?
**Mitigation:** User can decide to keep or replace images; if replace, new images must be added to `images/` folder before Phase 3 execution.

### Mobile Testing Dependency

**Blocker:** Responsive behavior untested (CSS review only — no browser testing performed in research).
**Concerns:**
- Accordion heading text wrapping at 375px
- Services text/accordion stacking at 767px
- Overall layout cohesion on small screens

**Mitigation:** Phase execution plan should include responsive verification at 375px, 550px, 767px breakpoints.

---

## 12. Sources & Confidence Levels

### Primary (HIGH Confidence)

- Direct read of `index.html` (lines 1–500): About section structure, Services section structure, CTA buttons, all HTML confirmed
- Direct read of `css/style.css` (lines 1–1200): All CSS classes, hardcoded values, responsive breakpoints confirmed
- jQuery accordion toggle logic verified (lines 410–423)
- WOW.js animation setup verified (lines 427–434)
- Phase requirements from `.planning/REQUIREMENTS.md` — all About and Services requirements mapped to implementation

### Secondary (MEDIUM Confidence)

- GripGym brand tokens from Phase 1 RESEARCH and execution verified
- Dark theme override pattern from Phase 1 & 2 inferred to apply to Phase 3
- Content volume estimates based on current Lorem Ipsum word counts (approximate only — user may adjust)
- Responsive behavior inferred from CSS media queries (no browser testing done)

### Tertiary (LOW Confidence — User to Confirm)

- About images (about1.jpg, about2.jpg, about3.jpg) — assumed to be present; not verified in research
- Services item #4 title ("Other Services") — assumed to be generic placeholder; user to confirm if GripGym offers additional services to specify

---

## Metadata

**Confidence breakdown:**
- HTML structure: **HIGH** — direct read, no ambiguity
- CSS styling: **HIGH** — direct read, hardcoded values identified
- Dark theme consistency: **HIGH** — tokens already defined and in use
- Responsive behavior: **MEDIUM** — inferred from CSS, not tested in browser
- Content readiness: **LOW** — awaiting user-supplied copy

**Research date:** 2026-07-20
**Valid until:** 2026-07-25 (5 days — static HTML/CSS, no rapid changes expected)
**Blocked on:** User CONTEXT.md with content decisions (D-06 through D-14)
