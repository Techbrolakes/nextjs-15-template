# Next.js 15 Template

A production-ready Next.js 15 application template with senior-level conventions and best practices.

## Tech Stack

- **Framework** — [Next.js 15](https://nextjs.org) (App Router, Turbopack)
- **Language** — TypeScript (strict mode)
- **Styling** — [Tailwind CSS v4](https://tailwindcss.com) with design tokens via `@theme`
- **Data Fetching** — [TanStack Query v5](https://tanstack.com/query) (React Query)
- **State** — [Zustand](https://zustand-demo.pmnd.rs/) (when needed)
- **Utilities** — `clsx` + `tailwind-merge` for class merging
- **Linting** — ESLint 9 (flat config) + Next.js core-web-vitals
- **Formatting** — Prettier with Tailwind plugin

## Project Structure

```
├── app/                            # Next.js App Router
│   ├── (marketing)/                # Public pages (landing, pricing, etc.)
│   ├── (app)/                      # Authenticated app pages
│   │   └── dashboard/              # Dashboard page
│   ├── api/                        # API routes
│   ├── layout.tsx                  # Root layout (wraps Providers)
│   ├── globals.css                 # Global styles + design tokens
│   ├── loading.tsx                 # Global loading state
│   ├── error.tsx                   # Global error boundary
│   └── not-found.tsx               # 404 page
│
├── components/                     # All components live here
│   ├── ui/                         # Base primitives (button, input, dialog)
│   ├── shared/                     # Cross-feature components
│   ├── reusables/                  # Form controls, inputs
│   ├── layout/                     # App shell (navbar, sidebar, footer)
│   ├── icons/                      # SVG icon components
│   ├── features/                   # Feature modules (domain logic)
│   │   └── <feature>/
│   │       ├── components/         # Feature-specific components
│   │       ├── <feature>-store.ts  # Zustand store (if needed)
│   │       ├── use-<feature>.ts    # Feature hooks
│   │       ├── types.ts            # Feature types
│   │       └── utils.ts            # Feature utilities
│   └── providers/                  # React context providers
│       └── providers.tsx           # Root provider (QueryClient, etc.)
│
├── lib/                            # Utilities and helpers
│   ├── utils.ts                    # cn(), formatCurrency(), formatDate()
│   ├── constants.ts                # App-wide constants and routes
│   └── query-client.ts             # TanStack Query client config
│
├── hooks/                          # Shared React hooks
│   ├── use-media-query.ts          # Responsive breakpoint hook
│   └── use-disclosure.ts           # Open/close state management
│
├── types/                          # Shared TypeScript types
│   └── index.ts                    # ApiResponse, PaginatedResponse, etc.
│
└── public/                         # Static assets
```

## Conventions

### Feature Organization (Bulletproof React)

Domain logic lives in `components/features/<name>/`. Each feature is self-contained with its own components, hooks, store, and types.

```
components/features/auth/
  components/login-form.tsx
  auth-store.ts
  use-auth.ts
  types.ts
```

### Import Rules

- `components/features/` can import from: `lib/`, `hooks/`, `components/shared/`, `components/ui/`, `components/reusables/`
- `components/features/` should **not** import from other features — extract shared code to `components/shared/` or `lib/`
- `components/layout/` (navbar, sidebar) **can** import from `components/features/`
- `app/` pages **can** import from `components/features/` and `components/`
- Use `@/` path alias for all imports

### Data Fetching (TanStack Query)

TanStack Query is pre-configured with sensible defaults:

- **Stale time:** 1 minute
- **GC time:** 5 minutes
- **Retry:** 1 attempt for queries, 0 for mutations
- **Refetch on window focus:** disabled

The `QueryClientProvider` is set up in `components/providers/providers.tsx` and wrapped around the app in the root layout. DevTools are included in development.

### Styling

- Use `cn()` from `lib/utils.ts` to merge Tailwind classes
- Design tokens are defined in `globals.css` under `@theme`
- Always use `cursor-pointer` on interactive elements (buttons, links, clickable cards)
- Use Next.js `<Image>` component, never `<img>`

## Getting Started

### Prerequisites

- Node.js 20+
- npm, yarn, or pnpm

### Setup

```bash
# Clone
git clone https://github.com/Techbrolakes/nextjs-15-template.git
cd nextjs-15-template

# Install dependencies
npm install

# Set up environment
cp .env.example .env.local

# Start dev server (with Turbopack)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with Turbopack |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Auto-fix lint errors |
| `npm run check-types` | TypeScript type checking |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check formatting |

## Adding Features

1. Create a feature directory: `components/features/payments/`
2. Add components, hooks, store, and types inside it
3. Wire it up from `app/` pages
4. Keep shared UI in `components/shared/` or `components/ui/`

## License

MIT
