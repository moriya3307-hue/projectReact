import { getUserPosts, getAllPosts, createPost, patchPost, removePost } from "../services/postsApi";

export async function loadPosts(dispatch, userId, showAll) {
  dispatch({ type: "LOAD_START" });
  try {
    const data = showAll ? await getAllPosts() : await getUserPosts(userId);
    dispatch({ type: "LOAD_SUCCESS", payload: data });
  } catch {
    dispatch({ type: "SET_ERROR", payload: "טעינת המסלולים נכשלה" });
  }
}

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

export async function updatePost(dispatch, id, changes) {
  try {
    const updated = await patchPost(id, changes);
    dispatch({ type: "UPDATE", payload: updated });
  } catch {
    dispatch({ type: "SET_ERROR", payload: "עדכון המסלול נכשל" });
  }
}

export async function deletePost(dispatch, id) {
  try {
    await removePost(id);
    dispatch({ type: "DELETE", payload: id });
  } catch {
    dispatch({ type: "SET_ERROR", payload: "מחיקת המסלול נכשלה" });
  }
}
