export interface DynamoDbResponse<TPayload = any> {
  success: boolean;
  error?: Error;
  payload?: TPayload;
}
