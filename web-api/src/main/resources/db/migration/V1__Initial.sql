CREATE TABLE blog_post (
  id           SERIAL PRIMARY KEY,
  slug         VARCHAR(128) NOT NULL UNIQUE,
  publish_time TIMESTAMP    NOT NULL DEFAULT current_timestamp,
  title        VARCHAR(128) NOT NULL,
  body         TEXT         NOT NULL
);
