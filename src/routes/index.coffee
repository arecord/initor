#
# * GET home page.
#
defaultController = require '../controllers/index'

exports.setRoute = (app) ->
  app.get '/', defaultController.index
