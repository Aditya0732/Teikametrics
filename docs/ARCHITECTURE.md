# Architecture

## Overview
Project Hub Lite follows a **feature-based component architecture** with clean separation of concerns:
- **Components** — presentational UI components (single responsibility)
- **Hooks** — reusable stateful logic (data fetching, URL sync, debounce, app state)
- **Services** — data access layer (simulated async API)
- **ui-stub** — shared design-system primitives (untouched)

## Design Principles
- **No file exceeds ~100 lines** — enforced via component/hook extraction
- **Separation of concerns** — state logic in hooks, layout in components, data in services
- **Composition over inheritance** — App.tsx is a thin shell composing smaller pieces
- **Single responsibility** — each file has one clear purpose

## Folder Structure
```
src/
├── components/             # All UI components
│   ├── AppHeader.tsx       # Top bar: logo, copy-link, new-project button
│   ├── FilterSection.tsx   # Filter bar + status count + keyboard hints
│   ├── MainContent.tsx     # Master-detail layout (list + detail panel)
│   ├── ProjectList.tsx     # Animated list of ProjectCards
│   ├── ProjectCard.tsx     # Individual project card (uses ui-stub Card)
│   ├── ProjectDetail.tsx   # Detail side panel (full project info)
│   ├── FilterBar.tsx       # Composes Search + Status + Tag filters
│   ├── SearchInput.tsx     # Debounced search with keyboard hints
│   ├── StatusFilter.tsx    # Segmented status toggle
│   ├── TagFilter.tsx       # Multi-select tag dropdown
│   ├── CopyLinkButton.tsx  # Copies current URL to clipboard
│   ├── EmptyState.tsx      # "No projects match" message
│   ├── ErrorState.tsx      # Error message + retry button
│   ├── LoadingState.tsx    # Loading skeleton animation
│   ├── Slideover.tsx       # Reusable drawer (create/edit)
│   └── ProjectForm.tsx     # Create/Edit form inside slideover
├── hooks/
│   ├── useAppState.ts      # Central app state: filters, CRUD, selection
│   ├── useProjects.ts      # Async data loading + filtering + stale handling
│   ├── useDebounce.ts      # Generic debounce hook
│   ├── useUrlState.ts      # Two-way URL ↔ filter state sync
│   └── useKeyboardShortcut.ts  # Global keyboard shortcut registration
├── services/
│   └── projectService.ts   # Simulated API with delay/error toggles
├── data/
│   └── projects.json       # Mock dataset (10 projects)
├── ui-stub/                # Design-system stubs (DO NOT MODIFY)
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Text.tsx
│   ├── Stack.tsx
│   ├── index.ts
│   └── ui-stub.css
├── test/
│   └── setup.ts            # Vitest setup (jest-dom matchers)
├── App.tsx                 # Thin composition shell (~70 lines)
├── App.test.tsx            # All behavioral tests
├── App.css                 # Minimal shell styles (scrollbar)
├── types.ts                # Shared TypeScript interfaces
├── main.tsx                # Entry point (React + Router)
├── index.css               # Tailwind base imports + typography
└── vite-env.d.ts           # Vite type declarations
```

## Component Hierarchy
```
App.tsx (composition shell — keyboard shortcuts + layout)
├── AppHeader          — logo, copy-link button, new-project button
├── FilterSection      — search, status tabs, tag dropdown, count
├── MainContent        — master-detail layout with animations
│   ├── ProjectList    — staggered card list
│   │   └── ProjectCard — individual card (uses Card, Button, Text, Stack)
│   └── ProjectDetail  — full project info panel
└── Slideover          — create/edit drawer
    └── ProjectForm    — form fields + submit/cancel
```

## State Architecture
```
useAppState() — single hook managing:
├── useUrlState()    — URL ↔ filter sync (query, status, tags, selectedId)
├── useProjects()    — data fetching + filtering + loading/error states
├── CRUD state       — slideover mode, editing project
└── Handler functions — all callbacks for child components
```

## Data Flow
```
URL (searchParams)
  ↓ useUrlState()
Filter State {q, status, tags[], selected}
  ↓ useProjects(filters)
  ├── projectService.fetchProjects() — simulated async (800ms delay)
  ├── Client-side filtering (search + status + tags — AND logic)
  ├── Stale request detection (request counter pattern)
  ↓
Filtered Project[] → ProjectList → ProjectCard[]
                   → ProjectDetail (selected project)
```

## URL State Shape
```
?q=campaign&status=active&tag=reporting&tag=metrics&selected=ads-console
```
- `q` — search query (debounced 300ms before URL update)
- `status` — single status filter (active | paused | archived | omitted = all)
- `tag` — repeatable param for multi-select tags
- `selected` — project ID for detail deep link

## Stale Async Pattern
Each "fetch" call increments a request counter ref. When the promise resolves,
it checks if the counter still matches — if not, the result is silently discarded.
This prevents flicker from out-of-order responses when filters change rapidly.

## Focus Management
- Detail panel container has `tabIndex={-1}` and a React ref
- On selection change, `detailRef.current?.focus()` moves keyboard focus
- Screen readers announce the detail region via `role="region"` + `aria-label`

## Keyboard Shortcuts
| Shortcut | Action |
|----------|--------|
| `Ctrl+K` or `/` | Focus search input |
| `Escape` | Close detail panel / clear selection |

## Responsive Layout
- **Desktop (≥768px):** CSS Grid — list (left) + detail panel (right, 400px)
- **Mobile (<768px):** Single column — list stacks above detail
- Detail panel slides in from right on mobile (if stretch implemented)

## Accessibility
- All inputs have associated `<label>` elements
- Heading hierarchy: `h1` (app title) → `h2` (section/project titles)
- Focus-visible styles via Tailwind `focus-visible:ring-*`
- `aria-live="polite"` region for filter result count
- Keyboard navigable list items (roving tabindex or native button/link)
