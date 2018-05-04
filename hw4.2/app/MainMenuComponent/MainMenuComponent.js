'use strict';

angular
    .module('myApp')
    .component('mainMenuComponent', {
        templateUrl: 'MainMenuComponent/MainMenuComponent.html',
        controller: function($scope) {

            $scope.isActive = function (stateName) {
              var active = (stateName === $scope.$state.current.name);
              return active;
            };
        }
    })