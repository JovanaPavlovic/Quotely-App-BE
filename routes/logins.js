const { User } = require("../models/users");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Joi = require("joi");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  23;
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or passwword");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or passwword");

  const token = user.generateAuthToken();
  res.send(token);
});

function validate(req) {
  const schema = {
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
  return Joi.validate(req, schema);
}

module.exports = router;
