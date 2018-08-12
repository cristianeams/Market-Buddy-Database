"use strict";

const express         = require('express');
const categoriesRoutes  = express.Router();

module.exports = function(DataHelpers) {

  categoriesRoutes.get("/", function(req, res) {

    let name  = req.query.name;

    DataHelpers.getCategories(name, (err, categories, total) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        if (total) {
          res.status(201).json(categories);
        } else {
          res.status(500).json({ error: 'Category not found' });
        }
      }
    });

  });

  categoriesRoutes.get("/:id", function(req, res) {
    let myCategoryID = req.params.id;
    DataHelpers.getCategoryByID(myCategoryID, (err, category, total) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        if (total) {
          res.status(201).json(category);
        } else {
          res.status(500).json({ error: 'Category not found' });
        }
      }
    });
  });

  categoriesRoutes.get("/:id/products", function(req, res) {
    let myCategoryID = req.params.id;
    DataHelpers.getCategoryProducts(myCategoryID, (err, category, total) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        if (total) {
          res.status(201).json(category);
        } else {
          res.status(201).json({ error: 'Category not found' });
        }
      }
    });
  });

  return categoriesRoutes;

}
