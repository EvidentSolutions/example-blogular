"use strict";

var gulp            = require('gulp');
var clean           = require('gulp-clean');
var path            = require('path');
var browserify      = require('browserify');
var browserifyShim  = require('browserify-shim');
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
var concatCss       = require('gulp-concat-css');
var gutil           = require('gulp-util');

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

// Compiles JavaScript from ES6 to ES5 and bundles everything into a single file.
gulp.task('compile-js', ['compile-angular-templates'], function () {

    // Variables which will be inlined to src/js/config.js
    var env = {
        API_BASE: config.production ? '/api' : 'http://localhost:8080/api',
        USE_TEMPLATE_CACHE: config.production,
        DEBUG_LOGGING: !config.production
    };

    var bundleStream = browserify()
        .add(es6ify.runtime)
        .transform(browserifyShim)
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

// Starts an express server serving the static resources and begins watching changes
gulp.task('serve', ['watch'], function() {

    /** @type Object */
    var app = express();

    app.use(morgan('dev'));
    app.use(express.static(paths.build.dest));
    app.use('/templates', express.static('./src/templates'));

    //noinspection JSCheckFunctionSignatures
    app.get(/^\/(post|posts)(\/.*)?$/, function(req, res) {
        //noinspection JSCheckFunctionSignatures
        res.sendfile(path.join(paths.build.dest, 'index.html'));
    });

    http.createServer(app).listen(config.port);
    gutil.log("Started development server:", gutil.colors.magenta("http://localhost:" + config.port + "/"));

    /** @type Object */
    var lrServer = livereload();
    gulp.watch([path.join(paths.build.dest, '**'), './src/templates/**']).on('change', function(file) {
        lrServer.changed(file.path);
    });
});

// Starts a server and opens browser
gulp.task('open-browser', ['serve'], function(cb) {

    var options = {
        url: "http://localhost:" + config.port,
        app: "Google Chrome"
    };

    gulp.src(path.join(paths.build.dest, 'index.html')).pipe(gulpOpen("", options));
    cb();
});

// Compiles Sass stylesheets to CSS
gulp.task('sass', function() {
    var options = { };
    if (config.production) {
        options.outputStyle = 'compressed';
    } else {
        options.outputStyle = 'nested';

        if (process.platform !== 'win32') {
            // Source maps are broken on Windows. See https://github.com/dlmanning/gulp-sass/issues/28
            options.sourceComments = 'map';
        }
    }

    return gulp.src(paths.sass)
        .pipe(sass(options))
        .pipe(size({showFiles: true}))
        .pipe(gulp.dest(path.join(paths.build.dest, 'css')))
        .on('error', handleErrors);
});

// Copies the stylesheets of EpicEditor to proper place
gulp.task('epiceditor-css', function() {
    return gulp.src('./build/bower_components/epiceditor/epiceditor/**/*.css')
        .pipe(gulp.dest(path.join(paths.build.dest, 'css/epiceditor')))
        .on('error', handleErrors);
});

// Creates a bundle from vendor CSS files
gulp.task('vendor-css', ['epiceditor-css'], function() {
    return gulp.src(paths.vendor.stylesheets)
        .pipe(concatCss("vendor-bundle.css"))
        .pipe(size({showFiles: true}))
        .pipe(gulp.dest(path.join(paths.build.dest, 'css')))
        .on('error', handleErrors);
});

// Copies fonts to proper place
gulp.task('fonts', function() {
    return gulp.src(paths.vendor.fonts)
        .pipe(gulp.dest(path.join(paths.build.dest, 'fonts')))
        .on('error', handleErrors);
});

// Builds all styles
gulp.task('styles', ['sass', 'vendor-css', 'fonts']);

// Starts watching for changes
gulp.task('watch', ['build'], function() {
    gulp.watch(['./src/js/**/*.js'], ['compile-js']);
    gulp.watch(paths.sass, ['sass']);
    gulp.watch(paths.views, ['compile-views']);
});

// Compiles handlebars templates to html
gulp.task('compile-views', function() {
    return gulp.src(paths.views)
        .pipe(handlebars({}))
        .pipe(rename(function(path) {
            path.extname = '.html';
        }))
        .pipe(gulp.dest(paths.build.dest));
});

// Compiles angular templates to a single JavaScript module which populates the template-cache
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

// Build all templates
gulp.task('templates', ['compile-views', 'compile-angular-templates']);

// Cleans everything built
gulp.task('clean', function () {
    return gulp.src(['build/gulp'], { read: false }).pipe(clean());
});

// Builds everything
gulp.task('build', ['compile-js', 'styles', 'templates']);

// Create an optimized build
gulp.task('build-optimized', ['build'], function() {
    gulp.src(path.join(paths.build.dest, '**'))
        .pipe(revall({ ignore: [/^index.html$/, /^css\/epiceditor\/.+/] }))
        .pipe(gulp.dest('./build/gulp/optimized'));
});

// Creates a production build
gulp.task('build-production', ['clean'], function() {
    config.production = true;
    gulp.start('build-optimized');
});

// Creates a development build
gulp.task('build-development', ['clean'], function() {
    config.production = false;
    gulp.start('build');
});

// By default, clean everything built and start local server
gulp.task('default', ['clean'], function () {
    gulp.start('serve');
});
