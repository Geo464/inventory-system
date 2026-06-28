import apiClient from "./apiClient";

const CUSTOMER_API = "/customers";

export async function listCustomers() {
  const response = await apiClient.get(CUSTOMER_API);
  return response.data;
}

export async function getCustomer(customerId) {
  const response = await apiClient.get(`${CUSTOMER_API}/${customerId}`);
  return response.data;
}

export async function createCustomer(customer) {
  const response = await apiClient.post(CUSTOMER_API, customer);
  return response.data;
}

export async function updateCustomer(customerId, customer) {
  const response = await apiClient.put(`${CUSTOMER_API}/${customerId}`, customer);
  return response.data;
}

export async function deleteCustomer(customerId) {
  const response = await apiClient.delete(`${CUSTOMER_API}/${customerId}`);
  return response.data;
}
