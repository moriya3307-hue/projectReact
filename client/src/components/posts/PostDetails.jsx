import { useState } from "react";
import PostForm from "./PostForm";
import Comments from "./Comments";

// פרטי המסלול שנבחר – כותרת + תוכן + תגובות
// isMine – האם המסלול שייך למשתמש המחובר (רק אז מותר לעדכן / למחוק)
export default function PostDetails({ post, isMine, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [showComments, setShowComments] = useState(false); // התגובות נטענות רק בלחיצה

  if (isEditing) {
    return (
      <PostForm
        initialPost={post}
        submitLabel="שמירה"
        onSubmit={(title, body) => {
          // שולחים לשרת רק את מה שהשתנה
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
        {/* עדכון / מחיקה – רק למסלול של המשתמש המחובר */}
        {isMine && (
          <>
            <button className="btn btn-outline" onClick={() => setIsEditing(true)}>עדכון</button>
            <button className="btn btn-danger" onClick={onDelete}>מחיקה</button>
          </>
        )}
        {/* הצגת תגובות – לכל מסלול */}
        <button className="btn btn-outline" onClick={() => setShowComments(!showComments)}>
          {showComments ? "הסתר תגובות" : "הצג תגובות"}
        </button>
      </div>

      {showComments && <Comments postId={post.id} />}
    </section>
  );
}
