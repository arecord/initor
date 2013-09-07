#
# * GET home page.
#
defaultController = require '../controllers/index'

exports.setRoute = (app) ->
  app.get '/', defaultController.index
  app.post '/create', defaultController.getCreateProject
  app.get '/create', defaultController.createProject
