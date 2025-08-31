# Playground AI - Clean Architecture Demo

A monorepo showcasing **Clean Architecture** principles in a modern Node.js/React chat application with AI integration.

## 🏗️ Architecture Overview

This project demonstrates **enterprise-grade Clean Architecture** with clear separation of concerns and dependency inversion.

### Backend Architecture (`packages/server/`)

Built following **Clean Architecture** principles with the following layers:

```
┌─────────────────────────────────────────────────────────┐
│                    PRESENTATION                         │
│  ┌─────────────────────────────────────────────────────┐│
│  │  HTTP Controllers (Express.js)                      ││
│  │  - Request validation with Zod                      ││
│  │  - Factory pattern with dependency injection        ││
│  └─────────────────┬───────────────────────────────────┘│
│                    │                                    │
│  ┌─────────────────▼───────────────────────────────────┐│
│  │                APPLICATION                          ││
│  │  ┌─────────────────────────────────────────────────┐││
│  │  │  Use Cases (Business Workflows)                 │││
│  │  │  - SendMessage: Orchestrates AI & conversation  │││
│  │  └─────────────────────────────────────────────────┘││
│  └─────────────────┬───────────────────────────────────┘│
│                    │                                    │
│  ┌─────────────────▼───────────────────────────────────┐│
│  │                   DOMAIN                            ││
│  │  ┌─────────────────────────────────────────────────┐││
│  │  │  Value Objects & Interfaces                     │││
│  │  │  - ConversationId, AIResponseId (with validation)│││
│  │  │  - Repository & Provider interfaces             │││
│  │  └─────────────────────────────────────────────────┘││
│  └─────────────────┬───────────────────────────────────┘│
│                    │                                    │
│  ┌─────────────────▼───────────────────────────────────┐│
│  │               INFRASTRUCTURE                        ││
│  │  ┌─────────────────────────────────────────────────┐││
│  │  │  External System Adapters                       │││
│  │  │  - OpenAI Provider (implements AIProvider)      │││
│  │  │  - In-Memory Repository (implements ConversationRepo)││
│  │  └─────────────────────────────────────────────────┘││
│  └─────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────┘
```

### Key Architecture Benefits

- **🔄 Provider Agnostic**: Switch from OpenAI to Claude/Gemini without changing business logic
- **💾 Storage Flexible**: Easy to swap from in-memory to MongoDB/PostgreSQL
- **🧪 Highly Testable**: Mock interfaces for isolated unit testing
- **📈 Scalable**: Add new features without affecting existing code
- **🛡️ Type-Safe**: Full TypeScript with domain validation using Zod

### Frontend Architecture (`packages/client/`)

- **Framework**: React 19 + Vite + TypeScript
- **Styling**: TailwindCSS v4 with Radix UI components
- **State Management**: React hooks (no external state library)
- **API Layer**: Custom fetch-based service with typed responses

## 🚀 Quick Start

### Install Dependencies

```bash
bun install
```

### Development Setup

```bash
# Start both client and server in development mode
bun run dev

# Or run individually:
cd packages/server && bun run dev  # Backend on :4000
cd packages/client && bun run dev  # Frontend on :5173
```

### Environment Variables

```bash
# packages/server/.env
PORT=4000
OPENAI_KEY=your_openai_api_key_here
```

## 🛠️ Development Commands

### Root workspace

- **Linting**: `bun run lint` (check) or `bun run lint:fix` (auto-fix)
- **Formatting**: `bun run format` (write) or `bun run format:check` (check)

### Server (`packages/server/`)

- **Development**: `bun run dev` (watch mode)
- **Production**: `bun run start`

### Client (`packages/client/`)

- **Development**: `bun run dev` (Vite dev server with API proxy)
- **Build**: `bun run build` (TypeScript + Vite production build)
- **Preview**: `bun run preview` (preview production build)

## 📡 API Endpoints

### POST `/api/chat`

Send a message to AI with conversation continuity.

**Request:**

```json
{
  "prompt": "Hello AI!",
  "conversationId": "uuid-v4-here",
  "options": {
    "model": "premium" | "balanced" | "fast",
    "creativity": "high" | "medium" | "low",
    "tone": "professional" | "casual" | "creative"
  }
}
```

**Response:**

```json
{
  "id": "resp_abc123...",
  "message": "AI response text here"
}
```

## 🏛️ Clean Architecture Principles Demonstrated

1. **Dependency Inversion**: High-level modules don't depend on low-level modules
2. **Interface Segregation**: Clean, focused interfaces for different concerns
3. **Single Responsibility**: Each class/module has one reason to change
4. **Open/Closed**: Open for extension, closed for modification
5. **Liskov Substitution**: Implementations are interchangeable

## 🧪 Testing Strategy

The Clean Architecture enables comprehensive testing:

- **Unit Tests**: Mock repository and provider interfaces
- **Integration Tests**: Test use cases with real implementations
- **API Tests**: Test HTTP endpoints end-to-end

## 🚧 Future Enhancements

- [ ] Replace in-memory storage with MongoDB
- [ ] Add user authentication & multi-tenancy
- [ ] Implement conversation history UI
- [ ] Add support for multiple AI providers
- [ ] Real-time messaging with WebSockets

---

Built with [Bun](https://bun.com) runtime and modern web technologies.

_This project serves as a reference implementation for Clean Architecture in Node.js applications._
