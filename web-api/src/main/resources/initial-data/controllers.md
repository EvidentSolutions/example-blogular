Controllers encapsulate application specific functionality around some markup.
Usually they don't really know anything about the details of the view, but simply
make changes to model. View is then automatically updated.

Our application is so small that all the controllers are defined in `src/js/controllers`.

First we have controllers that are mapped to URLs `src/js/routes.js`. These are pretty
similar to controllers in traditional web frameworks, except that they run in client side:

  - `list-posts-controller.js` is about the simplest controller there can be. It simply
    loads posts from service and when they are loaded, exposes them to the view.
  - `view-post-controller.js` loads a specific post based on URL path. It also has some
    error to show message if post is not found.
  - `post-controller.js` initializes data for post-form and defines a callback for
    form submission.

We also have controllers that are not bound to any URL but are included in the page
all the time:

  - `login-controller.js` exposes `login()` and `logout()` functions to the scope
    in which it is used. `login()` also provides an example of opening a modal dialog
    from controller. The controller is used by the top navigation.
  - `sidebar-controller.js` loads data needed by the sidebar.
