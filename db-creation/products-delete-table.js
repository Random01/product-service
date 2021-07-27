const AWS = require('aws-sdk');
const config = require('./products-config');

AWS.config.update(config);

const dynamodb = new AWS.DynamoDB();

const params = {
  TableName: 'Movies',
};

dynamodb.deleteTable(params, (err, data) => {
  if (err) {
    console.error('Unable to delete table. Error JSON:', JSON.stringify(err, null, 2));
  } else {
    console.log('Deleted table. Table description JSON:', JSON.stringify(data, null, 2));
  }
});