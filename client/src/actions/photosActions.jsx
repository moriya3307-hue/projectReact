import { getPhotos, createPhoto, patchPhoto, removePhoto } from "../services/photosApi";
import { PAGE_SIZE } from "../reducers/photosReducer";

export async function loadPhotos(dispatch, albumId) {
  dispatch({ type: "LOAD_START" });
  try {
    const data = await getPhotos(albumId, 0, PAGE_SIZE);
    dispatch({ type: "LOAD_SUCCESS", payload: data });
  } catch {
    dispatch({ type: "SET_ERROR", payload: "טעינת התמונות נכשלה" });
  }
}

export async function loadMorePhotos(dispatch, albumId, start) {
  dispatch({ type: "LOAD_MORE_START" });
  try {
    const data = await getPhotos(albumId, start, PAGE_SIZE);
    dispatch({ type: "LOAD_MORE_SUCCESS", payload: data });
  } catch {
    dispatch({ type: "SET_ERROR", payload: "טעינת תמונות נוספות נכשלה" });
  }
}

export async function addPhoto(dispatch, albumId, title, url) {
  try {
    const newPhoto = await createPhoto(albumId, title, url);
    dispatch({ type: "ADD", payload: newPhoto });
  } catch {
    dispatch({ type: "SET_ERROR", payload: "הוספת התמונה נכשלה" });
  }
}

export async function updatePhoto(dispatch, id, changes) {
  try {
    const updated = await patchPhoto(id, changes);
    dispatch({ type: "UPDATE", payload: updated });
  } catch {
    dispatch({ type: "SET_ERROR", payload: "עדכון התמונה נכשל" });
  }
}

export async function deletePhoto(dispatch, id) {
  try {
    await removePhoto(id);
    dispatch({ type: "DELETE", payload: id });
  } catch {
    dispatch({ type: "SET_ERROR", payload: "מחיקת התמונה נכשלה" });
  }
}
