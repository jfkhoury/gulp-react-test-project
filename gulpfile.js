"use strict";

var gulp = require("gulp");
var open = require("gulp-open");
var source = require("vinyl-source-stream");
var livereload = require('gulp-livereload');
var browserify = require("browserify");
var watchify = require("watchify");
var to5ify = require("6to5ify");

gulp.task("default", function () {
    console.log("First gulp app!");
    var b = browserify({ debug: true, fullPaths: true }).add("./main.js");

    var bundler = watchify(b);

    function rebundle() {
        return bundler.bundle()
            .pipe(source("bundle.js"))
            .pipe(gulp.dest("./public/js")).pipe(livereload());
    }

    bundler
        .transform(to5ify)
        .on("update", rebundle);

    livereload.listen(35729);

    gulp.src('./index.html')
        .pipe(open());

    return rebundle();
});
