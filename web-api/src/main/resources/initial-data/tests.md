Blogular has three kinds of tests:

  1. [Karma](http://karma-runner.github.io/) tests for JavaScript unit tests. The tests are found in in
     `test/unit` directory and use [Jasmine](http://jasmine.github.io/) testing framework. You can
     run `gulp test` to execute the tests. (Currently the tests assume that you have Chrome installed,
     but you could configure them to run on another browser as well.)
  2. [Protractor](https://github.com/angular/protractor) tests for end-to-end tests of the system. The
     tests are found in `test/e2e`. These tests assume that you have the full system up and running and
     will exercise actual UI. Once the system is running and you have started webdriver-manager, you can
     run the tests with `gulp test-e2e`.
  3. Finally there are [JUnit](http://junit.org/) tests for server side functionality. These are found in 
     in `src/test/java` directory of the `web-api` module and don't require any special programs to be installed.
     You can execute `./gradlew :web-api:test` to run these tests.
