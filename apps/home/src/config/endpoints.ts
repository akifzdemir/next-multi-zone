export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const products = {
  getAll: `${API_URL}/products`,
  getById: (id: number) => `${API_URL}/products/${id}`,
};
