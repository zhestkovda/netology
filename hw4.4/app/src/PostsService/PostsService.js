angular
  .module('UserApp')
  .factory('PostsService', function ($resource, $http) {
    return $resource('https://jsonplaceholder.typicode.com/posts')

    // return {
    //   getPosts: function () {
    //     return $http.get('https://jsonplaceholder.typicode.com/posts')
    //   }
    // }

  }
)
