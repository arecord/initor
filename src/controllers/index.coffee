#default controller
initor = require("../lib/initor")

exports.index = (req, res) ->
  res.render "index"

exports.createProject = (req, res) ->
  createType = req.body.type
  
  name = req.body.name
  console.log createType
  console.log "[status] create new project name: #{name}"

  # generate project
  if (createType.toLowerCase() is "express")
    createPath = "/tmp/#{name}"
    initor.genPrj "express", ["-e", "-s"], createPath, ->
      # add module
      initor.addNpmModule createPath, "nodeutil"
      # add snip
      initor.getSnip createPath, "mysql", "mysql-config", (d) ->
        console.log "add snip done..., msg:" + JSON.stringify(d)
        if d.msg is 'ok'
          res.redirect("/projectList")

  # res.redirect '/projectList'

exports.getCreateProject = (req, res) ->
  res.redirect("/")

exports.getProjectList = (req, res) ->
  res.render "projectList"