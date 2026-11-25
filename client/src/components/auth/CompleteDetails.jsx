import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { createUser, getUsersByUsername } from "../../services/usersApi";
import { USER_KEY } from "../userLayout/Layout";
import "../../styles/Auth.css";

export default function CompleteDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const registerData = location.state;

  const [details, setDetails] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  if (!registerData) return <Navigate to="/register" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hasEmptyField = Object.values(details).some((value) => value.trim() === "");
    if (hasEmptyField) {
      setError("יש למלא את כל הפרטים");
      return;
    }

    const newUser = {
      name: details.name.trim(),
      username: registerData.username,
      email: details.email.trim(),
      phone: details.phone.trim(),
      address: { city: details.city.trim() },
      password: registerData.password,
    };

    try {
      const existing = await getUsersByUsername(newUser.username);
      if (existing.length > 0) {
        setError("שם המשתמש נתפס בינתיים, יש לחזור להרשמה ולבחור שם אחר");
        return;
      }

      const savedUser = await createUser(newUser);

      const userToSave = { ...savedUser };
      delete userToSave.password;
      localStorage.setItem(USER_KEY, JSON.stringify(userToSave));

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
