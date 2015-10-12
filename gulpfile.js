var gulp = require('gulp');
var requireDir = require('require-dir');
requireDir('./gulp/');

// Watch for changes with assets
gulp.task("watch", ['assets'], function() {
  gulp.watch(["./components/**/*.coffee", "./apps/**/*.coffee"], ["scripts"]);
  gulp.watch(["./apps/**/*.styl", "./components/**/*.styl"], ["styles"]);
  gulp.watch(["./apps/**/*.jade"], ["templates"]);
});

// Compile assets
gulp.task("assets", ["scripts", "vendor-scripts", "styles", "images", "templates"]);

// Gulp deploy
gulp.task("deploy", ["publish-html", "publish-scripts", "publish-styles", "publish-images"]);
