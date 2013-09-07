
###
Module dependencies.
###
express = require("express")
route = require("./routes")
user = require("./routes/user")
http = require("http")
path = require("path")
partials = require('express-partials')
config = require('./config/global')
app = express()

# all environments
app.set "port", process.env.PORT or 3000
app.set "views", __dirname + "/views"
app.set "view engine", "ejs"
app.use partials()
#app.use express.favicon()
app.use express.logger("dev")
app.use express.bodyParser()
app.use express.methodOverride()
app.use app.router
app.use express.static(path.join(__dirname, "public"))

# set app global config
config.setLocals(app)
# set all route
route.setRoute(app)

# development only
app.use express.errorHandler()  if "development" is app.get("env")

http.createServer(app).listen app.get("port"), ->
  console.log "Express server listening on port " + app.get("port")

