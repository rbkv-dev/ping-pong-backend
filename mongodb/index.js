const mongoose = require("mongoose");
const { UserSchema } = require("./user");

mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ping-pong-database.s4k4g.mongodb.net/ping-pong-database?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

var User = mongoose.model("UserModel", UserSchema, "users");

module.exports = {
  mongoose,
  User,
};
