#
#
#initor
#https://github.com/arecord/initor
#
#Copyright (c) 2013 clonn, peihsinsu
#Licensed under the MIT license.
#
(->
  "use strict"
  exec = require("child_process").exec
  request = require("request")
  fs = require("fs")
  cmds = express:
    cmd: __dirname + "/../node_modules/express/bin/express"
    avaliable_opts:
      e: "use ejs layout"
      s: "add session support"

  snips = mysql:
    "mysql-config":
      url: "http://opennodes.arecord.us/examples/mysql/mysql-config.js"
      desc: "mysql config file, for setting the connection"

  exports.awesome = ->
    "awesome"

  exports.genPrj = (model, opts, prj_name, callback) ->
    console.log "model:%s, prj_name:%s", model, prj_name
    opts = []  unless opts
    opts.push prj_name
    opts.push "-f"
    console.log opts
    cmd = cmds[model].cmd
    cmd = cmd + " " + opts.join(" ")
    exec cmd, (err, stdo, stde) ->
      console.log err  if err
      console.log stdo
      exec "cd " + prj_name + " && npm install", (err, stdo, stde) ->
        console.log "Solve npm module dependencies..."
        console.log err  if err
        console.log stdo
        callback()  if callback



  exports.addNpmModule = (targetPath, moduleName) ->
    console.log "Start to install module:%s for %s", moduleName, targetPath
    exec "cd " + targetPath + " && npm install " + moduleName + " --save", (err, stdo, stde) ->
      console.log err  if err
      console.log stdo


  exports.listSnip = (modulename) ->
    snips[modulename]

  exports.getSnip = (prjpath, modulename, snipname, callback) ->
    topath = prjpath + "/lib/" + modulename
    fs.mkdirSync prjpath + "/lib/"  unless fs.existsSync(prjpath + "/lib/")
    fs.mkdirSync topath  unless fs.existsSync(topath)
    if not snips[modulename] or not snips[modulename][snipname]
      return callback(
        status: 400
        msg: "snip not found"
      )
    request.get snips[modulename][snipname].url, (e, r, d) ->
      fs.writeFileSync topath + "/" + snipname + ".js", d, "utf8"
      if callback
        callback
          status: 200
          msg: "ok"


).call this
