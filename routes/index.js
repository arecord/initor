(function() {
  var defaultController;

  defaultController = require('../controllers/index');

  exports.setRoute = function(app) {
    app.get('/', defaultController.index);
    app.post('/create', defaultController.createProject);
    app.get('/create', defaultController.getCreateProject);
    return app.get('/projectList', defaultController.getProjectList);
  };

}).call(this);
