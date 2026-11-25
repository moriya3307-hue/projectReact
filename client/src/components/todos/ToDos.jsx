import { useReducer, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { todosReducer, initialTodosState } from "../../reducers/todoReducer";
import { loadTodos, addTodo, updateTodo, deleteTodo } from "../../actions/todosActions";
import TodoItem from "./ToDoItem";
import TodoSort from "./ToDoSort";
import useSearch from "../../hooks/useSearch";
import useSort from "../../hooks/useSort";
import "../../styles/Todos.css";

const SEARCH_OPTIONS = [
  { value: "title", label: "כותרת" },
  { value: "id", label: "מספר" },
  { value: "completed", label: "ביצוע" },
];

export default function Todos() {
  const { user } = useOutletContext();
  const userId = user.id;

  const [state, dispatch] = useReducer(todosReducer, initialTodosState);
  const [newTitle, setNewTitle] = useState("");

  const { query, setQuery, searchBy, setSearchBy, filtered } = useSearch(
    state.todos,
    SEARCH_OPTIONS.map((opt) => opt.value)
  );

  const { sortBy, setSortBy, sorted: sortedTodos } = useSort(filtered, "id");

  const handleSearchByChange = (e) => {
    setSearchBy(e.target.value);
    setQuery("");
  };

  useEffect(() => {
    loadTodos(dispatch, userId);
  }, [userId]);

  const handleAdd = (e) => {
    e.preventDefault();
    const trimmed = newTitle.trim();
    if (trimmed === "") return;
    addTodo(dispatch, userId, trimmed);
    setNewTitle("");
  };

  if (state.loading) return <p className="page">טוען...</p>;

  return (
    <div className="page">
      <h1 className="page-title">ציוד ומשימות לטיול</h1>

      {state.error && <p className="error-text">{state.error}</p>}

      <div className="todos-toolbar">
        <div className="todos-search">
          {searchBy === "completed" ? (
            <select className="input" value={query} onChange={(e) => setQuery(e.target.value)}>
              <option value="">הכל</option>
              <option value="true">בוצע</option>
              <option value="false">לא בוצע</option>
            </select>
          ) : (
            <input
              className="input"
              placeholder="חיפוש"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          )}

          <label className="todo-sort">
            חיפוש לפי:
            <select value={searchBy} onChange={handleSearchByChange}>
              {SEARCH_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>
        </div>
        <TodoSort sortBy={sortBy} onSortChange={setSortBy} />
      </div>

      <form className="todos-add" onSubmit={handleAdd}>
        <input
          className="input"
          placeholder="משימה חדשה"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">הוספה</button>
      </form>

      <ul className="todo-list">
        {sortedTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={() => updateTodo(dispatch, todo.id, { completed: !todo.completed })}
            onEdit={(title) => updateTodo(dispatch, todo.id, { title })}
            onDelete={() => deleteTodo(dispatch, todo.id)}
          />
        ))}
      </ul>
    </div>
  );
}
