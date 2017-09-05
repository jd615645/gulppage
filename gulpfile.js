const gulp = require('gulp')
const del = require('del')
const runSequence = require('run-sequence')
const ghPages = require('gulp-gh-pages')
const $ = require('gulp-load-plugins')()

const paths = {
  src: {
    less: './src/style/less/*.less',
    css: './src/style/css/*.css',
    js: './src/js/*.js',
    lib: './src/js/lib/*.js',
    pug: './src/pug/*.pug',
    data: './src/data/**',
    images: './src/img/**'
  },
  dist: {
    html: './dist',
    css: './dist/style',
    js: './dist/js',
    lib: './dist/js/lib/',
    data: './dist/data',
    images: './dist/img'
  }
}

// gh-pages
gulp.task('deploy', () => {
  gulp.src('dist/**/*')
    .pipe(ghPages())
})
// pug
gulp.task('pug', () => {
  gulp.src(paths.src.pug)
    .pipe($.pug({
      pretty: true
    }))
    .pipe(gulp.dest('dist/'))
})
gulp.task('css', () => {
  gulp.src(paths.src.css)
    .pipe(gulp.dest(paths.dist.css))
})
gulp.task('less', () => {
  gulp.src(paths.src.less)
    .pipe($.less())
    .pipe(gulp.dest(paths.dist.css))
})
// Cleaning
gulp.task('clean', () => {
  del(['build/**/*'])
})
gulp.task('watch', () => {
  gulp.watch(paths.src.pug, ['pug'])
  gulp.watch(paths.src.less, ['less'])
  gulp.watch(paths.src.js, ['scripts'])
})
// Build Sequence
// -------------------
gulp.task('default', () => {
  runSequence('watch', ['pug'])
  runSequence('watch', ['css'])
  runSequence('watch', ['less'])
})
// 在執行 build 時，也依序執行 deploy
// 不過 deploy 要放在最後面
gulp.task('build', () => {
  runSequence('clean', ['pug', 'css', 'less'], 'deploy')
})
