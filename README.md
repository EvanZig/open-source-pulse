# Open Source Pulse

GitHub Explorer dashboard that surfaces **Good First Issues** and **Help Wanted** tickets from popular repositories. The React SPA consumes a pre-aggregated feed from a Spring Boot backend.

This repo currently contains **scaffolding only** — configuration, directory structure, and placeholder providers. Business logic and UI land in the next iteration.

## Tech Stack

| Area            | Choice                              |
| --------------- | ----------------------------------- |
| Package manager | [Bun](https://bun.sh)               |
| Frontend        | React 19 + Vite                     |
| Backend         | Spring Boot (separate service)      |
| Styling         | Tailwind CSS + shadcn/ui            |
| Global UI state | Zustand                             |
| Client data     | TanStack Query                      |
| Notifications   | Sonner                              |
| Drag & drop     | `@atlaskit/pragmatic-drag-and-drop` |
| Icons           | Lucide React                        |
| Dates           | date-fns                            |
| E2E tests       | Playwright                          |

## Getting Started

```bash
bun install
cp .env.example .env
bun run dev
```

Open http://localhost:3000. Vite proxies `/api` to the Spring Boot service at http://localhost:8080.

## Scripts

| Script                | Purpose                        |
| --------------------- | ------------------------------ |
| `bun run dev`         | Start the Vite dev server      |
| `bun run build`       | Production build               |
| `bun run start`       | Preview the production build   |
| `bun run lint`        | ESLint (TypeScript + Prettier) |
| `bun run format`      | Apply Prettier formatting      |
| `bun run typecheck`   | `tsc --noEmit`                 |
| `bun run test:e2e`    | Playwright E2E tests           |
| `bun run test:e2e:ui` | Playwright UI mode             |

## Directory Structure

```
open-source-pulse/
├── e2e/                         # Playwright tests (isolated from src/)
│   ├── example.spec.ts
│   └── tsconfig.json
├── public/                      # Static assets served as-is
│   └── favicon.svg
├── src/
│   ├── App.tsx                  # SPA root
│   ├── main.tsx                 # Vite entry + providers
│   ├── index.css                # Tailwind theme + global styles
│   ├── components/
│   │   ├── layout/              # Shell / navigation primitives
│   │   └── ui/                  # shadcn/ui generated primitives
│   ├── data/                    # Placeholder seed data
│   ├── features/                # Domain-driven feature slices
│   │   ├── filters/
│   │   ├── issues/
│   │   └── repositories/
│   ├── hooks/                   # Reusable client hooks
│   ├── lib/
│   │   ├── api.ts               # Typed fetch wrapper for Spring Boot backend
│   │   ├── constants.ts         # Domain constants
│   │   └── utils.ts             # `cn` Tailwind class merger
│   ├── providers/
│   │   └── QueryProvider.tsx    # TanStack Query boundary
│   ├── store/
│   │   └── uiStore.ts           # Zustand store (theme, sidebar, UI filters)
│   └── types/
│       └── index.ts             # Shared domain types
├── components.json              # shadcn/ui config
├── index.html
├── playwright.config.ts
├── postcss.config.mjs
├── vite.config.ts
└── tsconfig.json
```

## Architectural Rules

1. **SPA frontend, Spring Boot backend.** The Vite app is a client-only React SPA. All domain data comes from the Spring Boot API via TanStack Query.
2. **Client data via TanStack Query.** Search, filtering, pagination and any user-driven refetching go through `useQuery` / `useInfiniteQuery`.
3. **UI state via Zustand.** Theme, sidebar, transient UI selections — never server-owned data.
4. **Feature folders.** Co-locate components, hooks, and queries under `src/features/<domain>/`.
