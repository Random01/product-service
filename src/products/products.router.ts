import express from 'express';

import * as core from 'express-serve-static-core';

import { ProductsService } from './products.service';
import { defaultProducts } from './default-products';

export class ProductsRouter {

  constructor(
    app: core.Express,
    private readonly productService = new ProductsService(defaultProducts),
  ) {
    const router = express.Router();

    router.post('/', this.addProduct.bind(this));
    router.get('/', this.getProducts.bind(this));
    router.get('/:id', this.getProduct.bind(this));
    router.put('/:id', this.updateProduct.bind(this));
    router.delete('/:id', this.deleteProduct.bind(this));

    app.use('/api/products', router);
  }

  private getProducts(_: core.Request, res: core.Response) {
    this.productService.getProducts().then(
      products => res.send(products),
      error => this.handleError(res, error),
    );
  }

  private addProduct(req: core.Request, res: core.Response) {
    this.productService.addProduct(req.body).then(
      products => res.send(products),
      error => this.handleError(res, error),
    );
  }

  private getProduct(req: core.Request, res: core.Response) {
    this.productService.getProductById(req.params.id).then(
      product => res.send(product),
      error => this.handleError(res, error),
    );
  }

  private updateProduct(req: core.Request, res: core.Response) {
    this.productService.updateProduct(req.params.id, req.body).then(
      product => res.send(product),
      error => this.handleError(res, error),
    );
  }

  private deleteProduct(req: core.Request, res: core.Response) {
    this.productService.deleteProduct(req.params.id).then(
      () => res.status(200).send('Ok'),
      error => this.handleError(res, error),
    );
  }

  private handleError(res: core.Response, error: Error) {
    res.status(500).send(error.message);
  }

}
