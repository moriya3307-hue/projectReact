import { useState } from "react";

export default function useSearch(items, fields) {
  const [query, setQuery] = useState("");
  const [searchBy, setSearchBy] = useState(fields[0]);

  const text = query.trim().toLowerCase();

  const filtered = text === ""
    ? items
    : items.filter((item) => matches(item[searchBy], text));

  return { query, setQuery, searchBy, setSearchBy, filtered };
}

function matches(value, text) {
  if (typeof value === "string") {
    return value.toLowerCase().includes(text);
  }
  return String(value) === text;
}
