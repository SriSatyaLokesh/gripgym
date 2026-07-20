---
phase: 04-classes-schedule
plan: 1
type: execute
wave: 1
depends_on: []
files_modified:
  - index.html
  - css/style.css
autonomous: true
requirements:
  - CLASSES-01
  - CLASSES-02
  - SCHEDULE-01
  - SCHEDULE-02
user_setup:
  - task: "Prepare real GripGym class content"
    what: "4 class cards (names, descriptions, trainer info) and weekly schedule (times, room numbers)"
    delivery_format: "See Content Handoff section below"
must_haves:
  truths:
    - "Classes section has dark background matching hero/about/services sections"
    - "4 class cards display with real GripGym class names and descriptions"
    - "Schedule section has dark background matching Classes section (per D-04)"
    - "Schedule table shows full week (Monday–Sunday)"
    - "Schedule table contains real GripGym class times and room assignments"
    - "Schedule table is readable and scrollable at 375px mobile viewport"
    - "All CSS font-weight tokens are applied (no hardcoded values)"
    - "WOW.js animations preserved on class cards and schedule sections"
    - "No Lorem Ipsum remains in Classes or Schedule sections"
  artifacts:
    - path: "index.html"
      provides: "Classes section HTML (4 cards) + Schedule section HTML (7-day table)"
      min_lines: 10
    - path: "css/style.css"
      provides: "Classes/Schedule CSS with tokenized font-weights, dark background override, mobile scroll strategy"
      exports: ["--fw-semibold", "background-color: var(--color-bg-secondary)", "@media (max-width: 767px) table scroll"]
  key_links:
    - from: "index.html Classes section"
      to: "css/style.css .classes class"
      via: "Background color change to dark (per D-01), card structure expansion to 4 cards"
      pattern: "background-color: var(--color-bg-secondary)"
    - from: "index.html Schedule section"
      to: "css/style.css .schedule class"
      via: "Background color change to dark (per D-04), Sunday addition, mobile table scroll at 767px breakpoint"
      pattern: "background-color: var(--color-bg-secondary).*overflow-x: auto"
    - from: "html class card structure"
      to: "css/style.css .item:nth-child()"
      via: "Alternating layout pattern: odd=image-left, even=text-left"
      pattern: "nth-child\\((odd|even)\\)"
---

<objective>
Visitors can see real class offerings and when they happen.

**Purpose:** Replace placeholder Classes and Schedule sections with real GripGym content and ensure visual/responsive consistency with Phase 1–3 dark theme. Enable desktop users to browse class offerings and see weekly timetable, and enable mobile users (375px) to access the same information with horizontal scroll.

**Output:** 
- Classes section: Dark background (per D-01), 4 real class cards with alternating image/text layout, trainer info, pricing
- Schedule section: Dark background (per D-04), full-week (Mon–Sun) timetable with real GripGym class times and room assignments, responsive at 375px
- CSS updates: Tokenized font-weights (per D-08), mobile horizontal scroll strategy (per D-06), dark background override (per D-01 & D-04), max-width bug fix (per D-06)
- All WOW.js animations preserved and functional
</objective>

<execution_context>
@$HOME/.claude/gsd-core/workflows/execute-plan.md
@$HOME/.claude/gsd-core/templates/summary.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/ROADMAP.md
@.planning/STATE.md
@.planning/phases/04-classes-schedule/04-CONTEXT.md
@.planning/phases/04-classes-schedule/04-RESEARCH.md
</context>

<tasks>

<task type="auto">
  <name>Task 04-01: Classes section dark background + expand to 4 cards (HTML structure)</name>
  <files>index.html, css/style.css</files>
  <action>
**HTML Changes (index.html, lines 159–199):**
1. Locate the `.classes` section starting at line 159 (`<section class="classes" id="classes">`)
2. Duplicate the second class card (lines 190–199) and insert it after the closing `</div>` of card 2 to create **Card 3** and **Card 4**
   - Card 3 should have the same structure as Card 1 (image-first layout) with `wow bounceInUp` animation
   - Card 4 should have the same structure as Card 2 (text-first layout) with `wow bounceInUp` animation
   - Update `<h4>` and `<p>` text in Cards 3 and 4 with placeholder names like "Class 3 [PLACEHOLDER]" and "Class 4 [PLACEHOLDER]" — user will replace with real content in Task 04-02
   - Keep `$99` price tags (user will update prices in Task 04-02 if needed)
3. Verify all 4 cards are nested inside `.class-items` container within `.box.text`
4. **Preserve all WOW.js animations:** Each card must retain `class="wow bounceInUp"` and each `wow` class must remain on image/text boxes

**CSS Changes (css/style.css, line 424):**
1. Locate `.classes { padding: 80px 0px 50px; background-color: #ffffff; }` at line ~424
2. Replace `background-color: #ffffff` with `background-color: var(--color-bg-secondary)` to match dark theme (per D-01)
3. Add CSS support for 3rd and 4th cards (alternating pattern already works via `:nth-child(odd/even)`, but verify visually):
   - Card 1: `nth-child(1)` — image-left (existing `.item:nth-child(1) { ... }` at line ~467)
   - Card 2: `nth-child(2)` — text-left (existing `.item:nth-child(2) { ... }` at line ~470)
   - Card 3: `nth-child(3)` — image-left (CSS will auto-apply as odd, no new rules needed)
   - Card 4: `nth-child(4)` — text-left (CSS will auto-apply as even, no new rules needed)
4. **Do NOT modify card flexbox, sizing, or image/text layout** — only background color changes

