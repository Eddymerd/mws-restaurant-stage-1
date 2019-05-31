var gulp = require('gulp');
var sass = require('gulp-sass');

function defaultTask(cb) {
  console.log("This is my first gulp task!")
  cb();
}

exports.default = defaultTask

gulp.task("styles", function() {
  gulp.src("sass/**/*.scss")
    .pipe(sass())
    .on("error", sass.logError)
    .pipe(gulp.dest("./css"));
});
