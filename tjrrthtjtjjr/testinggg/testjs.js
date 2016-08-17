/**
 * Created by loopmethods2 on 7/15/16.
 */
var app = angular.module('myapp', []);
app.controller('myctrl', function($scope,$http) {
    $http.get("test.json").then(function(response) {
        $scope.item = response.data.productsInCart;

        $scope.item.push({
            "p_id": "5",
            "p_name": "hgfhgjgj tshirt",
            "p_variation": "solid green",
            "p_style": "ms13kt1906",
            "p_selected_color": {"name": "blue", "hexcode": "#1169BD"},
            "p_selected_size": {"name": "small", "code": "s"},
            "p_available_options": {
                "colors": [{"name": "green", "hexcode": "#A3D2A1"}, {
                    "name": "yellow",
                    "hexcode": "#F9F8E6"
                }, {"name": "red", "hexcode": "#ED99A8"}],
                "sizes": [{"name": "small", "code": "s"}, {"name": "medium", "code": "m"}, {
                    "name": "large",
                    "code": "l"
                }, {"name": "extra large", "code": "xl"}]
            },
            "p_quantity": 5,
            "p_originalprice": 11.0,
            "p_price": 11.0,
            "c_currency": "$"
        });
        $scope.product=$scope.item;
       
    });
});