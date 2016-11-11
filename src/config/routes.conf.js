"use strict";

const morgan = require('morgan');
const bodyParser = require('body-parser');
const contentLength = require('express-content-length-validator');
const express = require('express');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');

module.exports = class RouteConfig {
  static init(application) {
      
        application.use(bodyParser.json());
        application.use(expressSession({
          secret: 'fifipetshopapi',
          resave: false,
          saveUninitialized: true,
          cookie: { secure: true }
        }));
        application.use(morgan('dev'));
        application.use(contentLength.validateMax({max: 999}));
    }
}
