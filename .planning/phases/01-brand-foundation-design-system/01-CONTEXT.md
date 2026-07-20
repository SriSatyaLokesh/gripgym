# Phase 1: Brand Foundation & Design System — Context

**Gathered:** 2026-07-20
**Status:** Ready for planning
**Source:** Project initialization + inline research (no discuss-phase)

<domain>
## Phase Boundary

Phase 1 delivers the GripGym CSS design system foundation. This means: CSS custom properties defined in `:root`, Google Fonts loaded via HTML `<link>`, the page `<title>` and meta description updated to GripGym, and base dark-theme overrides applied to the five sections that currently have white/light backgrounds. Full per-section redesigns (hero copy, card layouts, accordion content, gallery, etc.) are NOT in scope — those happen in Phases 2–6. Phase 1 is purely about establishing the design token layer and making the base site "not white."

</domain>

<decisions>
## Implementation Decisions

### Typography
- **D-01:** Use **Bebas Neue** (Google Fonts) for `h1` hero headline only — all-caps display font, 400 weight only
- **D-02:** Use **Barlow Condensed** (Google Fonts) for `h2`, `h3`, nav links, labels — condensed athletic feel, weights 400/600/700/900
- **D-03:** Use **Inter** (Google Fonts) for body text (`p`, `li`, form inputs, table content) — replaces Open Sans
- **D-04:** Fonts loaded via `<link>` preconnect + stylesheet tags in HTML `<head>` (NOT via CSS `@import`)
- **D-05:** Remove the two existing `@import` font lines from `style.css` in the same commit that adds the HTML `<link>` tags

### Color Palette (CSS Custom Properties)
- **D-06:** All colors defined as CSS custom properties in `:root {}` in `style.css`
- **D-07:** Background: `--color-bg-primary: #0f0f0f` (main page), `--color-bg-secondary: #1a1a1a` (section BG), `--color-bg-surface: #242424` (cards/accordions)
- **D-08:** Accent: `--color-primary: #e8192c` (brighter, energetic red), `--color-primary-dark: #b0111f` (hover state)
- **D-09:** Text: `--color-text-base: #f0f0f0` (body/headings), `--color-text-muted: #8a8a8a` (secondary text), `--color-text-on-accent: #ffffff` (text on red backgrounds)
- **D-10:** Borders: `--color-border: #2e2e2e`, `--color-border-light: #444444`

### CSS Architecture
- **D-11:** `:root {}` block inserted immediately after all `@import` lines and before the first rule set in `style.css`
- **D-12:** Dark-theme overrides added as a dedicated `/* ===== Dark Theme Overrides ===== */` section at the end of `style.css`, before the `/* Responsive */` block
- **D-13:** Do NOT restructure or reorder existing CSS rules — only add/update specific properties
- **D-14:** Use `var(--token-name)` syntax throughout; fallback values optional (CSS custom properties have >97% browser support)

### Sections Needing Dark Overrides (Phase 1 only)
- **D-15:** Five sections have hardcoded white/light backgrounds that must be overridden: `.about`, `.classes`, `.price-package`, `.schedule` (implicit white), `.gallery` (implicit white)
- **D-16:** Eleven text-color selectors with `#000000` or `#222222` must be updated on those sections (see RESEARCH.md Section 5 for full list)
- **D-17:** Already-dark sections (`header`, `.service`, `.contact`, `.start-today`) — only update to use CSS tokens (e.g., `#000000` → `var(--color-bg-primary)`), no visual change

### Branding
- **D-18:** All instances of "Fitness Club" in `index.html` replaced with "GripGym"
- **D-19:** `<title>` updated to "GripGym — Train Harder. Grip Stronger."
- **D-20:** `<meta name="description">` added with GripGym gym tagline copy
- **D-21:** Font Awesome CDN link left in place; no changes to icon usage in Phase 1

### WOW.js / Animate.css
- **D-22:** No changes to `js/wow.min.js` or `css/animate.css` — animations are unaffected by dark theme CSS changes
- **D-23:** The existing `.wow:first-child { visibility: hidden; }` inline style in `<head>` must be preserved

### Claude's Discretion
- Exact order of the CSS token additions within the `:root` block
- Whether to move Font Awesome from `@import` to a `<link>` tag (not required by requirements, do if tidy)
- Exact wording of the meta description (no user-supplied copy yet — use placeholder "GripGym | Your Strength. Your Gym. Your Life.")

</decisions>

<specifics>
## Specific Ideas

- Font combination: Bebas Neue + Barlow Condensed + Inter (research-verified gym brand stack)
- The existing red accent `#c11325` should be replaced with `#e8192c` (brighter, more energetic)
- `#0f0f0f` preferred over pure `#000000` for page background (avoids harsh edge artifacts)
- `#f0f0f0` preferred over pure `#ffffff` for text (reduces halation on OLED screens, passes WCAG AA)
- Google Fonts combined `<link>` URL: `https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;600;700;900&family=Inter:wght@400;500;600&display=swap`

</specifics>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project Scope & Requirements
- `.planning/PROJECT.md` — project context, constraints, decisions log
- `.planning/REQUIREMENTS.md` — full v1 requirements; Phase 1 covers BRAND-01 to BRAND-05

### Phase Research
- `.planning/phases/01-brand-foundation-design-system/01-RESEARCH.md` — full technical audit of existing CSS, exact selector list for dark overrides, font verification, WOW.js compatibility analysis

### Source Files to Modify
- `index.html` — HTML title, meta, font link tags, and "Fitness Club" text occurrences
- `css/style.css` — `:root` block, font changes, dark theme overrides

</canonical_refs>

<code_context>
## Existing Code Insights

### Current font loading (to be replaced)
`style.css` has two `@import` lines for Oswald and Open Sans — both must be removed.
The `*` selector sets `font-family: 'Oswald', sans-serif` globally — update to `var(--font-heading)`.
Known bug: `'Open-sans'` (hyphenated) appears in multiple rules — was silently failing. Replace with `var(--font-body)`.

### Sections already dark (token-update only, no visual change)
`header` uses `#000000` → update to `var(--color-bg-primary)`.
`.about .content .box .inner` uses `#222222` → update to `var(--color-bg-surface)`.
`.start-today` uses `#222222` → update to `var(--color-bg-surface)`.
`.contact` uses `#222222` → update to `var(--color-bg-surface)`.

### WOW.js inline style preservation
`<style>.wow:first-child { visibility: hidden; }</style>` is in the `<head>` — must not be removed.

</code_context>
