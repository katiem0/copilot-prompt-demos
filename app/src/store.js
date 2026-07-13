// Pure, framework-free task logic.
// These functions never touch the DOM or storage, which makes them easy to
// test and easy to reason about — the ideal target for repeatable prompts.

/** @typedef {"low" | "medium" | "high"} Priority */
/** @typedef {"todo" | "doing" | "done"} Status */
/**
 * @typedef {Object} Task
 * @property {string} id
 * @property {string} title
 * @property {Priority} priority
 * @property {Status} status
 * @property {number} createdAt
 */

const PRIORITIES = ["low", "medium", "high"];
const STATUSES = ["todo", "doing", "done"];

/** Next status in the todo -> doing -> done -> todo cycle. */
const NEXT_STATUS = {
  todo: "doing",
  doing: "done",
  done: "todo",
};

/**
 * Create a normalized task from raw input.
 * @param {string} title
 * @param {Priority} [priority]
 * @returns {Task}
 */
export function createTask(title, priority = "medium") {
  const trimmed = String(title ?? "").trim();
  if (!trimmed) {
    throw new Error("Task title is required");
  }
  if (!PRIORITIES.includes(priority)) {
    throw new Error(`Invalid priority: ${priority}`);
  }
  return {
    id: generateId(),
    title: trimmed,
    priority,
    status: "todo",
    createdAt: Date.now(),
  };
}

/**
 * Return a new task list with the task appended (immutably).
 * @param {Task[]} tasks
 * @param {Task} task
 * @returns {Task[]}
 */
export function addTask(tasks, task) {
  return [...tasks, task];
}

/**
 * Return a new task list with the matching task removed.
 * @param {Task[]} tasks
 * @param {string} id
 * @returns {Task[]}
 */
export function deleteTask(tasks, id) {
  return tasks.filter((task) => task.id !== id);
}

/**
 * Advance a task's status through the todo -> doing -> done -> todo cycle.
 * @param {Task[]} tasks
 * @param {string} id
 * @returns {Task[]}
 */
export function advanceStatus(tasks, id) {
  return tasks.map((task) =>
    task.id === id ? { ...task, status: NEXT_STATUS[task.status] } : task
  );
}

/**
 * Filter tasks by status. "all" returns everything.
 * @param {Task[]} tasks
 * @param {Status | "all"} filter
 * @returns {Task[]}
 */
export function filterTasks(tasks, filter) {
  if (filter === "all") {
    return [...tasks];
  }
  if (!STATUSES.includes(filter)) {
    throw new Error(`Invalid filter: ${filter}`);
  }
  return tasks.filter((task) => task.status === filter);
}

/**
 * Count tasks by status.
 * @param {Task[]} tasks
 * @returns {{ total: number, todo: number, doing: number, done: number }}
 */
export function summarize(tasks) {
  return {
    total: tasks.length,
    todo: tasks.filter((t) => t.status === "todo").length,
    doing: tasks.filter((t) => t.status === "doing").length,
    done: tasks.filter((t) => t.status === "done").length,
  };
}

function generateId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `t_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

export { PRIORITIES, STATUSES };
