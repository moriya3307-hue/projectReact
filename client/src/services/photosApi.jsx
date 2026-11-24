import { request } from "./apiClient";

// פניות לשרת בנושא photos

// "חלק" מהתמונות של אלבום – לטעינה בשלבים
// start – מאיזה מקום ברשימה להתחיל (0 בפעם הראשונה, אחר כך כמה שכבר נטענו)
// limit – כמה תמונות להביא בכל פעם
export function getPhotos(albumId, start, limit) {
  return request(`/photos?albumId=${albumId}&_start=${start}&_limit=${limit}`);
}

// הוספת תמונה לאלבום
export function createPhoto(albumId, title, url) {
  return request("/photos", {
    method: "POST",
    body: { albumId, title, url, thumbnailUrl: url },
  });
}

// עדכון חלקי של תמונה (כותרת / כתובת)
export function patchPhoto(id, changes) {
  return request(`/photos/${id}`, { method: "PATCH", body: changes });
}

// מחיקת תמונה
export function removePhoto(id) {
  return request(`/photos/${id}`, { method: "DELETE" });
}
