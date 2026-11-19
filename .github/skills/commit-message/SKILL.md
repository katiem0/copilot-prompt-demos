---
name: commit-message
description: Draft a Conventional Commits message grounded only in the current diff and test evidence. Use before creating a commit.
---

# Draft a commit message

Read only the current diff and supplied test evidence. Do not stage, commit, or edit files.

Return only one fenced code block:

```text
<type>(<scope>): <summary in imperative mood, <= 72 chars>

<body: what & why, wrapped at 72 cols; omit if trivial>

<footer: BREAKING CHANGE / refs; omit if none>
```

Use `feat`, `fix`, `refactor`, `test`, `docs`, `chore`, or `perf`.
Do not invent UI, persistence, test, or integration changes that are absent from the evidence.
