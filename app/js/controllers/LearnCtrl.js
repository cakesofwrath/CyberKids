"use strict";

var LearnCtrl = function($scope, $http) {
    $http.get("/views/content/lessons.json")
    	.then(function(res) {
    		if(res.status) { // temporary hack until I put in 404 handling
                $scope.lessons = res.data.data;
            }
            else {
                $scope.lessons = null;
            }
    		// $scope.data = res.data;
    	});
};

module.exports = LearnCtrl;
