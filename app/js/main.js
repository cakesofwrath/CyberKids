"use strict";

var angular = require("angular"),
    HomeCtrl = require("./controllers/HomeCtrl"),
    HeaderCtrl = require("./controllers/HeaderCtrl"),
    LearnCtrl = require("./controllers/LearnCtrl"),
    LessonCtrl = require("./controllers/LessonCtrl");

var app = angular.module("ScratchCourse", [require("angular-route"), require("angular-sanitize")]);

app.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "/views/pages/home.html",
            controller: "HomeCtrl",
            pageTab: "home"
        })
        .when("/learn", {
            templateUrl: "/views/pages/learn.html",
            controller: "LearnCtrl",
            pageTab: "learn"
        })
        .when("/learn/:lessonId", {
            templateUrl: "/views/pages/lesson.html",
            controller: "LessonCtrl",
            pageTab: "learn"
        })
        .otherwise({
            //should 404 later
            redirectTo: "/" // can do this with others too
        });
        // https://scotch.io/tutorials/single-page-apps-with-angularjs-routing-and-templating
    $locationProvider.html5Mode(true); //gets rid of hash in url
});

app.controller("HomeCtrl", ["$scope", HomeCtrl])
    .controller("HeaderCtrl", ["$scope", "$route", HeaderCtrl])
    .controller("LearnCtrl", ["$scope", "$http", LearnCtrl])
    .controller("LessonCtrl", ["$scope", "$routeParams", "$http", "$templateCache", LessonCtrl]);
//https://docs.angularjs.org/api/ngRoute/service/$route#example
// app.controller("HomeCtrl", ["$scope", HomeCtrl]);
