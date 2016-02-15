var gulp = require('gulp');
var $ = require('gulp-load-plugins')({lazy: true});

gulp.task('webpush', function() {
    return gulp
        .src(['./webpush.js'])
        .pipe($.concat('webpush.min.js', {newLine: ';'}))
        .pipe($.uglify())
        .pipe(gulp.dest('./dest/'));
});

gulp.task('default', ['webpush']);