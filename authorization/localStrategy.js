const LocalStrategy = require("passport-local").Strategy;
const { User } = require("../mongodb");
const bcrypt = require("bcrypt");

module.exports = function (
  option = {
    usernameField: "email",
    passwordField: "password",
  }
) {
  return new LocalStrategy(option, async function (login, password, done) {
    User.findOne({ email: login }, async (err, user) => {
      if (err) return done(err);

      if (!user) {
        return done(null, false, { message: "Incorrect login or password" });
      }

      bcrypt.compare(password, user.password, function (err, res) {
        if (err) return done(err);
        if (res === false) {
          return done(null, false, { message: "Incorrect login or password" });
        } else {
          return done(null, user.toJSON());
        }
      });
    });
  });
};
