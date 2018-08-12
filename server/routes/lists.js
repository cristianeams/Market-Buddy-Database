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
    DataHelpers.getListProducts(myListID, (err, list, total) => {
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

  listsRoutes.get("/:id/totals", function(req, res) {
    let myListID = req.params.id;
    DataHelpers.getListWithTotals(myListID, (err, total) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        if (total) {
          res.status(201).json(total);
        } else {
          res.status(201).json({ error: 'List not found' });
        }
      }
    });
  });

  // ROUTE TO CREATE A NEW LIST
  listsRoutes.post("/new", function(req, res) {

    req.on('data',function(result){

      let myList = JSON.parse(result);

      let listName = myList.name;
      let userId = myList.user;
      let productsList = myList.list;

      let listID = 0;
      if (myList.list_id) {
        listID = myList.list_id;
      }

      DataHelpers.createList(listName, userId, productsList, listID, (err, list_id) => {
        if (err) {
          res.status(201).send(err);
        } else {
          res.status(201).json({ id: list_id });
        }
      });

    });

  });

  // ROUTE TO DELETE A LIST
  listsRoutes.post("/delete", function(req, res) {

    req.on('data',function(result){

      let myList = JSON.parse(result);

      let listID = myList.id;
      let userID = myList.user_id;

      DataHelpers.deleteList(listID, userID, (err, user) => {
        if (err) {
          res.status(201).send(err);
        } else {
          res.status(201).json({ message: 'List deleted' });
        }
      });

    });

  });

  return listsRoutes;

}


// THIS VIEW WAS CREATED TO MAKE IT EASY ALL THE CONNECTION BETWEEN LISTS, PRICES, PRODUCTS AND
// ENTRIES AND TO MAKE USE OF IT, AFTER MAKE ALL THE MIGRATIONS AND SEEDS WITH KNEX YOU NEED
// TO RUN THIS SQL QUERY IN A POSTGRES CONNECTION IN THE TERMINAL, IN MBUDDY DATABASE
// ================================================================================================
// create view store_prices as select a.id,a.quantity,a.list_id,a.product_id,b.price,b.store_id
// from entries a, prices b, lists c where a.list_id=c.id and a.product_id=b.product_id;

// THIS SQL QUERY WE CAN USE AFTER CREATE THE VIEW TO SEE THE TOTALS BY STORE OF A LIST
// =================================================================================================
// select store_id,sum(price*quantity) from store_prices where list_id = 1 group by store_id;