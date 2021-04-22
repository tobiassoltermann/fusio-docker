'use strict'

var angular = require('angular')

angular.module('fusioApp.routes', ['ngRoute', 'ui.bootstrap'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/routes', {
      templateUrl: 'app/controller/routes/index.html',
      controller: 'RoutesCtrl'
    })
    $routeProvider.when('/routes/:route_id', {
      templateUrl: 'app/controller/routes/index.html',
      controller: 'RoutesCtrl'
    })
  }])

  .controller('RoutesCtrl', require('./routes'))
  .controller('RoutesCreateCtrl', require('./create'))
  .controller('RoutesUpdateCtrl', require('./update'))
  .controller('RoutesDeleteCtrl', require('./delete'))
  .controller('RoutesProviderCtrl', require('./provider'))
  .controller('RoutesChangelogCtrl', require('./changelog'))
  .controller('RoutesLogCtrl', require('./log'))
