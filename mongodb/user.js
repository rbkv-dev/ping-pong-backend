const Schema = require("mongoose").Schema;

var UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    dropDups: true,
    default: "def_user",
  },
  email: {
    type: String,
    unique: true,
    dropDups: true,
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
    // validate: {
    //   validator: (password) => /^.{6,36}$/.test(password),
    //   message: (props) => "Password must be between 6 and 36",
    // },
  },
  score: {
    type: Number,
    default: 0,
  },
});

module.exports = {
  UserSchema,
};
