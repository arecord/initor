(function() {
  var defaultController;

  defaultController = require('../controllers/index');

  exports.setRoute = function(app) {
    return app.get('/', defaultController.index);
  };

}).call(this);
