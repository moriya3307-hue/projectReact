import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPhotos } from "../../services/photosApi";

export default function AlbumItem({ album, onDelete }) {
  const [cover, setCover] = useState(null);

  useEffect(() => {
    let ignore = false;
    getPhotos(album.id, 0, 1)
      .then((photos) => {
        if (!ignore && photos.length > 0) setCover(photos[0]);
      })
      .catch(() => {});
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
