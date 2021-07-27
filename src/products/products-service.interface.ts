import { Product } from './product.model';

export interface ProductsService {
  getProductById(productId: string): Promise<Product>;
  getProducts(): Promise<Product[]>;
  addProduct(product: Product): Promise<Product>;
  deleteProduct(productId: string): Promise<void>;
  updateProduct(productId: string, params: Partial<Product>): Promise<Product>;
}