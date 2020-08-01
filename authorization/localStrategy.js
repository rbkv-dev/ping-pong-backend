const LocalStrategy = require("passport-local").Strategy;
const { User } = require("../mongodb");

module.exports = function (
  option = {
    usernameField: "email",
    passwordField: "password",
  }
) {
  return new LocalStrategy(option, async function (login, password, done) {
    User.findOne({ email: login }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: "Incorrect password." });
      }
      return done(null, user.toJSON());
    });
  });
};
