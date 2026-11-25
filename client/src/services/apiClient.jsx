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

// פונקציה גנרית שבונה את כל הפעולות הבסיסיות עבור משאב אחד בשרת
// resource – שם המשאב בשרת, למשל "todos" / "posts" / "albums"
export function createResourceApi(resource) {
  return {
    // רשימה לפי סינון, למשל getList({ userId: 1 }) => /todos?userId=1
    // URLSearchParams מקודד את הערכים אוטומטית (רווחים, עברית וכו')
    getList: (params = {}) => {
      const query = new URLSearchParams(params).toString();
      return request(query ? `/${resource}?${query}` : `/${resource}`);
    },

    // פריט אחד לפי מספר
    getById: (id) => request(`/${resource}/${id}`),

    // יצירת פריט חדש
    create: (data) => request(`/${resource}`, { method: "POST", body: data }),

    // עדכון חלקי של פריט
    patch: (id, changes) =>
      request(`/${resource}/${id}`, { method: "PATCH", body: changes }),

    // מחיקת פריט
    remove: (id) => request(`/${resource}/${id}`, { method: "DELETE" }),
  };
}
