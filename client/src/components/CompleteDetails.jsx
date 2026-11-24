import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { createUser } from "../services/usersApi";
import { USER_KEY } from "./Layout";
import "../styles/Auth.css";

// ===== מסך השלמת הפרטים (אחרי עמוד ההרשמה) =====
// שלב 1: קבלת שם המשתמש והסיסמה שנשלחו מעמוד ההרשמה.
// שלב 2: טופס הפרטים – כל השדות ב-state אחד (אובייקט).
// שלב 3: שמירת המשתמש בשרת וב-LocalStorage ומעבר לעמוד היישום.

export default function CompleteDetails() {
  const navigate = useNavigate();

  // useLocation מחזיר מידע על הכתובת הנוכחית,
  // ובתוכו גם את ה-state ששלחנו ב-navigate מעמוד ההרשמה
  const location = useLocation();
  const registerData = location.state; // { username, password } או null

  // כל פרטי הטופס באובייקט אחד – במקום 4 useState נפרדים.
  // חייב להיות לפני ה-return המוקדם למטה (חוקי ה-Hooks)
  const [details, setDetails] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
  });
  const [error, setError] = useState("");

  // פונקציה אחת לכל השדות: לפי ה-name של ה-input יודעים איזה שדה לעדכן
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  // הגיעו לכאן ישירות (הקלדת כתובת) בלי לעבור בעמוד ההרשמה → חזרה להרשמה
  if (!registerData) return <Navigate to="/register" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. בדיקה שכל השדות מלאים
    const hasEmptyField = Object.values(details).some((value) => value.trim() === "");
    if (hasEmptyField) {
      setError("יש למלא את כל הפרטים");
      return;
    }

    // 2. בונים את המשתמש החדש באותו מבנה כמו המשתמשים ב-db.json
    //    (העיר נמצאת בתוך address – כך Info מציג אותה: user.address.city)
    const newUser = {
      name: details.name.trim(),
      username: registerData.username,
      email: details.email.trim(),
      phone: details.phone.trim(),
      address: { city: details.city.trim() },
      password: registerData.password,
    };

    try {
      // 3. שמירה בשרת (POST). השרת מחזיר את המשתמש עם id חדש
      const savedUser = await createUser(newUser);

      // 4. שמירה ב-LocalStorage – בלי הסיסמה, בדיוק כמו ב-Login
      const userToSave = { ...savedUser };
      delete userToSave.password;
      localStorage.setItem(USER_KEY, JSON.stringify(userToSave));

      // 5. מעבר לעמוד היישום. replace – כדי ש"חזור" לא יחזיר לטופס ההרשמה
      navigate(`/users/${savedUser.username}`, { replace: true });
    } catch {
      setError("השמירה נכשלה, נסו שוב");
    }
  };

  return (
    <div className="auth-page">
      <aside className="auth-art auth-art--ramon">
        <p className="auth-art__caption">מכתש רמון · עוד פרט אחד ויוצאים לדרך</p>
      </aside>

      <main className="auth-side">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h1>השלמת פרטים</h1>

          {/* ה-name של כל input חייב להיות זהה לשם השדה באובייקט details */}
          <label className="auth-field">
            שם מלא
            <input className="input" name="name" value={details.name} onChange={handleChange} autoFocus />
          </label>

          <label className="auth-field">
            אימייל
            <input className="input" type="email" name="email" value={details.email} onChange={handleChange} />
          </label>

          <label className="auth-field">
            טלפון
            <input className="input" type="tel" name="phone" value={details.phone} onChange={handleChange} />
          </label>

          <label className="auth-field">
            עיר מגורים
            <input className="input" name="city" value={details.city} onChange={handleChange} />
          </label>

          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="btn btn-primary">סיום הרשמה</button>

          <p className="auth-link">הפרטים נשמרים בשרת ובאחסון המקומי, ועוברים לעמוד היישום</p>
        </form>
      </main>
    </div>
  );
}
