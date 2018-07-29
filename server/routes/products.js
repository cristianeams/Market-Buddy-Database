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
        res.status(500).json({ error: 'Search without result' });
      } else {
        // let myTotal = { total: total };
        // products.unshift(myTotal);
        res.status(201).json(products);
      }
    });

  });

  productsRoutes.get("/:id", function(req, res) {
    let myProductID = req.params.id;
    DataHelpers.getProductByID(myProductID, (err, product) => {
      if (err) {
        res.status(500).json({ error: 'Product not found' });
      } else {
        res.status(201).json(product);
      }
    });
  });

  productsRoutes.get("/:id/prices", function(req, res) {
    let myProductID = req.params.id;
    DataHelpers.getProductPrices(myProductID, (err, product, average) => {
      if (err) {
        res.status(500).json({ error: 'Product not found / No prices for this product' });
      } else {
        // console.log('average = ', average);
        res.status(201).json(product);
      }
    });
  });

  return productsRoutes;

}
