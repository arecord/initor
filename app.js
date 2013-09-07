/*
Module dependencies.
*/


(function() {
  var app, config, express, http, partials, path, route, user;

  express = require("express");

  route = require("./routes");

  user = require("./routes/user");

  http = require("http");

  path = require("path");

  partials = require('express-partials');

  config = require('./config/global');

  app = express();

  app.set("port", process.env.PORT || 3000);

  app.set("views", __dirname + "/views");

  app.set("view engine", "ejs");

  app.use(partials());

  app.use(express.logger("dev"));

  app.use(express.bodyParser());

  app.use(express.methodOverride());

  app.use(app.router);

  app.use(express["static"](path.join(__dirname, "public")));

  config.setLocals(app);

  route.setRoute(app);

  if ("development" === app.get("env")) {
    app.use(express.errorHandler());
  }

  http.createServer(app).listen(app.get("port"), function() {
    return console.log("Express server listening on port " + app.get("port"));
  });

}).call(this);
