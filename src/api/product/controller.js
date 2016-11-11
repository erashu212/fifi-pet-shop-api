"use strict";

const ProductDAO = require('./dao');

module.exports = class ProductController { 
  static getAll(req, res) { 
    ProductDAO
      .getAll()
      .then(products => res.status(200).json(products))
      .catch(error => res.status(400).json(error));
  }

  static getProductById(req, res) { 
    ProductDAO
      .getProductById(req.params.id)
      .then(products => res.status(200).json(products))
      .catch(error => res.status(400).json(error));
  }
  
  static createProduct(req, res) { 
    ProductDAO
      .createProduct(req.body)
      .then(product => res.status(200).json(product))
      .catch(error => res.status(400).json(error));
  }
  
  static updateProduct(req, res) { 
    ProductDAO
      .updateProduct(req.params.id, req.body)
      .then(product => res.status(200).json(product))
      .catch(error => res.status(400).json(error));
  }
  
  static deleteProduct(req, res) { 
    ProductDAO
      .deleteProduct(req.params.id)
      .then(product => res.status(200).json(product))
      .catch(error => res.status(400).json(error));
  }
}