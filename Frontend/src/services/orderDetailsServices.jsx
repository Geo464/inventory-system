import apiClient from "./apiClient";

const ORDER_DETAILS_API = "/order-details";

export async function listOrderDetailsByOrder(orderId) {
  const response = await apiClient.get(`${ORDER_DETAILS_API}/order/${orderId}`);
  return response.data;
}

export async function createOrderDetail(detail) {
  const response = await apiClient.post(ORDER_DETAILS_API, detail);
  return response.data;
}
