export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductRow {
  id: number;
  name: string;
  description: string;
  price: string;
  category: string;
  stock: number;
  created_at: Date;
  updated_at: Date;
}

export interface CreateProductInput {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
}

export interface UpdateProductInput {
  name?: string;
  description?: string;
  price?: number;
  category?: string;
  stock?: number;
}
