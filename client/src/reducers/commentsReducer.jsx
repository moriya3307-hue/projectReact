export const initialCommentsState = {
  comments: [],
  loading: false,
  error: null,
};

export function commentsReducer(state, action) {
  switch (action.type) {
    case "LOAD_START":
      return { ...state, loading: true, error: null };

    case "LOAD_SUCCESS":
      return { ...state, loading: false, comments: action.payload };

    case "SET_ERROR":
      return { ...state, loading: false, error: action.payload };

    case "ADD":
      return { ...state, comments: [...state.comments, action.payload] };

    case "UPDATE":
      return {
        ...state,
        comments: state.comments.map((c) =>
          c.id === action.payload.id ? action.payload : c
        ),
      };

    case "DELETE":
      return {
        ...state,
        comments: state.comments.filter((c) => c.id !== action.payload),
      };

    default:
      return state;
  }
}
