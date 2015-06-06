"use strict";

var LessonCtrl = function($scope, $routeParams, $http, $templateCache) {
    $scope.lessonId = $routeParams.lessonId;  
    // Go get the compiled html page from content (the html is compiled from json by my grunt task)
    $http.get("/views/content/" + $routeParams.lessonId + "/lesson.json")
    	.then(function(res) {
    		console.log(res);
    		// $scope.data = res.data;
    	});
    	/*.success(function(data, status, headers, config) {
    		console.log(data);
    	})
    	.error(function(data, status, headers, config) {
    		console.log("error");
    	});*/
};

module.exports = LessonCtrl;
