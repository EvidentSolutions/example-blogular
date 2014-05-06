CREATE TABLE blog_post (
  id   serial PRIMARY KEY,
  slug varchar(128) NOT NULL UNIQUE
);