**Verification Notes:**
- Classes section now has dark background (not white)
- All 4 cards visible with alternating image/text layout
- No Lorem Ipsum visible yet (cards have placeholder class names like "Class 3 [PLACEHOLDER]")
- All WOW.js animations (slideInLeft/slideInRight on boxes, bounceInUp on cards) still present and will fire on scroll
  </action>
  <verify>
    <automated>
grep -c "class=\"item wow bounceInUp\"" index.html; if [ $(grep -c "class=\"item wow bounceInUp\"" index.html) -eq 4 ]; then echo "✅ 4 cards present"; else echo "❌ Cards missing"; fi
    </automated>
    <automated>
grep "background-color: var(--color-bg-secondary)" css/style.css | grep -c "classes"; if [ $(grep "background-color: var(--color-bg-secondary)" css/style.css | grep -c "classes") -ge 1 ]; then echo "✅ Classes dark background applied"; else echo "❌ Background not changed"; fi
    </automated>
  </verify>
  <done>
- Classes section background changed from white to `var(--color-bg-secondary)` (dark)
- 4 class cards present in HTML with alternating image/text layout
- Card 1 & 3: image-left, text-right
- Card 2 & 4: text-left, image-right
- All 4 cards have `wow bounceInUp` animation class preserved
- All cards contain placeholder text like "Class 3 [PLACEHOLDER]" (real content to follow in Task 04-02)
- Section `slideInLeft`/`slideInRight` animations preserved on image and text boxes
  </done>
</task>

<task type="auto">
  <name>Task 04-02: Update class card descriptions with real GripGym content (HTML content)</name>
  <files>index.html</files>
  <action>
**HTML Content Changes (index.html, lines 171–199):**
1. Locate all 4 class cards within the `.class-items` container (cards are inside `.box.text` of Classes section)
2. For each card (Card 1, 2, 3, 4), replace:
   - `<h4>` text: Replace placeholder or "Stretching Training" with real **class name** (e.g., "Power Lifting", "Yoga Flow", "HIIT Bootcamp", "Boxing Basics")
   - `<p>` text: Replace Lorem Ipsum with real **class description** (80–100 words describing what students will learn, intensity level, trainer focus)
   - Keep `<a href="">Get Details</a>` link as-is (no href target yet, per Phase 4 scope)
   - Trainer name/specialty can be **embedded in the description text** (e.g., "Led by Coach Marcus, a certified strength coach with 10+ years of experience...") or appear in the heading as an alternate format (e.g., "Power Lifting - Coach Marcus")
   - Price `<div class="price">$99</div>` can be updated if user supplies different prices per class; otherwise leave at $99

3. **Content Format Guide** (see Content Handoff section for user input requirements):
   - **Class 1:** Name, description including trainer name/specialty
   - **Class 2:** Name, description including trainer name/specialty
   - **Class 3:** Name, description including trainer name/specialty
   - **Class 4:** Name, description including trainer name/specialty

4. Preserve all HTML structure:
   - Class card divs (`<div class="item">`, `<div class="item-img">`, `<div class="item-text">`)
   - Image tags (`<img src="images/class1.jpg" alt="classes" />`)
   - Price badges (`<div class="price">$99</div>`)
   - WOW animation classes (`wow bounceInUp` on card divs)

5. **Verify no Lorem Ipsum remains** in any class card description or heading

**Content Source:** User to supply via Content Handoff (see section below); executor should request from user if placeholder content is provided instead of real data.
  </action>
  <verify>
    <automated>
grep -i "lorem\|ipsum\|dummy" index.html | grep -v "^#" | grep -c "class\|schedule"; if [ $(grep -i "lorem\|ipsum\|dummy" index.html | grep -c "class\|schedule") -eq 0 ]; then echo "✅ No Lorem Ipsum in Classes/Schedule"; else echo "❌ Lorem Ipsum still present"; fi
    </automated>
  </verify>
  <done>
- All 4 class cards contain real GripGym class names (not "Stretching Training" or placeholder text)
- All 4 class cards contain real GripGym class descriptions (80–100 words each, replacing Lorem Ipsum)
- Trainer names/specialties visible in card content (either in heading or within description)
- Prices assigned per class (default $99 if not specified by user)
- No Lorem Ipsum remains in Classes section
- All HTML structure and WOW animations preserved
- Class descriptions and schedule times contain real GripGym content (user-supplied) per CLASSES-02 requirement
  </done>
</task>

<task type="auto">
  <name>Task 04-03: Update Schedule table with full week + real GripGym times (HTML content)</name>
  <files>index.html</files>
  <action>
**HTML Content Changes (index.html, lines 217–287):**
1. Locate the Schedule section table starting at line ~217 (`<table class="table">`)
2. **Add Sunday row:** Current table has Mon–Sat (6 rows). Add a 7th row for Sunday after the Saturday row:
   ```html
   <tr>
     <td class="day">Sunday</td>
     <td><strong>[TIME]</strong></td>
     <td>[CLASS NAME] <br/> [START TIME] to [END TIME]</td>
     <td>[ROOM NUMBER]</td>
   </tr>
   ```
   - **D-12 status:** If user confirms gym is **open Sunday**, populate with real schedule times. If gym is **closed Sunday**, replace cell content with "Closed" or "-" indicator
   - Sunday styling will auto-apply via CSS `:nth-child(7)` (alternating background per existing pattern)

