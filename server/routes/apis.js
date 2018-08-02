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
        res.status(500).json({ error: err });
      } else {
        if (result) {
          res.status(201).json(result);
        } else {
          res.status(201).json({ error: 'Items not found' });
        }
      }
    });

  });

  // ROUTE TO GET ALL THE BASIC DATA THAT WE NEED,
  // IN ANY SITUATION, TESTING ALL THE APIS THAT WE HAVE
  apiRoutes.get("/all", function(req, res) {

    let name = req.query.name;
    let upc = req.query.upc;

    DataHelpers.getAPIs(name, upc, (err, result) => {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        if (result) {
          res.status(201).json(result);
        } else {
          res.status(201).json({ error: 'Items not found' });
        }
      }
    });

  });

  return apiRoutes;

}
