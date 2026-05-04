# AI Prompts & Conversations

This document records all important AI-assisted prompts and their outcomes used during development of Project Hub Lite.

**Tool used:** GitHub Copilot (Claude Opus 4.6) in VS Code Chat (no shareable URL — VS Code Chat does not have a share link feature).

---

## Prompt 1 — Project Planning & Architecture

**Prompt:**
> "Here is the full assignment brief for Project Hub Lite [assignment-brief.md attached]. Analyze the existing starter code structure, then produce a detailed implementation plan — prioritizing production-level code quality, clean folder structure, and best practices throughout. Include architectural decisions, phased milestones, and rationale for each technology choice."

**Key Decisions Made:**
- React Router v6 for URL state management (cleaner than manual `history.replaceState`)
- Side panel for detail view (preserves list context)
- Tailwind CSS for all new styles (bonus credit)
- 300ms debounce on search
- Request counter pattern for stale async handling
- Folder structure: `components/`, `hooks/`, `services/` separation

**Outcome:** Comprehensive 9-phase plan with 35+ steps, covering all required + stretch features.

---

## Prompt 2 — Foundation & Infrastructure

**Prompt:**
> "Implement Phase 1: install dependencies (react-router-dom), create all hooks (useDebounce, useUrlState, useProjects, useKeyboardShortcut), create projectService with simulated API delay, set up BrowserRouter in main.tsx."

**Outcome:** All hooks and services created. `useUrlState` wraps `useSearchParams` for type-safe filter state. `useProjects` handles async fetch with loading/error states and stale-request cancellation.

---

## Prompt 3 — UI Component Implementation

**Prompt:**
> "Build all UI components: FilterBar (search + status + tags), ProjectList, ProjectCard, ProjectDetail, LoadingState, ErrorState, EmptyState. Wire everything in App.tsx with the master-detail layout."

**Outcome:** Full component tree implemented. Initial layout used a basic grid with detail on right.

---

## Prompt 4 — UI/UX Redesign (Linear/Notion-inspired)

**Prompt:**
> "The design looks amateur. Redesign all components taking inspiration from Linear, Notion, and modern dashboards. Make it look professional."

**Key Changes:**
- SearchInput: inline search icon, `/` keyboard hint, clear button, no visible label
- StatusFilter: iOS-style segmented control with color dots
- TagFilter: dropdown popover with checkbox list instead of flat pills
- ProjectCard: compact with hover-reveal edit, better visual hierarchy
- App header: sticky blur backdrop with indigo brand mark
- Layout: responsive grid with detail panel as sticky sidebar

**Outcome:** Substantially improved visual quality and UX patterns.

---

## Prompt 5 — Bug Fixes & Google Careers Layout

**Prompt:**
> "Fix bugs: (1) double X on search (browser native + custom), (2) status tab selected not visible, (3) tag filter AND → OR. Then redesign layout to Google Careers style — narrow list left, wide detail right. Add more projects with longer descriptions."

**Key Changes:**
- Search input: `type="search"` → `type="text"` to remove native clear button
- Status tabs: stronger border + shadow on selected
- Tag filter: `tags.every()` → `tags.some()` (AND → OR)
- Layout: `lg:grid-cols-[340px_1fr]` (narrow list, wide detail)
- projects.json: 4 → 10 projects with 7–8 sentence descriptions

**Outcome:** Google Careers / LinkedIn job listing pattern — much better browsing UX.

---

## Prompt 6 — Scroll & Focus Fixes

**Prompt:**
> "Fix scrolling: detail should start at top when switching projects, list should be independently scrollable, reduce dead space above cards."

**Key Changes:**
- `focus({ preventScroll: true })` + `scrollTo(0, 0)` on detail panel
- `h-screen flex flex-col overflow-hidden` + `min-h-0 flex-1 overflow-y-auto` pattern
- Compact header padding

**Outcome:** Both panels scroll independently, detail always starts at top.

---

## Prompt 7 — Mobile Responsive Design

**Prompt:**
> "Make it responsive: on mobile, detail should be full-screen. List hidden when detail open. Compact header for small screens."

**Key Changes:**
- Detail full-screen on mobile (`hidden lg:block` on list when detail open)
- Header responsive: smaller padding, abbreviated labels on mobile
- "Back to list" button on mobile detail view

**Outcome:** Fully responsive mobile experience.

---

## Prompt 8 — Typography (Teikametrics Style)

**Prompt:**
> "Use Plus Jakarta Sans font to match Teikametrics website style. Increase font sizes to match their site."

