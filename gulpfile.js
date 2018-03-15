var path = require('path');
var gulp = require('gulp');
var handlebars = require('gulp-handlebars');
var wrap = require('gulp-wrap');
var declare = require('gulp-declare');
var concat = require('gulp-concat');
var merge = require('merge-stream');

var paths = {
    handlebars: {
        src: 'source/templates/**/[^_]*.hbs',
        partialsrc: 'source/templates/**/_*.hbs',
        dest: 'assets/templates'
    }
};

function compile() {
    // return gulp.src(paths.handlebars.src)
    //     .pipe(handlebars())
    //     .pipe(wrap('Handlebars.template(<%= contents %>)'))
    //     .pipe(declare({
    //         namespace: 'ShiftTracker.templates',
    //         noRedeclare: true, // Avoid duplicate declarations
    //     }))
    //     .pipe(concat('templates.js'))
    //     .pipe(gulp.dest(paths.handlebars.dest));

    // Assume all partials start with an underscore
    // You could also put them in a folder such as source/templates/partials/*.hbs
    var partials = gulp.src([paths.handlebars.partialsrc])
        .pipe(handlebars())
        .pipe(wrap('Handlebars.registerPartial(<%= processPartialName(file.relative) %>, Handlebars.template(<%= contents %>));', {}, {
            imports: {
                processPartialName: function (fileName) {
                    // Strip the extension and the underscore
                    // Escape the output with JSON.stringify
                    return JSON.stringify(path.basename(fileName, '.js').substr(1));
                }
            }
        }));

    var templates = gulp.src(paths.handlebars.src)
        .pipe(handlebars())
        .pipe(wrap('Handlebars.template(<%= contents %>)'))
        .pipe(declare({
            namespace: 'ShiftTracker.templates',
            noRedeclare: true // Avoid duplicate declarations
        }));

    // Output both the partials and the templates as build/js/templates.js
    return merge(partials, templates)
        .pipe(concat('templates.js'))
        .pipe(gulp.dest(paths.handlebars.dest));
}

function watch() {
    gulp.watch(paths.handlebars.src, compile);
}

gulp.task('compile', compile);

gulp.task('default', gulp.series(compile, watch));