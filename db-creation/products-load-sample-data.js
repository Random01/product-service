const AWS = require('aws-sdk');
const fs = require('fs');
const config = require('./products-config');

AWS.config.update(config);

const docClient = new AWS.DynamoDB.DocumentClient();

console.log('Importing movies into DynamoDB. Please wait.');

const allProducts = JSON.parse(fs.readFileSync('products-sample-data.json', 'utf8'));
allProducts.forEach(product => {
  const params = {
    TableName: 'Products',
    Item: {
      'id': product.id,
      'name': product.name,
      'amount': product.amount,
    }
  };

  docClient.put(params, (err, data) => {
    if (err) {
      console.error('Unable to add product', product.name, '. Error JSON:', JSON.stringify(err, null, 2));
    } else {
      console.log('PutItem succeeded:', product.name);
    }
  });
});