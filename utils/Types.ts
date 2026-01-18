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
  exploreInfo: string;
  imageUrl: string;
  image: string;
  description: string;
}

export interface Brand {
  id: number;
  name: string;
  imageUrl: string;
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
  productProtection?: boolean;
}

export interface OrderItem {
  id: number;
  productName: string;
  imageUrl: string;
  category: string;
  priceAtPurchase: number;
  quantity: number;
  productProtection: boolean;
}

export interface OrderType {
  id: number;
  orderNumber: string | null;
  createdAt: string;
  orderItems: OrderItem[];
}

export type FetchTypesResult = {
  categoryRes: Category[];
  productRes: Product[];
  brandRes: Brand[];
};

export interface ProductItem {
  type: "product";
  id: number;
  name: string;
  imageUrl: string;
  categoryId: number;
  stock: number;
  price: number;
}

export interface BrandItem {
  type: "brand";
  id: number;
  name: string;
  imageUrl: string;
}
