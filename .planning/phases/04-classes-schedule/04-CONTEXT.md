# Phase 4 Context: Classes & Schedule

**Phase:** 04 — Classes & Schedule  
**Date Created:** 2026-07-20  
**Status:** Planned (awaiting user class/schedule data)

## Phase Goal

Visitors can see real class offerings and when they happen.

## Phase Requirements

| Req ID | Description |
|--------|-------------|
| CLASSES-01 | Classes section redesigned with dark background |
| CLASSES-02 | Class cards contain real names, descriptions, trainer info |
| SCHEDULE-01 | Schedule section displays real weekly timetable |
| SCHEDULE-02 | Schedule is responsive and readable at 375px mobile viewport |

## Locked Decisions

### D-01: Classes Section Dark Theme
**Decision:** Apply `--color-bg-secondary` background to `.classes` section, matching hero, About, Services.  
**Rationale:** Phase 1 established dark-background override pattern; Classes needs consistent application.  
**Evidence:** RESEARCH.md §Codebase Audit notes `.classes { background-color: #ffffff ... override needed }`.

### D-02: Classes Card Count
**Decision:** Expand from 2 cards to 4 minimum cards (one per class offering).  
**Rationale:** CLASSES-02 requires "at least 4 class cards"; only 2 exist currently.  
**Implementation:** Duplicate one existing card template to create 2 new cards (same HTML/CSS structure).  
**Evidence:** RESEARCH.md confirms "2 cards exist, need 4+".

### D-03: Classes Card Content
**Decision:** Replace all card content (class names, descriptions, trainer names) with real GripGym data.  
**Requirement:** User must supply 4 class cards (~100 words each):
  - Class 1: Name, description, trainer name
  - Class 2: Name, description, trainer name
  - Class 3: Name, description, trainer name
  - Class 4: Name, description, trainer name
**Evidence:** RESEARCH.md §Content Audit identifies placeholder text requiring replacement.  
**Status:** ⏸️ BLOCKED on user content

### D-04: Schedule Section Dark Theme
**Decision:** Apply `--color-bg-primary` (current) or review if dark override is needed. Current: light (`#ffffff`).  
**Rationale:** RESEARCH.md notes schedule has white background inconsistent with dark theme.  
**Implementation:** Add `background-color: var(--color-bg-secondary)` to `.schedule` section.  
**Evidence:** RESEARCH.md §Codebase Audit: "Schedule background is white, needs dark override".

### D-05: Schedule Format & Scope
**Decision:** Keep existing table format (Mon-Sat); add Sunday to complete full week.  
**Rationale:** Requirement specifies "full week"; current schedule is Mon-Sat (6 days).  
**Implementation:** Add Sunday column to schedule table with appropriate class times.  
**Alternative:** If Sunday is off-day, add empty Sunday row with "Closed" or "-" indicator.  
**Evidence:** RESEARCH.md confirms only Mon-Sat present; Phase 4 must add 7th day.  
**Status:** ⏸️ PENDING user confirmation (is gym open Sunday?)

### D-06: Schedule Mobile Responsiveness
**Decision:** Implement horizontal scroll table at 767px and 550px breakpoints for mobile readability.  
**Rationale:** RESEARCH.md notes "table is unreadable at 375px viewport"; current max-width bug causes horizontal overflow.  
**Implementation:** 
  - Add CSS breakpoint: `@media (max-width: 767px) { .schedule table { display: block; overflow-x: auto; } }`
  - Fix existing bug: `.box { max-width: 50% }` (currently 100%, should be 50% per layout intent)
**Evidence:** RESEARCH.md §Responsive Considerations: "Table unreadable at 375px; needs scroll strategy".

### D-07: Schedule Content
**Decision:** Replace all schedule placeholder times with real GripGym weekly class schedule.  
**Requirement:** User must supply real schedule data:
  - Format: Weekly timetable (Mon-Sun) with time slots
  - Content: Class name + room number for each time slot (e.g., "Body Building - Room 210")
  - Scope: All existing time slots (approximately 48-56 slots for 7 days × 7-8 hours)
**Evidence:** RESEARCH.md §Content Audit: all schedule data is placeholder.  
**Status:** ⏸️ BLOCKED on user content

