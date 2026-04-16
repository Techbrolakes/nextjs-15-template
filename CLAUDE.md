# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev            # Start dev server with Turbopack (port 3000)
npm run build          # Production build
npm run start          # Start production server
npm run lint           # Run ESLint
npm run lint:fix       # Auto-fix lint errors
npm run check-types    # TypeScript type checking
npm run format         # Format code with Prettier
npm run format:check   # Check formatting without writing
```

## Architecture

This is a Next.js 15 application using the App Router with TypeScript strict mode.

### Route Groups

- `app/(marketing)/` — Public pages (landing, pricing, about). Uses `Navbar` + `Footer` layout.
- `app/(app)/` — Authenticated app pages. Uses `AppSidebar` layout.
- `app/api/` — API routes.

### Component Organization

Everything lives under `components/`:

```
components/
├── ui/           # Base primitives (button, input, dialog, etc.)
├── shared/       # Cross-feature components (cards, badges, etc.)
├── reusables/    # Form controls (form-input, select, etc.)
├── layout/       # App shell (navbar, footer, app-sidebar)
├── icons/        # SVG icon components
├── features/     # Feature modules (domain logic, see below)
└── providers/    # React context providers (QueryClient, auth, theme)
```

### Feature Organization (Bulletproof React)

Domain logic lives in `components/features/<name>/`:

```
components/features/<name>/
├── components/         # Feature-specific React components
├── <name>-store.ts     # Zustand store (if needed)
├── use-<name>.ts       # Feature-specific hooks
├── types.ts            # Feature-specific types
└── utils.ts            # Feature-specific utilities
```

### Import Rules

- `components/features/` can import from: `lib/`, `hooks/`, `components/shared/`, `components/ui/`, `components/reusables/`
- `components/features/` should NOT import from other features — extract shared code to `components/shared/` or `lib/`
- `components/layout/` (navbar, sidebar) CAN import from `components/features/` — they are orchestrators
- `app/` pages CAN import from `components/features/` and `components/`
- Use `@/` path alias for all imports (e.g., `@/lib/utils`, `@/components/ui/button`)
- No barrel exports (`index.ts`) for features — use direct imports

## Data Fetching (TanStack Query)

TanStack Query v5 is pre-configured in `components/providers/providers.tsx` with:
- Stale time: 1 minute
- GC time: 5 minutes
- Retry: 1 for queries, 0 for mutations
- Refetch on window focus: disabled
- DevTools included in development

The query client singleton is in `lib/query-client.ts` with a server-safe pattern (new client per server request, shared client on browser).

## UI Components (shadcn/ui)

shadcn/ui is initialized and configured in `components.json`. Components install to `components/ui/`.

**Adding components:**
```bash
npx shadcn@latest add button        # Add a single component
npx shadcn@latest add dialog card   # Add multiple components
```

- Config: `components.json` (style: base-nova, baseColor: neutral, CSS variables enabled)
- Icon library: **Lucide React** (`lucide-react`) — Lucide does NOT use the `Icon` suffix (use `X`, `Check`, `Star`, not `XIcon`)
- Components are in `components/ui/` — these are your base primitives
- Use `class-variance-authority` (cva) for component variants

## Styling

- **Tailwind CSS v4** with shadcn design tokens in `app/globals.css`
- Light and dark mode supported via CSS variables (`:root` and `.dark`)
- Use `cn()` from `lib/utils.ts` to merge Tailwind classes (clsx + tailwind-merge)
- **ALWAYS use `cursor-pointer`** on clickable/interactive elements: buttons, links, CTAs, clickable cards, toggle switches, tabs, and any element with an `onClick` handler
- ALWAYS use Next.js `<Image>` component, never `<img>`
- shadcn color tokens: `primary`, `secondary`, `muted`, `accent`, `destructive`, `background`, `foreground`, `card`, `popover`, `border`, `input`, `ring`
- Chart tokens: `chart-1` through `chart-5`
- Sidebar tokens: `sidebar`, `sidebar-foreground`, `sidebar-primary`, `sidebar-accent`, `sidebar-border`

## Utilities

- `lib/utils.ts` — `cn()` class merger, `formatCurrency()`, `formatDate()`, `sleep()`
- `lib/constants.ts` — `APP_NAME`, `ROUTES` object with typed route paths
- `lib/query-client.ts` — TanStack Query client factory

## Hooks

- `hooks/use-media-query.ts` — Responsive breakpoint detection
- `hooks/use-disclosure.ts` — Open/close state for modals, dropdowns, drawers

## State Management

- **Server state** — TanStack Query (for API data, caching, mutations)
- **Client state** — Zustand (for UI state, auth, forms). Create stores at the feature level: `components/features/<name>/<name>-store.ts`
- Prefer TanStack Query for anything from an API. Use Zustand only for purely client-side state.

## TypeScript

- Strict mode enabled
- Shared types in `types/index.ts` — `ApiResponse<T>`, `ApiError`, `PaginatedResponse<T>`
- Feature-specific types in `components/features/<name>/types.ts`
- Use `@/` path aliases, never relative `../../` imports

## Linting & Formatting

- ESLint 9 flat config (`eslint.config.mjs`) extending `next/core-web-vitals` and `next/typescript`
- Prettier with `prettier-plugin-tailwindcss` for auto-sorted classes
- Run `npm run lint` before committing

## Adding a New Feature

1. Create `components/features/<name>/` directory
2. Add `components/`, `types.ts`, `use-<name>.ts`, `<name>-store.ts` as needed
3. Create the page in `app/(app)/<name>/page.tsx`
4. Import from the feature using `@/components/features/<name>/...`
5. Shared UI goes in `components/shared/` or `components/ui/`

## Adding a New Page

1. Create `app/(marketing)/<name>/page.tsx` for public pages
2. Create `app/(app)/<name>/page.tsx` for authenticated pages
3. Add route to `lib/constants.ts` ROUTES object
4. Add nav link to `components/layout/navbar.tsx` or `components/layout/app-sidebar.tsx`

## Environment Variables

```bash
NEXT_PUBLIC_APP_URL=http://localhost:3000   # Public app URL
# Add API keys, database URLs, auth secrets as needed
```

Prefix client-side variables with `NEXT_PUBLIC_`. Server-only variables have no prefix. Never commit `.env` files — use `.env.example` as a template.
