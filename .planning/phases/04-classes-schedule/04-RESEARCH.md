# Phase 4: Classes & Schedule — Research

**Researched:** 2026-07-20
**Domain:** Static HTML/CSS — Classes cards section, Schedule timetable section
**Confidence:** HIGH (all findings from direct codebase reads + requirements analysis)

---

## Summary

Phase 4 redesigns the Classes and Schedule sections to display real GripGym class offerings and weekly timetable. Both sections **exist structurally** and are **already animated** with WOW.js, but contain placeholder Lorem Ipsum content and require dark theme visual refinement.

The **Classes section** currently displays 2 class cards (lines 159–199 in `index.html`) with alternating layouts and fixed price tags. Cards use `var(--color-bg-surface)` and `var(--color-primary)` backgrounds with white text — already dark theme compatible. The section has a white background (`.classes { background-color: #ffffff }` at line 424 in `css/style.css`) that **must be darkened** to match the brand. Card text is all Lorem Ipsum and needs replacement with real trainer names, class names, and descriptions. Currently **only 2 cards exist**; requirements specify **minimum 4 cards**.

The **Schedule section** uses a 6-day table (Mon–Sat, lines 217–282 in `index.html`) with 4 columns: Day, Time, Class+Duration, Room. The table has basic dark styling with alternating row backgrounds using `--color-bg-surface` and `--color-border-light`. At desktop, the table renders at full width inside a flex container (50% box width at lines 603–631 in `css/style.css`). **Responsive issue identified:** at 767px breakpoint, the `.schedule .content` stacks but the table remains full-width with no mobile-friendly reformatting. At 375px viewport, table text will be cramped. The schedule is **hardcoded with Lorem Ipsum** (all days show "9:00 AM" and "Body Building") and needs real GripGym class data.

**Primary recommendation:** 

1. **Classes section:** Darken section background to `--color-bg-secondary`, expand to 4+ cards following the alternating pattern, tokenize hardcoded colors, replace all card copy with real trainer/class names and descriptions.

2. **Schedule section:** Replace placeholder data with real GripGym weekly schedule. Add mobile table strategy (options: horizontal scroll, collapsible rows, or card-based layout at 767px breakpoint) to ensure readability at 375px. Verify animations fire correctly on table.

3. **Dark theme:** Both sections are **structurally ready** for dark theme; the lift is mostly content + background color + mobile responsiveness.

---

## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| CLASSES-01 | Classes section redesigned with dark background | Section currently `background-color: #ffffff` (line 424); must change to `--color-bg-secondary` |
| CLASSES-02 | Class cards contain real trainer names, class names, descriptions | 2 cards exist with Lorem Ipsum; need 4+ cards with real content (user-supplied) |
| SCHEDULE-01 | Schedule section displays real weekly timetable | 6-day table exists with placeholder "Body Building 9:00 AM"; needs real GripGym class data (user-supplied) |
| SCHEDULE-02 | Schedule readable at 375px mobile viewport | Table currently has no mobile-specific styling; stacking at 767px but table remains full-width; mobile strategy required |

---

## 1. Classes Section: Current State

### HTML Structure (lines 159–199 in `index.html`)

