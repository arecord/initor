(function() {
  exports.index = function(req, res) {
    return res.render("index");
  };

  exports.createProject = function(req, res) {
    return res.redirect('/projectList');
  };

  exports.getCreateProject = function(req, res) {
    return res.redirect("/");
  };

}).call(this);
