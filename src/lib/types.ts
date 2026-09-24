export type Book = {
  slug: string;
  title: string;
  author: string;
  price: number;
  currency: "COP";
  coverUrl: string;
  description: string;
  category: string;
  stock: number;
  featured?: boolean;
  rating: number;
  reviewCount: number;
  bestseller?: boolean;
};
