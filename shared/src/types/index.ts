export type ProductModel = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};
