# Async Task Management Backend

A small, in-memory Node.js backend for learning asynchronous TypeScript task operations. It uses ESM, strict TypeScript, `Promise`, and `async`/`await`; no database or web framework is required. The public API is exported from `src/index.ts`; the runnable demonstration is in `src/main.ts`.

## Setup

1. Install Node.js 20 or later.
2. Install the project dependencies:

   ```bash
   npm install
   ```

3. Build and run the example application:

   ```bash
   npm run build
   npm start
   ```

For continuous TypeScript compilation while editing, use `npm run dev` in a separate terminal, then run `npm start` after a successful compile.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Recompile source files in watch mode. |
| `npm run build` | Compile TypeScript to `dist/`. |
| `npm start` | Run the compiled demo (`dist/main.js`). |
| `npm run typecheck` | Check types without writing output. |
| `npm test` | Build and run success and failure operation tests. |

## Usage

```ts
import { TaskService } from "./dist/index.js";

const tasks = new TaskService();

try {
  const task = await tasks.create({ title: "Learn TypeScript", userId: "user-1" });
  const fetched = await tasks.getById(task.id);
  console.log(fetched);
  const completed = await tasks.update(task.id, { completed: true });
  console.log(completed);
  await tasks.delete(task.id);
} catch (error: unknown) {
  console.error(error instanceof Error ? error.message : "Unknown error");
}
```

`TaskService` throws `TaskValidationError` for invalid input and `TaskNotFoundError` when an id does not exist. Handle these errors with `try`/`catch` around asynchronous calls.

Importing `dist/index.js` has no side effects. Run `npm start` to execute the separate demo.

## AI Usage

Codex assisted with scaffolding the TypeScript/ESM project, implementing the typed in-memory task service, writing tests, and preparing this documentation. The implementation and checks should be reviewed before publishing.
