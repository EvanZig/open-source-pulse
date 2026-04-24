# Open Source Pulse

GitHub Explorer dashboard that surfaces **Good First Issues** and **Help Wanted** tickets from popular repositories. The Next.js frontend consumes a pre-aggregated feed from a Spring Boot backend.

This repo currently contains **scaffolding only** — configuration, directory structure, and placeholder providers. Business logic and UI land in the next iteration.

## Tech Stack

| Area            | Choice                                       |
| --------------- | -------------------------------------------- |
| Package manager | [Bun](https://bun.sh)                        |
| Framework       | Next.js 14 (App Router, RSC-first)           |
| Styling         | Tailwind CSS + shadcn/ui                     |
| Global UI state | Zustand                                      |
| Client data     | TanStack Query                               |
| Server data     | Native `fetch` with ISR (`revalidate: 3600`) |
| Notifications   | Sonner                                       |
| Drag & drop     | `@atlaskit/pragmatic-drag-and-drop`          |
| Icons           | Lucide React                                 |
| Dates           | date-fns                                     |
| E2E tests       | Playwright                                   |

## Getting Started

```bash
bun install
cp .env.example .env.local
bun run dev
```

Open http://localhost:3000.

## Scripts

| Script                | Purpose                               |
| --------------------- | ------------------------------------- |
| `bun run dev`         | Start the Next.js dev server          |
| `bun run build`       | Production build                      |
| `bun run start`       | Serve the production build            |
| `bun run lint`        | ESLint (Next + TypeScript + Prettier) |
| `bun run format`      | Apply Prettier formatting             |
| `bun run typecheck`   | `tsc --noEmit`                        |
| `bun run test:e2e`    | Playwright E2E tests                  |
| `bun run test:e2e:ui` | Playwright UI mode                    |

## Directory Structure

```
open-source-pulse/
├── e2e/                         # Playwright tests (isolated from src/)
│   ├── example.spec.ts
│   └── tsconfig.json
├── src/
│   ├── app/                     # App Router routes (Server Components by default)
│   │   ├── globals.css
│   │   ├── layout.tsx           # Root layout + QueryProvider + Sonner
│   │   └── page.tsx             # ISR entry point (revalidate: 3600)
│   ├── components/
│   │   ├── layout/              # Shell / navigation primitives
│   │   └── ui/                  # shadcn/ui generated primitives
│   ├── features/                # Domain-driven feature slices
│   │   ├── filters/
│   │   ├── issues/
│   │   └── repositories/
│   ├── hooks/                   # Reusable client hooks
│   ├── lib/
│   │   ├── api.ts               # Typed fetch wrapper for Spring Boot backend
│   │   ├── constants.ts         # ISR + domain constants
│   │   └── utils.ts             # `cn` Tailwind class merger
│   ├── providers/
│   │   └── QueryProvider.tsx    # Client-only TanStack Query boundary
│   ├── store/
│   │   └── uiStore.ts           # Zustand store (theme, sidebar, UI filters)
│   └── types/
│       └── index.ts             # Shared domain types
├── components.json              # shadcn/ui config
├── next.config.mjs
├── playwright.config.ts
├── postcss.config.js
├── tailwind.config.ts
└── tsconfig.json
```

## Architectural Rules

1. **RSC-first.** Default every new component to a Server Component. Only mark leaves with `'use client'` when they must access browser APIs, event handlers, or client-side state/hooks.
2. **Server data via ISR.** Use `api.get(path, { next: { revalidate: ISR_REVALIDATE_SECONDS } })` in `page.tsx` / `layout.tsx`. Do **not** call TanStack Query on the server.
3. **Client data via TanStack Query.** Search, filtering, pagination and any user-driven refetching go through `useQuery` / `useInfiniteQuery`, hydrated from the initial ISR payload when possible.
4. **UI state via Zustand.** Theme, sidebar, transient UI selections — never server-owned data.
5. **Feature folders.** Co-locate components, hooks, and queries under `src/features/<domain>/`.
