(function() {
  var init;

  init = function($) {
    var EditCtrl, ListCtrl, app;
    console.log('hello world');
    app = angular.module('app', []);
    app.config(function($routeProvider) {
      return $routeProvider.when('/', {
        controller: ListCtrl,
        templateUrl: '/template/index.html'
      }).when('/home', {
        controller: ListCtrl,
        templateUrl: '/html/listitem.html'
      }).otherwise({
        redirectTo: '/'
      });
    });
    ListCtrl = function($scope) {
      return console.log('run list ctrl');
    };
    return EditCtrl = function($scope) {
      return console.log('edit ctrl');
    };
  };

  init(jQuery);

}).call(this);
