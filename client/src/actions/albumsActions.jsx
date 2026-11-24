import { getAlbums, createAlbum, removeAlbum } from "../services/albumsApi";

/* פונקציות הפעולה של האלבומים – קוראות לשרת דרך services ומעדכנות את ה-state עם dispatch */

// טעינת כל האלבומים של המשתמש
export async function loadAlbums(dispatch, userId) {
  dispatch({ type: "LOAD_START" });
  try {
    const data = await getAlbums(userId);
    dispatch({ type: "LOAD_SUCCESS", payload: data });
  } catch {
    dispatch({ type: "SET_ERROR", payload: "טעינת האלבומים נכשלה" });
  }
}

// יצירת אלבום
export async function addAlbum(dispatch, userId, title) {
  try {
    const newAlbum = await createAlbum(userId, title);
    dispatch({ type: "ADD", payload: newAlbum });
  } catch {
    dispatch({ type: "SET_ERROR", payload: "יצירת האלבום נכשלה" });
  }
}

// מחיקת אלבום (השרת מוחק איתו גם את התמונות שלו)
export async function deleteAlbum(dispatch, id) {
  try {
    await removeAlbum(id);
    dispatch({ type: "DELETE", payload: id });
  } catch {
    dispatch({ type: "SET_ERROR", payload: "מחיקת האלבום נכשלה" });
  }
}
