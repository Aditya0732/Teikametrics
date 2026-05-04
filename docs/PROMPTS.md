# AI Prompts & Conversations

This document records the important AI-assisted prompts and their outcomes used during development.

---

## Prompt 1 — Project Planning & Architecture

**Tool:** GitHub Copilot (Claude Opus 4.6) in VS Code Chat

**Prompt Summary:**
> Analyzed the full assignment brief and existing starter code. Asked Copilot to create a detailed implementation plan with production-level folder structure, architectural decisions, and step-by-step phases.

**Key Decisions Made:**
- React Router v6 for URL state management (cleaner than manual history.replaceState)
- Side panel for detail view (preserves list context)
- Tailwind CSS for all new styles (bonus credit)
- 300ms debounce on search
- Request counter pattern for stale async handling
- Folder structure: components/, hooks/, services/ separation

**Outcome:** Comprehensive plan with 9 phases, 35+ steps, covering all required + stretch features.

---

## Prompt 2 — Phase 1 Implementation (Foundation & Infrastructure)

**Tool:** GitHub Copilot (Claude Opus 4.6) in VS Code Chat

**Prompt Summary:**
> Implement Phase 1: install dependencies, create all hooks (useDebounce, useUrlState, useProjects, useKeyboardShortcut), create projectService, set up BrowserRouter.

**Outcome:** (to be updated as implementation proceeds)

---

## Prompt 3 — UI/UX Redesign (Linear/Notion-inspired)

**Tool:** GitHub Copilot (Claude Opus 4.6) in VS Code Chat

**Prompt Summary:**
> The initial design looked amateur — status buttons were dark/light toggles, tags were flat sprawling pills, search had a visible label wasting space. Asked Copilot to redesign all components taking inspiration from Linear, Notion, and modern dashboards.

**Key Changes:**
- SearchInput: inline search icon, `/` keyboard hint, clear button, no visible label
- StatusFilter: iOS-style segmented control with color dots
- TagFilter: dropdown popover with checkbox list instead of flat pills
- ProjectCard: compact with hover-reveal edit, better visual hierarchy
- App header: sticky blur backdrop, indigo brand mark
- Layout: responsive grid with detail panel as sticky sidebar

**Outcome:** Substantially improved visual quality and UX patterns.

---

## Prompt 4 — Bug Fixes & Google Careers Layout

**Tool:** GitHub Copilot (Claude Opus 4.6) in VS Code Chat

**Prompt Summary:**
> Fixed 3 bugs: (1) overlapping X icons on search input (browser native + custom), (2) status tab selected state not visible enough, (3) tag filter using AND instead of OR. Then redesigned the master-detail layout to Google Careers style — narrow scrollable list on left, wide detail panel on right. Added 6 more projects with long descriptions to fill the space.

**Key Changes:**
- Search input changed from `type="search"` to `type="text"` to remove browser native clear button
- Status tabs: added border + stronger shadow on selected tab
- Tag filter: `tags.every()` → `tags.some()` (AND → OR logic)
- Layout flipped: `lg:grid-cols-[340px_1fr]` (narrow list, wide detail)
- ProjectCard simplified to compact list item (title + meta only)
- ProjectDetail expanded with large title, meta bar with icons, info cards grid
- projects.json: 4 → 10 projects with 4+ sentence descriptions

**Outcome:** Layout matches Google Careers / LinkedIn job listing pattern — much better UX for browsing with detail.
