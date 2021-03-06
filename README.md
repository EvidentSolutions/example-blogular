# Blogular - AngularJS example application

## Prerequisites

The project uses [Gradle](http://www.gradle.org/), [Node.js](http://nodejs.org/), [npm](https://www.npmjs.org/),
[Bower](http://bower.io/) and [gulp](http://gulpjs.com/), but if you use the bundled Gradle wrapper, the only
thing you need to have installed is [Java 8](http://www.oracle.com/technetwork/java/javase/downloads/).

If you wish to optimize your workflow a bit, you probably want to install the other tools as well.

## Quick-start

To get started, start a standalone version of the project:
    
    ./gradlew runStandalone

When everything as been compiled and server has started, open your browser: [http://localhost:8080/](http://localhost:8080/)

## Optimized workflow

### Debugging in IDEA

The project includes project files for [IntelliJ IDEA](http://www.jetbrains.com/idea/). There are
some shared run configurations you probably want to use:

  - _web-api_ - Starts the backend in a Tomcat running inside IDEA.
  - _web-api lag_ - Same as _web-api_ but adds a simulated lag of 1 second to every request.
  - _JS Debug_ - Connects JavaScript debugger to running frontend-module.
  - _gulp watch_ - Starts process for compiling client code.

### LiveReload

The project is configured to use LiveReload to refresh changes automatically to browser without having
to manually reload. Install [extension for your browser](http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions).

### gulp

You don't need to install Node.js or gulp manually to get the build working since Gradle can execute them
with its own node-plugin. However, if running inside Gradle, you'll lose the colorization in console and
gulp takes a little longer to start. So if you have a working Node.js environment, install gulp by saying:

    npm install -g gulp

After this you can just execute `gulp` in the `frontend` directory to run the frontend server.

(If you haven't followed the steps of Quick-start above, you'll also need to run `npm install` manually
in the `frontend`-directory before running gulp.)

## Running JavaScript unit tests

Unit-tests are using [Karma](http://karma-runner.github.io/). Run them by executing the following command
in `frontend`-directory:

    gulp test:unit

## Running end-to-end tests

End-to-end tests are implemented using [Protractor](https://github.com/angular/protractor). First we need
install the driver for Chrome, by issuing the following in `frontend`-directory:

    node_modules/.bin/webdriver-manager update

After this we can start Selenium server:

    node_modules/.bin/webdriver-manager start

When the server is running, we should start our application (e.g. using the method described in Quick-start)
and then we can execute the tests against our application:

    gulp test:e2e
