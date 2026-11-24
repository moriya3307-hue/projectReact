import { request } from "./apiClient";

// פניות לשרת בנושא albums

// כל האלבומים של משתמש
export function getAlbums(userId) {
  return request(`/albums?userId=${userId}`);
}

// אלבום אחד לפי מספר – לכותרת בעמוד התמונות ולבדיקה שהאלבום שייך למשתמש
export function getAlbum(id) {
  return request(`/albums/${id}`);
}

// יצירת אלבום חדש
export function createAlbum(userId, title) {
  return request("/albums", {
    method: "POST",
    body: { userId, title },
  });
}

// מחיקת אלבום
// json-server מוחק אוטומטית גם את כל התמונות שה-albumId שלהן מצביע על האלבום
export function removeAlbum(id) {
  return request(`/albums/${id}`, { method: "DELETE" });
}
