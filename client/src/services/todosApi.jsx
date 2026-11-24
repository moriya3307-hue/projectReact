import { request } from "./apiClient";

// פניות לשרת בנושא todos

// כל המשימות של משתמש
export function getTodos(userId) {
  return request(`/todos?userId=${userId}`);
}

// יצירת משימה חדשה
export function createTodo(userId, title) {
  return request("/todos", {
    method: "POST",
    body: { userId, title, completed: false },
  });
}

// עדכון חלקי של משימה (כותרת / מצב ביצוע)
export function patchTodo(id, changes) {
  return request(`/todos/${id}`, { method: "PATCH", body: changes });
}

// מחיקת משימה
export function removeTodo(id) {
  return request(`/todos/${id}`, { method: "DELETE" });
}
