import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Todos from "./components/todos/ToDos";
import Posts from "./components/posts/Posts";
import Albums from "./components/albums/Albums";
import Photos from "./components/photos/Photos";
import Login from "./components/Login";
import Register from "./components/Register";
import CompleteDetails from "./components/CompleteDetails";

// עמוד זמני לחלקים שעוד לא נבנו – יוחלף ברכיב האמיתי
function ComingSoon({ title }) {
  return (
    <div className="page">
      <h1 className="page-title">{title}</h1>
      <p className="muted">העמוד בבנייה</p>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      {/* הכתובת הראשית מעבירה לעמוד הכניסה */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* עמודי כניסה והרשמה – מחוץ ל-Layout (בלי כותרת עליונה) */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/register/details" element={<CompleteDetails />} />

      {/* עמודי היישום – בתוך Layout, הכתובת לפי שם המשתמש */}
      <Route path="/users/:username" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="todos" element={<Todos />} />
        {/* :postId? – חלק אופציונלי: posts = בלי בחירה, posts/7 = המסלול 7 נבחר */}
        <Route path="posts/:postId?" element={<Posts />} />
        <Route path="albums" element={<Albums />} />
        <Route path="albums/:albumId/photos" element={<Photos />} />
      </Route>

      <Route path="*" element={<ComingSoon title="העמוד לא נמצא" />} />
    </Routes>
  );
}
