"use strict";

var gulp = require('gulp');
var revall = require('gulp-rev-all');
var path = require('path');

var gulpBuild = require('evident-gulp-build');
var settings = gulpBuild.settings;

settings.variables.API_BASE = 'http://localhost:8080/api';

settings.serve.indexPagePattern = /^\/(post|posts|login)(\/.*)?$/;

settings.paths.vendorStylesheets = [
    './bower_components/bootstrap/dist/css/bootstrap.min.css',
    './bower_components/font-awesome/css/font-awesome.min.css',
    './bower_components/animate.css/animate.min.css'
];

// Creates a production build
gulp.task('build-production', ['clean'], function() {
    settings.staticBundle = true;
    settings.minimized = true;
    settings.variables.API_BASE = '/api';
    gulp.start('build-optimized');
});

// Creates a development build
gulp.task('build-development', ['clean'], function() {
    settings.staticBundle = false;
    settings.minimized = false;
    gulp.start('build');
});

// Create an optimized build
gulp.task('build-optimized', ['build'], function() {
    return gulp.src(path.join(settings.paths.output, 'static/**'))
        .pipe(revall({ ignore: [/^index.html$/, /^css\/epiceditor\/.+/] }))
        .pipe(gulp.dest(path.join(settings.paths.output, 'optimized')));
});

gulp.task('styles:copy-extra-resources', ['styles:copy-epic-editor', 'styles:copy-fonts']);

gulp.task('styles:copy-epic-editor', function() {
    return gulp.src('./bower_components/epiceditor/epiceditor/**/*.css')
        .pipe(gulp.dest(path.join(settings.paths.output, 'static/css/epiceditor')))
        .on('error', gulpBuild.errorHandler);
});

// Copies fonts to proper place
gulp.task('styles:copy-fonts', function() {
    var fonts = [
        './bower_components/bootstrap/dist/fonts/*',
        './bower_components/font-awesome/fonts/*'
    ];
    return gulp.src(fonts)
        .pipe(gulp.dest(path.join(settings.paths.output, 'static/fonts')))
        .on('error', gulpBuild.errorHandler);
});
