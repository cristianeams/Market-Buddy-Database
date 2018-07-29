"use strict";

const express       = require('express');
const pricesRoutes  = express.Router();

module.exports = function(DataHelpers) {

  pricesRoutes.get("/", function(req, res) {

    let product_id  = req.query.product_id;
    let store_id    = req.query.store_id;

    DataHelpers.getPrices(product_id, store_id, (err, prices, total) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        // let myTotal = { total: total };
        // products.unshift(myTotal);
        res.status(201).json(prices);
      }
    });

  });

  pricesRoutes.get("/:id", function(req, res) {
    let myPriceID = req.params.id;
    DataHelpers.getPriceByID(myPriceID, (err, price) => {
      if (err) {
        res.status(500).json({ error: 'Price not found' });
      } else {
        res.status(201).json(price);
      }
    });
  });

  return pricesRoutes;

}
