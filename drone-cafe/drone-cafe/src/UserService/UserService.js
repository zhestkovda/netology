angular
    .module('DroneCafe')
    .factory('UserService', function ($http) {

        let currentUser = {};

            return {

                getUser: function (userEmail) {
                    return $http.get('/users/' + userEmail);
                },

                createUser: function (userData) {
                    return $http({
                        method: 'POST',
                        url: '/users/',
                        data: userData
                    });
                },

                editUser: function (userData) {
                    return $http({
                        method: 'PUT',
                        url: '/users/',
                        data: userData
                    });
                },

                getCurrentUser: function () {
                    return currentUser;
                },

                setCurrentUser: function (value) {
                    currentUser = value;
                }

            }

        }
    );
