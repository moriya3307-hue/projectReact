import { createResourceApi } from "./apiClient";

// פניות לשרת בנושא users
const usersApi = createResourceApi("users");

// חיפוש משתמש לפי שם משתמש.
// השרת מחזיר תמיד מערך: [] אם לא נמצא, או [user] אם נמצא.
// (הקידוד של שם המשתמש בכתובת נעשה אוטומטית ב-getList)
export const getUsersByUsername = (username) => usersApi.getList({ username });

// יצירת משתמש חדש. השרת מוסיף לו id ומחזיר את המשתמש השמור
export const createUser = usersApi.create;
