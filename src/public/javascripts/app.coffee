init = ($) ->
  console.log 'hello world'

  app = angular.module('app', [])

  app.config ($routeProvider) ->
    $routeProvider.when '/',
      controller: ListCtrl
      templateUrl: '/template/index.html'
    .when '/create',
      controller: ListCtrl
      templateUrl: '/template/create.html'
    .when '/create/:chooseType',
      controller: createDetailCtrl
      templateUrl: '/template/createDetail.html'
    .when '/projectList',
      controller: ListCtrl
      templateUrl: '/template/projectList.html'
    .otherwise
      redirectTo:'/'

  createDetailCtrl = ($scope, $routeParams) ->
    $scope.createData =
      'express':
        id: 'express'
        name: 'express basic type'
        desc: 'expresswhos works base on node.js and very light way.'
      'database':
        id: 'database'
        name: 'database type'
        desc: 'database nd you can choose you own database mix with node.js.'

    createType = $routeParams.chooseType
    $scope.createModel = $scope.createData[createType]

    $scope.blur = () ->
      node = $("#projectName")
      if ($scope.projectName <= 0)
        node.addClass("success").find(".help-block").show()
      else
        node.removeClass("success").find(".help-block").hide()
        node.find("input[type=text]").focus()

    $scope.submit = (e) ->
      target = e.target

      if ! $scope.projectName or $scope.projectName <= 0
        e.preventDefault()
        $scope.blur()
        return alert('Please input all project item')

      $("#loading-mask").show()

  ListCtrl = ($scope) ->
    console.log 'run list'
  EditCtrl = ($scope) ->
    console.log 'edit ctrl'

# initial
init(jQuery)