### D-08: CSS Tokenization
**Decision:** Tokenize hardcoded font-weight values in Classes and Schedule sections.  
**Changes:**
  - Classes h3/h4: `font-weight: 500` → `font-weight: var(--fw-semibold)`
  - Schedule table headings: `font-weight: 700` → `font-weight: var(--fw-bold)` (if needed)
  - Schedule table data: `font-weight: 400` → `font-weight: var(--fw-regular)` (if present)
**Rationale:** Phase 1–3 established CSS token system; tokenization ensures maintainability.  
**Evidence:** RESEARCH.md §CSS Tokenization identifies hardcoded values.

### D-09: Classes Card Animations
**Decision:** Preserve or add WOW.js `bounceInUp` animations to class cards with staggered delays.  
**Implementation:** Check existing animations on class cards; preserve if present, add if missing.  
**Verification:** All class cards should have `wow bounceInUp` class with `data-wow-delay` staggered (0.2s increments).

### D-10: Schedule Animations
**Decision:** Preserve existing slide-in animations on Schedule section.  
**Implementation:** Keep existing `wow slideInLeft` or similar on schedule section; no changes.  
**Verification:** Animations fire on scroll.

### D-11: Trainer Information Display
**Decision:** Trainer names and specialties display in class card text (not separate field).  
**Format Example:** "High-Intensity Interval Training led by Coach Marcus - Expert in functional fitness"  
**Rationale:** Matches existing class card structure (name, description, trainer inline).  
**Flexibility:** User can supply trainer info in card description or separately; implementation will integrate.  
**Status:** ⏸️ PENDING user format confirmation

### D-12: Schedule Sunday Status
**Decision:** PENDING user confirmation:
  - **If gym is open Sunday:** Add real Sunday schedule
  - **If gym is closed Sunday:** Add row with "Closed" or "-" indicator
**Status:** ⏸️ USER DECISION REQUIRED

## Scope Fence

**IN SCOPE for Phase 4:**
- Change Classes section background to dark
- Add 2 more class cards (4 total)
- Replace all class card descriptions (user to supply)
- Add Sunday to schedule table or mark closed
- Replace all schedule times (user to supply)
- Tokenize CSS font weights
- Fix table max-width bug (50% vs 100%)
- Implement horizontal scroll for mobile tables
- Preserve all animations

**OUT OF SCOPE for Phase 4:**
- Layout changes to class cards or schedule table
- New card styles or interactive modals
- Trainer credential system or database
- Calendar/booking integration
- Schedule filtering or time slot selection UI

## Content Blockers

**User Input Required (before Phase 4 Execution):**

1. **Class Cards (4 total)** — Each ~100 words
   - Class 1: Name + description + trainer name/specialty
   - Class 2: Name + description + trainer name/specialty
   - Class 3: Name + description + trainer name/specialty
   - Class 4: Name + description + trainer name/specialty

2. **Weekly Schedule Data**
   - Full week (Mon-Sun) timetable
   - Each time slot: Class name + room number
   - Example: "9:00 AM | Body Building - Room 210"
   - Scope: All existing time slots in current table

3. **Sunday Status Confirmation**
   - Is GripGym open on Sundays?
   - If yes: provide Sunday schedule times
   - If no: indicate "Closed" for Sunday column

4. **Trainer Information Format** (optional user preference)
   - Should trainer names appear in class card text? (recommended)
   - Or should they appear separately? (not recommended for Phase 4)

## Key Decisions Summary

| ID | Decision | Status |
|----|----------|--------|
| D-01 | Classes section dark background | ✅ Locked |
| D-02 | Expand to 4 class cards | ✅ Locked |
| D-03 | Replace class card content | ⏸️ Blocked on content |
| D-04 | Schedule section dark background | ✅ Locked |
| D-05 | Add Sunday to schedule (or mark closed) | ⏸️ Pending user confirmation |
| D-06 | Mobile horizontal scroll for tables | ✅ Locked |
| D-07 | Replace schedule times | ⏸️ Blocked on content |
| D-08 | Tokenize CSS font-weights | ✅ Locked |
| D-09 | Preserve/add class card animations | ✅ Locked |
| D-10 | Preserve schedule animations | ✅ Locked |
| D-11 | Trainer info inline in card text | ✅ Locked |
| D-12 | Sunday schedule status | ⏸️ User decision |

---

**Context Created:** 2026-07-20  
**Next Step:** Planner creates PLAN.md with 5-6 tasks → Executor implements Phase 4
