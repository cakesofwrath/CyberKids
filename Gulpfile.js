var gulp = require("gulp"),
    gutil = require("gulp-util"),
    jshint = require("gulp-jshint"),
    browserify = require("gulp-browserify"),
    concat = require("gulp-concat"),
    clean = require("gulp-clean");

//server stuff
var embedlr = require("gulp-embedlr"),
    refresh = require("gulp-livereload"),
    lrserver = require("tiny-lr")(),
    express = require("express"),
    livereload = require("connect-livereload"),
    livereloadport = 35729,
    serverport = 5000;

// custom
var cc = require("./utils/contentCompiler");

//set up express server
var server = express();
//live reload
server.use(livereload({port: livereloadport}));
//use dist as rootfolder
server.use(express.static("./dist"));
//html5 pushstate? redirect back to index.html
/*
    Further routing later.
*/
server.all("/*", function(req, res) {
    res.sendFile("index.html", { root: "dist" });
});

//dev task to start server
gulp.task("dev", function() {
	console.log("Running server on port: " + serverport);
    //start webserver
    server.listen(serverport);
    //live reload
    lrserver.listen(livereloadport);
    //run watch, keeps up with changes
    gulp.run("watch");
});

//My JSHint task
gulp.task("lint", function() {
    gulp.src("./app/js/*.js")
        .pipe(jshint())
        .pipe(jshint.reporter("default"));
});

//Browserify task
gulp.task("browserify", function() {
    //single pt of entry
    gulp.src(["./app/js/main.js"])
        .pipe(browserify({
            insertGlobals: true,
            debug: true
        }))
        .pipe(concat("bundle.js")) //bundles to single file
        .pipe(gulp.dest("dist/js/")); //output to dist folder
});

//static views
gulp.task("views", function() {
    //get index
    gulp.src("./app/index.html")
        .pipe(gulp.dest("dist/")); //put it in dist/ folder

    gulp.src("./app/views/content/**/img/*")
        .pipe(gulp.dest("dist/views/content")); // move our images

    //other views from app/views
    gulp.src("./app/views/{pages, partials}*")
        .pipe(gulp.dest("dist/views")) //put "em in dist/views
        .pipe(refresh(lrserver)); //tells lrserver to refresh
});

gulp.task("styles", function() {
    gulp.src("./app/styles/**/*.css")
        .pipe(gulp.dest("dist/css/"))
        .pipe(refresh(lrserver));

});

gulp.task("content", function() {
    gulp.src("./app/views/content/**/*.json")
        .pipe(cc())
        .pipe(gulp.dest("dist/views/content"))
        .pipe(refresh(lrserver));
});

gulp.task("watch", ["lint", "browserify", "views", "styles", "content"], function() {
    //watch js
    gulp.watch(
        ["./app/js/*.js", "./app/js/**/*.js"], 
        ["lint", "browserify"]
    );
    gulp.watch(
        ["./app/index.html", "./app/views/pages/**/*.html", "./app/views/content/**/img/*"], //ignore content, even though the html filter kinda handles it...
        ["views"]
    );
    gulp.watch(
        ["./app/styles/**/*.css"],
        ["styles"]
    );
    gulp.watch(
        ["./app/views/content/**/*.json"],
        ["content"]
    );
});

