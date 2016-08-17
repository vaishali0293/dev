/**
 * Created by loopmethods2 on 7/19/16.
 */
var app = angular.module('plunker', ['ngRoute']);

app.controller('MainCtrl', function($scope) {

    $scope.dateFields = {
        year: 'YYYY',
        month: 'MM'
    };

    $scope.checkDate = function() {
        $scope.dateFields.fullDate = $scope.dateFields.year + '/' + $scope.dateFields.month;
    };

    $scope.checkDate();

    var filex={
        "records":[{"Name": "Vaishali", "Date": "2014/02/02"}, {
            "Name": "Alfreds Futterkiste",
            "Date": "2016/04/01"
        }, {"Name": "Alfreds", "Date": "2013/06/01"}]
    }
    $scope.item=filex.records;
});
