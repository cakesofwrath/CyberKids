"use strict";

var angular = require("angular"),
    HomeCtrl = require("./controllers/HomeCtrl");

var app = angular.module("ScratchCourse", []);

app.controller("HomeCtrl", ["$scope", HomeCtrl]);
