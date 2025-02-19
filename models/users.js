const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema({
  name: {
    required: true,
    minLength: 2,
    maxLength: 30,
    type: String,
  },
  avatar: {
    required: true,
    type: String,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a value URL",
    },
  },
});

module.exports = mongoose.model("user", userSchema);
