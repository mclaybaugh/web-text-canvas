var gulp = require('gulp');
var sass = require('gulp-sass');
var csso = require('gulp-csso');
var uglify = require('gulp-uglify');
var del = require('del');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var streamify = require('gulp-streamify');
var tsify = require('tsify');

gulp.task('clean', function () {
    return del(['dist']);
});

gulp.task('styles', function () {
    return gulp.src('src/style.scss')
        .pipe(sass())
        .pipe(csso())
        .pipe(gulp.dest('dist'));
});

gulp.task('scripts', function () {
    return browserify({
        entries: ['./src/main.ts', './src/map.ts', './src/manager.ts']
    })
        .plugin(tsify)
        .transform(babelify.configure({
            presets : ['@babel/preset-env']
        }))
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('scripts_uglify', function() {
    return browserify({
        entries: ['./src/main.ts', './src/map.ts', './src/manager.ts']
    })
        .plugin(tsify)
        .transform(babelify.configure({
            presets : ['@babel/preset-env']
        }))
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(streamify(uglify()))
        .pipe(gulp.dest('dist'));
});

gulp.task('html', function () {
    return gulp.src('src/index.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['styles', 'scripts', 'html'], function () {});

gulp.task('build', ['styles', 'scripts_uglify', 'html'], function () {});