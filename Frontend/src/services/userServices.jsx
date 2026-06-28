import apiClient from "./apiClient";

const USER_API = "/user";

export async function listUsers() {
  const response = await apiClient.get(USER_API);
  return response.data;
}

export async function getUser(userId) {
  const response = await apiClient.get(`${USER_API}/${userId}`);
  return response.data;
}

export async function createUser(payload) {
  const response = await apiClient.post(USER_API, payload);
  return response.data;
}

export async function updateUser(userId, payload) {
  const response = await apiClient.put(`${USER_API}/${userId}`, payload);
  return response.data;
}

export async function deleteUser(userId) {
  const response = await apiClient.delete(`${USER_API}/${userId}`);
  return response.data;
}
