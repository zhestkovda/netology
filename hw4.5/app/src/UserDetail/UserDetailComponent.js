'use strict';

userApp.component('userDetail', {
    controller: UserDetailCtrl,
    templateUrl: './src/UserDetail/UserDetail.html',
});

function UserDetailCtrl($routeParams, UsersService) {
    var ctrl = this;
    ctrl.userLoaded = false;
    ctrl.user = UsersService.get({
        userId: $routeParams['userId']
    }, function(successResult) {
        // Окей!
        ctrl.notfoundError = false;
        ctrl.userLoaded = true;

        ctrl.activeTab = 1;
        ctrl.disableControlTab = true;
    }, function(errorResult) {
        // Не окей..
        ctrl.notfoundError = true;
        ctrl.userLoaded = true;
    });
    
    ctrl.user.$promise.then(function(result) {
        //$scope.userLoaded = true;
    });
    
    ctrl.deleteUser = function(userId) {
        ctrl.user.$delete({
            userId: userId
        }, function(successResult) {
            // Окей!
            ctrl.deletionSuccess = true;
        }, function(errorResult) {
            // Не окей..
            ctrl.deletionError = true;
        });
    }
}

/*
userApp.controller('UserDetailCtrl', function($scope, $routeParams, UsersService) {

    $scope.userLoaded = false;

    $scope.user = UsersService.get({
        userId: $routeParams['userId']
    }, function(successResult) {
        // Окей!
        $scope.notfoundError = false;
        $scope.userLoaded = true;

        $scope.activeTab = 1;
        $scope.disableControlTab = true;
    }, function(errorResult) {
        // Не окей..
        $scope.notfoundError = true;
        $scope.userLoaded = true;

    });

    $scope.user.$promise.then(function(result) {
        //$scope.userLoaded = true;
    });

    $scope.deleteUser = function(userId) {

        $scope.user.$delete({
            userId: userId
        }, function(successResult) {
            // Окей!
            $scope.deletionSuccess = true;
        }, function(errorResult) {
            // Не окей..
            $scope.deletionError = true;
        });

    }

});
*/