---
phase: "03"
plan: "01"
type: execute
wave: "1-2"
depends_on: []
files_modified:
  - index.html
  - css/style.css
autonomous: false
requirements:
  - ABOUT-01
  - ABOUT-02
  - ABOUT-03
  - SERVICE-01
  - SERVICE-02
  - SERVICE-03
  - SERVICE-04
must_haves:
  truths:
    - "About section renders on dark background with three styled cards"
    - "All About card headings and descriptions are real GripGym content (no Lorem Ipsum)"
    - "Services accordion opens and closes correctly"
    - "All accordion items contain real service names and descriptions"
    - "\"Start Now\" button links to correct section anchor"
    - "WOW.js animations preserved on all cards and sections"
    - "Dark theme consistency applied across About and Services"
    - "All CSS font-weights and border colors tokenized"
  artifacts:
    - path: "index.html"
      provides: "About section with 3 real-content cards and animations"
      lines: "85–121"
    - path: "index.html"
      provides: "Services section with intro, accordion, and CTA button"
      lines: "125–185"
    - path: "css/style.css"
      provides: "About and Services styling with CSS tokens"
      lines: "281–413"
  key_links:
    - from: "index.html About section"
      to: "css/style.css .about class"
      via: "HTML/CSS binding"
    - from: "index.html Services section"
      to: "css/style.css .service class"
      via: "HTML/CSS binding"
    - from: "CSS font-weight values"
      to: ":root CSS custom properties"
      via: "var(--fw-semibold) token"
    - from: "CSS border colors"
      to: ":root CSS custom properties"
      via: "var(--color-border) token"
    - from: "Start Now button href"
      to: "target section id"
      via: "anchor navigation"
---

<objective>
Complete Phase 3 redesign of About and Services sections to match GripGym dark brand and include real content. Both sections have sound HTML structure and interactions already in place — this phase supplies genuine GripGym copy, applies dark theme tokenization, and connects the "Start Now" CTA to the visitor journey. No layout changes or component restructuring; focus is on content replacement and CSS polish.

Purpose: Build trust (About: "Who We Are") and drive engagement (Services: "What We Offer" + CTA)
Output: Updated index.html and css/style.css with real content, tokenized styles, and working CTA flow
</objective>

<execution_context>
@$HOME/.claude/gsd-core/workflows/execute-plan.md
@$HOME/.claude/gsd-core/templates/summary.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/ROADMAP.md
@.planning/phases/03-about-services/03-RESEARCH.md
@.planning/phases/03-about-services/03-CONTEXT.md
@.planning/phases/01-brand-foundation/01-SUMMARY.md
</context>

<tasks>

<task type="auto">
  <name>WAVE 1 — Task 03-01: Update About Card Descriptions with Real GripGym Content</name>
  <files>index.html</files>
  <action>
Replace all three About card Lorem Ipsum descriptions (lines 97–98, 108–109, 119–120) with real GripGym content. Preserve all HTML structure, classes, animation attributes (`wow bounceInUp`, `data-wow-delay`), image references, and card headings (already real: "Free Consultation", "Best Training", "Build Perfect Body").

**Card 1 (lines 88–101):** Replace `.text p` content — user supplies About copy for "Free Consultation" card
**Card 2 (lines 102–114):** Replace `.text p` content — user supplies About copy for "Best Training" card  
**Card 3 (lines 115–127):** Replace `.text p` content — user supplies About copy for "Build Perfect Body" card

**Content guidelines:**
- Each description: ~100–120 words (fit within card without overflow)
- Plain text only — no HTML tags
- Align with card title (Free Consultation = ease of entry, Best Training = quality, Build Perfect Body = results)

**HTML structure must remain unchanged:**
- Keep `<div class="box wow bounceInUp" data-wow-delay="...">` wrapper with animation classes and delays (0s, 0.2s, 0.4s)
- Keep image element: `<img src="images/aboutN.jpg" alt="about" />`
- Keep h4 card titles: "Free Consultation", "Best Training", "Build Perfect Body"
- Keep `.text` container structure and padding

