import express from 'express';

import { ProductsRouter } from './src/products';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));

app.get('/', (_, res) => {
  res.sendFile(__dirname + '/index.html');
});

new ProductsRouter(app);

app.listen(PORT, () => {
  console.log(`Product Service App is listening on port ${PORT}!`);
});
