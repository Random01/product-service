import { DynamoDbRequest } from './dynamo-db-request.interface';
import { DynamoDbResponse } from './dynamo-db-response.interface';



export class DynamoDbCrudTableWrapper {

  constructor(protected readonly docClient: any) { }

  public create<ResponsePayload = any>(params: DynamoDbRequest): Promise<DynamoDbResponse<ResponsePayload>> {
    return new Promise((success, fail) => {
      this.docClient.put(params, (err: any, data: any) => {
        if (err) {
          fail({
            success: false,
            error: new Error('Unable to add item. Error JSON:' + JSON.stringify(err, null, 2)),
          });
        } else {
          success({
            success: true,
            payload: 'Added item:' + JSON.stringify(data, null, 2) as any,
          });
        }
      });
    });
  }

  public get<ResponsePayload = any>(params: DynamoDbRequest): Promise<DynamoDbResponse<ResponsePayload>> {
    return new Promise((success, fail) => {
      this.docClient.get(params, (err: any, data: any) => {
        if (err) {
          fail({
            success: false,
            error: new Error('Unable to read item. Error JSON:' + JSON.stringify(err, null, 2)),
          });
        } else {
          success({
            success: true,
            payload: data.Item,
          });
        }
      });
    });
  }

  public update<ResponsePayload = any>(params: DynamoDbRequest): Promise<DynamoDbResponse<ResponsePayload>> {
    return new Promise((success, fail) => {
      this.docClient.update(params, (err: any, data: any) => {
        if (err) {
          fail({
            success: false,
            error: new Error('Unable to update item. Error JSON:' + JSON.stringify(err, null, 2)),
          });
        } else {
          success({
            success: true,
            payload: 'UpdateItem succeeded:' + JSON.stringify(data, null, 2) as any,
          });
        }
      });
    });
  }

  public delete<ResponsePayload = any>(params: DynamoDbRequest): Promise<DynamoDbResponse<ResponsePayload>> {
    return new Promise((success, fail) => {
      this.docClient.delete(params, (err: any, data: any) => {
        if (err) {
          fail({
            success: false,
            error: new Error('Unable to delete item. Error JSON:' + JSON.stringify(err, null, 2)),
          });
        } else {
          success({
            success: true,
            payload: 'DeleteItem succeeded:' + JSON.stringify(data, null, 2) as any,
          });
        }
      });
    });
  }

  public query<ResponsePayload = any>(params: DynamoDbRequest): Promise<DynamoDbResponse<ResponsePayload>> {
    return new Promise((success, fail) => {
      this.docClient.query(params, (err: any, data: any) => {
        if (err) {
          fail({
            success: false,
            error: new Error('Unable to get items. Error JSON:' + JSON.stringify(err, null, 2)),
          });
        } else {
          success({
            success: true,
            payload: data.Items,
          });
        }
      });
    });
  }

  public scan<ResponsePayload = any>(params: DynamoDbRequest): Promise<DynamoDbResponse<ResponsePayload>> {
    return new Promise((success, fail) => {
      this.docClient.scan(params, (err: any, data: any) => {
        if (err) {
          fail({
            success: false,
            error: new Error('Unable to scan table. Error JSON:' + JSON.stringify(err, null, 2)),
          });
        } else {
          success({
            success: true,
            payload: data.Items,
          });
        }
      });
    });
  }

}
