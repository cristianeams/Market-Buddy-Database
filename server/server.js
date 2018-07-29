
// const IP = '0.0.0.0';
// // process.env.PORT in case Heroku
// const PORT = process.env.PORT || 7000;
// const ENV = process.env.ENV || "development";

// const express = require('express')
// const app = express()

"use strict";

// dotenv npm package to loads environment variables
// from a .env file into process.env
require('dotenv').config();

// SERVER CONSTS
const IP = '0.0.0.0';
//process.env.PORT in case of Heroku or other
const PORT = process.env.PORT || 7000;
const ENV = process.env.ENV || "development";

// LOAD NPM PACKAGES
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require('morgan');
const knexLogger = require('knex-logger');

// KNEX SETUP
const knexConfig = require("../knexfile");
const knex = require("knex")(knexConfig[ENV]);

// SETUP OF EXPRESS APP and EJS as our VIEW ENGINE
const app = express();
app.set("view engine", "ejs");

// MIDDLEWARES
app.use(morgan('dev'));
app.use(knexLogger(knex));

// // ROUTES
// // Separated Routes for each Resource
// const usersRoutes = require("./routes/users");

// DATAHELPERS
const products_helpers = require("./lib/products_helpers.js")(knex);

// ROUTES
const productsRoutes = require('./routes/products')(products_helpers);

// MOUNTS
app.use('/products', productsRoutes);

//   app.get("/", (req, res) => {
//     res.render("index", { myUser: req.session.myUser, myName: req.session.myName } );
//   });

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(PORT, IP, () => {
  console.log("Example app listening on port " + PORT);
});
