---
description: "Behavior-preserving refactor of a store.js function, guarded by the existing test suite."
name: "Safe Refactor"
argument-hint: "Function or file to refactor"
agent: "agent"
tools: [codebase, search, editFiles, runCommands]
---

# Safe Refactor

Improve the internal quality of code **without changing its behavior**. The
existing tests are your safety net.

## Inputs

- Target: `${input:target:Which function or file should be refactored?}`

## Steps

1. **Baseline.** Run `npm test` and record the passing count. Do not proceed if
   the suite is red.
2. **Characterize.** If the target is thinly tested, add characterization tests
   for current behavior first (see [testing conventions](../instructions/testing.instructions.md)).
3. **Refactor** for readability/duplication only, following the
   [JavaScript conventions](../instructions/javascript.instructions.md). Keep the
   public signature and return values identical.
4. **Prove.** Run `npm test` — the count and results must match the baseline.

## Output Format

- What you changed and **why** (readability, duplication, naming).
- Baseline vs. final `npm test` results (must be identical).

## Constraints

- DO NOT change public function signatures or observable behavior.
- DO NOT add features or fix unrelated bugs — refactor only.
- DO NOT add runtime dependencies.
- If a change would alter behavior, stop and flag it instead.
