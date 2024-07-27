
CREATE TABLE "user"(
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE post(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    "userId" INT,
    CONSTRAINT fk_author_id
      FOREIGN KEY("userId") 
        REFERENCES "user"(id)
);

INSERT INTO "user"(username, password)
VALUES('user', 'pass')