"use strict";

const express         = require('express');
const listsRoutes  = express.Router();

module.exports = function(DataHelpers) {

  listsRoutes.get("/", function(req, res) {

    let name  = req.query.name;

    DataHelpers.getLists(name, (err, lists, total) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        // let myTotal = { total: total };
        // categories.unshift(myTotal);
        if (total) {
          res.status(201).json(lists);
        } else {
          res.status(500).json({ error: 'Lists not found' });
        }
      }
    });

  });

  listsRoutes.get("/:id", function(req, res) {
    let myListID = req.params.id;
    DataHelpers.getListByID(myListID, (err, list, total) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        if (total) {
          res.status(201).json(list);
        } else {
          res.status(500).json({ error: 'List not found' });
        }
      }
    });
  });

  listsRoutes.get("/:id/products", function(req, res) {
    let myListID = req.params.id;
    DataHelpers.getListProductss(myListID, (err, list, total) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        if (total) {
          res.status(201).json(list);
        } else {
          res.status(201).json({ error: 'List not found' });
        }
      }
    });
  });

  return listsRoutes;

}
