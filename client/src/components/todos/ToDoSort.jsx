const SORT_OPTIONS = [
  { value: "id", label: "מספר" },
  { value: "title", label: "כותרת" },
  { value: "completed", label: "ביצוע" },
];

export default function TodoSort({ sortBy, onSortChange }) {
  return (
    <label className="todo-sort">
      מיון לפי:
      <select value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}