3. **Replace all schedule time data:** For each day (Mon–Sun), replace placeholder times and class names with **real GripGym schedule**:
   - Current placeholder: "9:00 AM" time, "Body Building" class, "Room No:210" (repeated on all days)
   - Real data format: 
     - `<td><strong>TIME</strong></td>` — e.g., "<strong>9:00 AM</strong>"
     - `<td>CLASS NAME <br/> START TIME to END TIME</td>` — e.g., "Power Lifting <br/> 9:00 to 10:00 AM"
     - `<td>ROOM NUMBER</td>` — e.g., "Room 210" or "Room No:210" (keep existing format)

4. **Handle multi-class days (if applicable):** If real schedule has multiple classes per day (e.g., 9 AM Yoga, 10:30 AM HIIT, 5 PM Boxing on Monday):
   - Add separate table rows per day for each class time
   - Monday row 1: 9 AM Yoga
   - Monday row 2: 10:30 AM HIIT
   - Monday row 3: 5 PM Boxing
   - (Same day name will repeat; CSS will style via `:nth-child()` even/odd, which will auto-alternate background colors across all rows)

5. **Preserve table structure:**
   - Keep `<table class="table">` wrapper
   - Keep `<tbody>` and `<tr>` tags
   - Keep 4-column structure: `<td class="day">`, `<td>TIME</td>`, `<td>CLASS</td>`, `<td>ROOM</td>`
   - Preserve section animations (`wow slideInLeft` on text box, `wow slideInRight` on timing box)

6. **Update section intro text** (if needed):
   - Current: "Lorem Ipsum is simply dummy text of the printing industry..."
   - Replace with real GripGym schedule intro (~80–100 words explaining schedule, class variety, etc.) or leave as-is if provided in Content Handoff

7. **Verify no Lorem Ipsum remains** in table rows; all cells contain real times and class names
  </action>
  <verify>
    <automated>
grep -c "<td class=\"day\">Sunday</td>" index.html; if [ $(grep -c "<td class=\"day\">Sunday</td>") -ge 1 ]; then echo "✅ Sunday row added"; else echo "❌ Sunday missing"; fi
    </automated>
    <automated>
grep -i "lorem\|body building.*9:00.*9:00" index.html | grep -c ""; if [ $(grep -i "lorem\|body building.*9:00.*9:00" index.html | wc -l) -eq 0 ]; then echo "✅ No placeholder schedule"; else echo "⚠️ Placeholder data may remain"; fi
    </automated>
  </verify>
  <done>
- Schedule table has 7 rows (Monday–Sunday, full week per SCHEDULE-01)
- Sunday row present: either with real schedule times or "Closed" indicator (per user confirmation on D-12)
- All table cells contain real GripGym class times, names, and room numbers (not placeholder "9:00 AM Body Building")
- Multi-class days supported if needed (multiple rows per day)
- No Lorem Ipsum in table cells
- Schedule section intro text updated with real content (if provided by user)
- Section animations (`slideInLeft`/`slideInRight`) preserved on text and timing boxes
- Class descriptions and schedule times contain real GripGym content (user-supplied) per SCHEDULE-01 requirement
  </done>
</task>

<task type="auto">
  <name>Task 04-04: CSS tokenization + D-04 dark background + mobile responsiveness</name>
  <files>css/style.css</files>
  <action>
**CSS Changes (css/style.css):**

**1. Font-Weight Tokenization (per D-08):**

- **Classes card h4 (line ~510):**
  - Current: `.classes .content .class-items .item .item-text h4 { font-weight: 500; ... }`
  - Change: `font-weight: 500` → `font-weight: var(--fw-semibold)`

- **Classes price tag (line ~495):**
  - Current: `.classes .content .class-items .item .item-img .price { font-weight: 500; ... }`
  - Change: `font-weight: 500` → `font-weight: var(--fw-semibold)`

- **Schedule h2 (line ~617):**
  - Current: `.schedule .content .text h2 { font-weight: 500; ... }`
  - Change: `font-weight: 500` → `font-weight: var(--fw-semibold)`

**2. Schedule Section Dark Background (per D-04):**

- **Add or update `.schedule` rule (around line ~600):**
  - Add: `background-color: var(--color-bg-secondary)`
  - This applies dark background to Schedule section, matching Classes section (D-01) and overall dark theme
  - Current: Schedule background is inherited or set to light; must be darkened to `var(--color-bg-secondary)`

**3. Max-Width Bug Fix (per D-06):**

- **Schedule .box layout (line ~603):**
  - Current: `.schedule .content .box { flex: 0 0 50%; max-width: 100%; padding: 15px; }`
  - Change: `max-width: 100%` → `max-width: 50%`
  - Rationale: Both `.text` and `.timing` boxes should be 50% width at desktop; 100% causes layout to break. This was identified as a bug in RESEARCH.md.

**4. Mobile Responsive Table Scroll (per D-06, SCHEDULE-02):**

- **Add new media query at 767px breakpoint** (insert after existing 767px rules, around line ~1060):
  ```css
  @media (max-width: 767px) {
    .schedule .content .timing {
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      display: block;
    }
    
    .schedule .content .timing .table {
      min-width: 600px;
    }
  }
  ```
  - This enables horizontal scroll on mobile devices (375px viewport) so table remains readable at small sizes
  - `-webkit-overflow-scrolling: touch` provides momentum scrolling on iOS devices

**5. Verify no changes break existing functionality:**
- Dark theme colors unchanged (Classes/Schedule use `--color-bg-secondary`, `--color-bg-surface`, `--color-primary`)
- Flexbox layouts unchanged (Classes cards alternating, Schedule 50/50 split)
- WOW.js animation classes preserved in HTML (animations continue to fire on scroll)
- Border and text color tokens unchanged

