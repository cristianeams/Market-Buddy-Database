"use strict";

const express         = require('express');
const productsRoutes  = express.Router();

module.exports = function(DataHelpers) {

  productsRoutes.get("/", function(req, res) {

    let name  = req.query.name;
    let upc   = req.query.upc;
    let ean   = req.query.ean;

    DataHelpers.getProducts(name, upc, ean, (err, products, total) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        // let myTotal = { total: total };
        // products.unshift(myTotal);
        if (total) {
          res.status(201).json(products);
        } else {
          res.status(500).json({ error: 'Product not found' })
        }
      }
    });

  });

  productsRoutes.get("/upc/:id", function(req, res) {

    let upc = req.params.id;

    DataHelpers.getProductsByUPC(upc, (err, products, total) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        // let myTotal = { total: total };
        // products.unshift(myTotal);
        if (total) {
          res.status(201).json(products);
        } else {
          res.status(500).json({ error: 'Product not found' })
        }
      }
    });

  });

  productsRoutes.get("/search", function(req, res) {

    let name = req.query.q;

    DataHelpers.getProductsByName(name, (err, products, total) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        // let myTotal = { total: total };
        // products.unshift(myTotal);
        if (total) {
          res.status(201).json(products);
        } else {
          res.status(500).json({ error: 'Product not found' })
        }
      }
    });

  });

  productsRoutes.get("/:id", function(req, res) {
    let myProductID = req.params.id;
    DataHelpers.getProductByID(myProductID, (err, product, total) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        if (total) {
          res.status(201).json(product);
        } else {
          res.status(500).json({ error: 'Product not found' });
        }
      }
    });
  });

  productsRoutes.get("/:id/prices", function(req, res) {
    let myProductID = req.params.id;
    DataHelpers.getProductPrices(myProductID, (err, product, average, total) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        if (total) {
          res.status(201).json(product);
        } else {
          res.status(201).json({ error: 'Product not found or product without prices' });
        }
      }
    });
  });

  return productsRoutes;

}
