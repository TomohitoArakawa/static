'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const minify = require('gulp-clean-css');
const cssLint = require('gulp-csslint');
const rename = require('gulp-rename');
const sourcemap = require('gulp-sourcemaps');
const sprite = require('gulp.spritesmith');
const browserSync = require('browser-sync');
const runSequence = require('run-sequence');

gulp.task('browserSync', () => {
  browserSync({
    server: {
      baseDir: './',
      index: 'index.html'
  },
  open: 'external'
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
  // .pipe(minify())
  .pipe(rename({
    extname: '.min.css'
  }))
  .pipe(gulp.dest('./'))
});

gulp.task('sprite', () => {
    let spriteData = gulp.src('./img/sprite/*.png')
        .pipe(sprite({
            imgName: 'ico_service_sprite.png',                        // スプライト画像
            cssName: '_ico_service_sprite.scss',                      // 生成される CSS テンプレート
            imgPath: './img/ico_service_sprite.png', // 生成される CSS テンプレートに記載されるスプライト画像パス
            cssFormat: 'scss',                            // フォーマット拡張子
            cssVarMap: (sprite) => {
                sprite.name = "service-icon_" + sprite.name;      // 生成される CSS テンプレートに変数の一覧を記述
            }
    }));
    spriteData.img
        .pipe(gulp.dest('./img'));     // imgName で指定したスプライト画像の保存先
    return spriteData.css
        .pipe(gulp.dest('./scss'));       // cssName で指定した CSS テンプレートの保存先
});

gulp.task('default', ['browserSync' , 'watch' , 'sass'], () => {

});

gulp.task('test', ['cssLint'], () => {

});

gulp.task('build', ['sprite'], () => {

});
