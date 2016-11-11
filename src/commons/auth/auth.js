
module.exports = class AuthController {
  static isAuthenticated(req, res, next) {
    if (req.session.user) {
      return next();
    }

    res.status(403).json('You are not authorized.')
  }

  static isAdmin(req, res, next) {
    if (req.session.user && req.session.user.isAdmin) {
      return next();
    }

    res.status(403).json('You are not authorized.')
  }
}