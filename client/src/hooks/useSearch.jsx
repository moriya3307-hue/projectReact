import { useState } from "react";

// Custom Hook לחיפוש ברשימה – משמש ב-Todos, ובהמשך גם ב-Posts וב-Albums
// items  – הרשימה המלאה
// fields – השדות שאפשר לחפש לפיהם, למשל ["title", "id", "completed"]
export default function useSearch(items, fields) {
  const [query, setQuery] = useState("");            // מה שהמשתמש הקליד
  const [searchBy, setSearchBy] = useState(fields[0]); // לפי איזה שדה מחפשים

  const text = query.trim().toLowerCase();

  // הרשימה המסוננת מחושבת מחדש בכל רינדור – היא לא state
  const filtered = text === ""
    ? items
    : items.filter((item) => matches(item[searchBy], text));

  return { query, setQuery, searchBy, setSearchBy, filtered };
}

// בדיקה אם ערך אחד מתאים לטקסט החיפוש
function matches(value, text) {
  if (typeof value === "string") {
    return value.toLowerCase().includes(text); // כותרת – מספיק שמכילה את הטקסט
  }
  return String(value) === text; // id או true/false – התאמה מדויקת
}
