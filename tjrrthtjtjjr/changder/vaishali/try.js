var app = angular.module("myApp", ["ngRoute" ,'ui.bootstrap']);
app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl : "content.html"
        })

        .when("/blue", {
            templateUrl : "blue.html"
        });
});

app.controller('myCtrl', function($scope, $route, $location) {
    $scope.$on('$routeChangeSuccess', function() {
        var path = $location.path();
        console.log(path);
        $scope.mainVisible = false;
        $scope.changedVisible = false;
        if(path === '/') {
            $scope.mainVisible = true;
        } else if(path === '/blue') {
            $scope.changedVisible = true;
        }
    });
});

app.controller('CarouselDemoCtrl',function ($scope){
    $scope.myInterval = 3000;
    $scope.slides = [
        {
            image: 'http://lorempixel.com/400/200/'
        },
        {
            image: 'http://lorempixel.com/400/200/food'
        },
        {
            image: 'http://lorempixel.com/400/200/sports'
        },
        {
            image: 'http://lorempixel.com/400/200/people'
        }
    ];
});