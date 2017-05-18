'use strict';

const gulp = require('gulp');
const del = require('del');
const postcss = require('gulp-postcss');
const atImport = require('postcss-import');
const nested = require('postcss-nested');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const browserSync = require('browser-sync').create();
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
// const uglify = require('gulp-uglify');

gulp.task('clean', () => {
  return del('build/**/*');
});

gulp.task('styles', () => {
  const plugins = [
    nested(),
    atImport(),
    autoprefixer({browsers: ['last 3 version']}),
    cssnano()
  ];
  return gulp.src('assets/styles/*.css')
    .pipe(plumber({
      errorHandler: notify.onError(err => ({
        title: 'Styles',
        message: err.message
      }))
    }))
    .pipe(postcss(plugins))
    .pipe(gulp.dest('build'));
});

gulp.task('html', () => {
  return gulp.src('assets/html/*.html')
    .pipe(gulp.dest('build'));
});

gulp.task('js', () => {
  return browserify(['assets/js/app.js'])
    .transform(babelify.configure({
      presets: ["env"]
    }))
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('build'))
    .pipe(buffer());
});

gulp.task('watch', () => {
  gulp.watch('assets/styles/**/*.css', gulp.series('styles'));
  gulp.watch('assets/js/**/*.js', gulp.series('js'));
  gulp.watch('assets/html/**/*.html', gulp.series('html'));
});

gulp.task('serve', () => {
  browserSync.init({
    ui: {
      port: process.env.UIPORT || 3031
    },
    port: process.env.PORT || 3030,
    server: {
      baseDir: 'build',
      routes: {
        "/node_modules": "node_modules"
      }
    }
  });
  browserSync.watch('build/**/*.*').on('change', browserSync.reload);
});

gulp.task('default', gulp.series('clean', gulp.parallel('html', 'styles', 'js')));

gulp.task('dev', gulp.series('default', gulp.parallel('watch', 'serve')));