"use strict";

const express    = require('express');
const apiRoutes  = express.Router();

module.exports = function(DataHelpers) {

  // ROUTE TO GET API BY COMPANY AND DISPLAY THE RESULTS AS JSON
  // Example: http://locahost:7000/api?api=wallmart&name=(some_value)&upc=(some_barcode)
  // Example: http://locahost:7000/api?api=itemdb&name=(some_value)&upc=(some_barcode)
  // Example: http://locahost:7000/api?api=buycott&name=(some_value)&upc=(some_barcode)
  apiRoutes.get("/", function(req, res) {

    let api = req.query.api;
    let name = req.query.name;
    let upc = req.query.upc;

    DataHelpers.getAPIbyCompany(api, name, upc, (err, result) => {
      if (err) {
        res.status(201).json({ error: err });
      } else {
        if (result) {
          res.status(201).json(result);
        } else {
          res.status(201).json({ error: 'Items not found' });
        }
      }
    });

  });

  // ROUTE TO GET PRODUCT BY UPC, SEARCHING IN ALL APIS ONCE
  apiRoutes.get("/upc/:id", function(req, res) {

    let upc = req.params.id;

    DataHelpers.getAPIsByUPC(upc, (err, result) => {
      if (err) {
        res.status(201).json({ error: err });
      } else {
        if (result) {
          res.status(201).json(result);
        } else {
          res.status(201).json({ error: 'Item not found' });
        }
      }
    });

  });

  // ROUTE TO GET PRODUCT BY NAME, SEARCHING IN ALL APIS ONCE
  apiRoutes.get("/search", function(req, res) {

    let name = req.query.q;

    DataHelpers.getAPIsByName(name, (err, result) => {
      if (err) {
        res.status(201).json({ error: err });
      } else {
        if (result) {
          res.status(201).json(result);
        } else {
          res.status(201).json({ error: 'Item not found' });
        }
      }
    });

  });

  /// THIS COMMENT EXISTS TO AVOID THAT WE CREATE NEW PRODUCTS WITHOUT WANT IT

  // // ROUTE TO POPULATE THE DATABASE BY NAME IN THE APIs
  // apiRoutes.get("/create", function(req, res) {

  //   let name = req.query.q;

  //   DataHelpers.populateDatabaseFromApis(name, (err, result) => {
  //     if (err) {
  //       res.status(201).json({ error: err });
  //     } else {
  //       if (result) {
  //         res.status(201).json(result);
  //       } else {
  //         res.status(201).json({ error: 'Item not found' });
  //       }
  //     }
  //   });

  // });

  ///// THIS IS COMMENT BECAUSE UPDATE PRICES IN DATABASE SO JUST DO IT IF REALLY WANT.

  // // ROUTE TO UPDATE THE PRICE OF EACH PRODUCT WITHOUT IT
  // apiRoutes.get("/create/prices", function(req, res) {

  //   let untilProductID = req.query.until;

  //   DataHelpers.updateProductPrices(untilProductID, (err, result) => {
  //     if (err) {
  //       res.status(201).send(err);
  //     } else {
  //       if (result) {
  //         res.status(201).send('Prices updated');
  //       } else {
  //         res.status(201).send('Error updating prices');
  //       }
  //     }
  //   });

  // });

  return apiRoutes;

}

// create products in database that matches with cauliflower in wallmart api
// http://localhost:7000/apis/create/?q=cauliflower

// insert prices for all stores for all products that id is lower than 2100
// http://localhost:7000/apis/create/prices?until=2100