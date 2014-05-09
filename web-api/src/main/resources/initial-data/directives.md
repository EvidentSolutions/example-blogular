Directives allow implementing custom HTML elements or adding more functionality to existing elements.
The directives are defined in `src/js/directives`:

  - `active-on-location.js` is a simple directive that simply toggles a CSS class on element
    based on the current URL. It is used for the top navigation.
  - `blog-post.js` implements displaying posts along with inline editing and deleting.
  - `epic-editor.js` wraps a third-party component so that it integrates smoothly with Angular.
