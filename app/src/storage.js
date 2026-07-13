// Thin wrapper over localStorage so the app can persist tasks between reloads.
// Falls back to an in-memory store when localStorage is unavailable
// (e.g. running under Node during tests).

const STORAGE_KEY = "devtasks.v1";

let memoryFallback = [];

function hasLocalStorage() {
  try {
    return typeof localStorage !== "undefined";
  } catch {
    return false;
  }
}

/** @returns {import("./store.js").Task[]} */
export function loadTasks() {
  if (!hasLocalStorage()) {
    return [...memoryFallback];
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/** @param {import("./store.js").Task[]} tasks */
export function saveTasks(tasks) {
  if (!hasLocalStorage()) {
    memoryFallback = [...tasks];
    return;
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}
