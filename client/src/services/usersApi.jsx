import { request } from "./apiClient";

// פניות לשרת בנושא users

// חיפוש משתמש לפי שם משתמש.
// השרת מחזיר תמיד מערך: [] אם לא נמצא, או [user] אם נמצא.
export function getUsersByUsername(username) {
  return request(`/users?username=${encodeURIComponent(username)}`);
}

// יצירת משתמש חדש. השרת מוסיף לו id ומחזיר את המשתמש השמור
export function createUser(user) {
  return request("/users", { method: "POST", body: user });
}
