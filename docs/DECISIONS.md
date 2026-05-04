# Technical Decisions Log

## Decision 1: React Router v6 over manual URL management
- **Context:** Assignment requires URL state for search, filters, and selected project
- **Options:** (A) `useSearchParams` from react-router-dom, (B) manual `history.replaceState` + custom hook
- **Decision:** React Router v6
- **Rationale:**
  - `useSearchParams` provides reactive two-way binding out of the box
  - Brief explicitly endorses adding react-router-dom
  - Demonstrates real-world tooling familiarity
  - Less custom code to maintain and test
  - Minimal bundle impact (~12KB gzipped)

## Decision 2: Side panel over separate route for detail
- **Context:** Assignment says pick side panel OR separate route
- **Decision:** Side panel (master-detail layout)
- **Rationale:**
  - Users keep list context while viewing detail
  - More representative of production micro-frontend patterns
  - Better UX — no full-page navigation for viewing details
  - Responsive: side-by-side on desktop, stacked on mobile

## Decision 3: Tailwind CSS for new styles
- **Context:** Bonus opportunity, starter already has Tailwind configured
- **Decision:** Use Tailwind utilities for all new components
- **Rationale:**
  - Already wired in starter (PostCSS + config)
  - Faster development with utility classes
  - Consistent spacing/colors via design tokens
  - Earns bonus credit per assignment brief
  - ui-stub CSS untouched (as required)

## Decision 4: 300ms debounce delay
- **Context:** Brief requires debounced search (200–400ms range)
- **Decision:** 300ms
- **Rationale:**
  - Industry standard middle ground
  - Fast enough to feel responsive
  - Slow enough to avoid unnecessary re-filters
  - Within the explicitly allowed range

## Decision 5: Request counter for stale async
- **Context:** Must handle out-of-order async responses
- **Options:** (A) AbortController, (B) Request counter/ref, (C) RxJS-style switchMap
- **Decision:** Request counter ref
- **Rationale:**
  - Lighter than AbortController for simulated fetches
  - No external dependencies
  - Simple to understand — increment counter, check on resolve
  - Proven pattern in React hooks

## Decision 6: In-memory state for CRUD (stretch)
- **Context:** Stretch feature — create/edit projects
- **Decision:** React state (in-memory), no localStorage
- **Rationale:**
  - Brief says "persistence depth is yours to decide"
  - In-memory keeps scope tight
  - Sufficient to demonstrate UI/form behavior
  - No serialization complexity
