# Project Hub Lite

A small **Project Hub** UI where users browse internal projects, narrow the list with search and filters, and open a detail view — built with React 18 + TypeScript + Vite.

## How to run and test

```bash
npm install        # Install dependencies
npm run dev        # Start dev server → http://localhost:5173
npm run build      # Production build
npm test           # Run tests once (5 tests)
npm run test:watch # Run tests in watch mode
```

Requires **Node 20+**.

## Assumptions

I interpreted "tags filter" as a multi-select with OR logic: selecting multiple tags shows projects matching **any** selected tag. CRUD uses in-memory state only (no localStorage persistence), as the brief leaves persistence depth to the candidate. Simulated API delay is 800ms to make the loading state clearly visible.

## Debounce

**300ms** — the search input is debounced at 300 milliseconds before updating the filtered project list.

## Focus

When a project is selected, keyboard focus moves programmatically to the detail panel via `detailRef.current.focus({ preventScroll: true })` on a `tabIndex={-1}` container with `role="region"` and `aria-label` for screen-reader announcement.

## Keyboard shortcuts

- **`Ctrl+K`** or **`/`** — Focus the search input
- **`Escape`** — Close the detail panel (or close the slideover if open)

## AI and verification

### Tools
GitHub Copilot (Claude Opus 4.6) in VS Code Chat — used for planning, architecture, component scaffolding, and test writing.

### Prompt links
All prompts were conducted in VS Code Copilot Chat (no shareable URL available — tool has no share link feature). Full prompt details, summaries, and outcomes are documented in **[docs/PROMPTS.md](docs/PROMPTS.md)**.

Key exchanges (see PROMPTS.md for full detail):

1. **Architecture & planning** — Full assignment brief → production-level implementation plan with folder structure and phased approach.
2. **Component implementation** — Built all UI components (FilterBar, ProjectList, ProjectDetail, states, slideover) with Google Careers–style layout.
3. **Test writing** — 5 behavioral RTL tests covering debounce, URL state, empty state, and keyboard shortcuts.
4. **UI polish & stub integration** — Framer Motion animations, Teikametrics typography, responsive design, and `ui-stub` component integration.
5. **Bug fixes & iteration** — Multiple rounds of fixes for scrolling, focus, tag logic, layout stability, and button styling.

### Verify
Three concrete things I **did not** trust until I verified them:

1. **Debounce timing in tests** — Verified that `vi.advanceTimersByTimeAsync()` correctly advances both the debounce timer and the simulated API delay by running tests and confirming assertions match expected behavior.
2. **URL state restoration** — Manually tested in the browser by navigating to `http://localhost:5173/?status=active&selected=ads-console` and confirming filters and detail panel restore correctly on page refresh.
3. **Focus management** — Verified in the browser that selecting a project card moves keyboard focus to the detail panel by checking focus outline and tabbing behavior with DevTools.

### Course-correct
The initial implementation used `forwardRef` directly on the `Card` stub component to pass a ref. TypeScript errored because `Card` doesn't forward refs. Instead of modifying the ui-stub (which represents an external design system), I wrapped the `Card` in a plain `<div>` that receives the ref and focus attributes, keeping the stub untouched.

## Optional stretch

- **Create project** — Click "+ New project" in the header to open a slideover form. Fill in title, description, status, owner, and tags, then submit. The project appears in the list immediately.
- **Update project** — Click "Edit" on any project card, or "Edit" in the detail panel. Both open the slideover pre-filled with the project's current data. Changes reflect immediately in-memory.

## Bonus (Tailwind)

**Used** — All new component styles use Tailwind CSS utility classes exclusively. The existing `ui-stub.css` provides base design-system tokens; Tailwind handles responsive layout, status badges, tag pills, focus rings, loading skeletons, animations, and the slideover panel. No additional plain CSS was written for new features.

## Project structure

- `src/components/` — UI components (ProjectCard, ProjectDetail, FilterBar, Slideover, etc.)
- `src/hooks/` — Custom hooks (useUrlState, useProjects, useDebounce, useKeyboardShortcut)
- `src/services/` — Mock API layer with simulated delay
- `src/data/` — Static project data (projects.json)
- `src/ui-stub/` — Design system primitives (Button, Card, Text, Stack)
- `src/test/` — Test setup

## Path alias

`@/` maps to `src/` (configured in `vite.config.ts` and `tsconfig.json`).