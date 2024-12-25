const createError = require("http-errors");
const express = require("express");
const cors = require('cors');
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const { routesInit } = require("./routes/confing_route");
require("./routes/confing_route");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

routesInit(app);
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});



module.exports = app;

