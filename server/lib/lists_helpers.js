"use strict";

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    getLists: function(name, cb) {

        let query = db.select('*').from('lists');

        if (name) {
          query = query.where('name','ilike', '%' + name + '%');
        }

        query.then((lists) => {
        cb(null, lists, lists.length)
        })
        .catch(err => {
        return cb(err)
        })
    },

    getListByID: function(list_id, cb) {

      let query = 'select a.id as list_id, a.name as list_name, a.total, a.created_at as list_created_at, c.* ';
      query += 'from lists a, entries b, products c where ';
      query += 'a.id=b.list_id and c.id=b.product_id and a.id = ?';

      db.raw(query, list_id)
      .then((list) => {
        let myListWithProducts = {
          id: list.rows[0].list_id,
          name: list.rows[0].list_name,
          total: list.rows[0].total,
          created_at: list.rows[0].list_created_at,
          updated_at: list.rows[0].updated_at,
          products: []
        }
        for (let i = 0; i < list.rows.length; i++ ) {
          let myProduct = {
            id: list.rows[i].id,
            name: list.rows[i].name,
            upc: list.rows[i].upc,
            ean: list.rows[i].ean,
            image: list.rows[i].image,
            brand: list.rows[i].brand,
            category_id: list.rows[i].category_id,
            created_at: list.rows[i].created_at,
            updated_at: list.rows[i].updated_at
          }
          myListWithProducts.products.push(myProduct)
        }
        cb(null, myListWithProducts, 3)
      })
      .catch(err => {
        return cb(err)
      })
    },

    getListProducts: function(list_id, cb) {
      db.select('*').from('entries').where('list_id',list_id)
      .then((entries) => {
        cb(null, entries, entries.length)
      })
      .catch(err => {
        return cb(err)
      })
    }

  };
}

