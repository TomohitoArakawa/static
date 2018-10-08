'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const minify = require('gulp-clean-css');
const cssLint = require('gulp-csslint');
const rename = require('gulp-rename');
const sourcemap = require('gulp-sourcemaps');
const cssSprite = require('gulp.spritesmith');
const browserSync = require('browser-sync');
const runSequence = require('run-sequence');

gulp.task('browserSync', () => {
  browserSync({
    server: {
      baseDir: './',
      index: '_index.html'
    }
  });
});

gulp.task('reload', () => {
  browserSync.reload();
});

gulp.task('watch', () => {
  gulp.watch('./scss/**/*.scss', () => {
    runSequence('sass' , 'reload');
  });
  gulp.watch('./js/**/*.js', () => {
    runSequence('reload');
  });
});

gulp.task('sass', () => {
  gulp.src('./scss/style.scss')
  .pipe(sass())
  .pipe(autoprefixer({
    browsers: ['last 2 version', 'iOS >= 8.1' , 'Android >= 4.4'],
    cascade: false
  }))
  .pipe(minify())
  .pipe(rename({
    extname: '.min.css'
  }))
  .pipe(gulp.dest('./'))
});

gulp.task('default', ['browserSync' , 'watch' , 'sass'], () => {

});

gulp.task('test', ['cssLint'], () => {

});

gulp.task('build', ['cssSprite'], () => {

});
