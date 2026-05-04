# Take-home assignment: Project Hub Lite

**Round 1 — Junior frontend engineer (AI-assisted)**  
**Stack:** React 18 + TypeScript + Vite (use the provided starter in `[project-hub-lite-starter/](project-hub-lite-starter/)`).

---

## Scheduling (submission window)

- We send the assignment link **around 10:00** on the scheduled day. All times are **IST** (India Standard Time, `Asia/Kolkata`) unless your recruiting email explicitly states a different timezone.
- Your **working prototype** is due **the same calendar day by 18:00 IST**.
- That is a **fixed 8-hour** window (10:00 → 18:00 IST). It is **not** a multi-day “flexible” window—plan your time accordingly.
- **Late submissions** may not be reviewed unless you have arranged an exception with recruiting in advance.

---

## AI policy

You may use **AI assistants** (including free/open-source tools such as local models, editor assistants, or browser-based chat). You are **responsible** for correctness, security, accessibility, and for **honestly documenting** how you used AI in your README (see **Deliverables**).

Whichever tool you use, include **shareable links** to the **important prompts or conversations** (at least the ones that shaped architecture, filtering/URL behavior, tests, or accessibility). If your tool does not offer URLs, say so briefly and provide a **short excerpt** or export for those prompts instead.

Do **not** use “AI detectors” as your QA strategy—**you** verify behavior.

---

## Problem

Build a small **Project Hub** UI: users browse a list of internal projects, narrow the list with **search and filters**, and open a **detail** view for one project. The app must handle **loading**, **error**, and **empty** states in a believable way (mocked delays/errors are fine).

Our production frontends are built as **micro frontends** (independent deployable surfaces) that consume a **shared design system** shipped as its **own module** (package), not copy-pasted styles. This exercise uses a small **stub** under `src/ui-stub/` to stand in for that design-system package—use it instead of ad-hoc styled `<div>`s where reasonable.

**Bar:** We typically **advance only the top quartile** from this exercise. Meeting **all required** behavior below is the baseline; **optional stretch** and **bonus** (see end of brief) help distinguish exceptional submissions when you still have time after the core is solid.

---

## Starter

Unzip or copy `[project-hub-lite-starter/](project-hub-lite-starter/)` from this repository. It includes:

- Vite + React + TS
- Mock data: `src/data/projects.json` (including `tags` per project)
- Stub components: `src/ui-stub/` (`Button`, `Card`, `Text`, `Stack`)
- Vitest + React Testing Library wired for `npm test`
- **Tailwind CSS** (PostCSS + `tailwind.config.js`) — see **Bonus**; you can ignore it and keep plain CSS if you prefer.

```bash
cd project-hub-lite-starter
npm install
npm run dev    # http://localhost:5173
npm test       # run tests once
```

Use **Node 20+** (see `.nvmrc` in the starter).

---

## Requirements

### Functional

1. **List** — Display all projects from `projects.json` (or from the same shape loaded async). Each row/card shows at least **title**, **status**, and **tags** (or a subset you surface in the list).
2. **Search** — Text search on **title** and/or **description** must be **debounced** (e.g. ~200–400ms) so the list does not re-filter on every keystroke. State the debounce delay you chose in your README (one line).
3. **Filters** — User can narrow the list by:
  - **Status** (`active` | `paused` | `archived`), and  
  - **Tags** — each project has a `tags: string[]` field; implement **at least one** tag filter (single-select or multi-select) in addition to status + search.  
   All filters and search combine sensibly (e.g. AND logic).
4. **URL state** — Current **search query**, **status** filter, and **tag** selection(s) must be **reflected in the URL** (e.g. `?q=…&status=…&tag=…` or multiple tag params). Use `URLSearchParams` / `history.replaceState`, or add `react-router-dom` and `useSearchParams` if you prefer. **Refreshing** the page must **preserve** the same narrowed list for the mock dataset; bookmarking a URL should restore the same filters.
5. **Detail** — When the user selects a project, show **detail** for that project: at minimum **title**, **status**, **description**, **owner**, **updatedAt**, and **tags**. Use either:
  - a **side panel** next to the list, or  
  - a **separate route** (e.g. `/projects/:id`) with React Router **only if you add it**—keep scope small).  
   Pick one approach and stick to it.
6. **States** (must be observable in the UI):
  - **Loading** — e.g. first load (simulate delay with `setTimeout` or `Promise`).
  - **Error** — e.g. failed fetch (simulate with a rejected promise or toggle in dev).
  - **Empty** — no projects match the current search/filters (clear messaging).

### UI / design system

- Use `@/ui-stub` components (`Button`, `Card`, `Text`, `Stack`) for primary structure—not every pixel must be stubbed, but **lists, detail, and primary actions** should lean on the stub.
- Layout should be **responsive enough** for desktop and a narrow window (e.g. stack list/detail on small width).

