CREATE TABLE "books" (
  "isbn" integer PRIMARY KEY,
  "title" varchar,
  "author_id" integer,
  "publish_date" timestamp,
  "genre_id" integer
);

CREATE TABLE "authors" (
  "author_id" integer PRIMARY KEY,
  "author_first_name" varchar,
  "author_last_name" varchar
);

CREATE TABLE "genres" (
  "genre_id" integer PRIMARY KEY,
  "genre_title" varchar
);

CREATE TABLE "items" (
  "item_id" integer PRIMARY KEY,
  "item_type" varchar,
  "isbn" integer,
  "acquire_date" timestamp,
  "loan_status" varchar
);

CREATE TABLE "users" (
  "user_id" integer PRIMARY KEY,
  "first_name" varchar,
  "username" varchar,
  "role" varchar,
  "created_at" timestamp
);

CREATE TABLE "loans" (
  "loan_id" integer PRIMARY KEY,
  "user_id" integer,
  "item_id" integer,
  "loan_date" timestamp,
  "due_date" timestamp,
  "return_date" timestamp,
  "loan_state" varchar
);

ALTER TABLE "books" ADD FOREIGN KEY ("author_id") REFERENCES "authors" ("author_id");

ALTER TABLE "books" ADD FOREIGN KEY ("genre_id") REFERENCES "genres" ("genre_id");

ALTER TABLE "items" ADD FOREIGN KEY ("isbn") REFERENCES "books" ("isbn");

ALTER TABLE "loans" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("user_id");

ALTER TABLE "loans" ADD FOREIGN KEY ("item_id") REFERENCES "items" ("item_id");
