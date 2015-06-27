"use strict";

var LessonCtrl = function($scope, $routeParams, $http, $templateCache, $sce) {
    $scope.lessonId = $routeParams.lessonId;  
    // Go get the compiled html page from content (the html is compiled from json by my grunt task)
    $http.get("/views/content/" + $routeParams.lessonId + "/lesson.json")
    	.then(function(res) {
            // console.log(res);
    		if(res.status) { // temporary hack until I put in 404 handling
                $scope.data = res.data;
                // $scope.data.content = res.data.content.map(function(s) {
                //     return $sce.trustAsHtml(row);
                // });
                for(var k in res.data.content) {
                    $scope.data.content[k] = $sce.trustAsHtml(res.data.content[k]);
                }
                $http.get("/views/content/lessons.json")
                    .then(function(res) {
                        if(res.status) { // temporary hack until I put in 404 handling
                            // $scope.lessons = res.data.data;
                            // console.log($scope.lessons);
                            $scope.next = res.data.data[parseInt($routeParams.lessonId) + 1] || null;
                            $scope.prev = res.data.data[parseInt($routeParams.lessonId) - 1] || null;
                            // console.log($scope.prev, $scope.next);
                            // console.log(res.data.data);
                        }
                        else {
                            // $scope.lessons = null;
                            $scope.next = null;
                            $scope.prev = null;
                        }
                        // $scope.data = res.data;
                    });
                // console.log($scope.data);
            }
            else {
                $scope.data = null;
            }
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
