const auth = require("../middleware/auth");
const { User, validate } = require("../models/users");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

router.get("/currentUser", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  console.log(error);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User alredy registered!");

  user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();

  res
    .header("x-auth-token", token.jwtToken)
    .header("access-control-expose-headers", "x-auth-token")
    .send(user);
});

module.exports = router;
