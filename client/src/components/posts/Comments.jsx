import { useReducer, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { commentsReducer, initialCommentsState } from "../../reducers/commentsReducer";
import {
  loadComments, addComment, updateComment, deleteComment,
} from "../../actions/commentsActions";
import CommentItem from "./CommentItem";

export default function Comments({ postId }) {
  const { user } = useOutletContext();

  const [state, dispatch] = useReducer(commentsReducer, initialCommentsState);
  const [newBody, setNewBody] = useState("");

  useEffect(() => {
    loadComments(dispatch, postId);
  }, [postId]);

  const handleAdd = (e) => {
    e.preventDefault();
    const trimmed = newBody.trim();
    if (trimmed === "") return;
    addComment(dispatch, postId, user, trimmed);
    setNewBody("");
  };

  return (
    <>
      {state.error && <p className="error-text">{state.error}</p>}

      {state.loading ? (
        <p className="muted">טוען תגובות...</p>
      ) : state.comments.length === 0 ? (
        <p className="muted">אין עדיין תגובות – אפשר להיות הראשונים</p>
      ) : (
        <ul className="comment-list">
          {state.comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              isMine={String(comment.userId) === String(user.id)}
              onEdit={(body) => updateComment(dispatch, comment.id, body)}
              onDelete={() => deleteComment(dispatch, comment.id)}
            />
          ))}
        </ul>
      )}

      <form className="comment-form" onSubmit={handleAdd}>
        <input
          className="input"
          placeholder="הוספת תגובה"
          value={newBody}
          onChange={(e) => setNewBody(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">שליחה</button>
      </form>
    </>
  );
}
