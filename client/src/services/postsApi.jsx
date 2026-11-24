import { request } from "./apiClient";

// פניות לשרת בנושא posts ("מסלולים")

// כל הפוסטים של משתמש אחד – לכפתור "המסלולים שלי"
export function getUserPosts(userId) {
  return request(`/posts?userId=${userId}`);
}

// כל הפוסטים של כל המשתמשים – לכפתור "כל המסלולים"
export function getAllPosts() {
  return request("/posts");
}

// יצירת פוסט חדש
export function createPost(userId, title, body) {
  return request("/posts", {
    method: "POST",
    body: { userId, title, body },
  });
}

// עדכון חלקי של פוסט (כותרת / תוכן)
export function patchPost(id, changes) {
  return request(`/posts/${id}`, { method: "PATCH", body: changes });
}

// מחיקת פוסט
// json-server מוחק אוטומטית גם את כל התגובות שה-postId שלהן מצביע על הפוסט
export function removePost(id) {
  return request(`/posts/${id}`, { method: "DELETE" });
}
