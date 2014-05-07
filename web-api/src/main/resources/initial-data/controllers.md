Controllers encapsulate application specific functionality around some markup.
Usually they don't really know anything about the details of the view, but simply
make changes to model. View is then automatically updated.

We have two kinds of controllers defined in `src/js/controllers`:

  - `post-controller.js`, `list-posts-controller.js`, `view-post-controller.js`
     are "normal" controllers that are mapped to URLs in `src/js/routes.js`.
  - `sidebar-controller.js` is not bound to any URL but the sidebar includes
     it unconditionally. If the sidebar is visible, then this controller is used.
