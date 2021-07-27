export interface DynamoDbRequest {
  TableName: string;
  Key?: string | any;
  Item?: any;
  UpdateExpression?: string;
  ConditionExpression?: string;
  ExpressionAttributeValues?: any;
  ReturnValues?: string;
}
