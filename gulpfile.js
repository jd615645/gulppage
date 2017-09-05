const gulp = require('gulp')
const deploy = require('gulp-gh-pages')

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

/**
 * Push build to gh-pages
 */
gulp.task('deploy', () => {
  return gulp.src('./dist/**/*')
    .pipe(deploy())
})