**Key Changes:**
- Google Fonts: Plus Jakarta Sans (200–800 weight, italic)
- `tailwind.config.cjs`: `fontFamily.sans` → Plus Jakarta Sans
- `index.css`: `letter-spacing: -0.02em` on headings, antialiased rendering
- Font sizes bumped across all components

**Outcome:** Professional typography matching the Teikametrics feel.

---

## Prompt 9 — Framer Motion Animations

**Prompt:**
> "Add Framer Motion animations: card enter/exit, detail panel transitions, dropdown open/close, slideover slide-in, empty state fade."

**Key Changes:**
- `AnimatePresence` + staggered card entry in ProjectList
- Detail panel: stable container with inner content crossfade (opacity 150ms)
- `LayoutGroup` for smooth list width expansion when detail closes
- TagFilter dropdown: scale + opacity animation
- Slideover: backdrop fade + panel slide from right
- EmptyState: fade-in

**Outcome:** Smooth, polished transitions throughout.

---

## Prompt 10 — Detail Panel Stability

**Prompt:**
> "Detail panel resizes/flickers when switching projects. Fix it so the container stays stable and only content crossfades."

**Key Changes:**
- Outer `motion.aside` keyed as `"detail-panel"` (never remounts)
- Inner `AnimatePresence mode="wait"` keyed to `project.id` for content-only crossfade
- Removed `mode="wait"` from outer AnimatePresence + added `layout` prop for list expansion

**Outcome:** Zero layout shift when switching projects.

---

## Prompt 11 — Conditional Card Behavior

**Prompt:**
> "In list-only view (no detail open), show 'View details →' and 'Edit' buttons on cards — card itself not clickable. In split view, entire card is clickable with no buttons."

**Key Changes:**
- `compact` prop on ProjectCard controls behavior
- `compact=false` (list-only): buttons visible, card not clickable
- `compact=true` (split): full card clickable via `onClick`, no buttons

**Outcome:** Context-appropriate interaction patterns.

---

## Prompt 12 — ui-stub Component Integration

**Prompt:**
> "We should use stub Button and other stub components wherever available and wherever we can use them."

**Key Changes:**
- ProjectCard: `Card`, `Button`, `Text`, `Stack` from ui-stub
- ProjectDetail: `Button`, `Text`, `Stack` from ui-stub
- App.tsx: `Button`, `Stack` from ui-stub
- Slideover: `Button` from ui-stub
- ProjectForm: `Button`, `Stack` from ui-stub
- Used `!important` Tailwind overrides to style stub components

**Outcome:** Design system primitives used consistently across all components.

---

## Prompt 13 — Copy Link Button + More Stub Integration

**Prompt:**
> "Add copy link button near New Project button. Use stub components in CopyLinkButton, StatusFilter, and SearchInput too."

**Key Changes:**
- CopyLinkButton added to header (uses `Button` variant="ghost")
- StatusFilter: wrapper → `Stack`, buttons → `Button` from ui-stub
- SearchInput: clear button → `Button`, hint → `Text` from ui-stub
- Header uses `Stack direction="row"` to wrap both buttons

**Outcome:** Stub components integrated in all remaining components.

---

## Prompt 14 — StatusFilter Tab Fix

**Prompt:**
> "We need to fix statusfilter tabs" (screenshot showing dark background on tabs)

**Key Changes:**
- Added `!bg-transparent` and `hover:!bg-transparent` to inactive tab buttons
- Issue: `.ph-btn` base CSS applies `background: #1e293b` which overrode Tailwind

**Outcome:** Tabs render correctly with transparent inactive state and white active state.

---

## Prompt 15 — Slideover Button Styling

**Prompt:**
> "In slideover the buttons should be similar to other buttons: they are grey here" (screenshot showing dark grey buttons)

**Key Changes:**
- Submit button: indigo-600 background matching header "New project" button
- Cancel button: white with slate border (outline style)
- Close (✕) button: white with light border, matching ghost pattern

**Outcome:** Consistent button styling across the entire app.

---

## Prompt 16 — Test Writing

**Prompt:**
> "Write 5 behavioral RTL tests: (1) renders project list, (2) debounced search filters after delay not immediately, (3) URL state persists filter selections, (4) keyboard shortcut Ctrl+K focuses search, (5) empty state when no matches."

**Key Changes:**
- Used `vi.useFakeTimers()` for debounce testing
- `MemoryRouter` with `initialEntries` for URL state test
- `userEvent.keyboard` for shortcut testing
- `waitForElementToBeRemoved` for async state transitions

**Outcome:** 5/5 tests passing consistently (Vitest + RTL + user-event).
