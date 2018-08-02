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
      return result;
    },

    // FUNCTION TO ADD THE ITEMS OF THE RESULT OF BUYCOTT API
    addBuycottItems: function(content) {
      let result = [];
      let newItem = {};
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
      return result;
    },

    // FUNCTION TO MOUNT THE CORRECT API URL BASED ON THE COMPANY, KEY AND QUERYSTRINGS
    mountApiUrl: function(name, upc, company) {

      let returnApiUrl = '';

      //wallmart api
      let wmart_upc = process.env.WMART_UPC + 'apiKey=' + process.env.WMART_USER_KEY + '&upc=' + upc;
      let wmart_search = process.env.WMART_SEARCH + 'query=' + name + '&format=json&apiKey=' + process.env.WMART_USER_KEY;

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
        //let newItem = {};

        // WALLMART API INFOS
        // 1 - We don't have EAN number, just UPC and modelNumber, so EAN always receive 0
        // 2 - We have 3 images for each product
        // 3 - Categories can be more than one and are separated by slash (/) so we need to use arrays here
        if (company === 'wallmart') {

          //console.log(body);

          result = this.addWallmartItems(body.items);

          // for (let i=0; i < body.items.length; i++) {

          //   let itemCategories = body.items[i].categoryPath;
          //   let arrayCategories = itemCategories.split('/');

          //   // if we have more than one category and they are
          //   // separated by slash (/) we create an array for that
          //   // if dont we just use the first one
          //   if (itemCategories.indexOf('/')) {
          //     itemCategories = arrayCategories;
          //   }

          //   newItem = {
          //     name: body.items[i].name,
          //     upc: body.items[i].upc,
          //     ean: 0,
          //     price: body.items[i].salePrice,
          //     image_s: body.items[i].thumbnailImage,
          //     image_m: body.items[i].mediumImage,
          //     image_l: body.items[i].largeImage,
          //     brand: body.items[i].brandName,
          //     category: itemCategories
          //   }
          //   result.push(newItem);
          // }

        }

        if (company === 'buycott') {

          // console.log(body);

          result = this.addBuycottItems(body.products);

          // for (let i=0; i < body.products.length; i++) {
          //   newItem = {
          //     name: body.products[i].product_name,
          //     upc: body.products[i].product_gtin,
          //     ean: 0,
          //     price: 0,
          //     image_s: body.products[i].product_image_url,
          //     image_m: body.products[i].product_image_url,
          //     image_l: body.products[i].product_image_url,
          //     brand: body.products[i].brand_name,
          //     category: body.products[i].category_name
          //   }
          //   result.push(newItem);
          // }

        }

        // ITEMDB
        if (company === 'itemdb') {

          //console.log(body);

          result = this.addItemDbItems(body.items);

          // for (let i=0; i < body.items.length; i++) {

          //   let itemImage = '';

          //   if (body.items[i].images.length) {
          //     itemImage = body.items[i].images[0];
          //   }

          //   newItem = {
          //     name: body.items[i].title,
          //     upc: body.items[i].upc,
          //     ean: body.items[i].ean,
          //     price: body.items[i].lowest_recorded_price,
          //     image_s: itemImage,
          //     image_m: itemImage,
          //     image_l: itemImage,
          //     brand: body.items[i].brand,
          //     category: 1
          //   }
          //   result.push(newItem);
          // }

        }

        return result;

      })
      .catch(error=> { console.log(error) } )
    },

    // WALLMART API TESTs
    // http://localhost:7000/apis?api=wallmart&upc=035000521019
    // http://localhost:7000/apis?api=wallmart&name=honey

    // BUYCOTT API TESTs
    // https://buycott.com/api/v4/products/lookup?barcode=091796289526&access_token=l6lsjILcsOX9KoRF3hsYIzM7GwHvaLTf73bMZOfZ
    // https://buycott.com/api/v4/products/search?q=honey&type=product&access_token=l6lsjILcsOX9KoRF3hsYIzM7GwHvaLTf73bMZOfZ


    // UPCITEMDB API TESTs
    // https://api.upcitemdb.com/prod/trial/search?s=liquid%20honey&match_mode=0&type=product
    // https://api.upcitemdb.com/prod/trial/lookup?upc=051500051955


    // FUNCTION THAT SEARCH FOR THE API OF ONE OF THE OPTIONS THAT
    // WE HAVE (wallmart, itemdb or buycott) WITH NAME AND/OR UPC
    // AS QUERYSTRING AND RETURN THE RESULT IN JSON CONTENT
    getAPIbyCompany: function(api, name, upc, cb) {

      let apiFullUrl = '';
      let apiResult = '';
      let apiResolve = '';

      apiFullUrl = this.mountApiUrl(name, upc, api);
      apiResult = this.myApiRequest(apiFullUrl,api);
      apiResolve = Promise.resolve(apiResult);
      apiResolve.then(function(content){
        cb(null,content);
      });

    },

    // FUNCTION THAT SEARCH FOR ALL APIS IN THE SAME MOMENT, FIRST
    // FOR itemdb, THEN wallmart AND THEN buycott, AND ALWAYS
    // RETURN THE INFORMATION THAT WE NEED TO USE/SAVE IN OUR 
    // DATABASE
    getAPIs: function(name, upc, cb) {

      let apiFullUrl = '';
      let apiResult = '';
      let apiResolve = '';
      let errorMessage = '';
      
      // we start with itemdb API
      let api = 'itemdb';

      // we get the itemdb API results
      apiFullUrl = this.mountApiUrl(name, upc, api);
      apiResult = this.myApiRequest(apiFullUrl,api);
      apiResolve = Promise.resolve(apiResult);
      apiResolve.then(function(content){
        console.log(content.length);
      })
      .catch(err => {
        return cb(err)
        })

    }

  };
}

/* =============================================
OTHER TESTS IN ALL APIS

1) Mesmo produto em todas as APIs (upc = 073299052203)

2) procurar por APPLE no itemdb nao retorna item, logo, tem que ir pro wallmart, achar as opcoes e devolver,
ignorando o erro do itemdb

3) procurar pelo upc = 090802113459 no itemdb retorna um item incompleto, logo
ele precisa ser preenchido totalmente ou quase totalmente pelas outras duas APIs

================================================ */

