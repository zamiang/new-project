var gulp = require("gulp");
var del = require("del");
var jeditor = require("gulp-json-editor");

gulp.task("clean-chrome", function(success) {
  del(['./dist/plugins/chrome-dev', './dist/plugins/chrome-prod'], success);
});

gulp.task("chrome-json", function() {
  // Dev
  gulp.src("./manifest.json")
    .pipe(jeditor({
      name: 'Plink - DEV',
      key: "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxfXcwYcALA+HsyOgne3gRQtkHtOgvUMSZaCoTHwtGImF7fDDoEBMfytImo9BCjaj3Sp61sstzdWOex/PvGgyTNvmBwRYNhrQRqxxgWqpA3XYtVzGiilh+LpH6326X61oJdLvn4jC5MHyTZ4hGujEzsuvOSBo8COhD+vkS5xhyDVVXn+ycCqvrr+c2j6faEGpHVcTS5mI8ODB4+arssChHqYSBMDESAzFBUM1QsN/dyB01qdD+RfUYsatAWstKrOx90/3dy+6IptXCGYCPo6v86UopcPFzoUwGz1Fu/Veac0NvjKgmWEOstaZ+FoNWTClzoBWesUJ0eSDFGgmnuTx8QIDAQAB",
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
  gulp.src(['./dist/chrome/*.html'])
    .pipe(gulp.dest('./dist/plugins/chrome-dev'))
    .pipe(gulp.dest('./dist/plugins/chrome-prod'));
});

gulp.task("chrome-css", function() {
  gulp.src(['./dist/css/popup.css'])
    .pipe(gulp.dest('./dist/plugins/chrome-dev/css'))
    .pipe(gulp.dest('./dist/plugins/chrome-prod/css'));
});

gulp.task("chrome-js", function() {
  gulp.src(['./dist/js/*'])
    .pipe(gulp.dest('./dist/plugins/chrome-dev/js'))
    .pipe(gulp.dest('./dist/plugins/chrome-prod/js'));
});

gulp.task("chrome-img", function() {
  gulp.src(['./dist/img/plink-favicon.png'])
    .pipe(gulp.dest('./dist/plugins/chrome-dev/img'))
    .pipe(gulp.dest('./dist/plugins/chrome-prod/img'));
});
