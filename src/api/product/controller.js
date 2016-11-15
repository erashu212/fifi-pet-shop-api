"use strict";

const ProductDAO = require('./dao');

const CacheManager = require('../../commons/cache/cache');

const socketEmitter =  require('../../config/socket').emitter;

const _ = require('lodash');

module.exports = class ProductController {
    static loadAll() {
        ProductDAO.getAll()
            .then(products => {
                CacheManager.save('products', products);
            })
    }

    static getAll(req, res) {
        let {start, end} = req.query;

        CacheManager.get('products')
            .then(products => {
                
                socketEmitter.emit('product:read');

                if (_.isArray(products) && products.length > 0) { 
                    products = products[ 0 ];
                }

                if (!(_.isNaN(start) && _.isNaN(end))) {
                    return res.status(200).json(products.slice(start, end))
                }

                return res.status(200).json(products);
            })
            .catch(error => res.status(400).json(error));
    }

    static getProductById(req, res) {
        CacheManager.get('products')
            .then(products => {
                // if cache manager is empty then read and fill cache
                if (_.isEmpty(products))
                    return ProductDAO.getProductById(req.params.id);

                return _.find(products, (p) => p._id == req.params.id);
            })
            .then(product => res.status(200).json(product))
            .catch(error => res.status(400).json(error));
    }

    static createProduct(req, res) {
        ProductDAO
            .createProduct(req.body)
            .then(product => {
                CacheManager.save('products', product);

                return res.status(200).json(product);
            })
            .catch(error => res.status(400).json(error));
    }

    static updateProduct(req, res) {
        ProductDAO
            .updateProduct(req.params.id, req.body)
            .then(product => {
                CacheManager.save('products', product);

                return res.status(200).json(product);
            })
            .catch(error => res.status(400).json(error));
    }

    static deleteProduct(req, res) {
        ProductDAO
            .deleteProduct(req.params.id)
            .then(product => {
                CacheManager.delete('products', product);

                return res.status(200).json(product);
            })
            .catch(error => res.status(400).json(error));
    }
}