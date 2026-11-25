import { useState } from "react";
import { NavLink, Navigate, Outlet, useNavigate, useParams } from "react-router-dom";
import Info from "./Info";
import "../../styles/Layout.css";

export const USER_KEY = "currentUser";

function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY));
  } catch {
    return null;
  }
}

export default function Layout() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [showInfo, setShowInfo] = useState(false);
  const user = getCurrentUser();

  if (!user) return <Navigate to="/login" replace />;

  if (username !== user.username) {
    return <Navigate to={`/users/${user.username}`} replace />;
  }

  const handleLogout = () => {
    localStorage.removeItem(USER_KEY);
    navigate("/login");
  };

  return (
    <>
      <header className="app-header">
        <h1 className="app-title">שבילי ארץ · {user.name}</h1>

        <nav className="app-nav">
          <button className="nav-btn" onClick={() => setShowInfo(true)}>Info</button>
          <NavLink className="nav-btn" to="todos">Todos</NavLink>
          <NavLink className="nav-btn" to="posts">Posts</NavLink>
          <NavLink className="nav-btn" to="albums">Albums</NavLink>
          <button className="nav-btn" onClick={handleLogout}>Logout</button>
        </nav>
      </header>

      <main>
        <Outlet context={{ user }} />
      </main>

      {showInfo && <Info user={user} onClose={() => setShowInfo(false)} />}
    </>
  );
}
