import apiClient from "./apiClient";

const ROLES_API = "/roles";

export async function listRoles() {
  const response = await apiClient.get(ROLES_API);
  return response.data;
}

export async function getRole(roleId) {
  const response = await apiClient.get(`${ROLES_API}/${roleId}`);
  return response.data;
}

export async function createRole(payload) {
  const response = await apiClient.post(ROLES_API, payload);
  return response.data;
}

export async function updateRole(roleId, payload) {
  const response = await apiClient.put(`${ROLES_API}/${roleId}`, payload);
  return response.data;
}

export async function deleteRole(roleId) {
  const response = await apiClient.delete(`${ROLES_API}/${roleId}`);
  return response.data;
}
