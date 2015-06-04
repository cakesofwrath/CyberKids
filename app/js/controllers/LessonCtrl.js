"use strict";

var LessonCtrl = function($scope, $routeParams, $http, $templateCache) {
    $scope.lessonId = $routeParams.lessonId;  
};

module.exports = LessonCtrl;
