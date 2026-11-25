import { getTodos, createTodo, patchTodo, removeTodo } from "../services/todosApi";

export async function loadTodos(dispatch, userId) {
  dispatch({ type: "LOAD_START" });
  try {
    const data = await getTodos(userId);
    dispatch({ type: "LOAD_SUCCESS", payload: data });
  } catch {
    dispatch({ type: "SET_ERROR", payload: "טעינת המשימות נכשלה" });
  }
}

export async function addTodo(dispatch, userId, title) {
  try {
    const newTodo = await createTodo(userId, title);
    dispatch({ type: "ADD", payload: newTodo });
  } catch {
    dispatch({ type: "SET_ERROR", payload: "הוספת המשימה נכשלה" });
  }
}

export async function updateTodo(dispatch, id, changes) {
  try {
    const updated = await patchTodo(id, changes);
    dispatch({ type: "UPDATE", payload: updated });
  } catch {
    dispatch({ type: "SET_ERROR", payload: "עדכון המשימה נכשל" });
  }
}

export async function deleteTodo(dispatch, id) {
  try {
    await removeTodo(id);
    dispatch({ type: "DELETE", payload: id });
  } catch {
    dispatch({ type: "SET_ERROR", payload: "מחיקת המשימה נכשלה" });
  }
}
