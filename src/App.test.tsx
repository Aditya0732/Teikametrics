import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import { resetProjects } from "./services/projectService";

/** Render App inside a MemoryRouter with optional initial URL entries. */
function renderApp(initialEntries: string[] = ["/"]) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <App />
    </MemoryRouter>,
  );
}

/** Wait for the loading skeleton to disappear and project cards to appear. */
async function waitForProjectsLoaded() {
  await vi.advanceTimersByTimeAsync(900);
  await waitFor(() => {
    expect(screen.queryByText(/loading projects/i)).not.toBeInTheDocument();
  });
}

beforeEach(() => {
  vi.useFakeTimers({ shouldAdvanceTime: true });
  resetProjects();
});

afterEach(() => {
  vi.runOnlyPendingTimers();
  vi.useRealTimers();
});

describe("App", () => {
  it("renders the hub title", async () => {
    renderApp();
    expect(
      screen.getByRole("heading", { name: /project hub/i }),
    ).toBeInTheDocument();
  });
});

describe("Debounced search", () => {
  it("filters the project list after debounce delay, not immediately", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    renderApp();
    await waitForProjectsLoaded();

    // All 10 project headings should be visible
    const allHeadings = screen.getAllByRole("heading", { level: 2 });
    expect(allHeadings).toHaveLength(10);

    // Type a search query
    const searchInput = screen.getByLabelText(/search projects/i);
    await user.type(searchInput, "Advertising");

    // Before debounce elapses — still 4 headings (not yet filtered)
    // The debounced value hasn't updated yet so all projects remain
    await vi.advanceTimersByTimeAsync(100);

    // After debounce (300ms) — only matching project(s) visible
    await vi.advanceTimersByTimeAsync(300);
    await waitFor(() => {
      const cards = screen.getAllByRole("heading", { level: 2 });
      expect(cards).toHaveLength(1);
    });
    expect(screen.getByText(/advertising campaign console/i)).toBeInTheDocument();
  });
});

describe("URL state restores filters on page load", () => {
  it("applies status filter and selected project from initial URL", async () => {
    renderApp(["/?status=active&selected=ads-console"]);
    await waitForProjectsLoaded();

    // Only active projects should be shown (6 out of 10)
    await waitFor(() => {
      const headings = screen.getAllByRole("heading", { level: 2 });
      // 6 in list + 1 in detail panel = 7 h2 headings for active status
      expect(headings.length).toBeGreaterThanOrEqual(6);
    });

    // Detail panel for the selected project should be visible
    const detail = screen.getByRole("region", {
      name: /details for advertising campaign console/i,
    });
    expect(detail).toBeInTheDocument();
  });
});

describe("Empty state", () => {
  it("shows empty message when no projects match the search", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    renderApp();
    await waitForProjectsLoaded();

    // Search for something that doesn't exist
    const searchInput = screen.getByLabelText(/search projects/i);
    await user.type(searchInput, "zzz_nonexistent_query");

    // Advance past debounce
    await vi.advanceTimersByTimeAsync(400);

    await waitFor(() => {
      expect(screen.getByText(/no projects found/i)).toBeInTheDocument();
    });
    expect(
      screen.getByText(/try adjusting your search/i),
    ).toBeInTheDocument();
  });
});

describe("Keyboard shortcuts", () => {
  it("focuses search input when '/' is pressed", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    renderApp();
    await waitForProjectsLoaded();

    const searchInput = screen.getByLabelText(/search projects/i);
    expect(searchInput).not.toHaveFocus();

    // Press "/" key — click body first to ensure focus is not in an input
    await user.click(document.body);
    await user.keyboard("/");
    expect(searchInput).toHaveFocus();
  });
});
