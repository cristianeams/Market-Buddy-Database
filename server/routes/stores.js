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
        res.status(500).json({ error: err.message });
      } else {
        // let myTotal = { total: total };
        // stores.unshift(myTotal);
        if (total) {
          res.status(201).json(stores);
        } else {
          res.status(500).json({ error: 'Store not found' });
        }
      }
    });

  });

  storesRoutes.get("/:id", function(req, res) {
    let myStoreID = req.params.id;
    DataHelpers.getStoreByID(myStoreID, (err, store, total) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        if (total) {
          res.status(201).json(store);
        } else {
          res.status(500).json({ error: 'Store not found' });
        }
      }
    });
  });

  storesRoutes.get("/:id/prices", function(req, res) {
    let myStoreID = req.params.id;
    DataHelpers.getStorePrices(myStoreID, (err, store, average, total) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        if (total) {
          res.status(201).json(store);
        } else {
          res.status(201).json({ error: 'Store not found' });
        }
      }
    });
  });

  storesRoutes.get("/:id/products", function(req, res) {
    let myStoreID = req.params.id;
    DataHelpers.getStoreProducts(myStoreID, (err, products, total) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        if (total) {
          res.status(201).json(products);
        } else {
          res.status(201).json({ error: 'Store not found' });
        }
      }
    });
  });

  storesRoutes.get("/:id/products/:pid", function(req, res) {
    let myStoreID = req.params.id;
    let myProductID = req.params.pid;
    DataHelpers.getStoreProductsByID(myStoreID, myProductID, (err, product, total) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        if (total) {
          res.status(201).json(product);
        } else {
          res.status(201).json({ error: 'Store or Product not found' });
        }
      }
    });
  });

  return storesRoutes;

}