**Placeholder content (user-supplied):**
- Card 1 body: {USER_ABOUT_CARD_1_BODY}
- Card 2 body: {USER_ABOUT_CARD_2_BODY}
- Card 3 body: {USER_ABOUT_CARD_3_BODY}

Per D-02 and D-03, layout and animation are locked; text content only changes.
  </action>
  <verify>
    <automated>grep -c "Lorem Ipsum" index.html | grep -q "^0$" && echo "PASS: No Lorem Ipsum in About" || echo "FAIL: Lorem still present"</automated>
    <automated>grep -c "bounceInUp" index.html | grep -q "^3$" && echo "PASS: 3 animations" || echo "FAIL: Animations missing"</automated>
    <automated>grep "data-wow-delay" index.html | wc -l | grep -q "^3$" && echo "PASS: 3 delays" || echo "FAIL: Delays missing"</automated>
  </verify>
  <done>
    ✅ All three About card descriptions updated with real GripGym content
    ✅ Card titles preserved ("Free Consultation", "Best Training", "Build Perfect Body")
    ✅ HTML structure intact (3 cards, animations, images)
    ✅ WOW.js animations preserved: `bounceInUp` on all cards
    ✅ Animation delays preserved: 0s, 0.2s, 0.4s
    ✅ No Lorem Ipsum in About section
  </done>
</task>

<task type="auto">
  <name>WAVE 1 — Task 03-02: Update Services Intro and Accordion Content with Real GripGym Copy</name>
  <files>index.html</files>
  <action>
Replace Services section Lorem Ipsum placeholder text with real GripGym content. Preserve all HTML structure, jQuery accordion binding, animations, and service names (already real: "Cardiovascular Equipment", "Strength Training Equipment", "Group Fitness Class", "Other Services").

**Services Intro (lines 127–132):**
- Replace two `.text p` paragraphs with real Services intro (~60–80 words total)
- Explain why GripGym offers these services and build confidence in the approach

**Accordion Items (4 items, lines 138–182):**
- Item 1 "Cardiovascular Equipment": Replace `.body p` with real description (~80–100 words)
- Item 2 "Strength Training Equipment": Replace `.body p` with real description (~80–100 words)
- Item 3 "Group Fitness Class": Replace `.body p` with real description (~80–100 words)
- Item 4 "Other Services": Replace `.body p` with real description (~80–100 words)

**HTML structure must remain unchanged:**
- Keep `.accordian-container` structure (4 items)
- Keep `.head` and `.body` hierarchy
- Keep first item with `.active` class (expanded by default)
- Keep Font Awesome icons: `fa-angle-down` (expanded) and `fa-angle-up` (collapsed)
- Keep `wow slideInLeft` and `wow slideInRight` animations
- Keep button structure (href set in Task 03-04)

**Content guidelines:**
- Intro: ~60–80 words explaining service philosophy
- Each accordion description: ~80–100 words describing the service
- Plain text only — no HTML tags

**Placeholder content (user-supplied):**
- Services intro: {USER_SERVICES_INTRO}
- Item 1 body: {USER_SERVICE_1_DESCRIPTION}
- Item 2 body: {USER_SERVICE_2_DESCRIPTION}
- Item 3 body: {USER_SERVICE_3_DESCRIPTION}
- Item 4 body: {USER_SERVICE_4_DESCRIPTION}

