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
        cb(null, store)
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

      db.select('*').from('prices').where('store_id',store_id)
      .then((stores) => {
        cb(null, stores, average)
      })
      .catch(err => {
        return cb(err)
      })
    }

  };
}

