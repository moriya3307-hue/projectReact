import { createResourceApi } from "./apiClient";

// פניות לשרת בנושא todos
// הפעולות הבסיסיות מגיעות מהפונקציה הגנרית, וכאן נשאר רק מה שייחודי למשימות
const todosApi = createResourceApi("todos");

// כל המשימות של משתמש
export const getTodos = (userId) => todosApi.getList({ userId });

// יצירת משימה חדשה – משימה חדשה תמיד מתחילה כלא בוצעה
export const createTodo = (userId, title) =>
  todosApi.create({ userId, title, completed: false });

// עדכון חלקי של משימה (כותרת / מצב ביצוע)
export const patchTodo = todosApi.patch;

// מחיקת משימה
export const removeTodo = todosApi.remove;
