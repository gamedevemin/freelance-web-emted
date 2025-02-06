export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  stock: number;
  discount: number;
  featured: boolean;
  specifications?: {
    [key: string]: string | number;
  };
  related_products?: string[];
  min_order_quantity?: number;
  bulk_pricing?: {
    quantity: number;
    price: number;
  }[];
  tags?: string[];
}