**Verification:**
- All hardcoded `font-weight: 500` replaced with `var(--fw-semibold)` in Classes/Schedule sections
- All hardcoded `font-weight: 700` (if present) replaced with `var(--fw-bold)`
- Schedule section has `background-color: var(--color-bg-secondary)` (dark background per D-04)
- `.schedule .content .box` max-width corrected to 50% (not 100%)
- Mobile media query added for table horizontal scroll at 767px and below
  </action>
  <verify>
    <automated>
grep -c "font-weight: 500" css/style.css | grep -E "classes|schedule"; if [ $(grep -E "classes|schedule" css/style.css | grep -c "font-weight: 500") -eq 0 ]; then echo "✅ Hardcoded weights replaced"; else echo "❌ Hardcoded weights still present"; fi
    </automated>
    <automated>
grep -c "var(--fw-semibold)" css/style.css; if [ $(grep -c "var(--fw-semibold)" css/style.css) -ge 3 ]; then echo "✅ Font-weight tokens applied"; else echo "⚠️ Not all weights tokenized"; fi
    </automated>
    <automated>
grep ".schedule.*background-color: var(--color-bg-secondary)" css/style.css | wc -l; if [ $(grep ".schedule.*background-color: var(--color-bg-secondary)" css/style.css | wc -l) -ge 1 ]; then echo "✅ Schedule dark background applied (D-04)"; else echo "❌ Schedule background not set to dark"; fi
    </automated>
    <automated>
grep "max-width: 50%" css/style.css | grep -c "schedule"; if [ $(grep "max-width: 50%" css/style.css | grep -c "schedule") -ge 1 ]; then echo "✅ Max-width bug fixed"; else echo "❌ Max-width not corrected"; fi
    </automated>
    <automated>
grep -c "overflow-x: auto" css/style.css; if [ $(grep -c "overflow-x: auto") -ge 1 ]; then echo "✅ Mobile scroll added"; else echo "❌ Mobile scroll missing"; fi
    </automated>
  </verify>
  <done>
- All hardcoded `font-weight: 500` in Classes and Schedule sections replaced with `var(--fw-semibold)`
- Schedule section background set to `var(--color-bg-secondary)` (dark background per D-04, matching Classes section)
- `.schedule .content .box` max-width corrected from 100% to 50% (fixes desktop layout bug per D-06)
- Mobile media query added at 767px breakpoint for table horizontal scroll
- Table scroll enabled on viewports ≤ 767px (including 375px mobile viewport) with `-webkit-overflow-scrolling: touch`
- No existing dark theme colors, flexbox layouts, or animations broken
- CSS tokenization complete per D-08 requirement
- D-04 (Schedule dark background) fully implemented and verified
  </done>
</task>

<task type="auto">
  <name>Task 04-05: Verification + final fixes (animations, responsiveness, content)</name>
  <files>index.html, css/style.css</files>
  <action>
**Verification & Final Checks:**

1. **Visual verification at desktop (1200px):**
   - Open website in browser at full width
   - Classes section: Dark background visible, 4 cards display in alternating layout (image-text, text-image pattern)
   - Schedule section: 50% flex layout (text left, table right) displays correctly
   - No layout gaps or misalignment

2. **Content verification:**
   - Classes cards: All 4 cards have real class names, descriptions, trainer names (no Lorem Ipsum, no "Stretching Training", no [PLACEHOLDER] text)
   - Schedule: All 7 rows (Mon–Sun) have real times and class names (no "9:00 AM Body Building Room 210" repeated on all days)
   - No Lorem Ipsum anywhere in Classes or Schedule sections

3. **Animation verification on desktop:**
   - Scroll to Classes section → observe image box `slideInLeft`, text box `slideInRight` animations
   - Verify 4 class cards animate `bounceInUp` sequentially (may appear simultaneous; acceptable per Phase 4 scope)
   - Scroll to Schedule section → observe text box `slideInLeft`, table box `slideInRight` animations
   - All animations smooth and complete

4. **Mobile verification at 767px (tablet):**
   - Use browser DevTools to resize to 767px width
   - Classes section: Content stacks vertically (image hidden, cards in single column)
   - Schedule section: Content stacks vertically; table remains visible and readable with horizontal scroll

5. **Mobile verification at 375px (small phone):**
   - Resize to 375px width
   - Classes section: Cards render in single column; text/image readable without horizontal scroll
   - Schedule section: **CRITICAL CHECK** — table must be horizontally scrollable (no text overflow or cramping)
   - Scroll the table horizontally → all columns (Day, Time, Class, Room) visible when scrolled
   - No table cells have text cramped or cut off

6. **Responsive breakpoint verification:**
   - At 991px → Classes image hides, content wraps to 100% (existing behavior)
   - At 767px → Schedule content stacks, table scroll enabled (new behavior)
   - At 375px → Table remains scrollable and readable (verify via manual scroll)

7. **Color & theming verification:**
   - Classes section background is dark (matches hero/about/services dark background)
   - **Schedule section background is dark (matches Classes section) — D-04 verification**
   - All text on dark backgrounds is readable (sufficient contrast)
   - Card backgrounds use `--color-bg-surface` and `--color-primary` (dark reds/grays, not white)

8. **D-04 Specific Verification:**
   - CSS rule for `.schedule` contains `background-color: var(--color-bg-secondary)`
   - Schedule section visually displays dark background (not white or light)
   - Dark background extends full width of schedule section (no gaps or inheritance issues)

9. **Animation preservation check:**
   - All WOW classes still present in HTML: `wow slideInLeft`, `wow slideInRight`, `wow bounceInUp`
   - No animation classes removed or broken
   - Scroll trigger fires animations correctly

