import "../styles/Info.css";

export default function Info({ user, onClose }) {
  return (
    // לחיצה על הרקע הכהה סוגרת את החלון
    <div className="modal-overlay" onClick={onClose}>
      {/* stopPropagation – לחיצה בתוך החלון לא תסגור אותו */}
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Info</h2>
        <ul className="info-list">
          <li>שם מלא: {user.name}</li>
          <li>שם משתמש: {user.username}</li>
          <li>אימייל: {user.email}</li>
          <li>טלפון: {user.phone}</li>
          <li>עיר: {user.address?.city}</li>
        </ul>
        <button className="btn btn-outline" onClick={onClose}>סגירה</button>
      </div>
    </div>
  );
}
