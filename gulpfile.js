var gulp = require('gulp');
var $ = require('gulp-load-plugins')({lazy: true});
var jsLint = require('gulp-jslint');

gulp.task('webpush', function() {
    return gulp
        .src(['./webpush.js'])
        .pipe($.concat('webpush.min.js', {newLine: ';'}))
        .pipe($.uglify())
        .pipe(gulp.dest('./dest/'));
});

gulp.task('lint', function() {
    return gulp
        .src(['./lib.js'])
        .pipe(jsLint({
            node: true,
            evil: true,
            nomen: true,

            //vars: false,
            //for: false,

            // you can also set global
            // declarations for all source
            // files like so:
            global: [],
            predef: [],
            // both ways will achieve the
            // same result; predef will be
            // given priority because it is
            // promoted by JSLint

            errorsOnly: false
        }))
        .on('error', function (error) {
            console.error(String(error));
        });
});

gulp.task('default', ['webpush']);

gulp.task('watch', function() {
    gulp.watch(['./lib.js'], ['lint']);
});