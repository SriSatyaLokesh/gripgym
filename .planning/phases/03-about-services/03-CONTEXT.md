# Phase 3 Context: About & Services

**Phase:** 03 — About & Services  
**Date Created:** 2026-07-20  
**Status:** Planned (awaiting user content)

## Phase Goal

Core "who we are" and "what we offer" sections match GripGym brand and contain real content.

## Phase Requirements

| Req ID | Description |
|--------|-------------|
| ABOUT-01 | About section redesigned with dark background |
| ABOUT-02 | Three About cards with real GripGym copy |
| ABOUT-03 | Card styling matches dark theme and existing sections |
| SERVICE-01 | Services section with accordion UI |
| SERVICE-02 | Real service names and descriptions |
| SERVICE-03 | Accordion opens/closes correctly |
| SERVICE-04 | "Start Now" CTA button present and clickable |

## Locked Decisions

### D-01: About Section Dark Theme
**Decision:** Apply `--color-bg-secondary` background to `.about` section, matching hero and other sections.  
**Rationale:** Phase 1 established dark-background override pattern; About needs consistent application.  
**Evidence:** RESEARCH.md §Codebase Audit notes `.about { background-color: ... override pending }`.

### D-02: About Cards Layout
**Decision:** Keep existing three-card layout (image-left, content-right per card); no layout changes.  
**Rationale:** Existing structure is semantically sound and responsive; focus on dark theme + content.  
**Evidence:** Current HTML structure in index.html lines 126-160 uses `<div class="about-card">` pattern.

### D-03: About Card Content
**Decision:** Replace all three card descriptions with real GripGym copy.  
**Requirement:** User must supply 3 card descriptions (~120 words each):
  - Card 1: "Who We Are" — GripGym mission/philosophy
  - Card 2: "Our Approach" — Training methodology or values
  - Card 3: "Why GripGym" — What makes GripGym unique
**Evidence:** RESEARCH.md §Content Gaps identifies placeholder text "Lorem Ipsum" requiring replacement.  
**Status:** ⏸️ BLOCKED on user content

### D-04: Services Accordion Structure
**Decision:** Keep existing accordion layout (left text column, right toggle list); no layout changes.  
**Rationale:** Accordion toggle is functional via jQuery `toggleClass('active')`; focus on content + styling.  
**Evidence:** RESEARCH.md confirms accordion toggle works; only content and CTA need updates.

### D-05: Services Copy
**Decision:** Replace Services section intro text and all four accordion descriptions with real GripGym copy.  
**Requirement:** User must supply:
  - Intro paragraph (~60 words): Why these services, what makes them special
  - 4 service descriptions (~80-100 words each):
    - Service 1: Name + description
    - Service 2: Name + description
    - Service 3: Name + description
    - Service 4: Name + description
**Evidence:** RESEARCH.md §Content Gaps identifies all placeholder text.  
**Status:** ⏸️ BLOCKED on user content

### D-06: Services "Start Now" CTA Button
**Decision:** Link "Start Now" button to `#classes` section.  
**Rationale:** Natural progression: About (who) → Services (what) → Classes (when/how).  
**Alternatives:** `#price` (immediate upsell) or `#contact` (direct contact); user to confirm.  
**Evidence:** Current button has empty `href` (lines 177–179 in index.html); needs assignment.  
**Status:** ⏸️ PENDING user confirmation

### D-07: CSS Tokenization
**Decision:** Tokenize hardcoded font weights in About and Services sections.  
**Changes:**
  - About card h4: `font-weight: 500` → `font-weight: var(--fw-semibold)`
  - Services h2: `font-weight: 500` → `font-weight: var(--fw-semibold)`
  - Services accordion item h4: `font-weight: 500` → `font-weight: var(--fw-semibold)`
  - Services accordion body: `border-top: 1px solid #333333` → `border-top: 1px solid var(--color-border)`
**Rationale:** Phase 1–2 established CSS token system; tokenization ensures maintainability.  
**Evidence:** RESEARCH.md §CSS Tokenization identifies all hardcoded values.

### D-08: About Cards Animations
**Decision:** Preserve existing WOW.js `bounceInUp` animations with staggered delays.  
**Implementation:** No changes to animation attributes; already correct in index.html.  
**Verification:** All `wow bounceInUp` classes and `data-wow-delay` preserved.

### D-09: Services Animation
**Decision:** Preserve existing slide-in animations on Services section and accordion items.  
**Implementation:** No changes to animation attributes.  
**Verification:** `wow slideInLeft` and `wow slideInRight` preserved.

### D-10: Responsive Behavior
**Decision:** No layout changes to About/Services in Phase 3; responsive behavior inherited from template.  
**Rationale:** Existing breakpoints (991px, 767px, 550px, 479px, 400px) handle About/Services; mobile testing at execution time.  
**Note:** If responsive issues found during execution, Phase 3 tasks include responsive fixes.

### D-11: Button CTA Assignment
**Decision:** User to confirm "Start Now" button destination from three options:
  1. `#classes` — Natural progression
  2. `#price` — Immediate pricing upsell
  3. `#contact` — Direct contact path
**Default:** `#classes` unless user specifies otherwise.  
**Status:** ⏸️ PENDING user input (Task 03-04 scope)

## Scope Fence

**IN SCOPE for Phase 3:**
- Replace About card descriptions (user to supply)
- Replace Services intro and accordion text (user to supply)
- Set "Start Now" button anchor (user to confirm)
- Tokenize CSS font weights and colors
- Preserve all animations and interactions

**OUT OF SCOPE for Phase 3:**
- Layout changes to About/Services
- New card styles or card count changes
- Accordion UI overhaul (jQuery toggle is sufficient)
- Mobile-specific breakpoint tuning (handled in Phase 6)

## Content Blockers

**User Input Required (before Phase 3 Execution):**

1. **About Card Descriptions (3 total)**
   - Card 1 headline + description: "Who We Are"
   - Card 2 headline + description: "Our Approach"
   - Card 3 headline + description: "Why GripGym"
   - Recommended length: 120 words each

2. **Services Intro Paragraph**
   - Headline (if needed) + intro text (~60 words)
   - Example: "Discover the full range of services we offer to maximize your fitness journey"

3. **Services Accordion Items (4 total)**
   - Service 1 name + description (~80-100 words)
   - Service 2 name + description (~80-100 words)
   - Service 3 name + description (~80-100 words)
   - Service 4 name + description (~80-100 words)

4. **"Start Now" Button Destination**
   - User to confirm: `#classes`, `#price`, or `#contact`

## Key Decisions Summary

| ID | Decision | Status |
|----|----------|--------|
| D-01 | Apply dark theme to About section | ✅ Locked |
| D-02 | Keep About card layout unchanged | ✅ Locked |
| D-03 | Replace About content with real copy | ⏸️ Blocked on content |
| D-04 | Keep Services accordion layout unchanged | ✅ Locked |
| D-05 | Replace Services copy with real content | ⏸️ Blocked on content |
| D-06 | Services "Start Now" → `#classes` (default) | ⏸️ Pending user confirmation |
| D-07 | Tokenize CSS font weights and borders | ✅ Locked |
| D-08 | Preserve About animations (WOW.js) | ✅ Locked |
| D-09 | Preserve Services animations | ✅ Locked |
| D-10 | Responsive behavior inherited from template | ✅ Locked |
| D-11 | User confirms button destination | ⏸️ Pending user input |

---

**Context Created:** 2026-07-20  
**Next Step:** User supplies content → Planner creates PLAN.md → Executor implements Phase 3