9. **Final fixes (if needed):**
   - If any animation doesn't fire → verify WOW.js library is loaded in `<head>` (Phase 1 setup, should be present)
   - If table scroll doesn't work on mobile → verify `-webkit-overflow-scrolling: touch` and `overflow-x: auto` in CSS
   - If text is cramped at 375px → verify `min-width: 600px` on `.schedule .content .timing .table`
   - If Classes section text is cut off → verify Cards 3 & 4 are properly nested inside `.class-items` and `.item-text` widths are correct   - If Schedule background doesn't appear dark → verify CSS rule includes `background-color: var(--color-bg-secondary)` and selector targets `.schedule` correctly
10. **Git status check:**
   - Verify only `index.html` and `css/style.css` are modified (no other files changed)
   - Ready for commit

**Acceptance Verification Checklist:**
- [ ] 4 class cards visible with real names, descriptions, trainer info
- [ ] Schedule has 7 days (Mon–Sun) with real times and class names
- [ ] Classes section background is dark (matches hero/about/services)
- [ ] **Schedule section background is dark (matches Classes section) — D-04 verification**
- [ ] Schedule table scrolls horizontally at 375px viewport
- [ ] All animations (slideIn, bounceIn) fire on scroll
- [ ] No Lorem Ipsum in Classes or Schedule sections
- [ ] Font-weight tokens applied (no hardcoded 500/700)
- [ ] Max-width bug fixed (Schedule boxes are 50% width at desktop)
- [ ] Mobile viewport (375px) shows all content readable (with scroll if needed)
  </action>
  <verify>
    <automated>
echo "Checking for Lorem Ipsum in Classes/Schedule sections..."; grep -i "lorem\|ipsum" index.html | wc -l; echo "0 = clean, >0 = issues"
    </automated>
    <automated>
echo "Checking for 'Body Building 9:00 AM' repeated schedule placeholder..."; grep -o "Body Building.*9:00.*10:00 AM" index.html | wc -l; echo "0 = clean (real data), >0 = placeholder still present"
    </automated>
    <automated>
echo "Checking for WOW.js animation classes..."; grep -c "wow slideInLeft\|wow slideInRight\|wow bounceInUp" index.html; echo "Should be ≥6 (Classes=3, Schedule=2+)"
    </automated>
    <automated>
echo "Checking CSS media query for 767px table scroll..."; grep -A 5 "@media.*767px" css/style.css | grep -c "overflow-x: auto"; echo "≥1 = implemented"
    </automated>
    <automated>
echo "Checking Schedule dark background (D-04)..."; grep -c "\.schedule.*background-color: var(--color-bg-secondary)" css/style.css; echo "≥1 = D-04 implemented"
    </automated>
  </verify>
  <done>
- All 4 class cards contain real GripGym content (names, descriptions, trainer info)
- Schedule table displays full week (Monday–Sunday, 7 days)
- All schedule times and room numbers are real GripGym data (not placeholder "9:00 AM Body Building")
- Classes section background is dark (`--color-bg-secondary`)
- **Schedule section background is dark (`--color-bg-secondary`) — D-04 requirement verified**
- Schedule table is readable and horizontally scrollable at 375px mobile viewport (verified via media query + manual scroll)
- All CSS tokens applied: `var(--fw-semibold)` for font-weights, no hardcoded values
- Schedule `.box` max-width corrected to 50% (layout bug fixed per D-06)
- WOW.js animations preserved: `slideInLeft`/`slideInRight` on sections, `bounceInUp` on class cards
- No Lorem Ipsum remains anywhere in Classes or Schedule sections
- D-04 fully implemented (Schedule dark background + color token applied + verified)
- Phase 4 **READY FOR PRODUCTION** — all requirements met (CLASSES-01, CLASSES-02, SCHEDULE-01, SCHEDULE-02) and all decisions honored (D-01 through D-12)
  </done>
</task>

</tasks>

<content_handoff>

## Content Handoff: Class Cards & Schedule Data

**Status:** ⏸️ BLOCKED — Executor awaiting user input before proceeding to Tasks 04-02 and 04-03.

Before execution begins, **user MUST provide the following real GripGym content:**

### 1. Class Cards (4 required)

Each class card requires:
- **Class Name** (5–10 words, e.g., "Power Lifting Fundamentals")
- **Class Description** (~100 words) describing:
  - What students will learn
  - Intensity level (beginner/intermediate/advanced)
  - Key benefits
  - Class format or duration
- **Trainer Name & Specialty** (e.g., "Coach Marcus - Certified Strength Coach" or integrate into description)
- **Price** (optional; default $99 per class if not specified)

**Format Example:**

