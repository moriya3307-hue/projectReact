import { createResourceApi } from "./apiClient";

const commentsApi = createResourceApi("comments");

export const getComments = (postId) => commentsApi.getList({ postId });

export const createComment = (postId, user, body) =>
  commentsApi.create({ postId, userId: user.id, name: user.name, body });

export const patchComment = commentsApi.patch;

export const removeComment = commentsApi.remove;
