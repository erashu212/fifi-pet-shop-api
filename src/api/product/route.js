"use strict";

const ProductController = require('./controller');

module.exports = class UserRoutes { 

  static preInit() { 
    ProductController.loadAll();
  }
  
  static init(router) { 

    router
      .route('/api/products')
      .get(ProductController.getAll)
      .post(ProductController.createProduct);
    
    router
      .route('/api/products/:id')
      .get(ProductController.getProductById)
      .put(ProductController.updateProduct)
      .delete(ProductController.deleteProduct);
  }
}