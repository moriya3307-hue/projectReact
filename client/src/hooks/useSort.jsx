import { useState } from "react";

// Custom Hook למיון רשימה – משמש ב-Todos, ואפשר להשתמש בו גם ב-Posts וב-Albums
// items         – הרשימה (למשל אחרי סינון של useSearch)
// initialSortBy – השדה שלפיו ממיינים בהתחלה, למשל "id"
export default function useSort(items, initialSortBy) {
  const [sortBy, setSortBy] = useState(initialSortBy); // לפי איזה שדה ממיינים

  // הרשימה הממוינת מחושבת מחדש בכל רינדור – היא לא state
  // ממיינים עותק ([...items]) ולא את הרשימה המקורית
  const sorted = [...items].sort((a, b) => compareValues(a[sortBy], b[sortBy]));

  return { sortBy, setSortBy, sorted };
}

// השוואה בין שני ערכים לפי הסוג שלהם
function compareValues(a, b) {
  // true/false – קודם "לא בוצע" (false) ואז "בוצע" (true)
  if (typeof a === "boolean" || typeof b === "boolean") {
    return Number(a) - Number(b);
  }
  // מספרים (גם id ששמור כמחרוזת, למשל "12") – השוואה מספרית ולא לפי אותיות
  if (!isNaN(Number(a)) && !isNaN(Number(b))) {
    return Number(a) - Number(b);
  }
  // טקסט – לפי סדר א"ב בעברית
  return String(a).localeCompare(String(b), "he");
}
