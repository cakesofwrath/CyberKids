"use strict";

var gulp = require("gulp"),
    gutil = require("gulp-util"),
    jshint = require("gulp-jshint"),
    browserify = require("gulp-browerserify"),
    concat = require("gulp-concat"),
    clean = require("gulp-clean");

//My JSHint task
gulp.task("lint", function() {
    gulp.src("./app/scripts/*.js")
        .pipe(jshint())
        .pipe(jshint.reporter("default"));
});

//Browserify task
gulp.task("browserify", function() {
    //single pt of entry
    gulp.src(["app/scripts/main.js"])
        .pipe(browserify({
            insertGlobals: true,
            debug: true
        }))
        .pipe(concat("bundle.js")) //bundles to single file
        .pipe(gulp.dest("dist/js")); //output to dist folder
});

gulp.task("watch", ["lint"], function() {
    //watch scripts
    gulp.watch(
        ["app/scripts/*.js", "app/scripts/**/*/js"], 
        ["lint", "browerify"]
    );
});
