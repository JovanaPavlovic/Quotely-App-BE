const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
/* const config = require("config"); */

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    required: true,
    minlength: 5,
    maxlength: 30
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
    minlength: 5,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 200,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1000
  }
});

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    {
      _id: this._id,
      firstName: this.firstName,
      exp: Math.floor(Date.now() / 1000) + 60 * 60
    },
    "privateKey"
  );
  console.log(token);
  /*   const token = jwt.sign({ _id: user._id }, config.get("privateKey")); */
  const obj = { jwtToken: token };
  return obj;
};

function validateUser(user) {
  const schema = {
    firstName: Joi.string()
      .min(2)
      .max(30)
      .required(),
    lastName: Joi.string()
      .min(3)
      .max(30)
      .required(),
    email: Joi.string()
      .min(5)
      .max(200)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(200)
      .required()
  };
  return Joi.validate(user, schema);
}

const User = mongoose.model("User", userSchema);
exports.userShema = userSchema;
exports.User = User;
exports.validate = validateUser;
