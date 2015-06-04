"use strict";

var angular = require("angular"),
    HomeCtrl = require("./controllers/HomeCtrl"),
    LearnCtrl = require("./controllers/LearnCtrl"),
    LessonCtrl = require("./controllers/LessonCtrl");

var app = angular.module("ScratchCourse", [require("angular-route")]);

app.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "../views/pages/home.html",
            controller: "HomeCtrl"
        })
        .when("/learn", {
            templateUrl: "../views/pages/learn.html",
            controller: "LearnCtrl"
        })
        .when("/learn/:lessonId", {
            templateUrl: "../views/pages/lesson.html",
            controller: "LessonCtrl"
        })
        .otherwise({
            //should 404 later
            redirectTo: "/" // can do this with others too
        });
        // https://scotch.io/tutorials/single-page-apps-with-angularjs-routing-and-templating
    $locationProvider.html5Mode(true); //gets rid of hash in url
});

app.controller("HomeCtrl", ["$scope", HomeCtrl])
    .controller("LearnCtrl", ["$scope", LearnCtrl])
    .controller("LessonCtrl", ["$scope", "$routeParams", "$http", "$templateCache", LessonCtrl]);
//https://docs.angularjs.org/api/ngRoute/service/$route#example
// app.controller("HomeCtrl", ["$scope", HomeCtrl]);
