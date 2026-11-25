import { createResourceApi } from "./apiClient";

// פניות לשרת בנושא posts ("מסלולים")
const postsApi = createResourceApi("posts");

// כל הפוסטים של משתמש אחד – לכפתור "המסלולים שלי"
export const getUserPosts = (userId) => postsApi.getList({ userId });

// כל הפוסטים של כל המשתמשים – לכפתור "כל המסלולים" (בלי סינון)
export const getAllPosts = () => postsApi.getList();

// יצירת פוסט חדש
export const createPost = (userId, title, body) =>
  postsApi.create({ userId, title, body });

// עדכון חלקי של פוסט (כותרת / תוכן)
export const patchPost = postsApi.patch;

// מחיקת פוסט
// json-server מוחק אוטומטית גם את כל התגובות שה-postId שלהן מצביע על הפוסט
export const removePost = postsApi.remove;
