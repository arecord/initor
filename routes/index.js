(function() {
  var defaultController;

  defaultController = require('../controllers/index');

  exports.setRoute = function(app) {
    app.get('/', defaultController.index);
    app.post('/create', defaultController.getCreateProject);
    return app.get('/create', defaultController.createProject);
  };

}).call(this);
