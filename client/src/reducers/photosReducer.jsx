export const PAGE_SIZE = 4;

export const initialPhotosState = {
  photos: [],
  loading: false,
  loadingMore: false,
  hasMore: true,
  addedIds: [],
  error: null,
};

export function photosReducer(state, action) {
  switch (action.type) {
    case "LOAD_START":
      return { ...initialPhotosState, loading: true };

    case "LOAD_MORE_START":
      return { ...state, loadingMore: true, error: null };

    case "LOAD_SUCCESS":
      return {
        ...state,
        loading: false,
        photos: action.payload,
        hasMore: action.payload.length === PAGE_SIZE,
      };

    case "LOAD_MORE_SUCCESS": {
      const existingIds = new Set(state.photos.map((p) => p.id));
      const newPhotos = action.payload.filter((p) => !existingIds.has(p.id));
      return {
        ...state,
        loadingMore: false,
        photos: [...state.photos, ...newPhotos],
        hasMore: action.payload.length === PAGE_SIZE,
      };
    }

    case "SET_ERROR":
      return { ...state, loading: false, loadingMore: false, error: action.payload };

    case "ADD":
      return {
        ...state,
        photos: [...state.photos, action.payload],
        addedIds: [...state.addedIds, action.payload.id],
      };

    case "UPDATE":
      return {
        ...state,
        photos: state.photos.map((p) =>
          p.id === action.payload.id ? action.payload : p
        ),
      };

    case "DELETE":
      return {
        ...state,
        photos: state.photos.filter((p) => p.id !== action.payload),
        addedIds: state.addedIds.filter((id) => id !== action.payload),
      };

    default:
      return state;
  }
}
