var gulp = require('gulp');
var sass = require('gulp-sass');
var csso = require('gulp-csso');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var del = require('del');

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
        .pipe(gulp.dest('dist/css'));
});

gulp.task('js', function () {
    return gulp.src('src/main.js')
        .pipe(babel())
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('html', function () {
    return gulp.src('src/index.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['css', 'js', 'html'], function () {});

gulp.task('watch', function () {
    gulp.watch('src/index.html', ['html']);
    gulp.watch('src/style.scss', ['css']);
    gulp.watch('src/main.js',['js']);
});