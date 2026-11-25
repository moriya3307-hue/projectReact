import { useState } from "react";

export default function CommentItem({ comment, isMine, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newBody, setNewBody] = useState(comment.body);

  const startEdit = () => {
    setNewBody(comment.body);
    setIsEditing(true);
  };

  const saveEdit = () => {
    const trimmed = newBody.trim();
    if (trimmed === "") return;
    if (trimmed !== comment.body) onEdit(trimmed);
    setIsEditing(false);
  };

  const cancelEdit = () => setIsEditing(false);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") saveEdit();
    if (e.key === "Escape") cancelEdit();
  };

  return (
    <li className="comment">
      <strong>
        {comment.name}
        {isMine && " (אני)"}:
      </strong>{" "}

      {isEditing ? (
        <span className="comment-edit">
          <input
            className="input"
            value={newBody}
            onChange={(e) => setNewBody(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          <button className="btn btn-primary" onClick={saveEdit}>שמירה</button>
          <button className="btn btn-outline" onClick={cancelEdit}>ביטול</button>
        </span>
      ) : (
        <>
          {comment.body}
          {isMine && (
            <>
              {" · "}
              <button className="link-btn" onClick={startEdit}>עדכון</button>
              {" · "}
              <button className="link-btn link-btn--danger" onClick={onDelete}>מחיקה</button>
            </>
          )}
        </>
      )}
    </li>
  );
}
