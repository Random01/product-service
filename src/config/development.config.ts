import { Config } from './config.interface';

export const DevelopmentConfig: Config = {
  useCache: true,
  aws: {
    region: 'us-east-2',
    endpoint: 'http://localhost:8000',
  },
  redis: {
    host: 'localhost',
    port: 6379,
  }
};