'use strict'

userApp.controller('UserListCtrl', function ($scope, UsersService, PostsService) {
  $scope.usersLoaded = false;
  $scope.postsLoaded = false;


  UsersService.getUsers().then(function (response) {
    $scope.users = response.data
    $scope.usersLoaded = true;
  })

  PostsService.getPosts().then(function (response) {
    $scope.posts = response.data
    $scope.postsLoaded = true;
  })


/*   UsersService.getUsers().then(function (response) {
    $scope.users = response.data
    return PostsService.getPosts()
  }).then(function (response) {
    $scope.posts = response.data
  }) */

})
