const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET,
};

module.exports = function () {
  return new JwtStrategy(opts, function (jwt_payload, done) {
    done(null, jwt_payload);
  });
};
