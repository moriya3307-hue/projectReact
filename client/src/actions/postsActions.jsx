import { getUserPosts, getAllPosts, createPost, patchPost, removePost } from "../services/postsApi";

/* פונקציות הפעולה של הפוסטים – קוראות לשרת דרך services ומעדכנות את ה-state עם dispatch */

// טעינת פוסטים:
// showAll = false → רק הפוסטים של המשתמש ("המסלולים שלי")
// showAll = true  → הפוסטים של כל המשתמשים ("כל המסלולים")
export async function loadPosts(dispatch, userId, showAll) {
  dispatch({ type: "LOAD_START" });
  try {
    const data = showAll ? await getAllPosts() : await getUserPosts(userId);
    dispatch({ type: "LOAD_SUCCESS", payload: data });
  } catch {
    dispatch({ type: "SET_ERROR", payload: "טעינת המסלולים נכשלה" });
  }
}

// הוספת פוסט – תמיד של המשתמש המחובר
// מחזירה את הפוסט החדש (כדי שהעמוד יוכל לבחור בו מיד), או null אם נכשל
export async function addPost(dispatch, userId, title, body) {
  try {
    const newPost = await createPost(userId, title, body);
    dispatch({ type: "ADD", payload: newPost });
    return newPost;
  } catch {
    dispatch({ type: "SET_ERROR", payload: "הוספת המסלול נכשלה" });
    return null;
  }
}

// עדכון פוסט: כותרת / תוכן
export async function updatePost(dispatch, id, changes) {
  try {
    const updated = await patchPost(id, changes);
    dispatch({ type: "UPDATE", payload: updated });
  } catch {
    dispatch({ type: "SET_ERROR", payload: "עדכון המסלול נכשל" });
  }
}

// מחיקת פוסט (השרת מוחק איתו גם את התגובות שלו)
export async function deletePost(dispatch, id) {
  try {
    await removePost(id);
    dispatch({ type: "DELETE", payload: id });
  } catch {
    dispatch({ type: "SET_ERROR", payload: "מחיקת המסלול נכשלה" });
  }
}
