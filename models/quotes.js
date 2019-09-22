const mongoose = require("mongoose");
const Joi = require("joi");

const quoteSchema = new mongoose.Schema({
  quote: {
    type: String,
    minlength: 50,
    maxlength: 300,
    required: true
  },
  author: {
    type: String,
    minlength: 3,
    maxlength: 100,
    required: true
  }
});

function validateQuote(quote) {
  const schema = {
    quote: Joi.string()
      .min(50)
      .max(300)
      .required(),
    author: Joi.string()
      .min(3)
      .max(100)
      .required()
  };

  return Joi.validate(quote, schema);
}

const Quote = mongoose.model("Quote", quoteSchema);

exports.quoteSchema = quoteSchema;
exports.Quote = Quote;
exports.validate = validateQuote;
