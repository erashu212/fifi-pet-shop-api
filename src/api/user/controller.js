"use strict";

const UserDAO = require('./dao');

const _ = require('lodash');

module.exports = class UserController {
    static getAll(req, res) {
        UserDAO
            .getAll()
            .then(user => res.status(200).json({
                status: !!user,
                data: user,
                message: ''
            }))
            .catch(error => res.status(400).json({
                status: false,
                data: null,
                message: error
            }));
    }

    static get(req, res) {
        return res.status(200).json({
            status: !!req.session.user,
            data: req.session ? req.session.user : null,
            message: ''
        })
    }

    static createUser(req, res) {
        UserDAO
            .createUser(req.body)
            .then(user => res.status(200).json({
                status: !!user,
                data: user,
                message: ''
            }))
            .catch(error => res.status(400).json({
                status: false,
                data: null,
                message: err
            }));
    }

    static login(req, res) {
        UserDAO
            .login(req.body)
            .then(user => {
                req.session.user = _.isArray(user) ? user[ 0 ] : user;

                return res.status(200).json({
                    status: !!req.session.user,
                    data: user,
                    message: ''
                })
            })
            .catch(error => res.status(400).json({
                status: false,
                data: null,
                message: error
            }));
    }

    static logout(req, res) {
        req.session.destroy((err) => {
            err ? res.status(400).json({
                status: false,
                data: null,
                message: err
            })
                : res.status(200).json({
                    status: true,
                    data: null,
                    message: 'Logged out successfully.'
                })
        });
    }
}