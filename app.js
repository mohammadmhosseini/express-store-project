const Application = require("./app/server");
require("dotenv").config();
new Application(5000, process.env.DB_URL);