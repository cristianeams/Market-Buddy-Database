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
const cors = require('cors');

// KNEX SETUP
const knexConfig = require("../knexfile");
const knex = require("knex")(knexConfig[ENV]);

// SETUP OF EXPRESS APP and EJS as our VIEW ENGINE
const app = express();
app.set("view engine", "ejs");

// MIDDLEWARES
app.use(morgan('dev'));
app.use(knexLogger(knex));
app.use(cors());

// DATAHELPERS
const products_helpers = require("./lib/products_helpers.js")(knex);
const prices_helpers = require("./lib/prices_helpers.js")(knex);
const stores_helpers = require("./lib/stores_helpers.js")(knex);

// ROUTES
const productsRoutes = require('./routes/products')(products_helpers);
const pricesRoutes = require('./routes/prices')(prices_helpers);
const storesRoutes = require('./routes/stores')(stores_helpers);

// MOUNTS
app.use('/products', productsRoutes);
app.use('/prices', pricesRoutes);
app.use('/stores', storesRoutes);

app.get("/", (req, res) => { res.render("index") });

// app.get('/', (req, res) => res.send('Hello World!'))

app.listen(PORT, IP, () => { console.log("Example app listening on port " + PORT) });

