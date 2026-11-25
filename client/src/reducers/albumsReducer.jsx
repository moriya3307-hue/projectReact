export const initialAlbumsState = {
  albums: [],
  loading: false,
  error: null,
};

export function albumsReducer(state, action) {
  switch (action.type) {
    case "LOAD_START":
      return { ...state, loading: true, error: null };

    case "LOAD_SUCCESS":
      return { ...state, loading: false, albums: action.payload };

    case "SET_ERROR":
      return { ...state, loading: false, error: action.payload };

    case "ADD":
      return { ...state, albums: [...state.albums, action.payload] };

    case "DELETE":
      return {
        ...state,
        albums: state.albums.filter((a) => a.id !== action.payload),
      };

    default:
      return state;
  }
}
