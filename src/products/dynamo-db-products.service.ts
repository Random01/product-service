import AWS from 'aws-sdk';

import { v4 as uuidv4 } from 'uuid';

import { Product } from './product.model';
import { ProductsService } from './products-service.interface';

import { DynamoDbCrudTableWrapper, DynamoDbRequest } from '../aws';

export class DynamoDbProductsService implements ProductsService {

  private readonly tableName = 'Products';

  constructor(
    private readonly wrapper = new DynamoDbCrudTableWrapper(new AWS.DynamoDB.DocumentClient()),
  ) { }

  public getProductById(productId: string): Promise<Product> {
    const params: DynamoDbRequest = {
      TableName: this.tableName,
      Key: { id: productId },
    };

    return this.wrapper.get(params)
      .then(x => x.payload, x => Promise.reject(x.error));
  }

  public getProducts(): Promise<Product[]> {
    const params: DynamoDbRequest = {
      TableName: this.tableName,
    };

    return this.wrapper.scan(params)
      .then(x => x.payload, x => Promise.reject(x.error));
  }

  public addProduct(product: Product): Promise<Product> {
    const params: DynamoDbRequest = {
      TableName: this.tableName,
      Item: {
        ...product,
        id: uuidv4(),
      },
    };

    return this.wrapper.create(params)
      .then(x => x.payload, x => Promise.reject(x.error));
  }

  public deleteProduct(productId: string): Promise<void> {
    const params: DynamoDbRequest = {
      TableName: this.tableName,
      Key: { id: productId },
    };

    return this.wrapper.delete(params)
      .then(x => x.payload, x => Promise.reject(x.error));
  }

  public updateProduct(productId: string, product: Partial<Product>): Promise<Product> {
    const params: DynamoDbRequest = {
      TableName: this.tableName,
      Key: { id: productId },
      UpdateExpression: 'set name = :n, amount=:a',
      ExpressionAttributeValues: {
        ':n': product.name,
        ':a': product.amount,
      },
      ReturnValues: 'UPDATED_NEW',
    };

    return this.wrapper.update(params)
      .then(x => x.payload, x => Promise.reject(x.error));
  }

}
