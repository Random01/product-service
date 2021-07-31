import { DynamoDbProductsService } from './dynamo-db-products.service';

import { RedisClientWrapper } from '../redis';

export class CachedDynamoDbProductsService extends DynamoDbProductsService {

  private readonly cacheService = new RedisClientWrapper({
    host: 'product-service-elasticache-cluster.bzirpc.0001.use2.cache.amazonaws.com',
    port: 6379,
  });

  constructor(wrapper?: any) {
    super(wrapper);
  }

  public getProducts() {
    const productsCacheKey = 'products';
    return this.cacheService.get(productsCacheKey)
      .then(serializedProducts => {
        if (!serializedProducts) {
          return super.getProducts().then(newProduts => {
            this.cacheService.set(productsCacheKey, JSON.stringify(newProduts));

            return newProduts;
          });
        }

        super.getProducts().then(newProduts => {
          const newSerializedProducts = JSON.stringify(newProduts);
          if (serializedProducts !== newSerializedProducts) {
            this.cacheService.set(productsCacheKey, newSerializedProducts);
          }
        });

        return JSON.parse(serializedProducts);
      }, () => super.getProducts());
  }

}