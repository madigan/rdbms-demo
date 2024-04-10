const express = require("express");
const postgres = require("postgres");

const {
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  PORT = 3000,
  NODE_ENV = "production",
} = process.env;

async function main() {
  const sql = postgres(
    `postgres://${DB_USER}:${DB_PASSWORD}@localhost:5432/${DB_NAME}`
  );

  await initializeDB(sql);

  const app = express()
    .use(express.static("public"))
    .use(express.json())
    .get("/api/users", getUsers(sql))
    .listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
}

main().catch((err) => console.error(err));

// Helper functions

async function initializeDB(sql) {
  await sql`DROP TABLE IF EXISTS users`;
  await sql`
  CREATE TABLE users (
    id          int,
    first_name  varchar(80),
    last_name   varchar(80),
    birthday    date
  );
  `;
  if (NODE_ENV === "development") {
    await sql`
    INSERT INTO users (id, first_name, last_name, birthday) 
    VALUES (1, 'Tim', 'Tester', '1990-03-05')
    `;
    await sql`
    INSERT INTO users (id, first_name, last_name, birthday) 
    VALUES (2, 'Jane', 'Smith', '1980-04-02')
    `;
    await sql`
    INSERT INTO users (id, first_name, last_name, birthday) 
    VALUES (3, 'Radu', 'Kowalski', '2013-12-14')
    `;
  }
}

function getUsers(sql) {
  return async (req, res) => {
    const data = await sql`SELECT * FROM users`;

    res.json(data);
  };
}
