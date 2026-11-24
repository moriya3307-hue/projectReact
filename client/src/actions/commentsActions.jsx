import { getComments, createComment, patchComment, removeComment } from "../services/commentsApi";

/* פונקציות הפעולה של התגובות – קוראות לשרת דרך services ומעדכנות את ה-state עם dispatch */

// טעינת כל התגובות של פוסט אחד
export async function loadComments(dispatch, postId) {
  dispatch({ type: "LOAD_START" });
  try {
    const data = await getComments(postId);
    dispatch({ type: "LOAD_SUCCESS", payload: data });
  } catch {
    dispatch({ type: "SET_ERROR", payload: "טעינת התגובות נכשלה" });
  }
}

// הוספת תגובה – user הוא המשתמש המחובר (נשמרים userId + name לזיהוי הכותב)
export async function addComment(dispatch, postId, user, body) {
  try {
    const newComment = await createComment(postId, user, body);
    dispatch({ type: "ADD", payload: newComment });
  } catch {
    dispatch({ type: "SET_ERROR", payload: "הוספת התגובה נכשלה" });
  }
}

// עדכון תוכן של תגובה
export async function updateComment(dispatch, id, body) {
  try {
    const updated = await patchComment(id, { body });
    dispatch({ type: "UPDATE", payload: updated });
  } catch {
    dispatch({ type: "SET_ERROR", payload: "עדכון התגובה נכשל" });
  }
}

// מחיקת תגובה
export async function deleteComment(dispatch, id) {
  try {
    await removeComment(id);
    dispatch({ type: "DELETE", payload: id });
  } catch {
    dispatch({ type: "SET_ERROR", payload: "מחיקת התגובה נכשלה" });
  }
}
