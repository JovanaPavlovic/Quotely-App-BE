const express = require("express");
const app = express();

require("./startup/cors")(app);
require("./startup/routes")(app);
require("./startup/db")();
/* require("./startup/config")(); */

const port = process.env.PORT || 3000;
app.listen(3900, () => console.log("Listening on port 3900..."));
