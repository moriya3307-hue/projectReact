import { useReducer, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { albumsReducer, initialAlbumsState } from "../../reducers/albumsReducer";
import { loadAlbums, addAlbum, deleteAlbum } from "../../actions/albumsActions";
import AlbumItem from "./AlbumItem";
import useSearch from "../../hooks/useSearch";
import "../../styles/Albums.css";

const SEARCH_OPTIONS = [
  { value: "title", label: "כותרת" },
  { value: "id", label: "מספר" },
];

export default function Albums() {
  const { user } = useOutletContext();
  const userId = user.id;

  const [state, dispatch] = useReducer(albumsReducer, initialAlbumsState);
  const [newTitle, setNewTitle] = useState("");

  const { query, setQuery, searchBy, setSearchBy, filtered } = useSearch(
    state.albums,
    SEARCH_OPTIONS.map((opt) => opt.value)
  );

  const handleSearchByChange = (e) => {
    setSearchBy(e.target.value);
    setQuery("");
  };

  useEffect(() => {
    loadAlbums(dispatch, userId);
  }, [userId]);

  const handleAdd = (e) => {
    e.preventDefault();
    const trimmed = newTitle.trim();
    if (trimmed === "") return;
    addAlbum(dispatch, userId, trimmed);
    setNewTitle("");
  };

  const handleDelete = (album) => {
    if (window.confirm(`למחוק את האלבום "${album.title}" וכל התמונות שבו?`)) {
      deleteAlbum(dispatch, album.id);
    }
  };

  if (state.loading) return <p className="page">טוען...</p>;

  return (
    <div className="page">
      <h1 className="page-title">אלבומים</h1>

      {state.error && <p className="error-text">{state.error}</p>}

      <div className="albums-toolbar">
        <div className="albums-search">
          <input
            className="input"
            placeholder="חיפוש"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <select className="input" value={searchBy} onChange={handleSearchByChange}>
            {SEARCH_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <form className="albums-add" onSubmit={handleAdd}>
          <input
            className="input"
            placeholder="שם אלבום חדש"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">יצירת אלבום</button>
        </form>
      </div>

      {filtered.length === 0 ? (
        <p className="muted">לא נמצאו אלבומים</p>
      ) : (
        <ul className="albums-grid">
          {filtered.map((album) => (
            <AlbumItem
              key={album.id}
              album={album}
              onDelete={() => handleDelete(album)}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
