import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  image_url: string;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  slug: string;
}

export const productsApi = {
  getProducts: async (params?: {
    category?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) => {
    const response = await api.get<Product[]>('/products', { params });
    return response.data;
  },

  getProduct: async (id: number) => {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
  },

  getCategories: async () => {
    const response = await api.get<Category[]>('/categories');
    return response.data;
  },
};

export const ordersApi = {
  createOrder: async (orderData: any) => {
    const response = await api.post('/orders', orderData);
    return response.data;
  },

  getOrder: async (id: number) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },
};

export default api;
