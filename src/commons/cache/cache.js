"use strict";

const Promise = require('bluebird');
const NodeChache = require('node-cache');
const EventEmitter = require('events').EventEmitter;

const _ = require('lodash');

const cache = new NodeChache();


class CacheManager {
  static set(key, dataSet) {
    return Promise((resolve, reject) => {
      if (_.isNull(key) || _.isNull(dataSet))
        return reject(
          new TypeError('Key and object to be saved should not be empty'));


      cache.set(key, dataSet, (err, success) => {
        err ? reject(err)
            : resolve(success);
      });
    });
  }

  static get(key) {
    return Promise((resolve, reject) => {
      if (!_.isString(key))
        return reject(new TypeError('Key must be string'));
      
      
        return cache.get(key, (err, success) => {
          err ? reject(err)
              : resolve(success);
        })
    })
  }

  static delete(key) {
    return Promise((resolve, reject) => {
      if (!_.isString(key))
        return reject(new TypeError('Key must be string'));
      
      
        return cache.delete(key, (err, success) => {
          err ? reject(err)
              : resolve(success);
        })
    })
  }
}

class CacheEmitter extends EventEmitter { 
  type;
  message;
  other;

  constructor() { 
    super();
  }
}

cacheEmitter.on('event:save', (key) => {
    
  CacheManager.set(key, data);
});

cacheEmitter.on('event:delete', (key) => {
    
  CacheManager.delete(key);
});

module.exports = cacheEmitter = new CacheEmitter();