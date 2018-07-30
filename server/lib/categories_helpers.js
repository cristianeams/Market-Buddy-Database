"use strict";

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    getCategories: function(name, cb) {

        let query = db.select('*').from('categories');

        if (name) {
          query = query.where('name','ilike', '%' + name + '%');
        }

        query.then((categories) => {
        cb(null, categories, categories.length)
        })
        .catch(err => {
        return cb(err)
        })
    },

    getCategoryByID: function(category_id, cb) {
      db.select('*').from('categories').where('id',category_id)
      .then((category) => {
        cb(null, category, category.length)
      })
      .catch(err => {
        return cb(err)
      })
    },

    getCategoryProducts: function(category_id, cb) {
      db.select('*').from('products').where('category_id',category_id)
      .then((categories) => {
        cb(null, categories, categories.length)
      })
      .catch(err => {
        return cb(err)
      })
    }

  };
}

