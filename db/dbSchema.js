const mongoose = require("mongoose");
const data = require("./data.json");

mongoose
  .connect("mongodb://localhost/reactQuotes")
  /*  .connect(
    "mongodb+srv://quoteUser:seskviterpen@quotes-1h9gl.azure.mongodb.net/reactQuotes"
  ) */
  .then(() => console.log("Connected to MongoDB", { useNewUrlParser: true }))
  .catch(error => console.log("Could not connect to MongoDB...", error));

const quoteSchema = new mongoose.Schema({
  quote: String,
  author: String,
  u_id: Number
});

const Quote = mongoose.model("Quote", quoteSchema);

Quote.insertMany(data, function(err, res) {
  if (err) throw err;
  console.log("Many documents inserted");
});
