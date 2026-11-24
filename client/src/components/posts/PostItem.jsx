// שורה אחת ברשימת המסלולים – במצב סקירה מוצגים רק id + כותרת (לפי הדרישות)
export default function PostItem({ post, isSelected, onSelect }) {
  return (
    <li className={`post-row card ${isSelected ? "selected" : ""}`}>
      <span className="post-row__title">
        {post.id} · {post.title}
      </span>
      <button className="btn btn-outline" onClick={onSelect}>
        בחירה
      </button>
    </li>
  );
}
