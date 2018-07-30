"use strict";

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    getStores: function(name, location, latitude, longitude, cb) {

        let query = db.select('*').from('stores');

        if (name) {
          query = query.where('name','ilike', '%' + name + '%');
        }
        if (location) {
          query = query.where('location','ilike', '%' + location + '%');
        }
        if (latitude) {
          query = query.where('latitude','ilike', '%' + latitude + '%');
        }
        if (longitude) {
          query = query.where('longitude','ilike', '%' + longitude + '%');
        }

        query.then((stores) => {
        cb(null, stores, stores.length)
        })
        .catch(err => {
        return cb(err)
        })
    },

    getStoreByID: function(store_id, cb) {
      db.select('*').from('stores').where('id',store_id)
      .then((store) => {
        cb(null, store, store.length)
      })
      .catch(err => {
        return cb(err)
      })
    },

    getStorePrices: function(store_id, cb) {

      let average = 0;
      let query = 'select avg(price) as average from prices ';
      query += 'where store_id = ? group by store_id';
      db.raw(query,store_id)
      .then((result) => { average = result.rows[0].average })
      .catch(err => { average = 0; })

      db.select('*').from('prices').where('store_id',store_id)
      .then((stores) => {
        cb(null, stores, average, stores.length)
      })
      .catch(err => {
        return cb(err)
      })
    },

    getStoreProducts: function(store_id, cb) {

      let query = 'select a.id as store_id, b.*,c.id as price_id, c.price as price ';
      query += 'from stores a, products b, prices c where ';
      query += 'a.id=c.store_id and b.id=c.product_id and a.id = ?';

      // db.select('*').from('prices').where('store_id',store_id)
      db.raw(query,store_id)
      .then((products) => {
        cb(null, products.rows, products.rowCount)
      })
      .catch(err => {
        return cb(err)
      })
    },

    getStoreProductsByID: function(store_id, product_id, cb) {

      let query = 'select a.id as store_id, b.*,c.id as price_id, c.price as price ';
      query += 'from stores a, products b, prices c where ';
      query += 'a.id=c.store_id and b.id=c.product_id and a.id = ? and b.id = ?';

      // db.select('*').from('prices').where('store_id',store_id)
      db.raw(query,[store_id, product_id])
      .then((product) => {
        cb(null, product.rows, product.rowCount)
      })
      .catch(err => {
        return cb(err)
      })
    }

  };
}

