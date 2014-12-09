/**
 * Created by storskel on 28.07.2014.
 */
// include gulp
var gulp = require('gulp');

// include plug-ins
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var gutil = require('gulp-util');
var browserify = require('gulp-browserify');

var paths = {
    scripts: ['./js/states/boot.js','./js/**/*.js','./js/main.js']
};

// JS concat, strip debugging code and minify
gulp.task('bundle-scripts', function() {
    var jsPath = {jsSrc:paths.scripts, jsDest:'./dist'};
    gulp.src(jsPath.jsSrc)
        .pipe(concat('game.js'))
        .pipe(gulp.dest(jsPath.jsDest))
        .pipe(stripDebug())
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(jsPath.jsDest))
        .on('error', gutil.log);
});

gulp.task('default', ['bundle-scripts'], function () {
    gulp.watch(paths.scripts, ['bundle-scripts']);
});