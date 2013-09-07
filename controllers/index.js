(function() {
  var initor;

  initor = require("../lib/initor");

  exports.index = function(req, res) {
    return res.render("index");
  };

  exports.createProject = function(req, res) {
    var createPath, createType, name;
    createType = req.body.type;
    name = req.body.name;
    console.log(createType);
    console.log("[status] create new project name: " + name);
    if (createType.toLowerCase() === "express") {
      createPath = "/tmp/" + name;
      return initor.genPrj("express", ["-e", "-s"], createPath, function() {
        initor.addNpmModule(createPath, "nodeutil");
        return initor.getSnip(createPath, "mysql", "mysql-config", function(d) {
          console.log("add snip done..., msg:" + JSON.stringify(d));
          if (d.msg === 'ok') {
            return res.redirect("/projectList");
          }
        });
      });
    }
  };

  exports.getCreateProject = function(req, res) {
    return res.redirect("/");
  };

  exports.getProjectList = function(req, res) {
    return res.render("projectList");
  };

}).call(this);
