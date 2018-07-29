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
        res.status(201).json(products);
      }
    });

  });

  productsRoutes.get("/:id", function(req, res) {
    let myProductID = req.params.id;
    DataHelpers.getProductByID(myProductID, (err, product, total) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        // let myTotal = { total: total };
        // product.unshift(myTotal);
        res.status(201).json(product);
      }
    });
  });

  return productsRoutes;

}
