var app = angular.module('myApp', []);
app.controller('customerCtrl', function ($scope, $http) {
    $http.get("https://api.myjson.com/bins/19ynm").then(function (json) {
        $scope.productsInCart = json.data.productsInCart;
  /*  $http({
        method: 'GET',
        url: 'http://jsonp.afeld.me/?url=https://api.myjson.com/bins/19ynm'
    }).then(function successCallback(response) {
        console.log("heyyyyyyyyyyyy", response.data)
        $scope.productsInCart = response.data.productsInCart;*/
        console.log("tttttttt1ttttt", response.data.productsInCart)

        var total_val = 0;
        $scope.productsInCart.forEach(function (id) {
            var data = id.p_price * id.p_quantity;

            total_val = total_val + data;
        });
        $scope.total_val = total_val;
        console.log('-------------------',total_val)
        if(total_val>=50)
        {
            var discount = tatal_val /  5;
        }
        $scope.discount = discount;
    }, function errorCallback(response) {
        console.log("rksgjahkhgwe", response)
    });

    $scope.abc = function (id) {
        $scope.productsInCart.forEach(function (product) {
            if (product.p_id == id) {
                $scope.modal_data = product;
            }
        })
    }

});

