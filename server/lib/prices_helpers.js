"use strict";

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    getPrices: function(product_id, store_id, cb) {

        let query = db.select('*').from('prices');

        if (product_id) {
          query = query.where('product_id',product_id);
        }
        if (store_id) {
          query = query.where('store_id', store_id);
        }

        query.then((prices) => {
        cb(null, prices, prices.length)
        })
        .catch(err => {
        return cb(err)
        })
    },

    getPriceByID: function(price_id, cb) {
      db.select('*').from('prices').where('id',price_id)
      .then((price) => {
        cb(null, price)
      })
      .catch(err => {
        return cb(err)
      })
    }

  };
}

