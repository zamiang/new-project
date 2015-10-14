var gulp = require("gulp");
var del = require("del");
var jeditor = require("gulp-json-editor");

gulp.task("clean-chrome", function() {
  del(['./dist/plugins']);
});

gulp.task("chrome-json", function() {
  // Dev
  gulp.src("./manifest.json")
    .pipe(jeditor({
      name: 'Plink - DEV',
      content_scripts: [
        {
          "js": ["js/chrome.js"]
        }
      ]
    }))
    .pipe(gulp.dest("./dist/plugins/chrome-dev"));

  // Prod
  gulp.src("./manifest.json")
    .pipe(jeditor({
      content_scripts: [
        {
          "js": ["js/loader.js"]
        }
      ]
    }))
    .pipe(gulp.dest("./dist/plugins/chrome-prod"));
});

gulp.task("chrome-templates", function() {
  gulp.src(['./dist/chrome/popup.html'])
    .pipe(gulp.dest('./dist/plugins/chrome-dev/templates'))
    .pipe(gulp.dest('./dist/plugins/chrome-prod/templates'));
});

gulp.task("chrome-css", function() {
  gulp.src(['./dist/css/popup.css'])
    .pipe(gulp.dest('./dist/plugins/chrome-dev/css'))
    .pipe(gulp.dest('./dist/plugins/chrome-prod/css'));
});

gulp.task("chrome-js", function() {
  gulp.src(['./dist/js/inboxsdk.js', './dist/js/loader.js', './dist/js/popup.js', './dist/js/chrome.js'])
    .pipe(gulp.dest('./dist/plugins/chrome-dev/js'))
    .pipe(gulp.dest('./dist/plugins/chrome-prod/js'));
});

gulp.task("chrome-img", function() {
  gulp.src(['./dist/img/plink-favicon.png'])
    .pipe(gulp.dest('./dist/plugins/chrome-dev/img'))
    .pipe(gulp.dest('./dist/plugins/chrome-prod/img'));
});
