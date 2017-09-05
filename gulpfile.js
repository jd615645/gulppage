const gulp = require('gulp')
const pug = require('gulp-pug')
const del = require('del')
const runSequence = require('run-sequence')
const ghPages = require('gulp-gh-pages')
// gh-pages
gulp.task('deploy', function () {
  return gulp.src('build/**/*')
    .pipe(ghPages())
})
// pug
gulp.task('pug', function () {
  return gulp.src(['app/pug/*.pug'])
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('build/'))
})
// Cleaning
gulp.task('clean', function () {
  return del(['build/**/*'])
})
gulp.task('watch', function () {
  gulp.watch('app/pug/**/*.pug', ['pug'])
})
// Build Sequence
// -------------------
gulp.task('default', function () {
  runSequence('watch', ['pug'])
})
// 在執行 build 時，也依序執行 deploy
// 不過 deploy 要放在最後面
gulp.task('build', function () {
  runSequence('clean', ['pug'], 'deploy')
})
