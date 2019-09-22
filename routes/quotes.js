const { Quote, validate } = require("../models/quotes");
const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const quotes = await Quote.find().sort("author");
    res.send(quotes);
  } catch (ex) {
    //log the exception
    res.status(500).send("Something failed");
  }
});

router.post("/", auth, async (req, res, next) => {
  let obj = new Quote({
    quote: req.body.quote,
    author: req.body.author
  });

  console.log(req.body);
  const { error } = validate(req.body);
  console.log(error);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    quote = await obj.save();

    res.send(quote);
  } catch (ex) {
    res.status(500).send("Something failed");
  }
});

/* router.post("/user", async (req, res) => {
  let user = new User({
    fisrtName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.username,
    password: req.body.password
  });
  user = await user.save();
  res.send(user);
}); */

router.put("/:id", async (req, res) => {
  const quote = await Quote.findByIdAndUpdate(
    req.params.id,
    { author: req.body.author },
    { new: true }
  );
  if (!quote)
    return res.status(404).send("The Quote with the given ID does not exists.");

  quote.author = req.body.author;
  res.send(quote);
});

module.exports = router;
