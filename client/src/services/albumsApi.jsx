import { createResourceApi } from "./apiClient";

const albumsApi = createResourceApi("albums");

export const getAlbums = (userId) => albumsApi.getList({ userId });

export const getAlbum = albumsApi.getById;

export const createAlbum = (userId, title) =>
  albumsApi.create({ userId, title });

export const removeAlbum = albumsApi.remove;
