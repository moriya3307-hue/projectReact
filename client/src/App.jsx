import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/userLayout/Layout";
import Home from "./components/userLayout/Home";
import Todos from "./components/todos/ToDos";
import Posts from "./components/posts/Posts";
import Albums from "./components/albums/Albums";
import Photos from "./components/photos/Photos";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import CompleteDetails from "./components/auth/CompleteDetails";

function NotFound() {
  return (
    <div className="page">
      <h1 className="page-title">העמוד לא נמצא</h1>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/register/details" element={<CompleteDetails />} />

      <Route path="/users/:username" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="todos" element={<Todos />} />
        <Route path="posts/:postId?" element={<Posts />} />
        <Route path="albums" element={<Albums />} />
        <Route path="albums/:albumId/photos" element={<Photos />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
