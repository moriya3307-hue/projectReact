import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPhotos } from "../../services/photosApi";

// כרטיס של אלבום אחד ברשימה
export default function AlbumItem({ album, onDelete }) {
  // תמונת הכריכה = התמונה הראשונה של האלבום (null = אין תמונות / עדיין לא נטענה)
  const [cover, setCover] = useState(null);

  useEffect(() => {
    let ignore = false;
    getPhotos(album.id, 0, 1) // מבקשים מהשרת תמונה אחת בלבד
      .then((photos) => {
        if (!ignore && photos.length > 0) setCover(photos[0]);
      })
      .catch(() => {}); // אם נכשל – פשוט נשאר הרקע הצבעוני
    return () => {
      ignore = true;
    };
  }, [album.id]);

  return (
    <li className="album-card card">
      <div className="album-card__cover">
        {cover && <img src={cover.url} alt={album.title} />}
      </div>

      <div className="album-card__footer">
        <span className="album-card__title">
          {album.id} · {album.title}
        </span>

        {/* קישור יחסי: מ-/users/:username/albums ל-/users/:username/albums/:id/photos */}
        <Link to={`${album.id}/photos`} className="btn btn-primary">
          פתיחה
        </Link>
        <button className="btn btn-danger" onClick={onDelete}>
          מחיקה
        </button>
      </div>
    </li>
  );
}
