import { useState } from "react";

export default function PhotoItem({ photo, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(photo.title);
  const [newUrl, setNewUrl] = useState(photo.url);

  const startEdit = () => {
    setNewTitle(photo.title);
    setNewUrl(photo.url);
    setIsEditing(true);
  };

  const saveEdit = () => {
    const title = newTitle.trim();
    const url = newUrl.trim();
    if (title === "" || url === "") return;

    const changes = {};
    if (title !== photo.title) changes.title = title;
    if (url !== photo.url) {
      changes.url = url;
      changes.thumbnailUrl = url;
    }
    if (Object.keys(changes).length > 0) onEdit(changes);
    setIsEditing(false);
  };

  const cancelEdit = () => setIsEditing(false);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") saveEdit();
    if (e.key === "Escape") cancelEdit();
  };

  return (
    <li className="photo-card card">
      <img src={photo.url || photo.thumbnailUrl} alt={photo.title} />

      {isEditing ? (
        <>
          <input
            className="input"
            placeholder="כותרת"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          <input
            className="input"
            placeholder="כתובת התמונה"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <div className="photo-card__footer">
            <span />
            <button className="btn btn-primary" onClick={saveEdit}>שמירה</button>
            <button className="btn btn-outline" onClick={cancelEdit}>ביטול</button>
          </div>
        </>
      ) : (
        <div className="photo-card__footer">
          <span>{photo.id} · {photo.title}</span>
          <button className="btn btn-outline" onClick={startEdit}>עדכון</button>
          <button className="btn btn-danger" onClick={onDelete}>מחיקה</button>
        </div>
      )}
    </li>
  );
}
