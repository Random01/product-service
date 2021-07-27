import { v4 as uuidv4 } from 'uuid';

import { Product } from './product.model';
import { ProductsService } from './products-service.interface';

export class MockProductsService implements ProductsService {

  private readonly products = new Map<string, Product>();

  constructor(defaultProducts: Product[]) {
    defaultProducts.forEach(item => {
      this.products.set(item.id, item);
    });
  }

  public getProductById(productId: string): Promise<Product> {
    const product = this.products.get(productId);
    return product
      ? Promise.resolve(product)
      : Promise.reject(new Error('Not found.'));
  }

  public getProducts(): Promise<Product[]> {
    return Promise.resolve([...this.products.values()]);
  }

  public addProduct(product: Product): Promise<Product> {
    const newProduct = { ...product, id: uuidv4() };
    this.products.set(newProduct.id, newProduct);
    return Promise.resolve(newProduct);
  }

  public deleteProduct(productId: string): Promise<void> {
    if (this.products.has(productId)) {
      this.products.delete(productId);
      return Promise.resolve();
    }

    return Promise.reject('Not found.');
  }

  public updateProduct(productId: string, params: Partial<Product>): Promise<Product> {
    if (this.products.has(productId)) {
      const updatedProduct = {
        ...this.products.get(productId),
        ...params,
      };

      this.products.set(productId, updatedProduct);

      return Promise.resolve(updatedProduct);
    }

    return Promise.reject('Not found.');
  }

}
