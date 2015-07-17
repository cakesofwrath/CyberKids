"use strict";

var angular = require("angular"),
    HomeCtrl = require("./controllers/HomeCtrl"),
    HeaderCtrl = require("./controllers/HeaderCtrl"),
    LearnCtrl = require("./controllers/LearnCtrl"),
    LessonCtrl = require("./controllers/LessonCtrl"),
    cascade = require("./directives/cascade"),
    carousel = require("./directives/carousel"),
    blocks = require("./directives/blocks"),
    scratchblocks = require("./directives/scratchblocks");

var app = angular.module("CyberKids", [require("angular-route"), require("angular-sanitize")]);

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
        .when("/more", {
            templateUrl: "/views/pages/more.html",
            pageTab: "more"
        })
        .when("/parents", {
            templateUrl: "/views/pages/parents.html",
            pageTab: "parents"
        })
        .when("/about", {
            templateUrl: "/views/pages/about.html"
        })
        .otherwise({
            //should 404 later
            redirectTo: "/views/pages/404.html" // can do this with others too
        });
        // https://scotch.io/tutorials/single-page-apps-with-angularjs-routing-and-templating
    $locationProvider.html5Mode(true); //gets rid of hash in url
});

app.controller("HomeCtrl", ["$scope", HomeCtrl])
    .controller("HeaderCtrl", ["$scope", "$route", HeaderCtrl])
    .controller("LearnCtrl", ["$scope", "$http", LearnCtrl])
    .controller("LessonCtrl", ["$scope", "$routeParams", "$http", "$templateCache", "$sce", LessonCtrl]);

app.directive("cascade", [cascade])
    .directive("carousel", [carousel])
    .directive("blocks", [blocks])
    .directive("scratchblocks", [scratchblocks]);
