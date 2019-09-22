const mongoose = require("mongoose");

module.exports = function() {
  mongoose
    .connect(
      "mongodb+srv://quoteUser:seskviterpen@quotes-1h9gl.azure.mongodb.net/reactQuotes",
      {
        useCreateIndex: true,
        useNewUrlParser: true
      }
    )
    .then(function() {
      console.log("Connected to MongoDB....");
    })
    .catch(function(error) {
      console.log("Could not connect to MongoDB....", error);
    });
};
