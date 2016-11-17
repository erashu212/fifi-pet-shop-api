"use strict";

const Promise = require('bluebird');
const EventEmitter = require('events').EventEmitter;
const cacheEmitter = new EventEmitter();

const _ = require('lodash');

const cache = require('memory-cache');

module.exports = class CacheManager {
    static save(key = 'products', dataSet, id = null) {
        return new Promise((resolve, reject) => {
            if (_.isNull(key) || _.isNull(dataSet))
                return reject(
                    new TypeError('Key and object to be saved should not be empty'));

            // check cache is empty?
            let data = cache.get(key) || [];

            if (_.isArray(data)) {
                if (!_.isUndefined(data[ 0 ])) {
                    let index = _.isNull(id) ? -1
                            : data[ 0 ].findIndex(x =>
                                                    x._id == id);

                    if (index > - 1)
                        data[ 0 ].splice(index, 1);
                        
                    data[ 0 ].push(dataSet)
                } else {
                    data.push(dataSet);
                }
                cache.put(key, data);

                return resolve(true)
            }
            return resolve(false);
        });
    }

    static get(key = 'products') {
        return new Promise((resolve, reject) => {
            if (!_.isString(key))
                return reject(new TypeError('Key must be string'));


            return resolve(cache.get(key));
        })
    }

    static delete(key = 'products', id) {
        return new Promise((resolve, reject) => {
            if (!_.isString(key))
                return reject(new TypeError('Key must be string'));

            // check cache is empty?
            let data = cache.get(key);

            if (_.isArray(data) && data.length > 0) {
                let index = data[ 0 ].findIndex(x => x._id == id);

                data[ 0 ].splice(index, 1);
                cache.put(key, data);

                return resolve(true)
            }
            return resolve(false)
        });
    }
}