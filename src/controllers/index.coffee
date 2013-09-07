#default controller
exports.index = (req, res) ->
  res.render "index"

exports.createProject = (req, res) ->
  res.redirect '/projectList'

exports.getCreateProject = (req, res) ->
  res.redirect("/")