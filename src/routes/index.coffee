#
# * GET home page.
#
defaultController = require '../controllers/index'

exports.setRoute = (app) ->
  app.get '/', defaultController.index
  app.post '/create', defaultController.createProject
  app.get '/create', defaultController.getCreateProject 
  app.get '/projectList', defaultController.getProjectList
