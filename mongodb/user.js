const Schema = require("mongoose").Schema;

var UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "Email field required"],
    validate: {
      validator: (email) =>
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email),
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  password: {
    type: String,
    required: [true, "Password field required"],
    validate: {
      validator: (password) => /.{6,}/.test(password),
      message: (props) => "Password must be more 6 symbols",
    },
  },
  username: {
    type: String,
    unique: true,
    default: "def_user",
  },
  score: {
    type: Number,
    default: 0,
  },
});

module.exports = {
  UserSchema,
};
