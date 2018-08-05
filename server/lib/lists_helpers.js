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
    },

    getListStores: function(list_id, cb) {
      db.select('*').from('lists').where('id',list_id)
      .then((list) => {
        console.log(list[0].id)
      })
      .catch(err => {
        return cb(err)
      })
    },

    // insert voter information to tb
    insertEntries: function (quantity, list_id, product_id) {
      return new Promise((resolve, reject) => {
        db('entries').insert({quantity:quantity, list_id:list_id, product_id:product_id})
          .then(row => {
            resolve(row);
          })
          .catch(err => {
            reject(err)
          })
      });
    },

    // FUNCTION TO CREATE A NEW LIST
    createList: function (listName, userID, listProducts, cb) {
      if (!listName) {
        return cb('List name must not be empty')
      }
      db('lists').returning('id').insert({name:listName, user_id:userID})
      .then((result) => {
        listProducts.forEach((key) => {
          this.insertEntries(key.quantity, result[0], key.product.id)
        })
        .catch(err => {
          return cb('Error creating new entry for current List. Try again later.')
        })
        cb(null,result)
      })
      .catch(err => {
        return cb('Error creating new list. Try again later.')
      })
    },

    // FUNCTION TO DELETE A LIST
    deleteList: function (listID, cb) {
      db('lists').where('id',listID).delete()
      .then((result) => {
        cb(null,result)
      })
      .catch(err => {
        return cb('Error deleting list. Try again later.')
      })
    }

  };
}

