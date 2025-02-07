export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  minOrder: number;
  technicalSpecs?: {
    [key: string]: string;
  };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon?: string;
}

export interface ProductListProps {
  products: Product[];
  isLoading?: boolean;
  error?: string;
}

export interface ProductCardProps extends Product {}
