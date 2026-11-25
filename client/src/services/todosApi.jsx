import { createResourceApi } from "./apiClient";

const todosApi = createResourceApi("todos");

export const getTodos = (userId) => todosApi.getList({ userId });

export const createTodo = (userId, title) =>
  todosApi.create({ userId, title, completed: false });

export const patchTodo = todosApi.patch;

export const removeTodo = todosApi.remove;
