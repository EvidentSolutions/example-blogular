-- Set HSQLDB to understand PostgreSQL's syntax
SET DATABASE SQL SYNTAX PGS TRUE;
CREATE TYPE json AS LONGVARCHAR;
CREATE TYPE bytea AS BLOB;
