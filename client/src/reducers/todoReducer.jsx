/* ה-reducer של המשימות – רק מחשב state חדש לפי action. הפעולות מול השרת נמצאות ב-actions/todosActions.jsx */

export const initialTodosState = {
  todos: [],
  loading: false,
  error: null,
};

export function todosReducer(state, action) {
  switch (action.type) {
    case "LOAD_START":
      return { ...state, loading: true, error: null };

    case "LOAD_SUCCESS":
      return { ...state, loading: false, todos: action.payload };

    case "SET_ERROR":
      return { ...state, loading: false, error: action.payload };

    case "ADD":
      return { ...state, todos: [...state.todos, action.payload] };

    case "UPDATE":
      return {
        ...state,
        todos: state.todos.map((t) =>
          t.id === action.payload.id ? action.payload : t
        ),
      };

    case "DELETE":
      return {
        ...state,
        todos: state.todos.filter((t) => t.id !== action.payload),
      };

    default:
      return state;
  }
}
