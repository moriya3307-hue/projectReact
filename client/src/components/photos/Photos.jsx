import { useReducer, useEffect, useState } from "react";
import { Link, useOutletContext, useParams } from "react-router-dom";
import { photosReducer, initialPhotosState, PAGE_SIZE } from "../../reducers/photosReducer";
import {
  loadPhotos, loadMorePhotos, addPhoto, updatePhoto, deletePhoto,
} from "../../actions/photosActions";
import { getAlbum } from "../../services/albumsApi";
import PhotoItem from "./PhotoItem";
import "../../styles/Photos.css";

export default function Photos() {
  const { user } = useOutletContext();
  const { albumId } = useParams();

  const [state, dispatch] = useReducer(photosReducer, initialPhotosState);
  const [albumInfo, setAlbumInfo] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const currentInfo = albumInfo?.albumId === albumId ? albumInfo : null;
  const album = currentInfo?.album ?? null;
  const notFound = currentInfo?.notFound ?? false;

  useEffect(() => {
    let ignore = false;
    getAlbum(albumId)
      .then((data) => {
        if (ignore) return;
        if (String(data.userId) !== String(user.id)) setAlbumInfo({ albumId, notFound: true });
        else setAlbumInfo({ albumId, album: data });
      })
      .catch(() => {
        if (!ignore) setAlbumInfo({ albumId, notFound: true });
      });
    return () => {
      ignore = true;
    };
  }, [albumId, user.id]);

  useEffect(() => {
    loadPhotos(dispatch, albumId);
  }, [albumId]);

  const handleAdd = (e) => {
    e.preventDefault();
    const title = newTitle.trim();
    const url = newUrl.trim();
    if (title === "" || url === "") return;
    addPhoto(dispatch, albumId, title, url);
    setNewTitle("");
    setNewUrl("");
  };

  const handleLoadMore = () => {
    const start = state.photos.length - state.addedIds.length;
    loadMorePhotos(dispatch, albumId, start);
  };

  if (notFound) {
    return (
      <div className="page">
        <h1 className="page-title">האלבום לא נמצא</h1>
        <Link to="../.." relative="path" className="btn btn-outline">חזרה לאלבומים</Link>
      </div>
    );
  }

  if (state.loading) return <p className="page">טוען...</p>;

  return (
    <div className="page">
      <div className="photos-header">
        <h1 className="page-title">{album ? album.title : "תמונות"}</h1>
        <Link to="../.." relative="path" className="btn btn-outline">חזרה לאלבומים</Link>
      </div>

      {state.error && <p className="error-text">{state.error}</p>}

      <form className="photos-header" onSubmit={handleAdd}>
        <input
          className="input"
          placeholder="כותרת התמונה"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <input
          className="input"
          placeholder="כתובת התמונה (URL)"
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">הוספת תמונה</button>
      </form>

      {state.photos.length === 0 ? (
        <p className="muted">אין תמונות באלבום</p>
      ) : (
        <ul className="photos-grid">
          {state.photos.map((photo) => (
            <PhotoItem
              key={photo.id}
              photo={photo}
              onEdit={(changes) => updatePhoto(dispatch, photo.id, changes)}
              onDelete={() => deletePhoto(dispatch, photo.id)}
            />
          ))}
        </ul>
      )}

      {state.hasMore && (
        <div className="photos-more">
          <button
            className="btn btn-primary"
            onClick={handleLoadMore}
            disabled={state.loadingMore}
          >
            {state.loadingMore ? "טוען..." : "הצג עוד"}
          </button>
          <span className="muted">{PAGE_SIZE} תמונות בכל לחיצה</span>
        </div>
      )}
    </div>
  );
}
