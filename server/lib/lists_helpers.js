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

    // insert voter information to db
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

    getPriceOfProductByStore: function(product_id) {
      let myQuery = 'select a.*,c.price from stores a, products b, prices c ';
      myQuery += 'where a.id=c.store_id and b.id=c.product_id and b.id = ?';
      return new Promise((resolve, reject) => {
        db.raw(myQuery, product_id)
        .then((store)=> {
          resolve(store)
        })
        .catch(err=>{
          reject(err)
        })
      });
    },

    getProductPrices: function(list, cb) {
      let myResult = list;
      let myPrices = list.forEach((key)=>{
        let prices = this.getPriceOfProductByStore(key.id)
        let myPrices = Promise.resolve(prices)
        myPrices.then((content)=>{
          // //console.log(content.rows)
          // console.log('ARRAY DE PRECOS => ', key.prices)
          // console.log('MEU RESULTADO ===> ', myResult)
          // myResult.key.prices = content.rows
          // //return cb(null,content.rows)
          //console.log(myResult[key].prices.psuh)
          // myResult.key.prices.push(content.rows)
          console.log(key)
          return cb(null, myResult)
        })
        // console.log(myPrices)
        // return cb(null,key)

        //console.log(key)
        // let prices = this.getPriceOfProductByStore(key.id)
        // let myPrices = Promise.resolve(prices)
        // //console.log(myPrices)
        // //console.log(myPrices)
        // myPrices.then((content)=>{
        //   myResult[key].prices = content.rows
        //   // cb(null,myResult)
        //   //console.log(content)
        //   return Promise.all(myResult)
        // })
        // .catch(err=>{
        //   return cb('Error retrieving prices')
        // })
      })
      return myPrices;
      //cb(null,myResult)
    },

    getListByID: function(list_id, cb) {

      let myFinalList = [];
      let myProducts = [];

      let query = 'select a.id as list_id, a.name as list_name, a.created_at as list_created_at, c.*, b.quantity, ';
      query += 'd.id as user_id from lists a, entries b, products c, users d where ';
      query += 'a.id=b.list_id and c.id=b.product_id and a.user_id=d.id and a.id = ?';

      db.raw(query, list_id)
      .then((list) => {

        let myListWithProducts = {
          id: list.rows[0].list_id,
          name: list.rows[0].list_name,
          user: list.rows[0].user_id,
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
            updated_at: list.rows[i].updated_at,
            quantity: list.rows[i].quantity
            //prices: this.getPriceOfProductByStore(list.rows[i].id)
            //prices: []
          }

          // let isso = this.getPriceOfProductByStore(list.rows[i].id)
          // let teste = Promise.resolve(isso)
          // teste.then((content)=>{
          //   // myProduct['prices'] = content.rows
          //   // //console.log(myProduct)
          //   // //myListWithProducts.products.push(myProduct)
          //   // //cb(null, myListWithProducts, myTotalProducts)
          //   // //console.log(myProduct)
          //   // myProducts.push(myProduct)
          //   // return myProducts
          //   // return cb(null,content)
          //   myProducts.push('teste')
          // })
          // .catch(err=>{
          //   return cb(err)
          // })
          // console.log('MEUS PRODUTOS ===> ', myProducts)


          myListWithProducts.products.push(myProduct)
        }
        // console.log('MEUS PRODUTOS ===> ', myProducts)
        let myTotalProducts = myListWithProducts['products'].length
        // for (let i = 0; i < myTotalProducts; i++ ) {
        //   let myProduct = myListWithProducts['products'][i].id
        //   let myQuery = 'select a.*,c.price from stores a, products b, prices c ';
        //   myQuery += 'where a.id=c.store_id and b.id=c.product_id and b.id = ?';
        //   db.raw(myQuery, myProduct)
        //   .then((store)=> {
        //     myListWithProducts['products'][i].stores.push(store.rows)
        //     console.log(myListWithProducts['products'][i].stores)
        //   })
        //   .catch(err=>{
        //     return cb(err)
        //   })
        //   // console.log(myListWithProducts['products'][i].stores)
        // }
        // console.log(myFinalList)
        cb(null, myListWithProducts, myTotalProducts)
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

    getListWithTotals: function(list_id, cb) {
      //let query = 'select store_id,sum(price*quantity) from store_prices where list_id = ? group by store_id;'
      let query = 'select store_id,product_id,price,quantity from store_prices where list_id = ?'
      db.raw(query, list_id)
      .then((totals) => {
        //console.log(totals.rows)
        cb(null, totals.rows)
      })
      .catch(err => {
        return cb(err)
      })
    },

    // insert voter information to db
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

    // insert voter information to db
    deleteEntries: function (list_id) {
      return new Promise((resolve, reject) => {
        db('entries').where('list_id',list_id).delete()
          .then(row => {
            resolve(row);
          })
          .catch(err => {
            reject(err)
          })
      });
    },

    // FUNCTION TO CREATE A NEW LIST
    createList: function (listName, userID, listProducts, listID, cb) {
      if (!listName) {
        return cb('List name must not be empty')
      }
      //IF THE LIST IS NEW WE SAVE THIS LIST AND ENTRIES IN THE DATABASE
      if (!listID) {
        db('lists').returning('id').insert({name:listName, user_id:userID})
        .then((result) => {
          listProducts.forEach((key) => {
            this.insertEntries(key.quantity, result[0], key.id)
          })
          cb(null,result[0])
        })
        .catch(err => {
          return cb('Error creating new list. Try again later.')
        })
      // IF THE LIST ALREADY EXIST, WE JUST UPDATE THE PRODUCTS AND QUANTITIES
      } else {
        this.deleteEntries(listID)
        listProducts.forEach((key) => {
          this.insertEntries(key.quantity, listID, key.id)
        })
        cb(null,listID)
      }

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

