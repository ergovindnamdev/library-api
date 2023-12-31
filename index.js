const express = require("express");
require("dotenv").config();
const cors = require("cors");

const bodyParser = require("body-parser");

const port = process.env.PORT || 3000;

const DatabaseConn = require("./src/database/db");

DatabaseConn();

//Instantiate Express 
const app = express();

app.use(bodyParser.json());
app.use(cors()); // enable all CORS requests

app.use(function(req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

app.get("/", function (req, res, next) { 
  res.send("Purposit API - Server");
});


app.use("/api/", require("./src/routes/user_routes"));
app.use("/api/", require("./src/routes/book_routes"));
app.use("/api/", require("./src/routes/library_trans"));

app.listen(port, () => {
  console.log(` API service is running on port:${port}.`);
});

module.exports = app;
