---
description: "JavaScript conventions for the DevTasks app. Use when writing or editing any .js file in app/."
applyTo: "app/**/*.js"
---

# JavaScript Conventions

- Use ES module `import` / `export`. No CommonJS `require`.
- Use `const` by default; `let` only when reassigning. Never `var`.
- Prefer pure functions; return new values instead of mutating arguments.
- Use immutable array patterns (`map`, `filter`, spread) over in-place mutation.
- Validate inputs at the boundary and `throw new Error("<clear message>")` on
  invalid data — do not silently coerce.
- Add JSDoc `@param` / `@returns` type annotations to exported functions.
- Keep DOM access out of `store.js`; rendering belongs in `ui.js`.
- Use `camelCase` for functions/variables and `UPPER_SNAKE_CASE` for constants.

## Example

```js
/**
 * @param {Task[]} tasks
 * @param {string} id
 * @returns {Task[]}
 */
export function deleteTask(tasks, id) {
  return tasks.filter((task) => task.id !== id);
}
```
