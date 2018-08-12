"use strict";

let request = require('request-promise');

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {

  return {

    // FUNCTION TO ADD THE ITEMS OF THE RESULT OF WALLMART API
    // if we have more than one category and they are
    // separated by slash (/) we create an array for that
    // if dont we just use the first one
    addWallmartItems: function(content) {
      let result = [];
      let newItem = {};
      if (content) {
        for (let i=0; i < content.length; i++) {
          let itemCategories = content[i].categoryPath;
          let arrayCategories = itemCategories.split('/');
          if (itemCategories.indexOf('/')) {
            itemCategories = arrayCategories;
          }
          newItem = {
            name: content[i].name,
            upc: content[i].upc,
            ean: 0,
            price: content[i].salePrice,
            image_s: content[i].thumbnailImage,
            image_m: content[i].mediumImage,
            image_l: content[i].largeImage,
            brand: content[i].brandName,
            category: itemCategories
          }
          result.push(newItem);
        }
      }
      return result;
    },

    // FUNCTION TO ADD THE ITEMS OF THE RESULT OF ITEMDB API
    // 1 - We have lowest_recorded_price and highest_recorded_price
    // 2 - We have a array of images in items.images and we need to test 
    // if image exist and if its true, get the first one
    // 3 - We dont have categories so by default all products go to category 1 (general)
    addItemDbItems: function(content) {
      let result = [];
      let newItem = {};
      if (content) {
        for (let i=0; i < content.length; i++) {
          let itemImage = '';
          if (content[i].images.length) {
            itemImage = content[i].images[0];
          }
          newItem = {
            name: content[i].title,
            upc: content[i].upc,
            ean: content[i].ean,
            price: content[i].lowest_recorded_price,
            image_s: itemImage,
            image_m: itemImage,
            image_l: itemImage,
            brand: content[i].brand,
            category: 1
          }
          result.push(newItem);
        }
      }
      return result;
    },

    // FUNCTION TO ADD THE ITEMS OF THE RESULT OF BUYCOTT API
    addBuycottItems: function(content) {
      let result = [];
      let newItem = {};
      if (content) {
        for (let i=0; i < content.length; i++) {
          newItem = {
            name: content[i].product_name,
            upc: content[i].product_gtin,
            ean: 0,
            price: 0,
            image_s: content[i].product_image_url,
            image_m: content[i].product_image_url,
            image_l: content[i].product_image_url,
            brand: content[i].brand_name,
            category: content[i].category_name
          }
          result.push(newItem);
        }
      }
      return result;
    },

    // FUNCTION TO MOUNT THE CORRECT API URL BASED ON THE COMPANY, KEY AND QUERYSTRINGS
    mountApiUrl: function(name, upc, company) {

      let returnApiUrl = '';

      //wallmart api
      let wmart_upc = process.env.WMART_UPC + 'apiKey=' + process.env.WMART_USER_KEY + '&upc=' + upc + '&numItems=25';
      let wmart_search = process.env.WMART_SEARCH + 'query=' + name + '&numItems=25&format=json&apiKey=' + process.env.WMART_USER_KEY;

      //buycott api
      let bcott_upc = process.env.BCOTT_UPC + 'barcode=' + upc + '&access_token=' + process.env.BCOTT_TOKEN;
      let bcott_search = process.env.BCOTT_SEARCH + 'q=' + name + '&type=product&access_token=' + process.env.BCOTT_TOKEN;

      //itemdb api
      let itemdb_upc = process.env.ITEMDB_UPC + 'upc=' + upc;
      let itemdb_search = process.env.ITEMDB_SEARCH + 's=' + name + '&match_mode=0?type=product';

      if (company === 'wallmart') {
        if (upc) {
          returnApiUrl = wmart_upc;
        } else if (name) {
          returnApiUrl = wmart_search;
        }
      }

      if (company === 'buycott') {
        if (upc) {
          returnApiUrl = bcott_upc;
        } else if (name) {
          returnApiUrl = bcott_search;
        }
      }

      if (company === 'itemdb') {
        if (upc) {
          returnApiUrl = itemdb_upc;
        } else if (name) {
          returnApiUrl = itemdb_search;
        }
      }

      return returnApiUrl;

    },

    // FUNCTION TO DO THE HTTP REQUEST TO THE API URL ALREADY MOUNTED
    // AND AFTER RETRIEVE THE CONTENT SHOW THE RESULTS BASED ON
    // THE API DEFINED IN THE QUERYSTRING
    myApiRequest: function (myUrl, company) {
      return request({
        "method":"GET", 
        "uri": myUrl,
        "json": true,
        "headers": {
          "User-Agent": "Mbuddy"
        }
      })
      .then(body=>{

        let result = [];

        // WALLMART API INFOS
        // 1 - We don't have EAN number, just UPC and modelNumber, so EAN always receive 0
        // 2 - We have 3 images for each product
        // 3 - Categories can be more than one and are separated by slash (/) so we need to use arrays here
        if (company === 'wallmart') {
          result = this.addWallmartItems(body.items);
        }

        // BUYCOTT API INFOS
        // 1 - We can use just to search by UPC. We need to pay for use the names search
        // 2 - We have almost everything. We don't have the price
        if (company === 'buycott') {
          result = this.addBuycottItems(body.products);
        }

        // ITEMDB API INFOS
        // 1 - We don't have the category but almost everything it's equal with wallmart and that's very good
        if (company === 'itemdb') {
          result = this.addItemDbItems(body.items);
        }

        return result;

      })
      .catch(error=> {
        let myError = { error: 'Item not found' }
        return myError
      } )
    },

    // WALLMART API TESTs
    // http://localhost:7000/apis?api=wallmart&upc=035000521019
    // http://localhost:7000/apis?api=wallmart&name=honey

    // BUYCOTT API TESTs
    // https://buycott.com/api/v4/products/lookup?barcode=091796289526&access_token=<your_token>
    // https://buycott.com/api/v4/products/search?q=honey&type=product&access_token=<your_token>


    // UPCITEMDB API TESTs
    // https://api.upcitemdb.com/prod/trial/search?s=liquid%20honey&match_mode=0&type=product
    // https://api.upcitemdb.com/prod/trial/lookup?upc=051500051955


    // FUNCTION THAT SEARCH FOR THE API OF ONE OF THE OPTIONS THAT
    // WE HAVE (wallmart, itemdb or buycott) WITH NAME AND/OR UPC
    // AS QUERYSTRING AND RETURN THE RESULT IN JSON CONTENT
    getAPIbyCompany: function(api, name, upc, cb) {
      let apiResolve = '';
      let callApi = this.callAllApis(api, name, upc)
      apiResolve = Promise.resolve(callApi);
      apiResolve.then((content) => {
        cb(null, content)
      });
    },

    // BASIC PROCEDURES THAT WE NEED TO USE ALL THE TIME THAT WE
    // USE SOME API SO WE A FUNCTION FOR THAT
    callAllApis: function(api, name, upc) {
      let apiFullUrl = '';
      let apiResult = '';
      let apiResolve = '';
      apiFullUrl = this.mountApiUrl(name, upc, api);
      apiResult = this.myApiRequest(apiFullUrl,api);
      apiResolve = Promise.resolve(apiResult);
      return apiResolve
    },


    // FUNCTION THAT SEARCH FOR UPC CODE IN ALL APIS IN THE SAME MOMENT,
    // FIRST FOR wallmart, THEN buycott AND THEN itemdb, AND ALWAYS
    // RETURN THE INFORMATION THAT WE NEED TO USE/SAVE IN OUR 
    // DATABASE
    getAPIsByUPC: function(upc, cb) {

      let wallmartApiResolve = '';
      let buycottApiResolve = '';
      let itemdbApiResolve = '';

      let wallmart = this.callAllApis('wallmart', null, upc)
      wallmartApiResolve = Promise.resolve(wallmart);
      wallmartApiResolve.then((resultA) => {
        if (resultA && !resultA.error) {
          console.log("wallmart founded! let's display it...")
          cb(null, resultA)
        } else {
          console.log("wallmart couldn't. Let's try buycott...")
          let buycott = this.callAllApis('buycott',null, upc)
          buycottApiResolve = Promise.resolve(buycott);
          buycottApiResolve.then((resultB)=> {
            if (resultB && !resultB.error) {
              console.log("buycott founded! let's display it...")
              cb(null, resultB)
            } else {
              console.log("buycott couldn't too... Last try, with itemDB...")
              let itemdb = this.callAllApis('itemdb',null, upc)
              itemdbApiResolve = Promise.resolve(itemdb);
              itemdbApiResolve.then((resultC) => {
                if (resultC && !resultC.error) {
                  console.log("itemDB founded! let's display it...")
                  cb(null, resultC)
                } else {
                  console.log("ItemDB couldn't too. So we don't have this product. Sorry.")
                  return cb('Item not found')
                }
              })
            }
          })
        }
      })

    },

    // SAME getAPIsByUPC LOGIC BUT SEARCHING BY NAME INSTEAD
    getAPIsByName: function(name, cb) {

      let wallmartApiResolve = '';
      let buycottApiResolve = '';
      let itemdbApiResolve = '';

      let wallmart = this.callAllApis('wallmart', name, null)
      wallmartApiResolve = Promise.resolve(wallmart);
      wallmartApiResolve.then((resultA) => {
        if (resultA && !resultA.error) {
          console.log("wallmart founded! let's display it...")
          resultA.forEach((key)=>{
            console.log(key)
          })
          cb(null, resultA)
        } else {
          console.log("wallmart couldn't. Let's try buycott...")
        }
      })
      .catch(err=>{
        return cb('No product founded')
      })

    },

    // INSERT A NEW PRODUCT IN THE DATABASE SEARCHING
    // BY NAME ONLY IN WALLMART API BECAUSE IT IS THE
    // MOST COMPLETED API THAT WE HAVE. ITEMDB IS A NICE
    // OPTION TOO AND BUYCOOT WE NEED TO PAY TO USE IT IN THE BEST WAY
    insertApiEntries: function (name, upc, ean, image, price) {
      return new Promise((resolve, reject) => {

        let checkUpc = upc;
        let checkEan = ean;

        if (!upc) {
          checkUpc = '0';
        }
        if (!ean) {
          checkEan = '0';
        }

        db('products').insert({name:name, upc:checkUpc, ean:checkEan, image:image, 
          brand:'from_wallmart', category_id:1, base_price: price })
          .then(row => {
            resolve(row);
            let myLog = '✅ INSERTED ===> ' + name + ' exist in our database. Test it.'
            console.log(myLog)
          })
          .catch(err => {
            reject(err)
            let myLog = '❌ error ===> ' + name
            console.log(myLog)
          })
      });
    },

    // Do data insert in our database from Apis by name
    populateDatabaseFromApis: function(name, cb) {
      let wallmartApiResolve = '';
  
      let wallmart = this.callAllApis('wallmart', name, null)
      wallmartApiResolve = Promise.resolve(wallmart);
      wallmartApiResolve.then((resultA) => {
        if (resultA && !resultA.error) {
          console.log("wallmart founded! let's display it...")
          resultA.forEach((key)=>{
            this.insertApiEntries(key['name'], key['upc'], key['ean'], key['image_m'], key['price'])
          })
          console.log('Products inserted in the database. Check it.')
          cb(null,resultA)
        } else {
          console.log("wallmart couldn't. Let's try buycott...")
        }
      })
    },

    // FUNCTION TO CREATE SORTED PRICES BETWEEN SOME BASE PRICE THAT YOU
    // PASS TO IT. THIS FUNCTION WAS USED AFTER THE PRODUCT CREATION BECAUSE
    // IN THIS PROJECT WE NEED A PRICE FOR EACH STORE AND IN A REAL PROJECT
    // WOULD BE COMPLETELY DIFFERENT.
    // EXAMPLE: IF YOU HAVE A PRODUCT WITH BASE_PRICE = 5 CADS THIS FUNCTION
    // WILL RETURN TO YOU A NUMBER BETWEEN 4 AND 6 (LINES 358/359) AND
    // FOR THE CENTS WE FIND A RANDOM NUMBER BETWEEN 1 AND 99 (LINES 361/362)
    getRangedPrices: function(basePrice) {

      let numberSplit = basePrice.split('.');

      let lowPrice = Number(numberSplit[0]) - 1;
      let maxPrice = Number(numberSplit[0]) + 1;

      let myDecimalNumber = Math.floor(Math.random() * 99) + 1;
      let myNumber = Math.floor(Math.random() * (maxPrice - lowPrice + 1)) + lowPrice;

      let myReturnPrice = myNumber.toString() + '.' + myDecimalNumber.toString();

      return Number(myReturnPrice);

    },

    // insert price information in DB
    insertPrice: function (myQuery) {
      return new Promise((resolve, reject) => {
        db.raw(myQuery)
          .then(row => {
            resolve(row);
            let myLog = '✅ INSERTED PRICE in our database. Test it.'
            console.log(myLog)
          })
          .catch(err => {
            reject(err)
            let myLog = '❌ error ===> ' + err
            console.log(myLog)
          })
      });
    },

    // Update prices until product ID only for the product that dont have price
    updateProductPrices: function(untilProductID, cb) {

      let myPrice = 0;

      let myQuery = 'select a.id,a.base_price from products a left join prices b on ';
      myQuery += 'a.id=b.product_id where b.product_id is null and a.id <= ?';

      db.raw(myQuery, untilProductID)
      .then((result)=>{
        result.rows.forEach((product)=>{
          for (let i = 1; i <= 10; i++) {
            if (product.id <= untilProductID) {
              myPrice = this.getRangedPrices(product.base_price)
              let sqlQuery = 'insert into prices (price, product_id, store_id) '
              sqlQuery += 'values (' + myPrice + ',' + product.id + ',' + i + ')'
              this.insertPrice(sqlQuery)
            }
          }
        })
        cb(null,result)
      })
      .catch(err=>{
        return cb('No products founded')
      })
    }



  };
}

/* =============================================
OTHER TESTS IN ALL APIS
1) Same product in all APIs result (upc = 073299052203)
2) If we search for APPLE (for example) in ITEMDB API we don't retrieve any result and so we need to
go to WALLMART API, find the options and return, ignoring that we couldn't find it at ITEMDB API
3) Search for UPC 090802113459 in ITEMDB we have an incomplete item and so we need to search for
the next API to get the info that we still don't have

// http://localhost:7000/apis?api=itemdb&upc=090802113459
// http://localhost:7000/apis?api=wallmart&name=honey
// http://localhost:7000/apis?api=buycott&upc=090802113459
// http://localhost:7000/apis/all?name=apple
================================================ */
