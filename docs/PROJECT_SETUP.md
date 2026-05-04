# Project Setup

## Tech Stack
- **React 18** + **TypeScript** + **Vite 5**
- **React Router v6** — URL state management via `useSearchParams`
- **Tailwind CSS 3** — utility-first styling (bonus)
- **Vitest** + **React Testing Library** + **user-event** — testing
- **ui-stub** — internal design-system stub (`Button`, `Card`, `Text`, `Stack`)

## Prerequisites
- Node 20+
- npm 9+

## Commands
```bash
npm install       # Install dependencies
npm run dev       # Start dev server → http://localhost:5173
npm run build     # Production build
npm run preview   # Preview production build
npm test          # Run tests once
npm run test:watch # Run tests in watch mode
```

## Dependencies Added
| Package | Purpose |
|---------|---------|
| `react-router-dom` | Client-side routing, `useSearchParams` for URL state |
| `@testing-library/user-event` | Realistic user interaction simulation in tests |

## Environment
- Vite dev server on port 5173
- Path alias `@/` → `./src/` (configured in vite.config.ts + tsconfig.json)
- Tailwind via PostCSS (postcss.config.cjs + tailwind.config.cjs)
- Vitest uses jsdom environment with globals enabled
