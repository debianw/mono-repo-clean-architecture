# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Architecture

This is a monorepo with a React/TypeScript client-server architecture:

- **Root**: Bun workspace with basic TypeScript entry point (`index.ts`)
- **packages/client/**: React frontend using Vite, TypeScript, and Tailwind CSS with shadcn/ui components
- **packages/server/**: Express.js backend running on Bun with TypeScript

The client communicates with the server via API calls (see `/api/health` endpoint example).

## Development Commands

**Root level:**

```bash
bun install        # Install all dependencies
bun run index.ts   # Run root entry point
```

**Client (packages/client/):**

```bash
bun run dev        # Start development server (Vite)
bun run build      # Build for production (TypeScript + Vite)
bun run lint       # Run ESLint
bun run preview    # Preview production build
```

**Server (packages/server/):**

```bash
bun run dev        # Start development server with watch mode
bun run start      # Start production server
```

## Runtime Preferences

- **Use Bun instead of Node.js** for all runtime operations
- Server uses Express.js but the existing CLAUDE.md in packages/server/ suggests preferring Bun.serve() for new development
- Client uses standard React/Vite stack with modern tooling

## Key Technologies

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS 4, shadcn/ui, Radix UI
- **Backend**: Express.js, TypeScript, Bun runtime
- **Build Tools**: Vite (client), Bun (server), ESLint
- **Styling**: Tailwind CSS with custom components in `shared/components/ui/`

## Client Architecture

- Shared utilities in `src/shared/`: components, hooks, services, styles
- API communication handled via `src/shared/services/api.ts`
- UI components from shadcn/ui in `src/shared/components/ui/`
- Custom hooks like `useHealth` for API integration

## Testing

Use `bun test` for testing across the monorepo.
