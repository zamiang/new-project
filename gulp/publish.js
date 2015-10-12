var gulp = require("gulp");
var s3 = require('gulp-s3');
var gzip = require('gulp-gzip');
var config = require('./config.js');

// TODO: Combine publish tasks
gulp.task("publish-html", ['assets'], function(cb) {
  var options = {
    headers: {
      "Cache-Control": config.defaultCacheControl,
      'charset': 'utf-8',
      'Content-Type': 'text/html'
    }};

  gulp.src(config.dest + "/**/*.html")
    .pipe(s3(config.aws, options))
    .on('end', cb);
});

gulp.task("publish-images", ['assets'], function(cb) {
  var options = {
    headers: {
      "Cache-Control": config.defaultCacheControl
    }};

  gulp.src([(config.dest + "/**/*.png"), (config.dest + "/**/*.jpg")])
    .pipe(s3(config.aws, options))
    .on('end', cb);
});

gulp.task("publish-scripts", ['assets'], function(cb) {
  var options = {
    headers: {
      "Cache-Control": config.defaultCacheControl,
      'Content-Encoding': 'gzip',
      'Content-Type': 'application/javascript',
      'charset': 'utf-8'
    }};

  gulp.src(config.dest + "/**/*.js")
    .pipe(gzip({ append: false }))
    .pipe(s3(config.aws, options))
    .on('end', cb);
});

gulp.task("publish-styles", ['assets'], function(cb) {
  var options = {
    headers: {
      "Cache-Control": config.defaultCacheControl,
      'Content-Encoding': 'gzip',
      'Content-Type': 'text/css',
      'charset': 'utf-8'
    }};

  gulp.src(config.dest + "/**/*.css")
    .pipe(gzip({ append: false }))
    .pipe(s3(config.aws, options))
    .on('end', cb);
});
