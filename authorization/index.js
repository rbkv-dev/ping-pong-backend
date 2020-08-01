const passport = require("passport");

const localFactory = require("./localStrategy");
const jwtFactory = require("./jwtStrategy");

passport.use("login", localFactory());
passport.use("jwt", jwtFactory());

module.exports = { passport };
