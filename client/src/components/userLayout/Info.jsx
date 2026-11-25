import "../../styles/Info.css";

export default function Info({ user, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
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
