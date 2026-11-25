import { useState } from "react";

export default function PostForm({ initialPost, submitLabel, onSubmit, onCancel }) {
  const [title, setTitle] = useState(initialPost ? initialPost.title : "");
  const [body, setBody] = useState(initialPost ? initialPost.body : "");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    const trimmedBody = body.trim();
    if (trimmedTitle === "" || trimmedBody === "") {
      setError("יש למלא כותרת ותיאור");
      return;
    }
    onSubmit(trimmedTitle, trimmedBody);
  };

  return (
    <form className="post-details card post-form" onSubmit={handleSubmit}>
      <h2>{initialPost ? "עדכון מסלול" : "מסלול חדש"}</h2>

      <input
        className="input"
        placeholder="כותרת"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        autoFocus
      />
      <textarea
        className="input"
        placeholder="תיאור המסלול"
        rows={15}
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />

      {error && <p className="error-text">{error}</p>}

      <div className="post-details__actions">
        <button type="submit" className="btn btn-primary">{submitLabel}</button>
        <button type="button" className="btn btn-outline" onClick={onCancel}>ביטול</button>
      </div>
    </form>
  );
}
