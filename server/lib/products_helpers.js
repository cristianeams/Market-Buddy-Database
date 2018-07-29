"use strict";

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    getProducts: function(name, upc, ean, cb) {

        let query = db.select('*').from('products');

        if (name) {
          query = query.where('name','ilike', '%' + name + '%');
        }
        if (upc) {
          query = query.where('upc', upc);
        }
        if (ean) {
          query = query.where('ean', ean);
        }

        query.then((products) => {
        cb(null, products, products.length)
        })
        .catch(err => {
        return cb(err)
        })
    },

    getProductByID: function(product_id, cb) {
      db.select('*').from('products').where('id',product_id)
      .then((product) => {
        cb(null, product, product.length)
      })
      .catch(err => {
        return cb(err)
      })
    }

  };
}

