"use strict";

const Promise = require('bluebird');
const NodeChache = require('node-cache');
const EventEmitter = require('events').EventEmitter;
const cacheEmitter = new EventEmitter();

const _ = require('lodash');

const cache = new NodeChache();

module.exports = class CacheManager {
  static save(key = 'products', dataSet) {
    return new Promise((resolve, reject) => {
      if (_.isNull(key) || _.isNull(dataSet))
        return reject(
          new TypeError('Key and object to be saved should not be empty'));

      // check cache is empty?
      cache.get(key, (err, success) => {
        let data = success || [];

        data.push(dataSet);

        cache.set(key, data, (err, success) => {
          err ? reject(err)
            : resolve(success);
        });
      });
    });
  }

  static get(key = 'products') {
    return new Promise((resolve, reject) => {
      if (!_.isString(key))
        return reject(new TypeError('Key must be string'));


      return cache.get(key, (err, success) => {
        err ? reject(err)
          : resolve(success);
      })
    })
  }

  static delete(key = 'products', dataToDelete) {
    return new Promise((resolve, reject) => {
      if (!_.isString(key))
        return reject(new TypeError('Key must be string'));

      // check cache is empty?
      cache.get(key, (err, success) => {
        let data = success || [];

        let index = data.findIndex(x =>
          _.isObject(x) && _.isEqual(x, dataToDelete));

        data.splice(index);

        return cache.set(key, data, (err, success) => {
          err ? reject(err)
            : resolve(success);
        })
      })
    });
  }
}