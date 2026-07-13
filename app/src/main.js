// App wiring: connects the pure store, persistence, and the DOM.

import {
  createTask,
  addTask,
  deleteTask,
  advanceStatus,
  filterTasks,
  summarize,
} from "./store.js";
import { loadTasks, saveTasks } from "./storage.js";
import { renderTasks, renderStats } from "./ui.js";

/** @type {import("./store.js").Task[]} */
let tasks = loadTasks();
let currentFilter = "all";

const form = document.getElementById("add-form");
const titleInput = document.getElementById("task-title");
const priorityInput = document.getElementById("task-priority");
const listEl = document.getElementById("task-list");
const emptyState = document.getElementById("empty-state");
const filterButtons = document.querySelectorAll(".filter");

function render() {
  const visible = filterTasks(tasks, currentFilter);
  renderTasks(listEl, visible, handleAdvance, handleDelete);
  renderStats(summarize(tasks));
  emptyState.hidden = tasks.length > 0;
}

function persistAndRender() {
  saveTasks(tasks);
  render();
}

function handleAdd(event) {
  event.preventDefault();
  const task = createTask(titleInput.value, priorityInput.value);
  tasks = addTask(tasks, task);
  form.reset();
  priorityInput.value = "medium";
  titleInput.focus();
  persistAndRender();
}

function handleAdvance(id) {
  tasks = advanceStatus(tasks, id);
  persistAndRender();
}

function handleDelete(id) {
  tasks = deleteTask(tasks, id);
  persistAndRender();
}

function handleFilter(event) {
  currentFilter = event.currentTarget.dataset.filter;
  filterButtons.forEach((btn) =>
    btn.classList.toggle("is-active", btn === event.currentTarget)
  );
  render();
}

form.addEventListener("submit", handleAdd);
filterButtons.forEach((btn) => btn.addEventListener("click", handleFilter));

render();