```html
<section class="classes" id="classes">
  <div class="container">
    <div class="content">
      <div class="box img wow slideInLeft">
        <img src="images/class2.png" alt="classes" />
      </div>
      <div class="box text wow slideInRight">
        <h2>Our Classes</h2>
        <p>Lorem Ipsum is simply dummy text...</p>
        <div class="class-items">
          <!-- Card 1 -->
          <div class="item wow bounceInUp">
            <div class="item-img">
              <img src="images/class1.jpg" alt="classes" />
              <div class="price">$99</div>
            </div>
            <div class="item-text">
              <h4>Stretching Training</h4>
              <p>Lorem Ipsum is simply dummy text...</p>
              <a href="">Get Details</a>
            </div>
          </div>
          
          <!-- Card 2: alternating layout -->
          <div class="item wow bounceInUp">
            <div class="item-text">
              <h4>Stretching Training</h4>
              <p>Lorem Ipsum is simply dummy text...</p>
              <a href="">Get Details</a>
            </div>
            <div class="item-img">
              <img src="images/class1.jpg" alt="classes" />
              <div class="price">$99</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

### Current Issues & Observations

| Issue | Location | Impact | Priority |
|-------|----------|--------|----------|
| Section background is white | `.classes { background-color: #ffffff }` line 424 | Inconsistent with dark theme; CLASSES-01 requirement | CRITICAL |
| Only 2 class cards exist | Lines 171–199 | Requirement specifies 4+ cards; CLASSES-02 requirement | CRITICAL |
| All card text is Lorem Ipsum | Card h4 and p tags | Needs real trainer names, class descriptions; CLASSES-02 requirement | CRITICAL |
| Hardcoded price in HTML | `<div class="price">$99</div>` | Should be pulled from real data or user-supplied per class | MEDIUM |
| No trainer information | Cards lack trainer name/specialty/image | CLASSES-02 specifies "trainer names"; current card structure doesn't include this | MEDIUM |
| Card images are placeholder | `images/class1.jpg` used for both cards | Phase 4 will use real class images (decision pending) | LOW |

### CSS Classes & Structure

| Element | Class | Purpose | Line |
|---------|-------|---------|------|
| Section | `.classes` | Container | 424 |
| Content wrapper | `.content` | Flex (50/50 split: image left, text right) | 429 |
| Image box | `.box.img` | Image wrapper with 50% flex | 434 |
| Text box | `.box.text` | Content wrapper with 50% flex | 434 |
| Cards container | `.class-items` | Flex column for card list | — |
| Card | `.item` | Individual class card | 463 |
| Card layout alt 1 | `.item:nth-child(1)` | Image-first layout | 467 |
| Card layout alt 2 | `.item:nth-child(2)` | Text-first layout | 470 |
| Card backgrounds | `.item:nth-child(1)`, `.item:nth-child(2)` | Surface & Primary colors | 467, 470 |
| Image container | `.item-img` | Image wrapper (50% flex) | 480 |
| Text container | `.item-text` | Text wrapper (50% flex) | 480 |
| Price tag | `.item-img .price` | Absolute-positioned price badge | 490 |

### CSS Current State (lines 424–540 in `css/style.css`)

```css
.classes {
  padding: 80px 0px 50px;
  background-color: #ffffff;  /* ❌ ISSUE: White background, not dark */
}

.classes .content {
  display: flex;
}

.classes .content .box {
  padding: 15px;
  flex: 0 0 50%;
  max-width: 50%;
}

.classes .content .class-items .item {
  margin-bottom: 30px;
  display: flex;
}

.classes .content .class-items .item:nth-child(1) {
  background-color: var(--color-bg-surface);  /* ✅ Tokenized */
}

.classes .content .class-items .item:nth-child(2) {
  background-color: var(--color-primary);  /* ✅ Tokenized */
}

.classes .content .class-items .item .item-text {
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.classes .content .class-items .item .item-text,
.classes .content .class-items .item .item-img {
  flex: 0 0 50%;
  max-width: 50%;
  position: relative;
}

.classes .content .class-items .item .item-img img {
  width: 100%;
  display: block;
}

.classes .content .class-items .item .item-img .price {
  position: absolute;
  height: 50px;
  width: 60px;
  font-size: 20px;
  font-weight: 500;  /* ⚠️ Hardcoded: should be var(--fw-semibold) */
  color: #ffffff;
  text-align: center;
  line-height: 50px;
}

.classes .content .class-items .item:nth-child(1) .item-img .price {
  background-color: var(--color-primary);
  left: 0;
  top: 0;
}

.classes .content .class-items .item:nth-child(2) .item-img .price {
  background-color: var(--color-bg-surface);
  right: 0;
  top: 0;
}

.classes .content .class-items .item .item-text h4 {
  font-size: 20px;
  margin: 0;
  padding: 0px 0px 15px;
  font-weight: 500;  /* ⚠️ Hardcoded: should be var(--fw-semibold) */
  color: #ffffff;
  text-transform: capitalize;
  text-align: left;
}

.classes .content .class-items .item .item-text p {
  font-size: 15px;
  line-height: 20px;
  color: #ffffff;
  text-align: left;
  margin: 0;
  padding: 0 0 20px;
  font-family: var(--font-body);
}

.classes .content .class-items .item .item-text a {
  color: #ffffff;
  font-size: 16px;
  text-decoration: none;
  display: inline-block;
}
```

### WOW.js Animation Audit

| Property | Current | Status |
|----------|---------|--------|
| Section animation | `wow slideInLeft` / `slideInRight` (image / text boxes) | ✅ Correct — outer containers animate |
| Card animation | `wow bounceInUp` (each `.item`) | ✅ Correct — individual cards bounce in |
| Card delays | Implicit (no `data-wow-delay` set per card) | ⚠️ Cards animate simultaneously; could add stagger |
| Offset | 0 (global WOW init) | ✅ Good — animations fire when section enters viewport |

**Note:** Cards currently animate together. To add staggered entrance (e.g., 0s, 0.1s, 0.2s, 0.3s per card), add `data-wow-delay="Xs"` to HTML. Not required but improves perception.

---

## 2. Schedule Section: Current State

### HTML Structure (lines 202–287 in `index.html`)

```html
<section class="schedule" id="schedule">
  <div class="container">
    <div class="content">
      <div class="box text wow slideInLeft">
        <h2>Classes Schedule</h2>
        <p>Lorem Ipsum is simply dummy text...</p>
        <img src="images/schedule1.png" alt="schedule" />
      </div>
      <div class="box timing wow slideInRight">
        <table class="table">
          <tbody>
            <tr>
              <td class="day">Monday</td>
              <td><strong>9:00 AM</strong></td>
              <td>Body Building <br/> 9:00 to 10:00 AM</td>
              <td>Room No:210</td>
            </tr>
            <!-- Similar rows for Tue–Sat -->
          </tbody>
        </table>
      </div>
    </div>
  </div>
</section>
```

### Schedule Data Volume

| Property | Current State | Gap |
|----------|---------------|-----|
| Days | 6 (Mon–Sat) | Requirement: "full week" = 7 days; Sunday missing |
| Classes per day | 1 per day | Requirement: real GripGym schedule likely has multiple classes per day |
| Columns | 4 (Day, Time, Class+Duration, Room) | Adequate for single-class-per-day view; multi-class days need restructuring |
| Sample data | All days show "9:00 AM Body Building" | ❌ Placeholder; needs real GripGym schedule (user-supplied) |

### CSS Current State (lines 559–637 in `css/style.css`)

```css
.schedule {
  padding: 80px 0px;  /* ⚠️ Note: no background-color defined; inherits body dark bg */
}

.schedule .content {
  display: flex;
}

.schedule .content .box {
  flex: 0 0 50%;
  max-width: 100%;  /* ⚠️ BUG: should be 50%, not 100% */
  padding: 15px;
}

.schedule .content .text h2 {
  font-size: 30px;
  font-weight: 500;  /* ⚠️ Hardcoded: should be var(--fw-semibold) */
  color: var(--color-text-base);
  padding: 0px 0px 20px;
}

.schedule .content .text p {
  font-size: 15px;
  line-height: 20px;
  color: var(--color-text-muted);
  margin: 0;
  padding: 0px 0px 20px;
  font-family: var(--font-body);
}

.schedule .content .text img {
  width: 100%;
  transform: rotateY(180deg);
}

.schedule .content .timing .table {
  width: 100%;
  border-collapse: collapse;
}

.schedule .content .timing .table td {
  border: 1px solid var(--color-border);
  padding: 8px;
  font-size: 15px;
  text-align: center;
  color: var(--color-text-base);
}

.schedule .content .timing .table tr:nth-child(even) td.day {
  background-color: var(--color-bg-surface);
}

.schedule .content .timing .table tr:nth-child(odd) td.day {
  background-color: var(--color-border-light);
}

.schedule .content .timing .table tr:nth-child(1) td.day {
  background-color: var(--color-primary);
}

.schedule .content .timing .table tr td.day {
  color: #ffffff;
  border-color: transparent;
}
```

### Current Issues & Observations

| Issue | Location | Impact | Priority |
|-------|----------|--------|----------|
| No mobile table strategy | Table has no `@media` rules | At 375px, table columns compress and become unreadable; SCHEDULE-02 requirement | CRITICAL |
| Only 6 days (Mon–Sat) | Lines 217–282 | Sunday missing; requirement says "full week"; SCHEDULE-01 requirement | HIGH |
| All data is placeholder | Every row shows "9:00 AM Body Building Room 210" | Needs real GripGym schedule (user-supplied); SCHEDULE-01 requirement | CRITICAL |
| No multi-class support | Single row per day | Real schedule likely has 2+ classes per day (e.g., Morning, Afternoon, Evening); table structure may need rework | MEDIUM |
| CSS bug: `.box { max-width: 100% }` | Line 603 | Should be 50%; text and timing boxes both render full-width at desktop, breaking 50/50 layout | HIGH |
| Hardcoded font weight | `font-weight: 500` lines 617, 626 | Should use `var(--fw-semibold)` for consistency | LOW |

### Table Responsiveness at Breakpoints

| Breakpoint | Current Behavior | Expected Behavior | Gap |
|------------|------------------|-------------------|-----|
| Desktop (1200px+) | Table in 50% flex box; columns visible | ✅ Works | — |
| Tablet (991px) | Content wraps to 100% (line 1007); table remains full-width | ✅ Works | — |
| Mobile (767px) | `.schedule .content { flex-wrap: wrap }` (line 1062); boxes stack 100% | ⚠️ Table full-width but viewport cramped | Needs reformatting |
| Small mobile (550px) | No special table rules | ❌ Table unreadable (4 columns × 30px each = 120px, but 375px viewport has ~360px usable) | CRITICAL |
| Smallest (375px) | No special table rules | ❌ Table text cramped, horizontal scroll required | CRITICAL |

**Observation:** Mobile media queries (lines 1017–1083 and 1085+) don't include table-specific rules. Table stacking or reformatting must be added for 767px and below.

---

## 3. Dark Theme Integration

### Color Tokens Applied to Classes/Schedule

Both sections **already use the Phase 1 color tokens** in most places:

| Element | Token | Value | Status |
|---------|-------|-------|--------|
| Section background (Schedule) | None defined | Inherits body `--color-bg-primary` | ✅ Correct |
| Section background (Classes) | Hardcoded | `#ffffff` | ❌ Must change to `--color-bg-secondary` |
| Card backgrounds (Classes) | `--color-bg-surface`, `--color-primary` | `#242424`, `#e8192c` | ✅ Tokenized |
| Table alternate rows | `--color-bg-surface`, `--color-border-light` | `#242424`, `#444444` | ✅ Tokenized |
| Table day column | `--color-primary` | `#e8192c` | ✅ Tokenized |
| Text on dark | `#ffffff` | White | ✅ Correct |
| Text muted | `--color-text-muted` | `#8a8a8a` | ✅ Tokenized (Schedule) |

### Hardcoded Values to Tokenize

| Location | Current | Should Be | File | Line |
|----------|---------|-----------|------|------|
| Classes card h4 font-weight | `500` | `var(--fw-semibold)` | css/style.css | 510 |
| Classes price font-weight | `500` | `var(--fw-semibold)` | css/style.css | 495 |
| Schedule h2 font-weight | `500` | `var(--fw-semibold)` | css/style.css | 617 |
| Schedule .text p color | `#8a8a8a` (should use token) | `var(--color-text-muted)` | css/style.css | 626 |

---

## 4. Component Patterns

### Classes Card Pattern: Alternating Layout

The Classes section uses a clever **alternating flexbox pattern** where odd and even cards swap image/text positions:

```
Card 1:  [Image (left)] [Text (right)]
Card 2:  [Text (left)] [Image (right)]
Card 3:  [Image (left)] [Text (right)]  ← would alternate if added
Card 4:  [Text (left)] [Image (right)]  ← would alternate if added
```

**HTML pattern:**
```html
<div class="item">
  <div class="item-img">
    <img src="..." />
    <div class="price">$99</div>
  </div>
  <div class="item-text">
    <h4>Class Name</h4>
    <p>Description</p>
    <a href="">Get Details</a>
  </div>
</div>
```

**CSS pattern:**
```css
.item:nth-child(odd) {
  /* Natural order: image, text */
}

.item:nth-child(even) {
  /* Reverse order via flex-direction or structural swap */
}
```

**For 4+ cards:** Markup in Cards 3+ should follow the same pattern. CSS already supports any number of cards via `:nth-child()` rules.

### Schedule Table Pattern

The Schedule uses a **semantic HTML table** with 4 columns:

```
┌─────────┬──────────┬──────────────────────┬────────────┐
│ Day     │ Time     │ Class + Duration     │ Room       │
├─────────┼──────────┼──────────────────────┼────────────┤
│ Monday  │ 9:00 AM  │ Body Building        │ Room 210   │
│         │          │ 9:00 to 10:00 AM     │            │
└─────────┴──────────┴──────────────────────┴────────────┘
```

**Structure:**
- `<table class="table">` — semantic table for screen readers
- Rows: one per day
- Columns: `<td class="day">` (day name, styled distinctly), time, class info, room

**Strengths:**
- Semantic HTML — good for accessibility
- Tokenized colors — easy to theme

**Weaknesses (mobile):**
- Columns compress at small viewports; text wraps awkwardly
- Horizontal scroll required below ~480px width
- Table doesn't reflow to card/list layout on mobile

---

## 5. Schedule Format Analysis & Mobile Strategy

### Current Schedule Extent

| Metric | Value | Notes |
|--------|-------|-------|
| Days covered | Monday–Saturday (6 days) | Sunday missing |
| Classes per day | 1 (placeholder) | Realistic gym schedule: 3–6 classes/day (morning, afternoon, evening) |
| Table structure | 4-column single-row-per-day | Doesn't scale to multi-class days |
| Time range | 9:00 AM only (placeholder) | Real schedule: typically 5 AM – 9 PM (16+ hours, 10+ time slots) |

### Mobile Responsiveness Strategy Options

For SCHEDULE-02 "readable at 375px," three approaches are viable:

#### Option A: Horizontal Scroll Table (minimal change)
- Keep table structure intact
- Add `-webkit-overflow-scrolling: touch` and scroll container on mobile
- Pros: Minimal code change; table structure preserved; familiar UX
- Cons: Requires horizontal scrolling; not ideal UX on mobile
- Implementation: Wrap table in `<div class="table-scroll">` at 767px breakpoint

#### Option B: Stacked Card Layout (responsive redesign)
- Switch to card-based layout at 767px:
  ```
  Day: Monday
  Time: 9:00 AM
  Class: Body Building
  Duration: 9:00 to 10:00 AM
  Room: Room 210
  ```
- Pros: Better mobile UX; no horizontal scrolling; familiar card pattern from Classes section
- Cons: Requires structural CSS changes; more complex media query logic

#### Option C: Collapsible Rows (hybrid)
- Show day name only; expand on tap to show time + class details
- Pros: Compact mobile view; interactive; familiar pattern
- Cons: Requires JavaScript; adds complexity

**Recommendation:** Option A (horizontal scroll table) for Phase 4 as a quick fix ensuring readability. Option B (card layout) can be revisited in Phase 6 (Final Polish) if UX review prioritizes it.

### Implementation for Option A

```css
@media (max-width: 767px) {
  .schedule .content .timing {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    display: block;  /* Allow horizontal scroll */
  }

  .schedule .content .timing .table {
    min-width: 600px;  /* Force scroll threshold */
  }
}
```

### Sunday Addition

Current table ends at Saturday. To add Sunday (completing the full week):
- Add row 7 to `<tbody>` with day class "Sunday"
- CSS `:nth-child(7)` styling will auto-apply (alternating background colors)

---

## 6. Responsive Behavior: Breakpoints & Media Queries

### Existing Breakpoints in `css/style.css`

| Breakpoint | Rule | Classes Impact | Schedule Impact |
|------------|------|-----------------|-----------------|
| 991px | `.classes .content { flex-wrap: wrap }` (line 1007) | ✅ Image hides; content stacks to 100% | ✅ `.box` stacks to 100% |
| 767px | `.classes .content .box { flex: 0 0 100%; max-width: 100% }` (line 1011) | ✅ Cards stack | `.schedule .content { flex-wrap: wrap }` stacks, but table remains full-width |
| 550px | No Classes/Schedule specific rules | Generic layout applies | Generic layout applies |
| 375px | No specific rules | Tested in Phase 2 (hero); Classes/Schedule not verified | **CRITICAL: Table unreadable** |

### Current Layout at 375px (GripGym Hero Breakpoint)

**Classes section at 375px:**
- Section stacks (image hidden at 991px, content 100% width)
- Cards remain side-by-side layout; at ~375px text/image may squeeze
- **Not yet tested for Phase 4**

**Schedule section at 375px:**
- Content stacks (flex-wrap at 767px)
- Table remains 100% width with 4 columns
- Column width ≈ 92.5px each (375px / 4) — too narrow for readable text
- **Table requires horizontal scroll or reformatting**

---

## 7. Content Gaps & Data Requirements

### Classes Section Content Audit

| Field | Current | Required | Gap |
|-------|---------|----------|-----|
| Section heading | "Our Classes" | ✅ Real | — |
| Section intro paragraph | Lorem Ipsum | Real GripGym intro (user-supplied) | Needs ~100 words |
| Number of cards | 2 | 4+ (requirement: "at least 4") | Need 2+ additional cards |
| Card title (class name) | "Stretching Training" (both) | Real class names (user-supplied) | Each card needs unique class name |
| Card description | Lorem Ipsum | Real description of class (user-supplied) | ~80–100 words per card |
| Trainer name/info | Not present in card | Per CLASSES-02: "trainer names" | Need to add or clarify scope |
| Trainer specialty | Not present | Not in requirements; optional | Clarify user intent |
| Price | $99 (hardcoded) | Real prices (user-supplied) | May vary per class |
| Card image | `images/class1.jpg` (placeholder) | Real class photos (user-supplied or existing) | User to provide or confirm use of existing images |

### Schedule Section Content Audit

| Field | Current | Required | Gap |
|-------|---------|----------|-----|
| Section heading | "Classes Schedule" | ✅ Real | — |
| Section intro paragraph | Lorem Ipsum | Real intro (user-supplied) | Needs ~80–100 words |
| Days | Mon–Sat (6) | "full week" = Sun–Sat or Mon–Sun (7) | Need Sunday (or confirm 6-day week) |
| Classes per day | 1 (placeholder) | Realistic: 3–6 per day (user-supplied) | Requires schedule data from GripGym |
| Sample classes | "Body Building 9:00 to 10:00 AM" | Real GripGym class schedule (user-supplied) | User must provide real class times, names, rooms |
| Time slots | 9:00 AM only | Multiple slots per day (user-supplied) | Need real schedule; current table structure supports 1 row per day |
| Rooms | "Room No:210" (all) | Real room assignments (user-supplied) | Clarify if room numbers vary or consistent |

### Content Blocking

Both sections are **blocked on user content:**
- **Classes:** User must supply 4+ class names, descriptions, trainer names (if required), and prices
- **Schedule:** User must supply GripGym's actual weekly class schedule with times, room assignments, and class names

**Decision point:** If multi-class-per-day is needed (e.g., 9 AM Yoga, 10 AM HIIT, 5 PM Boxing on Monday), the table structure must expand from 1 row per day to N rows per day. Current table supports this via repeated `<tr>` entries.

---

## 8. Animation & Interaction Integration

### WOW.js Animations: Current State

| Section | Element | Animation | Trigger | Status |
|---------|---------|-----------|---------|--------|
| Classes | Image box | `slideInLeft` | Scroll into view | ✅ Works |
| Classes | Text/cards box | `slideInRight` | Scroll into view | ✅ Works |
| Classes | Each card | `bounceInUp` | Scroll into view (each card) | ✅ Works |
| Schedule | Text box | `slideInLeft` | Scroll into view | ✅ Works |
| Schedule | Table box | `slideInRight` | Scroll into view | ✅ Works |

**Animation delays:**
- Classes outer sections: no delay (slide in together)
- Classes cards: no per-card delay; all bounce in together
- Schedule: no delay

**Optional enhancement (not required):** Add `data-wow-delay="0.1s"` / `"0.2s"` to stagger card entrances.

### Interactive Elements

**Current interactions:**
- Class card links: `<a href="">Get Details</a>` — currently empty, non-functional
- Schedule: read-only table (no interactive elements)

**Scope for Phase 4:** No interactive changes specified in requirements. Links can remain non-functional if not part of Phase 4 scope (possible deferred to Phase 5 or 6).

---

## 9. Architectural Responsibility Map

| Capability | Primary Tier | Rationale |
|------------|-------------|-----------|
| Classes section dark background | Browser / Client-side CSS | `.classes { background-color: ... }` — pure CSS styling |
| Class card content rendering | Browser / Client-side HTML | Static HTML content (names, descriptions, images) |
| Schedule table rendering | Browser / Client-side HTML | Static HTML table with real data |
| WOW.js animations | Browser / Client-side JS | Scroll-triggered animations (Animate.css + WOW.js library) |
| Mobile table responsiveness | Browser / Client-side CSS | Media queries + flexbox/grid adjustments |
| Trainer/class data sourcing | Content / User-supplied | Phase 4 scope: no backend; data provided as HTML content |

---

## 10. Validation & Verification Architecture

### Test Infrastructure

| Framework | Config | Location | Status |
|-----------|--------|----------|--------|
| Visual | Manual testing (HTML in browser) | index.html | ✅ Current |
| Responsive | Manual testing at breakpoints (375, 550, 767, 991px) | index.html | ✅ Current |
| Animation | Visual inspection of WOW.js scroll trigger | Browser console (WOW.js debug) | ✅ Current |

### Phase 4 Verification Points

1. **Classes section background:** Dark (`--color-bg-secondary`) at load
2. **Classes cards:** 4+ cards visible; real content in all cards
3. **Classes animations:** Cards bounce in on scroll
4. **Schedule table:** Full width at desktop; readable at 375px (no text cutoff)
5. **Schedule content:** Real GripGym class times (not Lorem Ipsum)
6. **Schedule animation:** Table slides in on scroll
7. **Responsive stacking:** Content stacks correctly at 767px and 550px
8. **No visual regressions:** Previous phases (1–3) still render correctly

---

## 11. Key Decisions for CONTEXT.md

### D-01: Classes Section Dark Background
**Decision:** Change `.classes { background-color }` from `#ffffff` to `var(--color-bg-secondary)`.  
**Rationale:** Matches Phase 1 dark theme standard applied to hero and other sections.  
**Evidence:** RESEARCH.md §Codebase Audit; Phase 3 CONTEXT.md D-01 precedent.

### D-02: Classes Card Count & Expansion
**Decision:** Expand from 2 cards to 4 cards minimum (requirement CLASSES-02: "at least 4").  
**Rationale:** 2 cards insufficient for showing GripGym's class variety.  
**Content requirement:** User to supply 4 class names, descriptions, trainer names (if included in card), prices.  
**Note:** Card 3 and 4 HTML must follow existing alternating layout pattern (odd=image-left, even=text-left).

### D-03: Classes Card Content Structure
**Decision:** Each card shall include:
  1. Class image (top or side, depending on alternating layout)
  2. Price tag ($XX, positioned absolutely)
  3. Class name (h4)
  4. Class description (~80–100 words)
  5. Trainer name (text, h4, or label — **clarify scope**)
  6. "Get Details" link (currently non-functional; defer to Phase 5)
**Clarification needed:** Does CLASSES-02 "trainer names" mean:
  - Option A: Trainer name + specialty listed in card text (e.g., "Led by John Smith, NASM-CPT")
  - Option B: Trainer name in separate section/module
  - Option C: Trainer name in image caption or overlay
**Assumption:** Option A (name + role embedded in card text) is minimal scope.

### D-04: Classes Trainer Information
**Decision:** User to confirm GripGym trainer roster and how to display in cards.  
**Options:**
  1. One trainer per class card (trainer name in description or separate label)
  2. Class-specific or class-generic trainers (e.g., "Led by available certified instructors")
  3. Trainer images/bios (deferred to Phase 5+)
**Status:** ⏸️ PENDING user content

### D-05: Schedule Days Coverage
**Decision:** Confirm full-week scope: Monday–Sunday (7 days) or Monday–Saturday (6 days).  
**Current:** 6 days (Mon–Sat); requirement says "full week" (ambiguous).  
**Clarification needed:** Does GripGym operate Sunday? If yes, add row 7 to table.  
**Status:** ⏸️ PENDING user confirmation

### D-06: Schedule Multi-Class Per Day Support
**Decision:** Confirm if schedule needs multiple classes per day (e.g., Morning, Afternoon, Evening slots).  
**Current table structure:** 1 row per day maximum (without visual redesign).  
**If needed:** Table can support N rows per day (repeat day cell, or use rowspan for day column).  
**Scope:** Phase 4 minimal is 1 row per day; multi-class support may require Phase 5+ iteration.  
**Status:** ⏸️ PENDING user schedule data

### D-07: Schedule Mobile Responsiveness Strategy
**Decision:** Add horizontal scroll to table at mobile breakpoints (≤767px) to ensure readability at 375px.  
**Alternative:** Card-based layout (Phase 6 enhancement).  
**Implementation:** Wrap `.timing` in scroll container; add `overflow-x: auto` at 767px media query.  
**Rationale:** Minimal code change; preserves table semantics; readable at 375px.  
**Status:** ✅ Locked (technical decision; doesn't require user input)

### D-08: CSS Tokenization
**Decision:** Replace hardcoded `font-weight: 500` with `var(--fw-semibold)` in Classes and Schedule sections.  
**Locations:**
  - `.classes .content .class-items .item .item-text h4` (line 510)
  - `.classes .content .class-items .item .item-img .price` (line 495)
  - `.schedule .content .text h2` (line 617)
**Rationale:** Consistency with Phase 1 design system.  
**Status:** ✅ Locked (technical housekeeping; no user input needed)

### D-09: CSS Bug Fix: `.schedule .content .box { max-width }`
**Decision:** Fix `max-width: 100%` to `max-width: 50%` in `.schedule .content .box` (line 603).  
**Rationale:** Text and timing boxes should split 50/50; current bug makes both full-width.  
**Status:** ✅ Locked (bug fix; technical decision)

---

## 12. Blockers & Dependencies

### Content Blockers (User-Supplied Data Required)

| Blocker | Dependency | Scope | Impact |
|---------|-----------|-------|--------|
| Classes content | User must supply 4+ class names, descriptions, trainer names, prices | CLASSES-02 | Blocks all class card HTML/content edits |
| Schedule content | User must supply real GripGym weekly schedule | SCHEDULE-01 | Blocks all schedule table row edits |
| Schedule days | User must confirm 6-day (Mon–Sat) vs. 7-day (Sun–Sat) scope | SCHEDULE-01 | Blocks schedule row addition |
| Schedule multi-class support | User must clarify if 1 or N classes per day | SCHEDULE-01 | May require table restructuring |
| Trainer scope clarification | User must define how trainer info appears in class cards | CLASSES-02 | Affects card content structure |

### Technical Blockers (Phase 4 can resolve independently)

| Blocker | Dependency | Resolution | Impact |
|---------|-----------|-----------|--------|
| Classes background color | None | Change to `--color-bg-secondary` | CLASSES-01 requirement |
| CSS hardcoded font weights | None | Replace with `--fw-semibold` token | Quality (tokenization) |
| Schedule mobile responsiveness | None | Add scroll container at 767px | SCHEDULE-02 requirement |
| CSS max-width bug | None | Fix `.schedule .content .box` | Desktop layout |

### Dependency on Previous Phases

- **Phase 1 (Brand Foundation):** Design tokens (colors, fonts, weights) — ✅ Complete
- **Phase 2 (Header/Hero):** Navigation and hero structure — ✅ Complete
- **Phase 3 (About/Services):** No direct dependency; Phase 4 independent — ✅ Complete

---

## 13. Implementation Approach

### High-Level Phase 4 Plan Structure

**Wave 1: Dark Theme & Structure**
- Apply dark background to `.classes` section
- Tokenize hardcoded font weights (Classes + Schedule)
- Fix `.schedule .content .box` max-width bug
- Add 2 more class cards (HTML structure, placeholder content)

**Wave 2: Mobile Responsiveness**
- Add table scroll wrapper at 767px breakpoint
- Test at 375px, 550px, 767px viewports
- Verify no layout regressions

**Wave 3: Content Replacement** (blocked on user data)
- Replace Classes section intro + card copy (user-supplied)
- Replace Schedule table rows with real GripGym data (user-supplied)
- Verify animations still trigger

**Wave 4: Verification & Optimization**
- Test all animations (WOW.js scroll triggers)
- Responsive check at all breakpoints
- Cross-check against Requirements (CLASSES-01, CLASSES-02, SCHEDULE-01, SCHEDULE-02)

---

## 14. Sources & Confidence Assessment

### PRIMARY (HIGH confidence)
- Direct codebase reads: `index.html` (lines 159–199, 202–287), `css/style.css` (lines 424–637, 994–1140)
- Phase 1 design tokens verified in CSS custom properties block (`:root`)
- Phase 3 research and CONTEXT.md for precedent and patterns

### SECONDARY (MEDIUM confidence)
- WOW.js animation behavior based on Animate.css and Phase 2 verification
- Mobile breakpoint strategy inferred from existing media queries and Phase 2 mobile testing
- GripGym business context from Phases 1–3 RESEARCH.md and ROADMAP.md

### METADATA

**Confidence breakdown:**
- Codebase structure & styling: HIGH — direct file reads
- Content requirements: HIGH — locked in ROADMAP.md requirements
- Mobile strategy: MEDIUM — pattern inferred from existing breakpoints; specific 375px behavior not yet tested for Classes/Schedule
- User content dependencies: N/A — awaiting user input

**Research valid until:** 2026-07-27 (7 days; subject to user content decisions)

---

## 15. Next Steps

1. **User confirmation needed (CONTEXT.md):**
   - Classes: Supply 4+ class names, descriptions, trainer names (format TBD), prices
   - Schedule: Confirm 6 or 7 days; provide real GripGym weekly schedule (times, class names, rooms, trainer assignments)
   - Trainer scope: Confirm how trainer info appears in class cards

2. **Phase 4 plan creation (gsd-planner):**
   - PLAN.md will task Wave 1 (dark theme + structure), Wave 2 (mobile), Wave 3 (content), Wave 4 (verification)
   - Content tasks will be marked "blocked on user input" pending CONTEXT.md decisions

3. **Execution (gsd-execute-phase):**
   - Each task will edit HTML, CSS, or both
   - Animations and responsive behavior will be verified at execution time
   - Mobile testing at 375px, 550px, 767px will confirm SCHEDULE-02 readability

