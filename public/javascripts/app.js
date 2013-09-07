(function() {
  var init;

  init = function($) {
    var EditCtrl, ListCtrl, app, createDetailCtrl;
    console.log('hello world');
    app = angular.module('app', []);
    app.config(function($routeProvider) {
      return $routeProvider.when('/', {
        controller: ListCtrl,
        templateUrl: '/template/index.html'
      }).when('/create', {
        controller: ListCtrl,
        templateUrl: '/template/create.html'
      }).when('/create/:chooseType', {
        controller: createDetailCtrl,
        templateUrl: '/template/createDetail.html'
      }).when('/projectList', {
        controller: ListCtrl,
        templateUrl: '/template/projectList.html'
      }).otherwise({
        redirectTo: '/'
      });
    });
    createDetailCtrl = function($scope, $routeParams) {
      var createType;
      $scope.createData = {
        'express': {
          id: 'express',
          name: 'express basic type',
          desc: 'expresswhos works base on node.js and very light way.'
        },
        'database': {
          id: 'database',
          name: 'database type',
          desc: 'database nd you can choose you own database mix with node.js.'
        }
      };
      createType = $routeParams.chooseType;
      $scope.createModel = $scope.createData[createType];
      $scope.blur = function() {
        var node;
        node = $("#projectName");
        if ($scope.projectName <= 0) {
          return node.addClass("success").find(".help-block").show();
        } else {
          node.removeClass("success").find(".help-block").hide();
          return node.find("input[type=text]").focus();
        }
      };
      return $scope.submit = function(e) {
        var target;
        target = e.target;
        if (!$scope.projectName || $scope.projectName <= 0) {
          e.preventDefault();
          $scope.blur();
          return alert('Please input all project item');
        }
        return $("#loading-mask").show();
      };
    };
    ListCtrl = function($scope) {
      return console.log('run list');
    };
    return EditCtrl = function($scope) {
      return console.log('edit ctrl');
    };
  };

  init(jQuery);

}).call(this);
