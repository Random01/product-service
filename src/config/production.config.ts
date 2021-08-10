import { Config } from './config.interface';

export const ProductionConfig: Config = {
  useCache: true,
  aws: {
    region: 'us-east-2',
    endpoint: 'https://dynamodb.us-east-2.amazonaws.com',
  },
  redis: {
    host: 'product-service-elasticache-cluster.bzirpc.0001.use2.cache.amazonaws.com',
    port: 6379,
  },
};
