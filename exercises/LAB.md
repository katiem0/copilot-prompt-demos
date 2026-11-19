# Lab: Engineering Reusable Copilot Context

This lab follows the demonstration after the informational slides. It assumes
you already use Copilot Chat, can inspect a diff, and can run tests. The focus is
how instructions, prompt files, evidence, and agent tools control a workflow.

## Setup

From the repository root:

```bash
npm test
```

Expected baseline: 8 tests pass.

After each exercise, reset only the demo application:

```bash
git restore app/
git clean -fd app/
npm test
```

## 1. Inspect scoped instructions

Open these files side by side:

- `.github/instructions/javascript.instructions.md`
- `app/src/store.js`

Find the instruction's routing rule:

```yaml
applyTo: "app/**/*.js"
```

In Copilot Chat **Ask** mode, enter exactly:

```text
For app/src/store.js, propose the signature and implementation rules for a new
filterByPriority function. Do not edit files. List which active repository
instructions influenced your answer.
```

Check the response for:

- pure business logic in `store.js`
- immutable array handling
- validation with a clear error
- JSDoc on the exported function

Open Chat's references panel. Confirm the repository and scoped instructions
are present. The important behavior is conditional context selection, not the
specific implementation proposed.

## 2. Evaluate and run a composed prompt

> **Note:** Prompt files are the **prototype tier** for a workflow — one
> developer's canned task, easy to write, easy to iterate. The same workflows
> now also ship as discoverable skills under `.github/skills/`. Keep the prompt
> files below as compatibility and learning examples, and prefer a skill or agent
> when a workflow is shared with a team.

Open `.github/prompts/add-feature.prompt.md`. Identify:

1. the input parameter
2. linked source and instruction files
3. the ordered implementation steps
4. command access for verification
5. the final output contract
6. the **stop signal** in step 1 ("Stop and confirm the criteria are testable
   before coding") and the negative constraint on the last line ("Do not mutate
   inputs"). These prevent the agent from over-building beyond what you asked
   for.

In Copilot Chat, enter exactly:

```text
/add-feature Add a pure filterByPriority(tasks, priority) function. Accept low,
medium, and high. Return only matching tasks without mutating the input. Throw
for any other priority. Store logic and tests only; do not change the UI.
```

If prompted to confirm the criteria, reply:

```text
Proceed. The criteria are testable. Keep the change limited to app/src/store.js
and app/tests/store.test.js.
```

Verify independently:

```bash
npm test
git diff -- app/src/store.js app/tests/store.test.js
```

Check that:

- `filterByPriority` is exported and documented
- accepted priorities are `low`, `medium`, and `high`
- invalid input throws
- tests cover matching, invalid input, and input immutability
- the UI was not changed
- the final response reports files, acceptance-criteria coverage, and test result

The code may differ between runs. The stable contract is placement, criteria,
evidence, and output shape.

Reset the app before continuing.

## 3. Run a test-first, self-verifying workflow

Open `.github/prompts/spec-first.prompt.md`. Find the ordered **Red**, **Green**,
**Refactor**, and **Verify** steps.

Enter exactly:

```text
/spec-first Add toggleTaskStarred(tasks, id). A task starts with no starred
property. Toggling a matching task returns a new array and a new task object
with starred true; toggling again sets starred false. Non-matching tasks retain
their references. An unknown id leaves values unchanged. Tests must prove input
immutability.
```

If prompted to confirm test cases, reply:

```text
Proceed with those observable test cases. Preserve the Red, Green, Refactor,
and Verify order and include both test command summaries.
```

Observe and record:

- the first failing test and why it failed
- whether tests existed before implementation
- the final passing test summary
- whether the response reported both red and green evidence

A passing final run is not sufficient by itself. The failing run proves the new
test can detect missing behavior.

Reset the app before continuing.

## 4. Use an independent read-only reviewer

In `app/src/store.js`, replace `deleteTask` with:

```js
export function deleteTask(tasks, id) {
  const index = tasks.findIndex((task) => task.id === id);
  if (index !== -1) {
    tasks.splice(index, 1);
  }
  return tasks;
}
```

Inspect the change:

```bash
git diff -- app/src/store.js
```

Select the **Spec Reviewer** agent and enter exactly:

```text
Review #changes for merge readiness. Apply the DevTasks architecture,
immutability, conventions, and test-coverage rules. Do not edit files. Return
the required evidence table and verdict.
```

Confirm that the response:

- identifies `tasks.splice(...)` as input mutation
- cites `app/src/store.js`
- discusses missing immutability coverage where applicable
- returns `REQUEST CHANGES`
- does not edit any files

Open `.github/agents/spec-reviewer.agent.md` and inspect:

```yaml
tools: [read, search, changes]
```

The tool list preserves separation between implementation and review: this
agent can inspect and decide, but cannot repair its own findings. It is also
the strongest form of **stop signal** — expressed as capability rather than
instruction. The reviewer physically cannot rewrite the code it judges, even
if the model would like to "be helpful" and fix the mutation. This is why we
recommend agents (and skills) over prompt files for anything a team shares:
they let you enforce boundaries, not just request them.

Reset the app and confirm 8 tests pass.

## 5. Apply the pattern to your team

Choose one recurring Copilot workflow from your own repository and classify it.
Prefer the top of this table for anything a team will share:

| Need | Customization |
|---|---|
| **Specialized role, shared by a team** | **`*.agent.md` with the minimum required tools** *(strongest stop signals)* |
| **Multi-step workflow with bundled assets** | **`SKILL.md`** the model invokes by name |
| Rules for matching files | `*.instructions.md` with a narrow `applyTo` |
| Repository-wide facts | `copilot-instructions.md` |
| One person's canned task | `*.prompt.md` with references, steps, and evidence *(prototype tier — promote to an agent or skill when shared)* |

Before adopting it, answer:

- What source owns each rule?
- What should be linked rather than duplicated?
- Which command or diff can falsify success?
- What output shape does the next reviewer or tool need?
- Which tools are unnecessary for this role?
- **Where are the stop signals?** Pause-and-confirm steps, negative constraints,
  and tool caps — so the model builds what you asked for and nothing more.

Treat the resulting customization as code: review it in a PR, rehearse it on a
small set of representative tasks, and remove context that stops earning its
place.