### Accessibility

- **Keyboard:** user can move through the list and open/select a project without a mouse.
- **Labels:** inputs for search/filters have associated labels; meaningful **heading** hierarchy (`h1` → `h2`…).
- **Focus:** visible focus styles (browser default is OK if not removed).
- **Focus management:** When the user opens or moves to **detail** for a selected project, **move keyboard focus** to the detail region (e.g. container with `tabIndex={-1}` + `ref.focus()`, or a skip-link pattern). Briefly document what you chose in the README.

### Testing

- Add **at least three** meaningful **React Testing Library** tests with descriptive names (e.g. debounced search or filters, empty/error/URL behavior, deep-link or stale-async behavior if non-trivial). Use **fake timers** (`vi.useFakeTimers`) or `waitFor` / `userEvent` as needed. **Do not** rely on snapshot-only tests as your main signal.

### Deep link, async discipline, shortcuts, share

1. **Deep link selection** — Reflect the **currently selected project** in the URL (e.g. `?selected=<id>` or a route segment) so a shared link opens the same list filters **and** the correct detail.
2. **Stale / out-of-order async** — If you simulate loading with promises or timeouts, **ignore or cancel** results that no longer match the current filters (no flicker from late responses).
3. **Keyboard shortcuts** — At least one **documented** shortcut (e.g. focus search, clear filters, close detail) that works without the mouse.
4. **“Copy link to view”** — A control that copies the current URL (filters + selection) to the clipboard for sharing.

### Out of scope

- Real authentication, real backend, deployment, analytics.
- Full design-system parity—only what the stub provides plus minimal custom layout.

### Optional stretch (only if required behavior is done)

Not required for a passing submission. If you ship it, document under **Optional stretch** in your README (what you built, how to try it). Keep scope tight; **persistence** (in-memory vs `localStorage`, validation depth, etc.) is yours to decide.

- **Create project** — A **Create** control on the **main list** page opens a **slideover** to add a new project.
- **Update project** — **Edit** is reachable from **two** places: the **list/main** view and the **detail** view. **Slideovers** for create and edit (not full-page forms required).

### Bonus (optional)

If you are comfortable with **Tailwind CSS**, you may use it **instead of** writing new plain CSS for your own layout and components. The starter already includes `tailwindcss`, `postcss`, `autoprefixer`, and a standard `tailwind.config.js` + `postcss.config.js` for Vite. You may still use the stub and `App.css` / `ui-stub.css` as needed; document what you chose in the README.

---

## Deliverables

1. **Source** — Your fork or zip of the project with `npm install`, `npm run dev`, and `npm test` working.
2. **Version history** — As you work, record changes in **meaningful chunks** over time (several logical steps), **not** as a single dump of the whole solution at the end. How you do that is up to you.
3. **README.md** at the project root with:
  - how to run and test;
  - **Assumptions** (max ~1 short paragraph) if you interpreted anything loosely;
  - **Debounce** — delay in ms for the search input;
  - **Focus** — one sentence on how focus moves into the detail region;
  - **Keyboard shortcut(s)** — name the shortcut(s) you implemented (one line is enough);
  - **AI and verification** — copy the template below and fill it in (including **prompt links** where you used AI);
  - **Optional stretch** — write **None** or what you shipped (CRUD + slideovers if applicable);
  - **Bonus** — note if you used Tailwind for new styles or stayed on plain CSS only.

### README — candidate template (required)

Paste this block into your `README.md` and complete it:

```markdown
## AI and verification

### Tools
Which AI or assistive tools you used for this submission (or write **None**):

### Prompt links
Share **URLs** to the **important** prompts or chats (the ones that mattered for this work—e.g. main feature, debounce/URL logic, tests, a11y). List at least the **most significant** exchanges. If a tool has no share link, note that and paste a **brief excerpt** (or describe the export you used) for those prompts instead.

### Verify
List **three** concrete things you **did not** trust until you verified them (e.g. ran tests, checked in the browser, read React docs, stepped through in devtools):

1.
2.
3.

### Course-correct
Describe **one** time the model suggested something wrong or misleading and what you did instead (one short paragraph):

## Keyboard shortcuts

List the shortcut(s) from the brief (one line each is enough):

## Optional stretch

**None** — or list what you added (see brief), with 1–2 lines each on how to try it in the app.

## Bonus (Tailwind)

**Not used** — or briefly describe how you used Tailwind vs plain CSS for this submission.
```

---

## Submission

Send **either** a link to a **private Git repository** (preferred) **or** a **zip** of the project **excluding** `node_modules`. Include the **commit hash** or zip date in the email subject line if requested by recruiting.

**Do not** commit secrets or `.env` files with real credentials.