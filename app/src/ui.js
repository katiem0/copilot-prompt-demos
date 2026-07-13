// DOM rendering. Kept separate from store.js so logic stays testable.

/**
 * Render the task list into the given <ul>.
 * @param {HTMLElement} listEl
 * @param {import("./store.js").Task[]} tasks
 * @param {(id: string) => void} onAdvance
 * @param {(id: string) => void} onDelete
 */
export function renderTasks(listEl, tasks, onAdvance, onDelete) {
  listEl.innerHTML = "";
  for (const task of tasks) {
    listEl.appendChild(createTaskElement(task, onAdvance, onDelete));
  }
}

function createTaskElement(task, onAdvance, onDelete) {
  const li = document.createElement("li");
  li.className = "task";
  if (task.status === "done") {
    li.classList.add("is-done");
  }
  li.dataset.priority = task.priority;
  li.dataset.id = task.id;

  const title = document.createElement("span");
  title.className = "task-title";
  title.textContent = task.title;

  const status = document.createElement("span");
  status.className = "task-status";
  status.textContent = task.status;

  const actions = document.createElement("div");
  actions.className = "task-actions";

  const advanceBtn = document.createElement("button");
  advanceBtn.type = "button";
  advanceBtn.textContent = "Advance";
  advanceBtn.addEventListener("click", () => onAdvance(task.id));

  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.className = "delete";
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", () => onDelete(task.id));

  actions.append(advanceBtn, deleteBtn);
  li.append(title, status, actions);
  return li;
}

/**
 * Update the summary counters.
 * @param {{ total: number, todo: number, doing: number, done: number }} summary
 */
export function renderStats(summary) {
  setText("stat-total", `${summary.total} total`);
  setText("stat-todo", `${summary.todo} to do`);
  setText("stat-doing", `${summary.doing} doing`);
  setText("stat-done", `${summary.done} done`);
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) {
    el.textContent = text;
  }
}