```
Class 1: Power Lifting Fundamentals
Description: Learn proper lifting technique and build functional strength in this beginner-friendly power lifting class. Led by Coach Marcus, a certified strength and conditioning specialist with 8+ years of competitive lifting experience. This class covers squat, bench press, and deadlift fundamentals with personalized form correction. Expect to build explosive power and muscle endurance in a supportive group setting. Great for beginners wanting to progress to intermediate lifting. 60 minutes, 3x per week.
Trainer: Coach Marcus
Price: $99

Class 2: Yoga Flow & Flexibility
Description: Connect mind and body through dynamic yoga flows and deep stretching. Led by Trainer Sarah, a registered yoga instructor with 10+ years of teaching experience. This class emphasizes breath-synchronized movement, progressive flexibility building, and mental clarity. Each session builds from gentle warm-ups through flowing sequences, ending in restorative poses. Suitable for all levels, from beginners to advanced practitioners. Leave feeling centered, energized, and more mobile. 75 minutes, 4x per week.
Trainer: Sarah
Price: $89

Class 3: HIIT Bootcamp
Description: High-intensity interval training designed to torch calories and build cardiovascular endurance. Led by Coach James, an NASM-certified personal trainer specializing in functional fitness. This class alternates intense exercise bursts with recovery periods, targeting total-body conditioning without equipment requirements. Expect dynamic movements, minimal rest, and a supportive team environment pushing you to personal bests. For intermediate to advanced athletes seeking rapid fitness gains. 45 minutes, 4x per week.
Trainer: Coach James
Price: $109

Class 4: Boxing Basics & Cardio
Description: Learn striking technique, footwork, and combinations while getting an incredible cardiovascular workout. Led by Coach Rico, a former professional boxer and certified trainer with 15+ years of ring experience. This class builds hand-eye coordination, confidence, and explosive power through boxing drills adapted for group fitness. No sparring or contact; focus is on form, speed, and conditioning. Perfect for stress relief and full-body cardio endurance. Accessible to beginners; advanced options available. 60 minutes, 3x per week.
Trainer: Coach Rico
Price: $99
```

**Executor Instructions:**
- For Tasks 04-02: Insert each class's name in the `<h4>` tag of each card
- Insert description (with trainer name integrated or separate) in the `<p>` tag
- Update price if different from $99
- Preserve all HTML structure and WOW animations

---

### 2. Weekly Schedule (Monday–Sunday)

Each day requires:
- **Day of Week** (Monday–Sunday)
- **Time** (e.g., "9:00 AM")
- **Class Name** (must match one of the 4 classes above, or another real GripGym class)
- **Duration** (e.g., "9:00 to 10:00 AM")
- **Room Number** (e.g., "Room 210", "Room 1", "Room Studio B")

**Format Example:**

```
Monday:
9:00 AM | Power Lifting Fundamentals | 9:00 to 10:00 AM | Room 210
10:30 AM | HIIT Bootcamp | 10:30 to 11:15 AM | Room 105
5:00 PM | Boxing Basics & Cardio | 5:00 to 6:00 PM | Room 1
6:30 PM | Yoga Flow & Flexibility | 6:30 to 7:45 PM | Room Studio A

Tuesday:
9:00 AM | Yoga Flow & Flexibility | 9:00 to 10:15 AM | Room Studio A
5:00 PM | Power Lifting Fundamentals | 5:00 to 6:00 PM | Room 210
6:30 PM | HIIT Bootcamp | 6:30 to 7:15 PM | Room 105

Wednesday:
10:00 AM | HIIT Bootcamp | 10:00 to 10:45 AM | Room 105
5:00 PM | Boxing Basics & Cardio | 5:00 to 6:00 PM | Room 1
6:30 PM | Power Lifting Fundamentals | 6:30 to 7:30 PM | Room 210

Thursday:
9:00 AM | Power Lifting Fundamentals | 9:00 to 10:00 AM | Room 210
5:00 PM | Yoga Flow & Flexibility | 5:00 to 6:15 PM | Room Studio A
7:00 PM | HIIT Bootcamp | 7:00 to 7:45 PM | Room 105

Friday:
10:00 AM | Boxing Basics & Cardio | 10:00 to 11:00 AM | Room 1
5:00 PM | HIIT Bootcamp | 5:00 to 5:45 PM | Room 105
6:30 PM | Power Lifting Fundamentals | 6:30 to 7:30 PM | Room 210

Saturday:
9:00 AM | Yoga Flow & Flexibility | 9:00 to 10:15 AM | Room Studio A
10:30 AM | HIIT Bootcamp | 10:30 to 11:15 AM | Room 105
2:00 PM | Boxing Basics & Cardio | 2:00 to 3:00 PM | Room 1

Sunday:
**PENDING USER CONFIRMATION (D-12):**
Option A (Open): Provide schedule (e.g., "9:00 AM Yoga Flow | 10:30 AM Power Lifting")
Option B (Closed): Confirm "Closed" for Sunday
```

**Executor Instructions:**
- For Task 04-03: Insert each time slot as a table row in the Schedule section
- Populate Day, Time, Class Name, and Room columns
- For Sunday, use user's decision from D-12 (open with schedule or "Closed" indicator)

**Volume Guidance:**
- Minimum: 24 slots (4 per day × 6 days, if Sunday closed)
- Maximum: 35 slots (5 per day × 7 days, if Sunday open)
- Current example has 22 slots (adjust based on actual GripGym schedule)

---

### 3. Sunday Status Confirmation (Decision D-12)

**User MUST confirm one of the following:**

**Option A: Gym Open on Sunday**
- Provide Sunday schedule (time slots, classes, rooms)
- Example: "9:00 AM Yoga | 10:30 AM Power Lifting | 2:00 PM Boxing"
- Executor will add Sunday row with real data

**Option B: Gym Closed on Sunday**
- Executor will add Sunday row with "Closed" or "-" indicator in time/class/room cells
- No additional data needed from user

