/* ה-reducer של הפוסטים – רק מחשב state חדש לפי action. הפעולות מול השרת נמצאות ב-actions/postsActions.jsx */

export const initialPostsState = {
  posts: [],
  loading: false,
  error: null,
};

export function postsReducer(state, action) {
  switch (action.type) {
    case "LOAD_START":
      return { ...state, loading: true, error: null };

    case "LOAD_SUCCESS":
      return { ...state, loading: false, posts: action.payload };

    case "SET_ERROR":
      return { ...state, loading: false, error: action.payload };

    case "ADD":
      return { ...state, posts: [...state.posts, action.payload] };

    case "UPDATE":
      return {
        ...state,
        posts: state.posts.map((p) =>
          p.id === action.payload.id ? action.payload : p
        ),
      };

    case "DELETE":
      return {
        ...state,
        posts: state.posts.filter((p) => p.id !== action.payload),
      };

    default:
      return state;
  }
}
