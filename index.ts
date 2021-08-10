import express from 'express';
import AWS from 'aws-sdk';

import { v4 as uuidv4 } from 'uuid';

import { ProductsRouter } from './src/products';

import { DevelopmentConfig, ProductionConfig } from './src/config';

const app = express();
const appUuid = uuidv4();

const env = process.env.NODE_ENV || 'development';
AWS.config.update((env === 'production' ? ProductionConfig : DevelopmentConfig).aws);

app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));

app.get('/', (_, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/state', (_, res) => {
  res.send({ appUuid });
});

new ProductsRouter(app);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Product Service App is listening on port ${PORT}!`);
});