**Default (if user doesn't respond):** Gym is closed on Sunday; Sunday row will display "Closed"

---

### 4. Schedule Section Intro Text (Optional)

Current placeholder: "Lorem Ipsum is simply dummy text of the printing industry..."

**User may optionally provide** a brief intro (~80–100 words) describing:
- Variety of class offerings
- Schedule flexibility or frequency
- Accessibility (all levels, beginner-friendly, etc.)
- Invitation to try a class

**Format Example:**

```
"Discover your fitness journey with GripGym's diverse class schedule. Whether you're a beginner looking to build strength or an advanced athlete seeking peak performance, we offer classes for every goal and experience level. From high-intensity HIIT to restorative yoga, our expert trainers guide you through transformative workouts in a supportive community. Classes run throughout the week with flexible morning, afternoon, and evening options. Start your free trial class today and find your fit."
```

**Executor Instructions:**
- If user provides intro text, replace Lorem Ipsum in Schedule section `<p>` tag
- If user does not provide, leave placeholder or executor may craft a generic intro

---

## Delivery Checklist (Before Executor Starts)

- [ ] **Class 1:** Name, description, trainer, price
- [ ] **Class 2:** Name, description, trainer, price
- [ ] **Class 3:** Name, description, trainer, price
- [ ] **Class 4:** Name, description, trainer, price
- [ ] **Monday–Friday Schedule:** Time, class name, duration, room (each time slot)
- [ ] **Saturday Schedule:** Time, class name, duration, room (each time slot)
- [ ] **Sunday Status:** Confirmed (open with times OR closed)
- [ ] **Schedule Intro Text:** Provided (optional; if not, executor will leave placeholder)

**Note:** User content is inserted by executor in Tasks 04-02 (classes) and 04-03 (schedule). Once content is provided, execution can begin immediately.

</content_handoff>

<threat_model>

## Trust Boundaries

| Boundary | Description | Risk Level |
|----------|-------------|-----------|
| User-supplied content (text) | Class descriptions, trainer names, schedule times entered into HTML | HIGH — XSS risk if user content contains scripts; mitigation: HTML entity encoding on user input before inserting into HTML |
| CSS background colors | Changes to section backgrounds using CSS tokens | LOW — tokens are hardcoded colors, no injection risk |
| Table data | Schedule times and class names are user-supplied text | MEDIUM — long text could overflow cells or break table layout; mitigation: test with realistic data sizes |

## STRIDE Threat Register

| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-04-01 | Tampering | User content (class descriptions) | Mitigate | Sanitize user input: ensure no `<script>` tags, remove special characters if needed before inserting into HTML. Executor should verify user supplies plain text, not formatted/executable content. |
| T-04-02 | Tampering | User content (schedule times) | Mitigate | Validate schedule time format (e.g., "9:00 AM", not arbitrary text). Ensure room numbers are alphanumeric (e.g., "Room 210", not "Room <script>"). |
| T-04-03 | Denial of Service | Table layout at 375px | Accept | Long table rows or very long class names could overflow. Mitigation: CSS `overflow-x: auto` allows scroll; user is instructed to keep class names/room numbers reasonable length (e.g., <30 chars). |
| T-04-04 | Information Disclosure | Class pricing | Accept | Price tags visible on cards ($99 per class). No sensitive data disclosed; public information. |
| T-04-05 | Integrity | CSS changes (font-weight, background colors) | Accept | CSS tokenization uses existing `--color-*` and `--fw-*` variables. No hardcoded colors or weights introduced; changes are consistent with Phase 1–3 design system. |
| T-04-06 | Tampering | CSS background token misapplication (D-04) | Mitigate | Schedule section background must use `var(--color-bg-secondary)`, not hardcoded color. Verification: Check CSS rule contains token reference; verify visually on desktop and mobile that dark background appears. Token value changes in Phase 5+ will auto-apply to Schedule section without re-edits. |
| T-04-SC | Tampering | HTML structure (card/table DOM) | Accept | Structure changes are internal only (adding cards 3–4, adding Sunday row). No user input directly modifies DOM structure; executor controls all structural changes. |

## Security Implementation Notes

- **Content handoff:** User supplies class names, descriptions, trainer names, schedule times as plain text (no HTML/markup). Executor inserts into HTML via text nodes (not `.innerHTML`), preventing XSS.
- **Data validation:** Executor should spot-check that user-supplied data is reasonable (no excessively long text, no special characters in room numbers).
- **CSS safety:** All CSS changes use existing design tokens; no new hardcoded values introduced. D-04 background color uses `var(--color-bg-secondary)` token (not hardcoded #aabbcc), ensuring consistency and future maintainability.
- **D-04 specific:** Schedule section background token reference ensures dark theme persists across all future phases without re-editing CSS rules.

</threat_model>

<verification>

## Phase 4 Verification Checklist

**Completion Criteria (ALL must be TRUE):**

- [ ] **CLASSES-01 satisfied:** Classes section background is dark (`--color-bg-secondary`), matching hero/about/services sections
- [ ] **CLASSES-02 satisfied:** 4 class cards present, each with real class name, description, and trainer name/info
- [ ] **SCHEDULE-01 satisfied:** Schedule table displays full week (Monday–Sunday) with real GripGym class times and room numbers
- [ ] **SCHEDULE-02 satisfied:** Schedule table is readable at 375px mobile viewport with horizontal scroll enabled
- [ ] **D-04 satisfied:** Schedule section background is dark (`--color-bg-secondary`), matching Classes section and overall dark theme
- [ ] **Content quality:** No Lorem Ipsum, placeholder text, or duplicate "9:00 AM Body Building" placeholder data remaining
- [ ] **CSS tokenization:** All hardcoded `font-weight: 500/700` replaced with `var(--fw-semibold/fw-bold)` in Classes and Schedule sections
- [ ] **Bug fixes:** Schedule `.box` max-width corrected from 100% to 50%
- [ ] **Mobile responsiveness:** Schedule table has `overflow-x: auto` at 767px breakpoint with `-webkit-overflow-scrolling: touch` for smooth mobile scroll
- [ ] **Animation preservation:** All WOW.js animations (`slideInLeft`, `slideInRight`, `bounceInUp`) still present in HTML and firing on scroll
- [ ] **Layout integrity:** No classes section or schedule layout breaks at desktop (1200px), tablet (767px), or mobile (375px) viewports
- [ ] **Accessibility:** Table remains semantic HTML; no structural changes break screen reader compatibility

**Git Status:** Only `index.html` and `css/style.css` modified. Ready for 5-commit workflow (one per task + SUMMARY).

</verification>

<success_criteria>

**Phase 4 is complete when:**

1. ✅ **Classes section visually redesigned:** Dark background (D-01), 4 real class cards with descriptions and trainer names, alternating image/text layout preserved
2. ✅ **Schedule section visually redesigned:** Dark background (D-04), 7-day table (Mon–Sun) with real GripGym class times, names, and room assignments
3. ✅ **Mobile responsiveness:** Schedule table horizontal scroll works smoothly at 375px viewport without text overflow or layout breaks (D-06)
4. ✅ **CSS modernization:** All hardcoded font-weights replaced with design tokens (D-08); dark backgrounds use token references (D-01, D-04); no inconsistencies with Phase 1–3 theming
5. ✅ **Animations intact:** WOW.js animations trigger correctly on all sections and cards across all viewports (D-09, D-10)
6. ✅ **No Lorem Ipsum:** All placeholder text replaced with real GripGym content (D-03, D-07, D-11)
7. ✅ **Sunday Status:** Schedule includes Sunday with real times (if open) or "Closed" indicator (if closed) per user confirmation (D-12)
8. ✅ **User hand-off ready:** Executor has documented what content was used; user can request edits in Phase 5 or later if needed

**Key Artifacts Verified:**
- `.classes` section: dark background (D-01), 4 cards (D-02), real content (D-03), animations preserved (D-09) ✅
- `.schedule` section: dark background (D-04), full-week table (D-05), real times/rooms (D-07), mobile scroll (D-06), animations preserved (D-10) ✅
- `css/style.css`: tokenized fonts (D-08), max-width fix (D-06), mobile media queries (D-06), dark background tokens (D-01, D-04) ✅

**All 12 locked decisions (D-01 through D-12) implemented and verified.**

</success_criteria>

<output>

**Commit Strategy (5 commits + 1 docs):**

```
1. feat(04-01): Classes section dark background + add 2 new cards

   - Change Classes section background from white to var(--color-bg-secondary)
   - Add Cards 3 and 4 to HTML (duplication of Cards 1–2 with alternating layout)
   - Preserve WOW.js animations on all 4 cards

2. feat(04-02): Replace class card descriptions with real GripGym content

   - Update all 4 class cards: names, descriptions, trainer info
   - Remove Lorem Ipsum; add real class names and descriptions
   - User-supplied content per Content Handoff (see below)

3. feat(04-03): Add Sunday to schedule + populate real class times

   - Add 7th day (Sunday) to schedule table
   - Replace all placeholder times with real GripGym weekly schedule
   - Populate class names, times, and room assignments per user data

4. refactor(04-04): Tokenize CSS, add schedule dark background, fix table mobile scroll

   - Replace hardcoded font-weights with CSS tokens (--fw-semibold)
   - Add Schedule section dark background (var(--color-bg-secondary)) — D-04
   - Fix Schedule max-width bug (100% → 50%) — D-06
   - Add mobile table scroll at 767px breakpoint with -webkit-overflow-scrolling — D-06
   - Implements: D-04 (schedule dark background), D-06 (mobile scroll), D-08 (tokenization)

5. docs(04-05): Verify animations, responsiveness, and completeness

   - Spot-check animations fire on scroll (WOW.js)
   - Test Schedule responsiveness at 375px (table scroll) and dark background visibility
   - Verify no Lorem Ipsum remains
   - Confirm all 7 schedule days visible with real data
   - Verify D-04 (Schedule dark background) visually and in CSS

6. docs(04): Phase 4 execution complete - SUMMARY.md

   - Created by executor after all 5 tasks complete
   - Documents decisions, patterns, and content used
   - Paths to Phase 5 or re-edits if needed
```

**Create `.planning/phases/04-classes-schedule/04-SUMMARY.md` when done with the format:**

```markdown
# Phase 4 Execution Summary

**Status:** Complete

**Artifacts Modified:**
- index.html (Classes section: 4 cards with dark background; Schedule section: 7-day table with dark background)
- css/style.css (Font tokens, mobile scroll, dark backgrounds for D-01 and D-04, max-width fix)

**Requirements Met:**
- ✅ CLASSES-01: Dark background applied to Classes section
- ✅ CLASSES-02: 4 real class cards with trainer info
- ✅ SCHEDULE-01: Full-week (7-day) real schedule
- ✅ SCHEDULE-02: Responsive at 375px with horizontal scroll

**Decisions Honored:**
- ✅ D-01: Classes section dark background (var(--color-bg-secondary))
- ✅ D-02: 4 class cards added
- ✅ D-03: Class card content replaced with real data
- ✅ D-04: Schedule section dark background (var(--color-bg-secondary))
- ✅ D-05: Sunday added to schedule table
- ✅ D-06: Mobile horizontal scroll implemented at 767px + max-width bug fixed
- ✅ D-07: Schedule times replaced with real data
- ✅ D-08: CSS font-weights tokenized
- ✅ D-09: Class card animations preserved
- ✅ D-10: Schedule section animations preserved
- ✅ D-11: Trainer info displayed in card text
- ✅ D-12: Sunday status confirmed (open/closed per user)

**Content Used:**
- 4 classes: [list names + description sources]
- Schedule: [describe source of times/rooms]

**Next Steps:** Phase 5 (Final Polish) or request Phase 4 edits
```

</output>

