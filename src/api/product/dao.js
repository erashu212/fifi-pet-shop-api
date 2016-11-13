"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
mongoose.Promise = Promise;

const _ = require('lodash');

const productSchema = require('./model');


productSchema.statics.getAll = () => {
  return new Promise((resolve, reject) => {
    let _query = {};

    Product
      .find(_query)
      .exec((err, products) => {
        err ? reject(err)
            : resolve(products);
      })
  })
}

productSchema.statics.getProductById = (id) => {
  return new Promise((resolve, reject) => {
    let _query = {_id: id};

    Product
      .find(_query)
      .exec((err, products) => {
        err ? reject(err)
            : resolve(products);
      })
  })
}

productSchema.statics.createProduct = (product) => {
  return new Promise((resolve, reject) => {
    if (!_.isObject(product))
      return reject(new TypeError('Product is not a valid object'));

    let _product = new Product(product);

    _product.save((err, saved) => {
      err ? reject(err)
          : resolve(saved);
    })
  })
}

productSchema.statics.updateProduct = (id, product) => {
  return new Promise((resolve, reject) => {
    if (!_.isObject(product))
      return reject(new TypeError('Product is not a valid object'));

    Product.update({ _id: id }, req.body)
           .exec((err, updated) => {
              err ? reject(err)
                  : resolve(updated);
          })
  })
}


productSchema.statics.deleteProduct = (id) => {
  return new Promise((resolve, reject) => {
    if (!_.isString(id))
      return reject(new TypeError('Id is not a valid string.'));

    Product
      .findByIdAndRemove(id)
      .exec((err, deleted) => {
        err ? reject(err)
            : resolve(deleted);
      });
  });
}

const Product = mongoose.model('Product', productSchema);

module.exports = Product;