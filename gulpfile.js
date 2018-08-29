var gulp = require('gulp');
var sass = require('gulp-sass');
var csso = require('gulp-csso');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var del = require('del');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var streamify = require('gulp-streamify');
var tsify = require('tsify');

gulp.task('clean', function () {
    return del(['dist']);
});

gulp.task('css', function () {
    return gulp.src('src/style.scss')
        .pipe(sass())
        .pipe(csso())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('js', function () {
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
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('html', function () {
    return gulp.src('src/index.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['css', 'js', 'html'], function () {});

gulp.task('watch', function () {
    gulp.watch('src/index.html', ['html']);
    gulp.watch('src/style.scss', ['css']);
    gulp.watch('src/js/main.js',['js']);
});