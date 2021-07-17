import express from 'express';

import { v4 as uuidv4 } from 'uuid';

import { ProductsRouter } from './src/products';

import AWSXRay from 'aws-xray-sdk';

const app = express();
const PORT = process.env.PORT || 3001;
const appUuid = uuidv4();

app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));
app.use(AWSXRay.express.openSegment('ProductService'));

app.get('/', (_, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/state', (_, res) => {
  res.send({ appUuid });
});

new ProductsRouter(app);

app.use(AWSXRay.express.closeSegment());

app.listen(PORT, () => {
  console.log(`Product Service App is listening on port ${PORT}!`);
});
