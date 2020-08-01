const Schema = require("mongoose").Schema;

var UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    // validate: {
    //   validator: (email) => /.+@.{2,25}.{2,5}/.test(email),
    //   message: (props) => `${props.value} is not a valid email!`,
    // },
  },
  password: {
    type: String,
    required: true,
    // validate: {
    //   validator: (password) => /.{6,}/.test(password),
    //   message: (props) => "Password must be more 6 symbols",
    // },
  },
  nick: {
    type: String,
    default: "",
  },
});

// UserSchema.methods.isValidPassword = function (password) {
//   return this.password === password;
// };

UserSchema.methods.validPassword = function (password) {
  return this.password === password;
};

module.exports = {
  UserSchema,
};
