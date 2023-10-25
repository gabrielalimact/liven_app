import api from './index';

export const getProducts = async () => {
  const response = await api.get('/products');
  return response.data;
};

export const getProductDetails = async (id: number) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
}