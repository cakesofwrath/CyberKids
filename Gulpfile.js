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

//set up express server
var server = express();
//live reload
server.use(livereload({port: livereloadport}));
//use dist as rootfolder
server.use(express.static("./dist"));
//html5 pushstate? redirect back to index.html
server.all("/*", function(req, res) {
    res.sendFile("index.html", { root: "dist" });
});

//dev task to start server
gulp.task("dev", function() {
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

//Views task
gulp.task("views", function() {
    //get index
    gulp.src("./app/index.html")
        .pipe(gulp.dest("dist/")); //put it in dist/ folder

    //other views from app/views
    gulp.src("./app/views/**/*")
        .pipe(gulp.dest("dist/views")) //put "em in dist/views
        .pipe(refresh(lrserver)); //tells lrserver to refresh
});

gulp.task("styles", function() {
    gulp.src("./app/styles/**/*.css")
        .pipe(gulp.dest("dist/css/"))
        .pipe(refresh(lrserver));

});

gulp.task("watch", ["lint", "browserify", "views", "styles"], function() {
    //watch js
    gulp.watch(
        ["./app/js/*.js", "./app/js/**/*/js"], 
        ["lint", "browserify"]
    );
    gulp.watch(
        ["./app/index.html", "./app/views/**/*.html"],
        ["views"]
    );
    gulp.watch(
        ["./app/styles/**/*.css"],
        ["styles"]
    );
});

