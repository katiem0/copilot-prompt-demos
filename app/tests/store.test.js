import { test } from "node:test";
import assert from "node:assert/strict";

import {
  createTask,
  addTask,
  deleteTask,
  advanceStatus,
  filterTasks,
  summarize,
} from "../src/store.js";

test("createTask trims the title and defaults to medium priority", () => {
  const task = createTask("  Ship the demo  ");
  assert.equal(task.title, "Ship the demo");
  assert.equal(task.priority, "medium");
  assert.equal(task.status, "todo");
  assert.ok(task.id);
});

test("createTask rejects an empty title", () => {
  assert.throws(() => createTask("   "), /title is required/);
});

test("createTask rejects an invalid priority", () => {
  assert.throws(() => createTask("Task", "urgent"), /Invalid priority/);
});

test("addTask appends without mutating the original list", () => {
  const original = [];
  const next = addTask(original, createTask("A"));
  assert.equal(next.length, 1);
  assert.equal(original.length, 0);
});

test("deleteTask removes only the matching task", () => {
  const a = createTask("A");
  const b = createTask("B");
  const next = deleteTask([a, b], a.id);
  assert.deepEqual(
    next.map((t) => t.title),
    ["B"]
  );
});

test("advanceStatus cycles todo -> doing -> done -> todo", () => {
  let tasks = [createTask("A")];
  const id = tasks[0].id;
  tasks = advanceStatus(tasks, id);
  assert.equal(tasks[0].status, "doing");
  tasks = advanceStatus(tasks, id);
  assert.equal(tasks[0].status, "done");
  tasks = advanceStatus(tasks, id);
  assert.equal(tasks[0].status, "todo");
});

test("filterTasks returns all tasks for the 'all' filter", () => {
  const tasks = [createTask("A"), createTask("B")];
  assert.equal(filterTasks(tasks, "all").length, 2);
});

test("summarize counts tasks by status", () => {
  let tasks = [createTask("A"), createTask("B"), createTask("C")];
  tasks = advanceStatus(tasks, tasks[0].id); // doing
  tasks = advanceStatus(tasks, tasks[1].id);
  tasks = advanceStatus(tasks, tasks[1].id); // done
  const summary = summarize(tasks);
  assert.deepEqual(summary, { total: 3, todo: 1, doing: 1, done: 1 });
});
