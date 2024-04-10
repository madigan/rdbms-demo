# RDBMS Demo

## Pre-Requisites

Make sure you have the following installed in order to use this project:

1. [Docker](https://www.docker.com/products/docker-desktop/) will allow you to run a Postgres database locally.
2. [NodeJS](https://nodejs.org/en) this will allow you to run the server locally
3. [Yaak](https://yaak.app/) (Optional) use this to make HTTP calls to your server without the UI.

## Installation

First, you will need to create a `.env` file in the repository root directory with all the secret information you need for your project to run.

Create a `.env` file.

Add the following content:

```env
DB_NAME=db
DB_USER=snaptask
DB_PASSWORD=v3ry_secret
NODE_ENV=development
```

(make sure to replace the password with your own secret value)

Second, you will need to install the NodeJS dependencies in the `server` directory:

```shell
cd server
npm install
```

## Running in Development

### Running the Database

In the root directory, open a terminal and run `docker-compose up` to start the database.

You can tell the database to shut down by using `ctrl-c` (`cmd-c` on mac) to kill the process in that terminal.

If you need to completely delete the database, run `docker-compose down`.

### Running the Server

Open a terminal and run the following commands

```shell
cd server
npm run dev
```

This will start a development server which refreshes whenever you change your code.

## Resources

- [Postgres Documentation](https://www.postgresql.org/docs/current/tutorial-delete.html)

### SQL Examples

#### Create Table

```sql
CREATE TABLE users (
    id          int,
    first_name  varchar(80),
    last_name   varchar(80),
    birthday    date
);

CREATE TABLE subscriptions (
    id          int,
    user_id     int,
    start_date  date,
    renewal_date date,
);
```

#### Drop (Delete) Table

```sql
DROP users;
DROP subscriptions;
```

#### Insert Data

```sql
INSERT INTO users (id, first_name, last_name, birthday)
VALUES (1, 'Tim', 'Tester', '1990-03-05')
```

#### Query (Read) Data

```sql
SELECT * FROM users;

SELECT first_name, last_name FROM users;

SELECT * FROM users WHERE first_name = 'Tim';
```

#### Update Data

```sql
UPDATE users
SET last_name = 'Smith'
WHERE id = 1;
```

#### Delete Data

```sql
DELETE FROM users where id = 1;
```
