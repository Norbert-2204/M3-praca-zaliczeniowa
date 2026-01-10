export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  categoryId: number;
  brand?: string;
  brandId: number;
  createdAt: string | Date;
}

export interface Category {
  id: number;
  name: string;
}

export interface Brand {
  id: number;
  name: string;
}

export interface CartItemProps {
  id: number;
  productId: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  category: string;
  brand: string;
  brandId: number;
  categoryId: number;
  filterType?: "category" | "brand";
}
