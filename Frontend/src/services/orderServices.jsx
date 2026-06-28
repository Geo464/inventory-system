import apiClient from "./apiClient";

const ORDER_API = "/order";

export async function listOrders() {
  const response = await apiClient.get(ORDER_API);
  return response.data;
}

export async function getOrder(orderId) {
  const response = await apiClient.get(`${ORDER_API}/${orderId}`);
  return response.data;
}

export async function createOrder(order) {
  const response = await apiClient.post(ORDER_API, order);
  return response.data;
}

export async function listOrdersByCustomer(customerId) {
  const response = await apiClient.get(`${ORDER_API}/customer/${customerId}`);
  return response.data;
}

export async function refreshOrderTotal(orderId) {
  const response = await apiClient.post(`${ORDER_API}/${orderId}/refresh-total`);
  return response.data;
}
