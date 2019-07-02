var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var app = express();

var port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

var Users = require("./routes/Users");
var Tasks = require("./routes/Tasks");

app.use("/users", Users);
app.use("/api", Tasks);

app.listen(port, () => {
  console.log("Server Running on port " + port);
});
