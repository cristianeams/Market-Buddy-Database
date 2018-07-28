# MBUDDY DB

Simple WEB application developed to self-study purpose.

Front-end with HTML, CSS and JavaScript.

Back-end with Node.js and [Express](http://expressjs.com/) as the framework.

### Purpose

Install and setup a psql database to be used in mbuddy project. This database will be migrated and initial seeded by [knex.js](https://knexjs.org/) and after that we will be able to check the data by simple Routes, starting only with GET.

### Pre-requisites

1 - You need the Node.js and NPM installed. Make it easy if you have Homebrew too.

2 - You need the postgresql installed. More details above.

Check if postgresql already exists

Run `postgres -V` to check if you already have postgresql in your PC. If you don't have, go to **Step 1** so you will install it. If you have, go to **Step 2** to make the setup.

*Note:* If you already have the psql installed and an user and database named **buddy** or you want to create another user, password and database name instead of it, just do it, jump directly to **Step 3** and **CHANGE** the `.ENV` file with the correct names that you created to make this run.

### Step 1 - PSQL Install

1.1 - Open a terminal window in your machine.

1.2 - Run `brew install postgresql`.

1.3 - Run `pg_ctl -D /usr/local/var/postgres start && brew services start postgresql` to make default start your postgresql everytime you start your machine (optional step).

1.4 - Run `postgres -V` to check if now you have it installed in your machine.

### Step 2 - PSQL Setup

2.1  - Open another terminal window in your machine.

2.2  - Run `psql postgres` or `sudo psql postgres` to enter in psql console.

2.3  - Run `\du` to check what is the users that you have by default.

2.4  - Run `create role mbuddy with login password 'mbuddy'` to create our default user **mbuddy**.

2.5  - Run `alter role mbuddy createdb` to grant to our user the permission to create databases.

2.6  - Run `create database mbuddy` to create our database **mbuddy** for our user **mbuddy**.

2.7  - Run `grant all privileges on database mbuddy to mbuddy` so our user have all the control on it.

2.8  - Run `psql postgres -U mbuddy` to direct access psql with our user **mbuddy**.

2.9  - Run `\connect mbuddy` to enter in our new database **mbuddy** (that exists only for the user **mbuddy**).

2.10 - Run `\dt` to check all the tables of the **mbuddy** database. Probably it will be empty.

### Step 3 - Project Setup

*Note:* Use the same terminal that you ran `postgres -V` and leave the other one just for the PSQL instance.

3.1 - Fork this repo in Github and after that clone it to any folder in your machine using `git clone` command.

3.2 - Enter in this folder to do the next commands.

3.3 - Run `npm install` inside your new folder to install all the dependencies of the project.

3.4 - Create an .ENV file using the command `touch .env` and insert the content above:
`DB_HOST=localhost
DB_USER=mbuddy
DB_PASS=mbuddy
DB_NAME=mbuddy
DB_SSL=true if heroku
DB_PORT=5432`
This file create our environment variables with our host, user, password, port (default) and database name in PSQL.

3.5 - Run `knex migrate:latest` to create all the tables to our **mbuddy** database.

3.6 - Run `knex seed:run` to create all the initial fake data to our **mbuddy** database.

3.7 - In the already openned psql terminal window run `\dt` again to see if now you have the tables created.

3.8 - Do some `select` commands in the tables to see the initial data.

### Step 4 - Run the Server

4.1 - Run `npm run start`, `node server.js` or `npm run server` to start the server (server.js).

4.2 - In a browser go to `http://localhost:7000/` to see the server running.

## Dependencies

* body-parser
* cors
* dotenv
* ejs
* express
* knex
* knex-logger
* knex-migrate
* morgan
* pg
* node

