"use strict";

var gulp            = require('gulp');
var clean           = require('gulp-clean');
var path            = require('path');
var browserify      = require('browserify');
var es6ify          = require('es6ify');
var source          = require('vinyl-source-stream');
var express         = require('express');
var http            = require('http');
var morgan          = require('morgan');
var livereload      = require('gulp-livereload');
var gulpOpen        = require('gulp-open');
var sass            = require('gulp-sass');
var size            = require('gulp-size');
var notify          = require('gulp-notify');
var templateCache   = require('gulp-angular-templatecache');
var rename          = require("gulp-rename");
var handlebars      = require('gulp-compile-handlebars');
var envifyCustom    = require('envify/custom');
var revall          = require('gulp-rev-all');
var uglify          = require('gulp-uglify');
var gulpif          = require('gulp-if');
var streamify       = require('gulp-streamify');

var config = {
    production: false,
    port: '3000'
};

var paths = {
    sass: './src/css/*.scss',
    templates: './src/templates/**/*.html',
    views: './src/views/**/*.hbs',
    build: {
        dest: './build/gulp/static',
        tmp: './build/gulp/tmp'
    },
    vendor: {
        stylesheets: [
            './build/bower_components/bootstrap/dist/css/bootstrap.min.css',
            './build/bower_components/font-awesome/css/font-awesome.min.css',
            './build/bower_components/animate.css/animate.min.css'
        ],
        fonts: [
            './build/bower_components/bootstrap/dist/fonts/*',
            './build/bower_components/font-awesome/fonts/*'
        ]
    }
};

var handleErrors = function() {
    // Send error to notification center with gulp-notify
    notify.onError({
        title: "Compile Error",
        message: "<%= error.message %>"
    }).apply(this, arguments);

    // Keep gulp from hanging on this task
    this.emit('end');
};

gulp.task('browserify', ['compile-angular-templates'], function () {
    var env = {
        API_BASE: config.production ? '/api' : 'http://localhost:8080/api'
    };

    var bundleStream = browserify()
        .add(es6ify.runtime)
        .transform(es6ify.configure(/^(?!.*(node_modules|bower_components))+.+\.js$/))
        .transform(envifyCustom(env))
        .require(require.resolve('./src/js/main.js'), { entry: true })
        .bundle({debug: !config.production});

    return bundleStream
        .on('error', handleErrors)
        .pipe(source('bundle.js'))
        .pipe(gulpif(config.production, streamify(uglify())))
        .pipe(streamify(size({showFiles: true})))
        .pipe(gulp.dest(path.join(paths.build.dest, 'js')));
});

gulp.task('serve', ['watch'], function() {

    /** @type Object */
    var app = express();

    app.use(morgan('dev'));
    app.use(express.static(paths.build.dest));

    http.createServer(app).listen(config.port);

    app.get(/^\/(post|posts)(\/.*)?$/, function(req, res) {
        res.sendfile(path.join(paths.build.dest, 'index.html'));
    });

    /** @type Object */
    var lrServer = livereload();
    gulp.watch(path.join(paths.build.dest, '**')).on('change', function(file) {
        lrServer.changed(file.path);
    });
});

gulp.task('open', ['serve'], function(cb) {

    var options = {
        url: "http://localhost:" + config.port,
        app: "Google Chrome"
    };

    gulp.src(path.join(paths.build.dest, 'index.html')).pipe(gulpOpen("", options));
    cb();
});

gulp.task('sass', function() {
    var options = { };
    if (config.production) {
        options.outputStyle = 'compressed';
    } else {
        options.outputStyle = 'nested';
        options.sourceComments = 'map';
    }

    return gulp.src(paths.sass)
        .pipe(sass(options))
        .pipe(size({showFiles: true}))
        .pipe(gulp.dest(path.join(paths.build.dest, 'css')))
        .on('error', handleErrors);
});

gulp.task('vendor-css', function() {
    return gulp.src(paths.vendor.stylesheets)
        .pipe(gulp.dest(path.join(paths.build.dest, 'css')))
        .on('error', handleErrors);
});

gulp.task('fonts', function() {
    return gulp.src(paths.vendor.fonts)
        .pipe(gulp.dest(path.join(paths.build.dest, 'fonts')))
        .on('error', handleErrors);
});

gulp.task('styles', ['sass', 'vendor-css', 'fonts']);

gulp.task('watch', ['build'], function() {
    gulp.watch(['./src/js/**/*.js', './build/gulp/tmp/templates.js'], ['browserify']);
    gulp.watch(paths.sass, ['sass']);
    gulp.watch(paths.templates, ['compile-angular-templates']);
    gulp.watch(paths.views, ['compile-views']);
});

gulp.task('compile-views', function() {
    return gulp.src(paths.views)
        .pipe(handlebars({}))
        .pipe(rename(function(path) {
            path.extname = '.html';
        }))
        .pipe(gulp.dest(paths.build.dest));
});

gulp.task('compile-angular-templates', function () {
    gulp.src(paths.templates)
        .pipe(templateCache({
            'module': 'blogular.templates',
            'standalone': true,
            'root': '/templates/'
        }))
        .pipe(size({showFiles: true}))
        .pipe(gulp.dest(paths.build.tmp));
});

gulp.task('templates', ['compile-views', 'compile-angular-templates']);

gulp.task('clean', function () {
    return gulp.src(['build/gulp'], { read: false }).pipe(clean());
});

gulp.task('build', ['browserify', 'styles', 'templates']);

gulp.task('optimize', ['build'], function() {
    gulp.src(path.join(paths.build.dest, '**'))
        .pipe(revall({ ignoredExtensions: ['.html'] }))
        .pipe(gulp.dest('./build/gulp/optimized'));
});

gulp.task('build-production', ['clean'], function() {
    config.production = true;
    gulp.start('optimize');
});

gulp.task('build-development', ['clean'], function() {
    config.production = false;
    gulp.start('build');
});

gulp.task('default', ['clean'], function () {
    gulp.start('open');
});
