const gulp         = require('gulp');
const exec         = require('child_process').exec;
const {src, task}  = require('gulp');
const {series}     = require('gulp');
const sass         = require('gulp-sass')(require('sass'));

gulp.task('documentation', function (cb) {
  exec('node ./gen-documentation.js', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);  });
})

gulp.task('style', function () {
  return gulp.src('./src-docs/templates/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('./docs/css'));
});

const documentation = task('documentation');
const style         = task('style');

exports.default = series(documentation, style);
