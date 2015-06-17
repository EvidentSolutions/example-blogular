/// <reference path="./blogular.d.ts" />
"use strict";

var gulp = require('gulp');
var path = require('path');

var gulpBuild = require('evident-gulp-build');
gulpBuild.registerDefaultTasks(gulp);

var settings = gulpBuild.settings;

settings.browserify.ignoredExternalLibraries = ['angular-i18n', 'animate.css', 'font-awesome'];
settings.typescript.flags.noImplicitAny = false;

settings.revall.options.dontRenameFile = [/^\/favicon.ico$/g, /^\/index.html/g, /^\/css\/epiceditor\/.+/g];

settings.css.vendorStylesheets = [
    './node_modules/bootstrap/dist/css/bootstrap.min.css',
    './node_modules/font-awesome/css/font-awesome.min.css',
    './node_modules/animate.css/animate.min.css'
];

settings.fonts.vendorFonts = [
    './node_modules/bootstrap/dist/fonts/*',
    './node_modules/font-awesome/fonts/*'
];

gulp.task('egb:resources:build', ['egb:resources:copy-fonts', 'styles:copy-epic-editor']);

gulp.task('styles:copy-epic-editor', function() {
    return gulp.src('./bower_components/epiceditor/epiceditor/**/*.css')
        .pipe(gulp.dest('./build/egb/static/css/epiceditor'));
});

gulp.task('build:production', ['egb:clean'], function() {
    gulp.start('build');
});

gulp.task('test:unit', ['egb:test:unit']);
gulp.task('test', ['test:unit', 'test:e2e']);

gulp.task('test:e2e:build', function () {
    var ts = require('gulp-typescript');

    return gulp.src(["./test/e2e/**/*.spec.ts"])
        .pipe(ts({
            noImplicitAny: true,
            out: 'output.js',
            typescript: require('evident-gulp-build/node_modules/tsify/node_modules/typescript')
        }))
        .js
        .pipe(gulp.dest('build/egb/test/e2e'));
});

// Runs JavaScript end-to-end tests. Requires that the application and webdriver-manager are running.
gulp.task('test:e2e', ['test:e2e:build'], function () {
    var protractor = require('evident-gulp-build/node_modules/gulp-protractor').protractor;

    return gulp.src(["./test/e2e/**/*.spec.js"])
        .pipe(protractor({
            configFile: "test/protractor.conf.js"
        }));
});
