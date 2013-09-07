
#
# * GET home page.
# 
defaultController = require '../controllers/index'

exports.set = (app) ->
	app.get '/', defaultController.index
