'use strict';

var path = require('path'),
	gulp = require('gulp'),
	conf = require('./conf'),
	browserSync = require('browser-sync'),
	browserSyncSpa = require('browser-sync-spa'),
	util = require('util');

function browserSyncInit(baseDir, browser) {

    browser = browser === undefined ? 'default' : browser;

    var routes = null,
		server = null;

    if (baseDir === conf.paths.src || (util.isArray(baseDir) && baseDir.indexOf(conf.paths.src) !== -1)) {

		routes = {
            '/bower_components': 'bower_components'
        };
    }

    server = {
        baseDir: baseDir,
        routes : routes
    };

    browserSync.instance = browserSync.init({
        startPath: '/',
        server   : server,
        browser  : browser
    });
}

// Only needed for angular apps.
browserSync.use(browserSyncSpa({
    selector: '[ng-app]'
}));

gulp.task('serve', ['watch'], function () {
    browserSyncInit([path.join(conf.paths.tmp, '/serve'), conf.paths.src]);
});

gulp.task('serve:dist', ['build'], function () {
    browserSyncInit(conf.paths.dist);
});