Per D-04 and D-05, layout and interaction are locked; text content only changes.
  </action>
  <verify>
    <automated>grep -c "Lorem Ipsum" index.html | grep -q "^0$" && echo "PASS: No Lorem Ipsum" || echo "FAIL: Lorem still present"</automated>
    <automated>grep -c "accordian-container" index.html | grep -q "^4$" && echo "PASS: 4 items" || echo "FAIL: Items missing"</automated>
    <automated>grep -c "slideInLeft\|slideInRight" index.html | grep -q "^2$" && echo "PASS: Animations" || echo "FAIL: Animations missing"</automated>
  </verify>
  <done>
    ✅ Services intro text updated with real GripGym copy
    ✅ All four accordion items updated with real descriptions
    ✅ Service names preserved ("Cardiovascular Equipment", "Strength Training Equipment", "Group Fitness Class", "Other Services")
    ✅ Accordion structure intact (4 items, first item active/expanded)
    ✅ WOW.js animations preserved (slideInLeft, slideInRight)
    ✅ Icons preserved (fa-angle-down/up)
    ✅ No Lorem Ipsum in Services section
  </done>
</task>

<task type="auto">
  <name>WAVE 2 — Task 03-03: Tokenize CSS Font Weights and Colors in About & Services</name>
  <files>css/style.css</files>
  <action>
Replace all hardcoded CSS font-weight values (hardcoded `500`) and color values in About and Services sections with CSS custom property tokens. This ensures design consistency and improves maintainability.

**CSS Replacements:**

1. **About section h4 font-weight (line ~306):**
   - Current: `.about .content .box .inner .text h4 { font-weight: 500; }`
   - Replace with: `font-weight: var(--fw-semibold);`

2. **Services section h2 font-weight (line ~332):**
   - Current: `.service .content .text h2 { font-weight: 500; }`
   - Replace with: `font-weight: var(--fw-semibold);`

3. **Services accordion item h4 font-weight (line ~391):**
   - Current: `.service .content .accordian-container .head h4 { font-weight: 500; }`
   - Replace with: `font-weight: var(--fw-semibold);`

4. **Services accordion border color (line ~404):**
   - Current: `.service .content .accordian-container .body { border-top: 1px solid #333333; }`
   - Replace with: `border-top: 1px solid var(--color-border);`

**Verification:**
- Phase 1 :root contains `--fw-semibold` (already defined in Phase 1)
- Phase 1 :root contains `--color-border` (already defined in Phase 1)
- No hardcoded `500` font-weight values remain in About/Services sections
- No hardcoded `#333333` color values remain in About/Services sections
- No visual change expected (token values match original hardcoded values)

Per D-07, CSS tokenization is locked; values are standardized via Phase 1 design system.
  </action>
  <verify>
    <automated>grep "font-weight: 500" css/style.css | grep -c "about\|service" && echo "FAIL: Hardcoded 500 still present" || echo "PASS: No hardcoded 500"</automated>
    <automated>grep "border-top: 1px solid #333333" css/style.css && echo "FAIL: Hardcoded #333333 still present" || echo "PASS: Border tokenized"</automated>
    <automated>grep -c "var(--fw-semibold)" css/style.css && echo "Font-weight token applied" || echo "FAIL: Token not applied"</automated>
  </verify>
  <done>
    ✅ About h4 font-weight changed to `var(--fw-semibold)`
    ✅ Services h2 font-weight changed to `var(--fw-semibold)`
    ✅ Services accordion h4 font-weight changed to `var(--fw-semibold)`
    ✅ Accordion border-top changed to `var(--color-border)`
    ✅ No other hardcoded values remain in About/Services
    ✅ CSS tokens already defined in Phase 1 :root
    ✅ No visual change (tokens match original values)
    ✅ Design system consistency achieved
  </done>
</task>

<task type="checkpoint:decision" gate="blocking">
  <decision>Where should the "Start Now" button in Services section link to?</decision>
  <context>
The "Start Now" button currently has an empty href. Three logical destinations:

1. **#classes** (DEFAULT per D-06) — Next section shows class schedule
   - Natural progression: "What we offer → When it happens"
   - Best for visitor exploration

2. **#price** — Pricing tiers and membership options
   - Immediate upsell path
   - Best for price-sensitive visitors

3. **#contact** — Contact form and inquiry
   - Direct engagement path
   - Best for interested visitors ready to ask questions

