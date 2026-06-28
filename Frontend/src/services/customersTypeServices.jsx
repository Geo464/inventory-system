import apiClient from "./apiClient";

const CUSTOMERS_TYPE_API = "/customers-type";

export async function listCustomerTypes() {
  const response = await apiClient.get(CUSTOMERS_TYPE_API);
  return response.data;
}

export async function getCustomerType(typeId) {
  const response = await apiClient.get(`${CUSTOMERS_TYPE_API}/${typeId}`);
  return response.data;
}

export async function createCustomerType(data) {
  const response = await apiClient.post(CUSTOMERS_TYPE_API, data);
  return response.data;
}

export async function updateCustomerType(typeId, data) {
  const response = await apiClient.put(`${CUSTOMERS_TYPE_API}/${typeId}`, data);
  return response.data;
}

export async function deleteCustomerType(typeId) {
  const response = await apiClient.delete(`${CUSTOMERS_TYPE_API}/${typeId}`);
  return response.data;
}
