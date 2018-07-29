"use strict";

const express       = require('express');
const storesRoutes  = express.Router();

module.exports = function(DataHelpers) {

  storesRoutes.get("/", function(req, res) {

    let name       = req.query.name;
    let location   = req.query.location;
    let latitude   = req.query.latitude;
    let longitude  = req.query.longitude;

    DataHelpers.getStores(name, location, latitude, longitude, (err, stores, total) => {
      if (err) {
        res.status(500).json({ error: 'Search without result' });
      } else {
        // let myTotal = { total: total };
        // stores.unshift(myTotal);
        res.status(201).json(stores);
      }
    });

  });

  storesRoutes.get("/:id", function(req, res) {
    let myStoreID = req.params.id;
    DataHelpers.getStoreByID(myStoreID, (err, store) => {
      if (err) {
        res.status(500).json({ error: 'Store not found' });
      } else {
        res.status(201).json(store);
      }
    });
  });

  storesRoutes.get("/:id/prices", function(req, res) {
    let myStoreID = req.params.id;
    DataHelpers.getStorePrices(myStoreID, (err, store, average) => {
      if (err) {
        res.status(500).json({ error: 'Store not found / No prices for this store' });
      } else {
        console.log('average = ', average);
        res.status(201).json(store);
      }
    });
  });

  return storesRoutes;

}
