import { createResourceApi } from "./apiClient";

// פניות לשרת בנושא albums
const albumsApi = createResourceApi("albums");

// כל האלבומים של משתמש
export const getAlbums = (userId) => albumsApi.getList({ userId });

// אלבום אחד לפי מספר – לכותרת בעמוד התמונות ולבדיקה שהאלבום שייך למשתמש
export const getAlbum = albumsApi.getById;

// יצירת אלבום חדש
export const createAlbum = (userId, title) =>
  albumsApi.create({ userId, title });

// מחיקת אלבום
// json-server מוחק אוטומטית גם את כל התמונות שה-albumId שלהן מצביע על האלבום
export const removeAlbum = albumsApi.remove;
