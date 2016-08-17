
var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'html/home.html',
            controller: 'homeCtrl'
        })
        .when('/contact', {
            templateUrl: 'html/contact.html',
            controller: 'mainCtrl'
        })
        .otherwise({
            redirectTo: '/'
        })
    //$locationProvider.html5Mode(true);

});

/*myApp.factory("getProducts", function ($http, $q) {
    return {
        getProducts: function(url){
            var def = $q.defer()
            var url = url? url : 'https://api.myjson.com/bins/19ynm';
            $http.jsonp("http://jsonp.afeld.me/?url=https://api.myjson.com/bins/19ynm").then(function (data) {
                console.log(">data is>>>ppp", data);
                def.resolve(data)
            });
            return def.promise;
        },
    }

});*/


myApp.controller('homeCtrl', function ($scope, $rootScope, $http) {

    $http.get("https://api.myjson.com/bins/19ynm").then(function (json) {
        $scope.products = json.data.productsInCart;
    });


    /*var data = {
        "productsInCart": [{
            "p_id": "1",
            "p_name": "cotton tshirt",
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
            "p_quantity": 1,
            "p_originalprice": 11.0,
            "p_price": 11.0,
            "c_currency": "$"
        },
            {
            "p_id": "2",
            "p_name": "print girls tee",
            "p_variation": "pink rainbow",
            "p_style": "ms13kt1906",
            "p_selected_color": {"name": "pink", "hexcode": "#F1DDEF"},
            "p_selected_size": {"name": "small", "code": "s"},
            "p_available_options": {
                "colors": [{"name": "green", "hexcode": "#A3D2A1"}, {
                    "name": "yellow",
                    "hexcode": "#F9F8E6"
                }, {"name": "pink", "hexcode": "#F1DDEF"}],
                "sizes": [{"name": "small", "code": "s"}, {"name": "medium", "code": "m"}, {
                    "name": "large",
                    "code": "l"
                }, {"name": "extra large", "code": "xl"}]
            },
            "p_quantity": 1,
            "p_originalprice": 17.0,
            "p_price": 17.0,
            "c_currency": "$"
        },
            {
            "p_id": "3",
            "p_name": "flower pattern shirt",
            "p_variation": "blue",
            "p_style": "ms13kt1906",
            "p_selected_color": {"name": "blue", "hexcode": "#1169BD"},
            "p_selected_size": {"name": "small", "code": "s"},
            "p_available_options": {
                "colors": [{"name": "green", "hexcode": "#A3D2A1"}, {
                    "name": "blue",
                    "hexcode": "#1169BD"
                }, {"name": "red", "hexcode": "#ED99A8"}],
                "sizes": [{"name": "small", "code": "s"}, {"name": "medium", "code": "m"}, {
                    "name": "large",
                    "code": "l"
                }, {"name": "extra large", "code": "xl"}]
            },
            "p_quantity": 1,
            "p_originalprice": 21.0,
            "p_price": 9.0,
            "c_currency": "$"
        },
            {
            "p_id": "4",
            "p_name": "check pattern tshirt",
            "p_variation": "mens red",
            "p_style": "ms13kt1906",
            "p_selected_color": {"name": "red", "hexcode": ""},
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
            "p_quantity": 1,
            "p_originalprice": 22.0,
            "p_price": 22.0,
            "c_currency": "$"
        }]
    };
    $scope.products=data.productsInCart;*/

   /* getProducts.then(function (data) {
        console.log(">>>>>>..in controler", data)


    })
*/


});
myApp.directive("sapModal",function($compile){
    return {
        restrict : "A",
        template :'',
        controller: function($scope) {
            var template = '<div class="modal fade bs-example-modal-lg" id="productModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">'+
                '<div class="modal-dialog">'+
                '<div class="modal-content">'+
                '<div class="modal-header">'+
                ' <button type="button" class = "close" data-dismiss="modal" aria-hidden="true" ng-click="cancel()" > Cancel </button>'+
            '</div>'+
            '<div class="modal-body" >{{product}}</div></div></div></div>'+
            '</div>';
            template = angular.element(template);
            $('body').append(template)
            $compile(template)($scope);
            $scope.showProduct = false;
            $scope.showProductModal = function(product){
                $scope.showProduct = true;
                $scope.product = product;

            }
            $scope.$watch("showProduct",function(){

                if ($scope.showProduct) {

                    $("#productModal").modal("show");
                };
            })
            $scope.close = function(){
                $scope.showProduct = false;
                $("#productModal").modal("hide");
            }
        }
    }
});
