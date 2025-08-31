# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Install dependencies

```bash
bun install
```

### Root workspace commands

- **Linting**: `bun run lint` (check) or `bun run lint:fix` (auto-fix)
- **Formatting**: `bun run format` (write) or `bun run format:check` (check)
- **Run root script**: `bun run index.ts`

### Client (React + Vite)

Navigate to `packages/client/` and run:

- **Development**: `bun run dev` (starts Vite dev server with API proxy)
- **Build**: `bun run build` (TypeScript compilation + Vite build)
- **Preview**: `bun run preview` (preview production build)

### Server (Express + Bun)

Navigate to `packages/server/` and run:

- **Development**: `bun run dev` (watch mode)
- **Production**: `bun run start`

## Architecture

This is a monorepo with two packages managed by Bun workspaces:

### Client (`packages/client/`)

- **Framework**: React 19 + Vite + TypeScript
- **Styling**: TailwindCSS v4 with Radix UI components
- **State Management**: React hooks (no external state library)
- **API Layer**: Custom fetch-based service (`src/shared/services/api.ts`) with typed responses
- **Path Aliases**: `@/` maps to `./src/`

Key directories:

- `src/shared/components/ui/` - Reusable UI components (Button, etc.)
- `src/shared/hooks/` - Custom React hooks (useHealth)
- `src/shared/services/` - API layer and external services
- `src/config/` - Environment-based configuration

### Server (`packages/server/`)

- **Runtime**: Bun with Express.js
- **TypeScript**: Configured for bundler resolution
- **API**: REST endpoints (`/api/health`)
- **Config**: Environment variables via `config/index.ts`

### Development Setup

- **Proxy**: Client dev server proxies `/api` calls to `localhost:4000`
- **Environment**: Server expects `PORT` and `OPENAI_KEY` env vars
- **Code Quality**: ESLint + Prettier with TypeScript, React hooks rules
- **Git Hooks**: Husky configured for pre-commit checks

### Import Patterns

- Client uses path aliases: `import { Button } from '@/shared/components/ui/button'`
- Server uses package imports: `import Config from 'server/config'`
- Both packages maintain separate TypeScript configs with shared root config
- 1. I missed the static keyword

2. Option A should be the right to create a MessageContent\
3. I think I should store zod's trim value
