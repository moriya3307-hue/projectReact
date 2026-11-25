import { useState } from "react";
import PostForm from "./PostForm";
import Comments from "./Comments";

export default function PostDetails({ post, isMine, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [showComments, setShowComments] = useState(false);

  if (isEditing) {
    return (
      <PostForm
        initialPost={post}
        submitLabel="שמירה"
        onSubmit={(title, body) => {
          const changes = {};
          if (title !== post.title) changes.title = title;
          if (body !== post.body) changes.body = body;
          if (Object.keys(changes).length > 0) onEdit(changes);
          setIsEditing(false);
        }}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  return (
    <section className="post-details card">
      <h2>{post.title}</h2>
      <p className="post-details__body">{post.body}</p>

      <div className="post-details__actions">
        {isMine && (
          <>
            <button className="btn btn-outline" onClick={() => setIsEditing(true)}>עדכון</button>
            <button className="btn btn-danger" onClick={onDelete}>מחיקה</button>
          </>
        )}
        <button className="btn btn-outline" onClick={() => setShowComments(!showComments)}>
          {showComments ? "הסתר תגובות" : "הצג תגובות"}
        </button>
      </div>

      {showComments && <Comments postId={post.id} />}
    </section>
  );
}
