'use strict'

userApp.controller('UserListCtrl', function ($scope, UsersService, PostsService) {
  $scope.users = UsersService.query()

  //PostsService.getPosts().then(function (response) {
  $scope.posts = PostsService.query() // response.data
  //})
})
