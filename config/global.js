(function() {
  exports.setLocals = function(app) {
    return app.locals({
      'title': 'Node.js generator and container'
    });
  };

}).call(this);
