import { useReducer, useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams, useSearchParams } from "react-router-dom";
import { postsReducer, initialPostsState } from "../../reducers/postsReducer";
import { loadPosts, addPost, updatePost, deletePost } from "../../actions/postsActions";
import PostItem from "./PostItem";
import PostDetails from "./PostDetails";
import PostForm from "./PostForm";
import useSearch from "../../hooks/useSearch";
import "../../styles/Posts.css";

const SEARCH_OPTIONS = [
  { value: "title", label: "כותרת" },
  { value: "id", label: "מספר" },
];

export default function Posts() {
  const { user } = useOutletContext();
  const userId = user.id;

  const navigate = useNavigate();

  const { postId } = useParams();
  const [searchParams] = useSearchParams();
  const showAll = searchParams.get("all") === "true";
  const selectedId = postId ?? null;

  const [state, dispatch] = useReducer(postsReducer, initialPostsState);
  const [isAdding, setIsAdding] = useState(false);

  const basePath = `/users/${user.username}/posts`;
  const goToPost = (id, all = showAll) => {
    const path = id ? `${basePath}/${id}` : basePath;
    navigate(all ? `${path}?all=true` : path);
  };

  const { query, setQuery, searchBy, setSearchBy, filtered } = useSearch(
    state.posts,
    SEARCH_OPTIONS.map((opt) => opt.value)
  );

  const handleSearchByChange = (e) => {
    setSearchBy(e.target.value);
    setQuery("");
  };

  useEffect(() => {
    let ignore = false;
    const safeDispatch = (action) => {
      if (!ignore) dispatch(action);
    };
    loadPosts(safeDispatch, userId, showAll);
    return () => {
      ignore = true;
    };
  }, [userId, showAll]);

  const changeMode = (all) => {
    setIsAdding(false);
    goToPost(null, all);
  };

  const handleSelect = (id) => {
    setIsAdding(false);
    goToPost(id);
  };

  const handleAdd = async (title, body) => {
    const newPost = await addPost(dispatch, userId, title, body);
    if (newPost) {
      setIsAdding(false);
      goToPost(newPost.id);
    }
  };

  const handleDelete = (post) => {
    if (window.confirm(`למחוק את המסלול "${post.title}" וכל התגובות שלו?`)) {
      deletePost(dispatch, post.id);
      goToPost(null);
    }
  };

  const isSelected = (post) => selectedId !== null && String(post.id) === selectedId;
  const selectedPost = state.posts.find(isSelected);

  let details;
  if (isAdding) {
    details = (
      <PostForm
        submitLabel="הוספה"
        onSubmit={handleAdd}
        onCancel={() => setIsAdding(false)}
      />
    );
  } else if (selectedPost) {
    details = (
      <PostDetails
        key={selectedPost.id}
        post={selectedPost}
        isMine={String(selectedPost.userId) === String(userId)}
        onEdit={(changes) => updatePost(dispatch, selectedPost.id, changes)}
        onDelete={() => handleDelete(selectedPost)}
      />
    );
  } else if (selectedId !== null) {
    details = <p className="muted">המסלול לא נמצא ברשימה הזו</p>;
  } else {
    details = <p className="muted">בחרו מסלול מהרשימה כדי לראות את הפרטים</p>;
  }

  return (
    <div className="page">
      <div className="posts-toolbar">
        <button
          className={`btn btn-outline btn-toggle ${!showAll ? "active" : ""}`}
          onClick={() => changeMode(false)}
        >
          המסלולים שלי
        </button>
        <button
          className={`btn btn-outline btn-toggle ${showAll ? "active" : ""}`}
          onClick={() => changeMode(true)}
        >
          כל המסלולים
        </button>

        <input
          className="input"
          placeholder="חיפוש"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select className="input posts-search-by" value={searchBy} onChange={handleSearchByChange}>
          {SEARCH_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              חיפוש לפי: {opt.label}
            </option>
          ))}
        </select>

        <button className="btn btn-primary" onClick={() => setIsAdding(true)}>
          מסלול חדש
        </button>
      </div>

      {state.error && <p className="error-text">{state.error}</p>}

      {state.loading ? (
        <p>טוען...</p>
      ) : (
        <div className="posts-layout">
          {filtered.length === 0 ? (
            <p className="muted">לא נמצאו מסלולים</p>
          ) : (
            <ul className="post-list">
              {filtered.map((post) => (
                <PostItem
                  key={post.id}
                  post={post}
                  isSelected={isSelected(post)}
                  onSelect={() => handleSelect(post.id)}
                />
              ))}
            </ul>
          )}

          {details}
        </div>
      )}
    </div>
  );
}
