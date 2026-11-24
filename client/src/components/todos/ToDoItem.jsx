import { useState } from "react";
import "../../styles/ToDoItem.css";

export default function TodoItem({ todo, onToggle, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const startEdit = () => {
    setNewTitle(todo.title);
    setIsEditing(true);
  };

  const saveEdit = () => {
    const trimmed = newTitle.trim();
    if (trimmed === "") return;
    if (trimmed !== todo.title) onEdit(trimmed);
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setNewTitle(todo.title);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") saveEdit();
    if (e.key === "Escape") cancelEdit();
  };

  return (
    <li className={`todo-item ${todo.completed ? "done" : ""}`}>
      <span className="todo-id">{todo.id}</span>

      <input
        type="checkbox"
        checked={todo.completed}
        onChange={onToggle}
      />

      {isEditing ? (
        <>
          <input
            type="text"
            className="input todo-edit-input"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          <div className="todo-actions">
            <button className="btn btn-primary" onClick={saveEdit}>שמירה</button>
            <button className="btn btn-outline" onClick={cancelEdit}>ביטול</button>
          </div>
        </>
      ) : (
        <>
          <span className="todo-title">{todo.title}</span>
          <div className="todo-actions">
            <button className="btn btn-outline" onClick={startEdit}>עדכון</button>
            <button className="btn btn-danger" onClick={onDelete}>מחיקה</button>
          </div>
        </>
      )}
    </li>
  );
}