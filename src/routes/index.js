"use strict";

const StaticDispatcher = require('../commons/static/index');
const AuthController = require('../commons/auth/auth')

/* Routers  */
const UserRoutes = require('../api/user/route');
const ProductRoutes = require('../api/product/route');

module.exports = class Routes {
  static init(app, router) {

      ProductRoutes.preInit();
    
      app.all('/api/users', AuthController.isAuthenticated);

    /* middleware to avail product api to admin only */
      app
       .post('/api/products', AuthController.isAdmin)
       .put('/api/products/:id', AuthController.isAdmin)
       .delete('/api/products/:id', AuthController.isAdmin);
 
      UserRoutes.init(router);
      ProductRoutes.init(router);

     router
       .route('*')
       .get(StaticDispatcher.sendIndex);

     app.use('/', router);
  }
}
