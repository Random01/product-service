export class Product {
  public id: string;
  public name: string;
  public amount: number;

  constructor(params?: Partial<Product>) {
    params && Object.assign(this, { ...params });
  }
}
