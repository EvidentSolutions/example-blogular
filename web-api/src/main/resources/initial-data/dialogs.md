AngularJS does not have builtin support for modal dialogs, but we use [UI Bootstrap's](http://angular-ui.github.io/bootstrap/)
[Modal](http://angular-ui.github.io/bootstrap/#/modal) to provide dialogs.

  - `src/js/directives/blog-post.js` pops up a modal confirmation dialog when deleting posts. The dialog is
     so simple it doesn't even have its own controller.
  - `src/js/controllers/login-controller.js` opens a modal login dialog. The dialog itself has its own controller
    that handles the login process.
