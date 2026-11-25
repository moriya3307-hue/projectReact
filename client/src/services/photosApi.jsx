import { createResourceApi } from "./apiClient";

// פניות לשרת בנושא photos
const photosApi = createResourceApi("photos");

// "חלק" מהתמונות של אלבום – לטעינה בשלבים
// start – מאיזה מקום ברשימה להתחיל (0 בפעם הראשונה, אחר כך כמה שכבר נטענו)
// limit – כמה תמונות להביא בכל פעם
export const getPhotos = (albumId, start, limit) =>
  photosApi.getList({ albumId, _start: start, _limit: limit });

// הוספת תמונה לאלבום
export const createPhoto = (albumId, title, url) =>
  photosApi.create({ albumId, title, url, thumbnailUrl: url });

// עדכון חלקי של תמונה (כותרת / כתובת)
export const patchPhoto = photosApi.patch;

// מחיקת תמונה
export const removePhoto = photosApi.remove;
