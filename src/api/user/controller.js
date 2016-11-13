"use strict";

const UserDAO = require('./dao');

const _ = require('lodash');

module.exports = class UserController { 
  static getAll(req, res) { 
    UserDAO
      .getAll()
      .then(users => res.status(200).json(users))
      .catch(error => res.status(400).json(error));
  }
  
  static createUser(req, res) { 
    UserDAO
      .createUser(req.body)
      .then(users => res.status(200).json(users))
      .catch(error => res.status(400).json(error));
  }
  
  static login(req, res) { 
    UserDAO
      .login(req.body)
      .then(user => { 
        req.session.user = _.isArray(user) ? user[0] : user;
        
        return res.status(200).json(user)
      })
      .catch(error => res.status(400).json(error));
  }
  
  static logout(req, res) { 
    req.session.destroy((err) => { 
      err ? res.status(500).json(err) 
          : res.status(200).json('Logged out successfully.')
    });
  }
}