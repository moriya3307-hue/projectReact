import { createResourceApi } from "./apiClient";

const photosApi = createResourceApi("photos");

export const getPhotos = (albumId, start, limit) =>
  photosApi.getList({ albumId, _start: start, _limit: limit });

export const createPhoto = (albumId, title, url) =>
  photosApi.create({ albumId, title, url, thumbnailUrl: url });

export const patchPhoto = photosApi.patch;

export const removePhoto = photosApi.remove;
