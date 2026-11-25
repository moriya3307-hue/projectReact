import { createResourceApi } from "./apiClient";

// פניות לשרת בנושא comments (תגובות לפוסט)
const commentsApi = createResourceApi("comments");

// כל התגובות של פוסט אחד
export const getComments = (postId) => commentsApi.getList({ postId });

// הוספת תגובה של המשתמש המחובר
// userId – מזהה ייחודי של הכותב: לפיו יודעים אילו תגובות "שלי" (מותר לעדכן/למחוק רק אותן)
// name   – לתצוגה ליד התגובה ("דוד כהן: ...")
export const createComment = (postId, user, body) =>
  commentsApi.create({ postId, userId: user.id, name: user.name, body });

// עדכון חלקי של תגובה (התוכן)
export const patchComment = commentsApi.patch;

// מחיקת תגובה
export const removeComment = commentsApi.remove;
