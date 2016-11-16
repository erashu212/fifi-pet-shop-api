"use strict";

const ProductDAO = require('./dao');

const CacheManager = require('../../commons/cache/cache');

const socketEmitter = require('../../config/socket').emitter;

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
                    products = products[0];
                }

                let productLength = products.length;

                if (!(_.isNaN(start) && _.isNaN(end))) {
                    return res.status(200).json({
                        status: !!products,
                        data: {
                            totalItems: productLength,
                            products: products.slice(start, end)
                        },
                        message: ''
                    })
                }

                return res.status(200).json({
                    status: !!products,
                    data: {
                        totalItems: productLength,
                        products: products
                    },
                    message: ''
                });
            })
            .catch(error => res.status(400).json({
                status: false,
                data: null,
                message: error
            }));
    }

    static getProductById(req, res) {
        CacheManager.get('products')
            .then(products => {
                // if cache manager is empty then read and fill cache
                if (_.isEmpty(products))
                    products = ProductDAO.getProductById(req.params.id);

                if (_.isArray(products) && products.length > 0) {
                    products = products[0];
                }

                return _.find(products, (p) => p._id == req.params.id);
            })
            .then(product => res.status(200).json({
                status: !!product,
                data: product,
                message: ''
            }))
            .catch(error => res.status(400).json({
                status: false,
                data: error,
                message: ''
            }));
    }

    static createProduct(req, res) {
        ProductDAO
            .createProduct(req.body)
            .then(product => {
                CacheManager.save('products', req.body);
                socketEmitter.emit('product:added', req.body);
                
                return res.status(200).json({
                    status: !!product,
                    data: product,
                    message: ''
                });
            })
            .catch(error => res.status(400).json({
                status: false,
                data: null,
                message: err
            }));
    }

    static updateProduct(req, res) {
        ProductDAO
            .updateProduct(req.params.id, req.body)
            .then(product => {
                CacheManager.save('products', req.body, req.params.id);
                socketEmitter.emit('product:updated', req.body);

                return res.status(200).json({
                    status: !!product,
                    data: req.params.id,
                    message: ''
                });
            })
            .catch(error => res.status(400).json({
                status: false,
                data: null,
                message: error
            }));
    }

    static deleteProduct(req, res) {
        ProductDAO
            .deleteProduct(req.params.id)
            .then(product => {
                CacheManager.delete('products', req.params.id);
                socketEmitter.emit('product:deleted', req.params.id);

                return res.status(200).json({
                    status: !!product,
                    data: req.params.id,
                    message: ''
                });
            })
            .catch(error => res.status(400).json({
                status: false,
                data: null,
                message: error
            }));
    }
}