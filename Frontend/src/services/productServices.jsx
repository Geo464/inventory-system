import apiClient from "./apiClient";

const PRODUCT_API = "/product";

export async function listProducts() {
  const response = await apiClient.get(PRODUCT_API);
  return response.data;
}

export async function getProduct(productId) {
  const response = await apiClient.get(`${PRODUCT_API}/${productId}`);
  return response.data;
}

export async function createProduct(product) {
  const response = await apiClient.post(PRODUCT_API, product);
  return response.data;
}

export async function updateProduct(productId, product) {
  const response = await apiClient.put(`${PRODUCT_API}/${productId}`, product);
  return response.data;
}

export async function deleteProduct(productId) {
  const response = await apiClient.delete(`${PRODUCT_API}/${productId}`);
  return response.data;
}
