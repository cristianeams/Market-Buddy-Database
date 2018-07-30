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
    },

    getProductPrices: function(product_id, cb) {

      let average = 0;
      let query = 'select avg(price) as average from prices ';
      query += 'where product_id = ? group by product_id';
      db.raw(query,product_id)
      .then((result) => { average = result.rows[0].average })
      .catch(err => { average = 0 })

      db.select('*').from('prices').where('product_id',product_id)
      .then((products) => {
        cb(null, products, average, products.length)
      })
      .catch(err => {
        return cb(err)
      })
    }

  };
}

