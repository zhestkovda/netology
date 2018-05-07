'use strict'

userApp.controller('EditUserCtrl', function ($scope, UsersService) {
  $scope.newUser = {}

  $scope.editUser = function (myUser) {
    $scope.editSuccess = false

    UsersService.editUser(myUser,$scope.newUser).then(function (response) {
      $scope.newUser = {}

      $scope.newUserId = response.data.id
      $scope.editSuccess = true
    })
  }
})
