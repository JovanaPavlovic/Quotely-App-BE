/* const config = require("config"); */

module.exports = function() {
  if (!config.get("privateKey")) {
    throw new Error("FATAL ERROR: jwtPrivateKey is not defined.");
  }
};
