init = ($) ->
  console.log 'hello world'

  app = angular.module('app', [])

  app.config ($routeProvider) ->
    $routeProvider.when '/',
      controller: ListCtrl
      templateUrl: '/template/index.html'
    .when '/home',
      controller: ListCtrl
      templateUrl: '/html/listitem.html'
    .otherwise
      redirectTo:'/'

  ListCtrl = ($scope) ->
    console.log 'run list ctrl'

  EditCtrl = ($scope) ->
    console.log 'edit ctrl'

# initial
init(jQuery)

