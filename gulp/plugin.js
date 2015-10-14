var gulp = require("gulp");
var del = require("del");

gulp.task("clean-chrome", function() {
  del(['./plugins']);
});

gulp.task("chrome-json", function() {
  // Dev
  gulp.src("./manifest.json")
    .pipe(jeditor({
      'version': '1.2.3'
    }))
    .pipe(gulp.dest("./dest"));

  // Prod
  gulp.src("./manifest.json")
    .pipe(jeditor({
      'version': '1.2.3'
    }))
    .pipe(gulp.dest("./dest"));
});

gulp.task("chrome-templates", function() {
  gulp.src(['./dist/chrome/popup.html'])
    .pipe(gulp.dest('./plugins/chrome-dev/templates'))
    .pipe(gulp.dest('./plugins/chrome-prod/templates'));
});

gulp.task("chrome-css", function() {
  gulp.src(['./dist/css/popup.css'])
    .pipe(gulp.dest('./plugins/chrome-dev/css'))
    .pipe(gulp.dest('./plugins/chrome-prod/css'));
});

gulp.task("chrome-js", function() {
  gulp.src(['./dist/js/inboxsdk.js', './dist/js/loader.js', './dist/js/popup.js', './dist/js/chrome.js'])
    .pipe(gulp.dest('./plugins/chrome-dev/js'))
    .pipe(gulp.dest('./plugins/chrome-prod/js'));
});

gulp.task("chrome-img", function() {
  gulp.src(['./dist/img/plink-favicon.png'])
    .pipe(gulp.dest('./plugins/chrome-dev/img'))
    .pipe(gulp.dest('./plugins/chrome-prod/img'));
});
