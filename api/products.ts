import api from './index';

export const getProducts = async () => {
  try {
    const response = await api.get('/products');
    return response.data;
  } catch (error) {
    console.error("Erro ao obter produtos:", error);
    throw error;
  }
};

export const getProductDetails = async (id: number) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao obter detalhes do produto ${id}:`, error);
    throw error;
  }
};
