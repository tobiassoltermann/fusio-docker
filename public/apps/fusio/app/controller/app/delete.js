'use strict'

module.exports = function ($scope, $http, $uibModalInstance, app, fusio) {
  $scope.app = app

  $scope.delete = function (app) {
    $http.delete(fusio.baseUrl + 'backend/app/' + app.id)
      .then(function (response) {
        var data = response.data
        $scope.response = data
        if (data.success === true) {
          $uibModalInstance.close(data)
        }
      })
      .catch(function (response) {
        $scope.response = response.data
      })
  }

  $scope.close = function () {
    $uibModalInstance.dismiss('cancel')
  }

  $scope.closeResponse = function () {
    $scope.response = null
  }
}
