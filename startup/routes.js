const express = require("express");
const quotes = require("../routes/quotes");
const users = require("../routes/users");
const logins = require("../routes/logins");

module.exports = function(app) {
  app.use(express.json());
  app.use("/api/quotes/", quotes);
  app.use("/api/users/", users);
  app.use("/api/logins/", logins);
};
