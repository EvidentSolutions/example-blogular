CREATE TABLE blog_post (
  id           SERIAL PRIMARY KEY,
  slug         VARCHAR(128) NOT NULL UNIQUE,
  publish_time TIMESTAMP    NOT NULL DEFAULT current_timestamp,
  title        VARCHAR(128) NOT NULL,
  author       VARCHAR(128) NOT NULL,
  body         TEXT         NOT NULL
);

CREATE INDEX blog_post_publish_time_idx ON blog_post (publish_time);
