import { request } from "./apiClient";

// פניות לשרת בנושא comments (תגובות לפוסט)

// כל התגובות של פוסט אחד
export function getComments(postId) {
  return request(`/comments?postId=${postId}`);
}

// הוספת תגובה של המשתמש המחובר
// userId – מזהה ייחודי של הכותב: לפיו יודעים אילו תגובות "שלי" (מותר לעדכן/למחוק רק אותן)
// name   – לתצוגה ליד התגובה ("דוד כהן: ...")
export function createComment(postId, user, body) {
  return request("/comments", {
    method: "POST",
    body: { postId, userId: user.id, name: user.name, body },
  });
}

// עדכון חלקי של תגובה (התוכן)
export function patchComment(id, changes) {
  return request(`/comments/${id}`, { method: "PATCH", body: changes });
}

// מחיקת תגובה
export function removeComment(id) {
  return request(`/comments/${id}`, { method: "DELETE" });
}
