var gulp = require('gulp');
var sass = require('gulp-sass');
var csso = require('gulp-csso');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var del = require('del');

var paths = {
    css: {
        src: 'src/style.scss',
        dest: 'dist/css'
    },
    js: {
        src: 'src/main.js',
        dest: 'dist/js'
    },
    html: {
        src: 'src/index.html',
        dest: 'dist'
    }
};

gulp.task('clean', function () {
    return del(['dist']);
});

gulp.task('css', function () {
    return gulp.src(paths.css.src)
        .pipe(sass())
        .pipe(csso())
        .pipe(gulp.dest(paths.css.dest));
});

gulp.task('js', function () {
    return gulp.src(paths.js.src)
        .pipe(babel())
        .pipe(uglify())
        .pipe(gulp.dest(paths.js.dest));
});

gulp.task('html', function () {
    return gulp.src(paths.html.src)
        .pipe(gulp.dest(paths.html.dest));
});

gulp.task('default', ['css', 'js', 'html'], function () {});