var gulp = require('gulp');
var handlebars = require('gulp-handlebars');
var wrap = require('gulp-wrap');
var declare = require('gulp-declare');
var concat = require('gulp-concat');

var paths = {
    handlebars: {
        src: 'source/templates/*.hbs',
        dest: 'assets/templates'
    }
};

function compile() {
    return gulp.src(paths.handlebars.src)
        .pipe(handlebars())
        .pipe(wrap('Handlebars.template(<%= contents %>)'))
        .pipe(declare({
            namespace: 'ShiftTracker.templates',
            noRedeclare: true, // Avoid duplicate declarations
        }))
        .pipe(concat('templates.js'))
        .pipe(gulp.dest(paths.handlebars.dest));
}

function watch() {
    gulp.watch(paths.handlebars.src, compile);
}

gulp.task('compile', compile);

gulp.task('default', gulp.series(compile, watch));