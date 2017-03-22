'use strict';

var path = require('path'),
    gulp = require('gulp'),
    conf = require('./conf'),
    $ = require('gulp-load-plugins')(),
    wiredep = require('wiredep').stream,
    _ = require('lodash'),
    browserSync = require('browser-sync');

gulp.task('inject-reload', ['inject'], function () {
    browserSync.reload();
});

gulp.task('inject', ['scripts', 'styles'], function () {
    var injectStyles = gulp.src([
            path.join(conf.paths.tmp, '/serve/app/**/*.css')
        ], {read: false}),
        injectScripts = gulp.src([
            path.join(conf.paths.src, '/lib/**/*.js'),
            path.join(conf.paths.src, '/app/**/*.js')
        ])
        .pipe($.angularFilesort()).on('error', conf.errorHandler('AngularFilesort')),
        injectOptions = {
            ignorePath  : [conf.paths.src, path.join(conf.paths.tmp, '/serve')],
            addRootSlash: false
        };

    return gulp.src(path.join(conf.paths.src, '/*.html'))
        .pipe($.inject(injectStyles, injectOptions))
        .pipe($.inject(injectScripts, injectOptions))
        .pipe(wiredep(_.extend({}, conf.wiredep)))
        .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve')));
});
