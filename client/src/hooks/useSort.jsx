import { useState } from "react";

export default function useSort(items, initialSortBy) {
  const [sortBy, setSortBy] = useState(initialSortBy);

  const sorted = [...items].sort((a, b) => compareValues(a[sortBy], b[sortBy]));

  return { sortBy, setSortBy, sorted };
}

function compareValues(a, b) {
  if (typeof a === "boolean" || typeof b === "boolean") {
    return Number(a) - Number(b);
  }
  if (!isNaN(Number(a)) && !isNaN(Number(b))) {
    return Number(a) - Number(b);
  }
  return String(a).localeCompare(String(b), "he");
}
