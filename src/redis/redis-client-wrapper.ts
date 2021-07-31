import redis from 'redis';

export class RedisClientWrapper {

  private readonly client: redis.RedisClient;

  constructor(options?: redis.ClientOpts) {
    this.client = redis.createClient({
      ...options,
      retry_strategy: opr => {
        if (opr.error && opr.error.code === 'ECONNREFUSED') {
          // End reconnecting on a specific error and flush all commands with
          // a individual error
          return new Error('The server refused the connection');
        }
      }
    });

    this.client.on('error', err => {
      console.log('Error ' + err);
    });
  }

  public set(key: string, value: string): Promise<void> {
    return new Promise<void>((success, fail) => {
      this.client.set(key, value, err => {
        if (!err) {
          success();
        } else {
          console.log('Error ' + err);
          fail(err);
        }
      });
    });
  }

  public get(key: string): Promise<string> {
    return new Promise<string>((success, fail) => {
      this.client.get(key, (err, reply) => {
        if (!err) {
          success(reply);
        } else {
          console.log('Error ' + err);
          fail(err);
        }
      });
    });
  }

}
