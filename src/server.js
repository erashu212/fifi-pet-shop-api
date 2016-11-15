'use strict';

const PORT = process.env.PORT || 8080;

const os = require('os');
const http = require('http');
const express = require('express');

const RoutesConfig = require('./config/routes.conf');
const DBConfig = require('./config/db.conf');
const ErrorHandler = require('./config/error-handler.conf');
const Routes = require('./routes/index');

const app = express();

const io = require('socket.io');

let server = http.createServer(app)
    .listen(PORT, () => {
        console.log(`up and running @: ${os.hostname()} on port: ${PORT}`);
        console.log(`enviroment: ${process.env.NODE_ENV}`);
    });
  
let ios = io.listen(server);

require('./config/socket').socket(ios);

RoutesConfig.init(app);
DBConfig.init();
ErrorHandler.init(app);

Routes.init(app, express.Router());
