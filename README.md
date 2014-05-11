# Blogular - AngularJS example application

## Prerequisites

The project uses [Gradle](http://www.gradle.org/), [Node.js](http://nodejs.org/), [npm](https://www.npmjs.org/),
[Bower](http://bower.io/) and [gulp](http://gulpjs.com/), but if you use the bundled Gradle wrapper, the only
thing you need to have installed is [Java 8](http://www.oracle.com/technetwork/java/javase/downloads/).

If you wish to optimize your workflow a bit, you probably want to install the other tools as well.

## Quick-start

To get started, first start Tomcat providing the API in one console:

    ./gradlew tomcatRun

Then start the frontend server in another:

    ./gradlew serve

Finally open your browser: [http://localhost:3000/](http://localhost:3000/)

## Optimized workflow

### Debugging in IDEA

The project includes project files for [IntelliJ IDEA](http://www.jetbrains.com/idea/). There are
some shared run configurations you probably want to use:

  - _web-api_ - Starts the backend in a Tomcat running inside IDEA.
  - _web-api lag_ - Same as _web-api_ but adds a simulated lag of 1 second to every request.
  - _JS Debug_ - Connects JavaScript debugger to running frontend-module.

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
