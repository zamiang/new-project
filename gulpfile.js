var gulp = require('gulp');
var requireDir = require('require-dir');
requireDir('./gulp/');

// Watch for changes with assets
gulp.task("watch", ['assets'], function() {
  gulp.watch(["./components/**/*.coffee", "./apps/**/*.coffee"], ["scripts", "chrome-js"]);
  gulp.watch(["./apps/**/*.styl", "./components/**/*.styl"], ["styles", "chrome-css"]);
  gulp.watch(["./apps/**/*.jade"], ["templates", "chrome-templates"]);
});

// Compile assets
gulp.task("assets", ["scripts", "styles", "images", "templates", "vendor-scripts"]);

// Gulp deploy
gulp.task("deploy", ["publish-html", "publish-scripts", "publish-styles", "publish-images"]);

// Gulp chrome
gulp.task("chrome", ["clean-chrome", "chrome-json", "chrome-templates", "chrome-css", "chrome-js", "chrome-img"]);
