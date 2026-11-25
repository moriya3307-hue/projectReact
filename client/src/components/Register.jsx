import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUsersByUsername } from "../services/usersApi";
import "../styles/Auth.css";

// ===== עמוד ההרשמה =====
// שלב 1: הטופס עם 3 שדות נשלטים + בדיקות בצד הלקוח (שדות ריקים, התאמת סיסמאות).
// שלב 2: בדיקה מול השרת ששם המשתמש עוד לא תפוס.
// שלב 3: מעבר למסך השלמת הפרטים, יחד עם שם המשתמש והסיסמה.

// שם המשתמש הופך לחלק מהכתובת (/users/<username>), ולכן מותרים בו רק תווים "בטוחים":
//   ^[A-Za-z]       – מתחיל באות באנגלית (כך אין שמות כמו "." או ".." שהדפדפן מפרש כ"תיקייה")
//   [A-Za-z0-9._-]  – אחר כך רק אותיות באנגלית, ספרות, נקודה, קו תחתון ומקף
//   {2,19}$         – סך הכול 3 עד 20 תווים
// כך אי אפשר להכניס "/" (מפצל את הכתובת), "?" (מתחיל query) או "#" (מתחיל עוגן)
const USERNAME_PATTERN = /^[A-Za-z][A-Za-z0-9._-]{2,19}$/;

export default function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [error, setError] = useState("");

  // async – כי בבדיקה 3 מחכים (await) לתשובה מהשרת
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. כל השדות חייבים להיות מלאים
    if (username.trim() === "" || password === "" || verifyPassword === "") {
      setError("יש למלא את כל השדות");
      return;
    }

    // 2. שם המשתמש חייב להיות "בטוח לכתובת" (ראו USERNAME_PATTERN למעלה)
    if (!USERNAME_PATTERN.test(username.trim())) {
      setError("שם המשתמש: 3–20 תווים, מתחיל באות באנגלית, ורק אותיות באנגלית, ספרות, נקודה, _ או -");
      return;
    }

    // 3. שתי הסיסמאות חייבות להיות זהות
    if (password !== verifyPassword) {
      setError("הסיסמאות אינן תואמות");
      return;
    }

    try {
      // 4. שם המשתמש חייב להיות פנוי – בודקים בשרת
      const users = await getUsersByUsername(username.trim());

      // כאן ההיגיון הפוך מה-Login: מערך לא ריק = מישהו כבר רשום בשם הזה
      if (users.length > 0) {
        setError("שם המשתמש כבר קיים");
        return;
      }

      // 5. הכול תקין! עוברים למסך השלמת הפרטים.
      //    המשתמש עוד לא נשמר בשרת – לכן "שולחים" את הנתונים יחד עם המעבר, ב-state
      navigate("/register/details", {
        state: { username: username.trim(), password },
      });
    } catch {
      setError("אין חיבור לשרת, נסו שוב מאוחר יותר");
    }
  };

  return (
    <div className="auth-page">
      <aside className="auth-art auth-art--galilee">
        <p className="auth-art__caption">הכינרת והגליל · מתחילים מסלול חדש</p>
      </aside>

      <main className="auth-side">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h1>הרשמה</h1>

          <label className="auth-field">
            שם משתמש
            <input
              className="input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
            />
            <small className="muted auth-hint">3–20 תווים: אותיות באנגלית, ספרות, נקודה, _ או -</small>
          </label>

          <label className="auth-field">
            סיסמה
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <label className="auth-field">
            אימות סיסמה
            <input
              className="input"
              type="password"
              value={verifyPassword}
              onChange={(e) => setVerifyPassword(e.target.value)}
            />
          </label>

          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="btn btn-primary">המשך</button>

          <p className="auth-link">
            כבר רשומים? <Link to="/login">לכניסה</Link>
          </p>
        </form>
      </main>
    </div>
  );
}
