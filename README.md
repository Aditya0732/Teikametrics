# Project Hub Lite

A small **Project Hub** UI where users browse internal projects, narrow the list with search and filters, and open a detail view — built with React 18 + TypeScript + Vite.

## Quick start

```bash
npm install        # Install dependencies
npm run dev        # Start dev server → http://localhost:5173
npm run build      # Production build
```

## Testing

```bash
npm test           # Run tests once (5 tests)
npm run test:watch # Run tests in watch mode
```

Use **Node 20+** (see `.nvmrc`).

## What is included

- Vite + React 18 + TypeScript
- **React Router v6** — URL state management via `useSearchParams`
- **Tailwind CSS** — utility-first styling for all new components
- Mock data: `src/data/projects.json` (includes `tags: string[]` per project)
- Stub UI primitives: `src/ui-stub/` (import from `@/ui-stub`)
- Vitest + React Testing Library + user-event (`npm test`)

## Path alias

`@/` maps to `src/` (see `vite.config.ts` and `tsconfig.json`).

## Assumptions

I interpreted "tags filter" as a multi-select (OR logic): selecting multiple tags shows projects that have **any** of the selected tags. The CRUD stretch uses in-memory state only (no localStorage), as the brief leaves persistence depth to the candidate. The simulated API delay is 800ms to make loading state clearly visible.

## Debounce

**300ms** — search input is debounced at 300 milliseconds before updating the filtered list.

## Focus

When a project is selected, keyboard focus moves to the detail panel via a `ref` with `tabIndex={-1}` and `detailRef.current?.focus()`. The detail region has `role="region"` and `aria-label` for screen reader announcement.

## AI and verification

### Tools
GitHub Copilot (Claude Opus 4.6) in VS Code Chat — used for planning, architecture, component scaffolding, and test writing.

### Prompt links
All prompts were conducted in VS Code Copilot Chat (no shareable URL available). Key exchanges:

1. **Architecture & planning** — Provided the full assignment brief and asked for a detailed implementation plan with folder structure, architectural decisions, and phased approach. Output: 9-phase plan with 35+ steps.
2. **Phase 1 implementation** — Asked to implement the infrastructure layer (hooks, services, router setup) following the plan.
3. **Component implementation** — Asked to build all UI components (FilterBar, ProjectList, ProjectDetail, states, slideover) and wire them in App.tsx.
4. **Test writing** — Asked to write 5 behavioral RTL tests covering debounce, URL state, empty state, and keyboard shortcuts.

### Verify
Three concrete things I **did not** trust until I verified them:

1. **Debounce timing in tests** — Verified that `vi.advanceTimersByTimeAsync()` correctly advances both the debounce timer and the simulated API delay by running tests and checking that assertions match expected behavior.
2. **URL state restoration** — Manually tested in the browser by navigating to `http://localhost:5173/?status=active&selected=ads-console` and confirming the filters and detail panel restore correctly on page refresh.
3. **Focus management** — Verified in the browser that clicking a project card moves keyboard focus to the detail panel by checking the focus outline and tabbing behavior.

### Course-correct
The initial implementation used `forwardRef` directly on the `Card` stub component, passing a `ref` prop. TypeScript errored because `Card` doesn't forward refs. Instead of modifying the ui-stub (which represents an external design system), I wrapped the `Card` in a plain `<div>` that receives the ref and focus attributes, keeping the stub untouched.

## Keyboard shortcuts

- **`Ctrl+K`** or **`/`** — Focus the search input
- **`Escape`** — Close the detail panel / clear selection
- **`Escape`** (in slideover) — Close the create/edit slideover

## Optional stretch

- **Create project** — Click the "+ Create" button in the header to open a slideover form. Fill in title, description, status, owner, and tags, then submit. The new project appears at the top of the list.
- **Update project** — Click "Edit" on any project card in the list, or click "Edit project" in the detail panel. Both open the same slideover pre-filled with the project's current data. Changes are saved in-memory and reflected immediately.

## Bonus (Tailwind)

**Used** — All new component styles use Tailwind CSS utility classes. The existing `ui-stub.css` and `App.css` are kept for the design-system stubs and minimal shell layout respectively. Tailwind handles responsive grid layout (`md:grid-cols-[1fr_380px]`), status badges, tag pills, focus rings, loading skeletons, and the slideover.

## Version history

As you implement the assignment, preserve your work in **meaningful chunks** over the course of the exercise. Use the commit history to see how the app evolved.