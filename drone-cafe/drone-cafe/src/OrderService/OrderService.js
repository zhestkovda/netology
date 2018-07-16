angular
    .module('DroneCafe')
    .factory('OrderService', function ($http) {

            return {

                getOrders: function (userEmail) {
                    return $http.get('/orders/' + userEmail);
                },

                getAllOrders: function () {
                    return $http.get('/orders/');
                },

                createOrder: function (orderData) {
                    return $http({
                        method: 'POST',
                        url: '/orders/',
                        data: orderData
                    });
                },

                editOrder: function (orderData) {
                    return $http({
                        method: 'PUT',
                        url: '/orders/' + orderData._id,
                        data: orderData
                    });
                },


            }

        }
    );
