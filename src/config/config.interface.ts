export interface Config {
  useCache: boolean;
  aws: {
    region: string;
    endpoint: string;
  };
  redis: {
    host: string;
    port: number;
  };
}
