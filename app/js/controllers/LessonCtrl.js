"use strict";

var LessonCtrl = function($scope, $routeParams, $http, $templateCache) {
    $scope.lessonId = $routeParams.lessonId;  
    $http.get("/views/content/" + $routeParams.lessonId + "/lesson.json")
    	.success(function(data, status, headers, config) {
    		console.log(data, status, headers, config);
    	})
    	.error(function(data, status, headers, config) {
    		console.log(data, status, headers, config);
    	})
};

module.exports = LessonCtrl;
