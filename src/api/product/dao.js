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
            .sort({ createdDate: -1, updatedDate: -1 })
            .exec((err, products) => {
                err ? reject(err)
                    : resolve(products);
            })
    })
}

productSchema.statics.getProductById = (id) => {
    return new Promise((resolve, reject) => {
        let _query = { _id: id };

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
                : resolve(product);
        })
    })
}

productSchema.statics.updateProduct = (id, product) => {
    return new Promise((resolve, reject) => {
        if (!_.isObject(product))
            return reject(new TypeError('Product is not a valid object'));

        Product.update(id, product,
            (err, updated) => {
                err ? reject(err)
                    : resolve(Object.assign({}, product, {_id: id}));
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
                    : resolve(true);
            });
    });
}

const Product = mongoose.model('Product', productSchema);

module.exports = Product;