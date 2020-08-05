const passport = require("passport");

module.exports = (...args) => {
  passport.authenticate("login", { session: false }, (err, userData, info) => {
    const [req, res, next] = args;
    if (userData) {
      req.user = userData;
      next();
    } else {
      res.status(info.status || 401);
      res.json(info);
    }
  })(...args);
};
