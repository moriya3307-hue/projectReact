import { createResourceApi } from "./apiClient";

const postsApi = createResourceApi("posts");

export const getUserPosts = (userId) => postsApi.getList({ userId });

export const getAllPosts = () => postsApi.getList();

export const createPost = (userId, title, body) =>
  postsApi.create({ userId, title, body });

export const patchPost = postsApi.patch;

export const removePost = postsApi.remove;
