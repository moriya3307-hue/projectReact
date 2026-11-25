import { createResourceApi } from "./apiClient";

const usersApi = createResourceApi("users");

export const getUsersByUsername = (username) => usersApi.getList({ username });

export const createUser = usersApi.create;
