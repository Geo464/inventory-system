import apiClient from "./apiClient";

const LOGIN_API = "/login";

export async function authenticate(email, password) {
  const response = await apiClient.post(`${LOGIN_API}/authenticate`, { email, password });
  return response.data;
}

export async function getUserByEmail(email) {
  const response = await apiClient.get(`${LOGIN_API}`, { params: { email } });
  return response.data;
}
