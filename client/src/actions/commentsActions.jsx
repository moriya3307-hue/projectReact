import { getComments, createComment, patchComment, removeComment } from "../services/commentsApi";

export async function loadComments(dispatch, postId) {
  dispatch({ type: "LOAD_START" });
  try {
    const data = await getComments(postId);
    dispatch({ type: "LOAD_SUCCESS", payload: data });
  } catch {
    dispatch({ type: "SET_ERROR", payload: "טעינת התגובות נכשלה" });
  }
}

export async function addComment(dispatch, postId, user, body) {
  try {
    const newComment = await createComment(postId, user, body);
    dispatch({ type: "ADD", payload: newComment });
  } catch {
    dispatch({ type: "SET_ERROR", payload: "הוספת התגובה נכשלה" });
  }
}

export async function updateComment(dispatch, id, body) {
  try {
    const updated = await patchComment(id, { body });
    dispatch({ type: "UPDATE", payload: updated });
  } catch {
    dispatch({ type: "SET_ERROR", payload: "עדכון התגובה נכשל" });
  }
}

export async function deleteComment(dispatch, id) {
  try {
    await removeComment(id);
    dispatch({ type: "DELETE", payload: id });
  } catch {
    dispatch({ type: "SET_ERROR", payload: "מחיקת התגובה נכשלה" });
  }
}
