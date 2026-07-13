# DevTasks — Copilot Project Instructions

DevTasks is a dependency-free task board used to teach **prompt architecture**:
moving from informal, one-off prompting to deterministic, repeatable prompts.

## Architecture

- Plain **ES modules**, no framework, no build step.
- `app/src/store.js` — pure logic (no DOM, no storage). All business rules live here.
- `app/src/storage.js` — localStorage persistence with an in-memory fallback.
- `app/src/ui.js` — DOM rendering only.
- `app/src/main.js` — wiring between store, storage, and UI.
- `app/tests/` — Node built-in test runner (`node --test`), no test framework.

## Ground rules

- Keep business logic **pure and framework-free** in `store.js` so it stays testable.
- Never let `store.js` import from `ui.js` or `storage.js`.
- Prefer **immutable** updates: return new arrays/objects instead of mutating.
- No runtime dependencies. Do not add npm packages to make a feature work.
- Match the existing code style (see `.github/instructions/`).

## Commands

- Run tests: `npm test` (or `node --test`)
- Serve locally: `npm run serve`
