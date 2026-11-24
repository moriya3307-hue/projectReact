// בסיס משותף לכל הפניות לשרת
const BASE_URL = "http://localhost:3001";

// פונקציה כללית לשליחת בקשה לשרת והחזרת התשובה כ-JSON
export async function request(path, { method = "GET", body } = {}) {
  const options = { method };

  if (body !== undefined) {
    options.headers = { "Content-Type": "application/json" };
    options.body = JSON.stringify(body);
  }

  const res = await fetch(`${BASE_URL}${path}`, options);
  if (!res.ok) throw new Error(`שגיאת שרת (${res.status})`);

  return res.json();
}
