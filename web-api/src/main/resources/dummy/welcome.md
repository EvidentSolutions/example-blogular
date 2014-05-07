Welcome to Blogular, a simple blogging application demonstrating [AngularJS](https://angularjs.org)!

### Project structure

Blogular has two modules:

  - `frontend` is a static frontend application using AngularJS
  - `web-api` is a [Spring](http://projects.spring.io/spring-framework/) application which provides
    JSON APIs for the frontend to use.

When developing, you can run the two modules separately and then bundle everything into one Java
application for deployment.

### Controllers

  - `controllers/post-controller.js` and `controllers/list-posts-controller.js` are "normal" controllers
    that are mapped to URLs in `routes.js`.
  - `controllers/sidebar-controller.js` is a controller that is always active and controls the sidebar.

### Services

  - `services/post-service.js` handles saving and retrieving posts. It also provides notifications when
    posts are changed so that different parts of application know to refresh their date.

### Directives

  - `directives/active-on-location.js` is a simple directive that simply toggles a CSS class on element
    based on the current URL. It is used for the top navigation.
  - `directives/blog-post.js` does not have any functionality, but is used to provide a template for
    displaying posts.
  - `directives/epic-editor.js` wraps a third-party component so that it integrates smoothly with Angular.

### Filters

  - `filters/markdown-filter.js` provides a filter that can be used to convert Markdown to HTML.
