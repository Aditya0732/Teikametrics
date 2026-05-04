# Testing Strategy

## Framework
- **Vitest** — test runner (configured in vite.config.ts)
- **React Testing Library** — DOM-based component testing
- **@testing-library/user-event** — realistic user interactions
- **@testing-library/jest-dom** — custom DOM matchers

## Test Approach
- **Behavioral tests** — test what users see and do, not implementation details
- **No snapshot tests** as primary signal (brief explicitly discourages)
- **Fake timers** for debounce and async simulation
- **MemoryRouter** for URL state tests (avoids BrowserRouter in tests)

## Test Cases (minimum 3 required, targeting 4+)

### Test 1: Debounced search filters the project list
- Render app with mock data
- Type a search query using `userEvent.type()`
- Verify list does NOT update before debounce period (300ms)
- Advance fake timers past debounce
- Verify filtered results appear
- **Validates:** debounce behavior, search filtering, user interaction

### Test 2: URL state restores filters on page load (deep link)
- Render app with initial URL `?status=active&q=campaign&selected=ads-console`
- Verify:
  - Search input has "campaign" value
  - Status filter shows "active" selected
  - Only matching projects are listed
  - Detail panel shows the selected project
- **Validates:** URL persistence, deep linking, filter combination

### Test 3: Empty state when no projects match filters
- Render app with mock data
- Apply filters that match nothing (e.g., search "zzz_nonexistent")
- Advance timers past debounce
- Verify empty state message is displayed
- **Validates:** empty state UI, filter behavior edge case

### Test 4 (bonus): Stale async responses are discarded
- Render app, trigger filter change A then immediately filter change B
- Resolve A's promise after B's
- Verify UI shows B's results (not A's stale data)
- **Validates:** out-of-order async handling, no flicker

## Test Utilities
- `MemoryRouter` with `initialEntries` for URL state tests
- `vi.useFakeTimers()` for debounce and async delay control
- `vi.advanceTimersByTime()` to step through debounce
- `waitFor()` for async state updates
- `screen.getByRole()`, `screen.queryByText()` for accessible queries
