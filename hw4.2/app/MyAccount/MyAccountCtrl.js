'use strict';

angular
    .module('myApp')
    .controller('MyAccountCtrl', function($scope) {

	  $scope.master = {};
	  $scope.user = {};
	  $scope.user.name ="";
	  $scope.user.email ="";
	  $scope.user.phone ="";
	  $scope.phonePattern = /^\+\d{10}/;

	  $scope.update = function(user) {
	    $scope.master= angular.copy(user);
	  };
	 
	  $scope.reset = function() {
	    $scope.user.name = "";
	    $scope.user.email = "";
	    $scope.user.phone = "";
	  };
	 
	  $scope.reset();

    })