Default recommendation: **#classes** (natural visitor journey progression)
  </context>
  <options>
    <option id="option-classes">
      <name>Link to Classes section (#classes)</name>
      <pros>
        - Natural user flow progression
        - Visitor sees when/where classes run
        - Typical gym site structure
      </pros>
      <cons>
        - Longer journey before pricing/contact
      </cons>
    </option>
    <option id="option-price">
      <name>Link to Pricing section (#price)</name>
      <pros>
        - Immediate cost transparency
        - Captures price-sensitive visitors
      </pros>
      <cons>
        - Skips class schedule context
      </cons>
    </option>
    <option id="option-contact">
      <name>Link to Contact section (#contact)</name>
      <pros>
        - Direct visitor engagement
        - Captures inquiry-ready visitors
      </pros>
      <cons>
        - Skips pricing and schedule context
      </cons>
    </option>
  </options>
  <resume-signal>Select: option-classes (default), option-price, or option-contact</resume-signal>
</task>

<task type="auto">
  <name>WAVE 2 — Task 03-04: Set \"Start Now\" Button Anchor and Verify Navigation</name>
  <files>index.html</files>
  <action>
Set the "Start Now" button href attribute (line 133 in index.html) to connect Services to the next section. After checkpoint decision, update:

**Current:**
```html
<a href="" class="btn">Start Now</a>
```

**Update to checkpoint-selected destination (one of three):**

**Option A (#classes — DEFAULT):**
```html
<a href="#classes" class="btn">Start Now</a>
```

**Option B (#price):**
```html
<a href="#price" class="btn">Start Now</a>
```

**Option C (#contact):**
```html
<a href="#contact" class="btn">Start Now</a>
```

**Implementation:**
1. Locate "Start Now" button in Services section (line 133)
2. Replace empty `href=""` with chosen anchor
3. Verify target section exists with matching id
4. Test in browser: click button → smooth scroll to target section

**Per D-06:** Default is `#classes` unless user specifies otherwise.

**HTML changes minimal:**
- Only the href attribute value changes
- Button text remains "Start Now"
- Button class remains "btn"
- All button styling preserved
  </action>
  <verify>
    <automated>grep 'href="#' index.html | grep -q 'Start Now' && echo "PASS: Button href set" || echo "FAIL: Button href empty"</automated>
    <automated>grep 'id="classes"\|id="price"\|id="contact"' index.html && echo "PASS: Target section exists" || echo "FAIL: Target section not found"</automated>
  </verify>
  <done>
    ✅ "Start Now" button href set to checkpoint-selected anchor
    ✅ Target section with matching id exists
    ✅ Button text and styling preserved
    ✅ Smooth scroll behavior verified (no page reload)
    ✅ Visitor CTA flow connected: Services → Target section
  </done>
</task>

</tasks>

<threat_model>
## Trust Boundaries

| Boundary | Description | Severity |
|----------|-------------|----------|
| User content→HTML rendering | Placeholder text must fit card/accordion bounds | Medium |
| CSS tokens→browser rendering | Token values must match original hardcoded values | Low |
| Button href→target anchor | Anchor must reference existing section id | High |
| Animation trigger | WOW.js must fire on scroll | Low |

## STRIDE Threat Register

| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-03-01 | Tampering | HTML structure | Mitigate | Verify animation classes/delays preserved; grep for Lorem Ipsum post-replacement |
| T-03-02 | Information Disclosure | Content overflow | Mitigate | User provides ~100–120 word descriptions; test responsive at 375px/550px/767px |
| T-03-03 | Denial of Service | CSS parse error | Mitigate | Validate CSS syntax after tokenization; visual browser test |
| T-03-04 | Tampering | CSS token values | Mitigate | Verify Phase 1 tokens match original hardcoded values |
| T-03-05 | Tampering | Button anchor href | Mitigate | Verify target section exists before setting href; test click behavior |
| T-03-06 | Information Disclosure | Animation preservation | Mitigate | Test WOW.js animations on scroll in each section |
| T-03-07 | Repudiation | Decision tracking | Accept | Checkpoint captures user's button destination choice |
| T-03-08 | Information Disclosure | Responsive layout | Mitigate | Test at 375px, 550px, 767px viewports for overflow/alignment |

</threat_model>

<verification>
## Phase 3 Verification Checklist

### Content (Tasks 03-01, 03-02)
- [ ] All About card descriptions replaced with real GripGym content
- [ ] All Services intro and accordion descriptions replaced with real GripGym content
- [ ] `grep "Lorem Ipsum" index.html` returns 0 (no Lorem Ipsum in About or Services sections)
- [ ] Card titles preserved: "Free Consultation", "Best Training", "Build Perfect Body"
- [ ] Accordion item titles preserved: "Cardiovascular Equipment", "Strength Training Equipment", "Group Fitness Class", "Other Services"
- [ ] "Services" heading (h2) preserved

### HTML Structure (Tasks 03-01, 03-02)
- [ ] About section: 3 `.box` cards with `.bounceInUp` animations and 0s/0.2s/0.4s delays
- [ ] About section: Image elements intact with src="images/about1.jpg", about2.jpg, about3.jpg
- [ ] Services section: 4 `.accordian-container` items with `.head` and `.body` structure
- [ ] Services section: First accordion item has `.active` class (expanded by default)
- [ ] Services section: Icon elements present (fa-angle-down/up)
- [ ] Animations preserved: `wow slideInLeft` and `wow slideInRight` on Services

### CSS Tokenization (Task 03-03)
- [ ] About h4 font-weight: `var(--fw-semibold)` (no hardcoded 500)
- [ ] Services h2 font-weight: `var(--fw-semibold)` (no hardcoded 500)
- [ ] Services accordion h4 font-weight: `var(--fw-semibold)` (no hardcoded 500)
- [ ] Services accordion border: `var(--color-border)` (no hardcoded #333333)
- [ ] Phase 1 :root contains `--fw-semibold` and `--color-border` tokens
- [ ] CSS file parses without syntax errors

### Button CTA (Task 03-04)
- [ ] User confirmed button destination via checkpoint (option-classes, option-price, or option-contact)
- [ ] "Start Now" button href set to confirmed anchor (#classes, #price, or #contact)
- [ ] Target section exists with matching id attribute
- [ ] Button text and styling preserved
- [ ] Browser test: Click "Start Now" button → smooth scroll to target section
- [ ] No JavaScript errors in console on button click

### Visual & Responsive (All Tasks)
- [ ] About section renders on dark background
- [ ] Services section renders on dark background
- [ ] Cards/accordion visible without content overflow at 375px viewport
- [ ] Cards/accordion visible without content overflow at 550px viewport
- [ ] Cards/accordion visible without content overflow at 767px+ viewport
- [ ] Dark theme consistent across About and Services (matches hero, other sections)
- [ ] Card animations fire on scroll (WOW.js bounceInUp)
- [ ] Accordion animations fire on scroll (WOW.js slideIn)
- [ ] Accordion toggle works: click item → expands; click again → collapses
- [ ] Button hover state works (CSS .btn:hover preserved)

### Acceptance
- [ ] No Lorem Ipsum remaining anywhere in About or Services sections
- [ ] All user content (3 About descriptions, Services intro, 4 accordion descriptions) inserted
- [ ] All HTML structure preserved (no layout changes)
- [ ] All animations preserved (no interaction changes)
- [ ] CSS tokenized (design system compliance)
- [ ] Button CTA connected to correct destination
- [ ] Responsive layout intact
- [ ] Ready for next phase (Phase 4: Classes & Schedule)

</verification>

<success_criteria>
✅ **Content Complete:** About and Services sections contain real GripGym content (no Lorem Ipsum)
✅ **HTML Preserved:** All structure, animations, and interactions intact
✅ **CSS Tokenized:** Font weights and colors use design tokens (Phase 1 compliance)
✅ **CTA Connected:** "Start Now" button links to confirmed destination
✅ **Dark Theme:** About and Services match dark branding throughout site
✅ **Responsive:** Content and layout functional at 375px, 550px, 767px breakpoints
✅ **Animations Working:** WOW.js scroll triggers firing correctly
✅ **Acceptance Ready:** All requirements met; ready for Phase 4 execution
</success_criteria>

<content_handoff>
## Content Required Before Phase 3 Execution

User must supply the following content pieces before tasks can be completed:

### 1. About Card Descriptions (3 total — Task 03-01)

**Card 1: "Free Consultation"**
- ~100–120 words describing why consultation is the first step
- Example: "At GripGym, we believe every member's journey starts with a conversation. Our free consultation helps us understand your fitness goals, current level, and timeline for results..."

**Card 2: "Best Training"**
- ~100–120 words describing training quality, coaching, or methodology
- Example: "Our training programs are built by certified coaches with years of experience. Every workout is structured for progressive strength gains..."

**Card 3: "Build Perfect Body"**
- ~100–120 words describing results or body composition benefits
- Example: "Results matter. Our holistic approach combines smart training, nutrition guidance, and accountability to help you build the physique you've always wanted..."

### 2. Services Intro Text (Task 03-02)
- ~60–80 words (can be 1–2 paragraphs)
- Describe service philosophy or why GripGym offers these specific services
- Example: "We offer a comprehensive range of services designed to meet every fitness level and goal. From cardio and strength training to group classes and personalized coaching..."

### 3. Accordion Item Descriptions (4 total — Task 03-02)

**Item 1: "Cardiovascular Equipment"**
- ~80–100 words describing cardio equipment, its benefits, training support
- Example: "Our state-of-the-art cardio equipment includes treadmills, stationary bikes, rowing machines, and ellipticals. Equipment is well-maintained, with varied programming options..."

**Item 2: "Strength Training Equipment"**
- ~80–100 words describing strength equipment, quality, variety, coaching support
- Example: "We pride ourselves on a comprehensive range of strength training equipment: free weights, resistance machines, cable stations, and functional training zones..."

**Item 3: "Group Fitness Class"**
- ~80–100 words describing group classes, types, energy, community benefits
- Example: "Join our high-energy group fitness classes led by certified instructors. We offer everything from HIIT and strength circuits to yoga and mobility work..."

**Item 4: "Other Services"** (or rename to specific service)
- ~80–100 words describing additional services (personalized coaching, nutrition, assessments, etc.)
- Example: "Beyond equipment and classes, we offer personalized coaching, nutrition counseling, fitness assessments, and goal-setting workshops..."

### 4. Button CTA Decision (Task 03-04 — via Checkpoint)
User must confirm which section "Start Now" button should link to:
- **Option A (DEFAULT):** `#classes` — Link to Classes section
- **Option B:** `#price` — Link to Pricing section
- **Option C:** `#contact` — Link to Contact section

---

**Handoff Format:**
Provide all 8 content pieces (3 About + 1 Services intro + 4 accordion items) via text file or direct message. Planner inserts each into corresponding HTML placeholders, preserving all structure.

**File Impact:**
- `index.html`: Lines 97–98, 108–109, 119–120 (About descriptions), 130–132 (Services intro), 145–147, 153–155, 161–163, 169–171 (accordion descriptions), 133 (button href)
- `css/style.css`: Lines ~306, ~332, ~391, ~404 (tokenization changes)

**Commit Strategy:** 4 commits (one per task) + 1 docs commit (SUMMARY.md)
- Commit 1: `content(03-01): update about card descriptions`
- Commit 2: `content(03-02): update services intro and accordion`
- Commit 3: `refactor(03-03): tokenize css for about and services`
- Commit 4: `feat(03-04): set start now button anchor to [destination]`
- Commit 5: `docs(03): add phase 3 summary`

</content_handoff>

<output>
Create `.planning/phases/03-about-services/03-SUMMARY.md` after all tasks complete
</output>
