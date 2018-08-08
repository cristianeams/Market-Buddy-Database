"use strict";

let request = require('request-promise');

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {

  return {

    containsAny: function(str, substrings) {
      for (var i = 0; i != substrings.length; i++) {
         var substring = substrings[i];
         if (str.indexOf(substring) != - 1) {
           return true;
         }
      }
      return false; 
    },

    checkIfExists: function(store_name, stores) {
      for (let i = 0; i < stores.length; i++) {
        if (store_name === stores[i].name) {
          //console.log(stores[i].name)
          return true;
        }
      }
      return false;
    },

    //getColorByStore: function(stores, result) {
      //let myResult = stores;

    getColorByStore: function(storeName) {

      let color = 'black';
      switch(storeName) {
        case 'Save on Foods':             color = '#0067FF';
                                          break;
        case 'IGA':                       color = '#2700FF';
                                          break;
        case 'Safeway':                   color = '#00FFCD';
                                          break;
        case 'Choices Market':            color = '#6044FC';
                                          break;
        case 'Costco':                    color = '#FF7E2A';
                                          break;
        case 'T & T Supermarket':         color = '#FFCB00';
                                          break;
        case 'Save On Meats':             color = '#FFB02A';
                                          break;
        case 'Chinatown Supermarket':     color = '#3C8AFC';
                                          break;
        case 'Urban Fare':                color = '#170194';
                                          break;
        case 'Whole Foods':               color = '#00886D';
                                          break;
        default:  color = 'black'
      }
      return color;

      // return new Promise((resolve, reject) => {
      //   //let color = 'black';
      //   db.select('color').from('stores').where('name',storeName)
      //     .then(row => {
      //       //color = resolve(row);
      //       //color = row[0].color
      //       resolve(row[0].color)
      //     })
      //     .catch(err => {
      //       // return 'black'
      //       reject(err)
      //     })
      //   //console.log(color)
      // });

      // for (let i = 0; i < stores.length; i++) {
      //   //console.log(stores[i].title, stores[i].color)
      //   db.select('color').from('stores').where('name',stores[i].title)
      //   .then((store)=>{
      //     if (store.length) {
      //       //console.log(store[0].color)
      //       myResult[i].color = store[0].color;
      //       //console.log(myResult[i].color)
      //       result(myResult)
      //     }
      //   })
      //   .catch((err)=>{
      //     //myResult[i].color = 'black';
      //     result('black')
      //   })
      // }

      //result(myResult);

      //console.log(myResult)
    },

    searchPlaces: function(position, cb) {

      let myPlaces = []
      let myStores = []
      let myPlacesUpdated = []

      let myUrl = 'https://places.cit.api.here.com/places/v1/autosuggest?at=' + position
      myUrl += '&q=supermarket&app_id=cEFnf8LIFrbMaPpViTgE&app_code=Fq_3xSNct4qJTbyTiJTMkg&app_id=cEFnf8LIFrbMaPpViTgE'

      let myRequest = request({
        "method":"GET", 
        "uri": myUrl,
        "json": true,
        "headers": {
          "User-Agent": "Mbuddy",
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then((result)=>{
        return result
      })
      .catch(err=>{
        return err
      })

      let myPromise = Promise.resolve(myRequest)

      db.select('*').from('stores')
      .then((result)=> {
        result.forEach(key=>{
          myStores.push({ name: key.name, color: key.color });
        })
        //myStores.push('Whole Foods Market');
        //console.log(myStores)
        myPromise.then((markets)=>{
          markets.results.forEach((key)=> {
            let place = {
              title: key.title,
              position: key.position,
              text: key.vicinity,
              color: this.getColorByStore(key.title)
              //color: 'black'
            }
            // //console.log('aquiiiiiii')
            // //console.log(this.checkIfExists(key.title,myStores))
            // if (this.checkIfExists(key.title,myStores)) {
            //   //console.log('ACHOU ===> ', key.title)
            //   //place.color = this.getColorByStore(key.title)
            //   //console.log(place.color)
            //   let myColor = this.getColorByStore(key.title)
            //   //console.log(myColor)
            //    let teste = Promise.resolve(myColor)
            //    teste.then((content)=>{
            //      //place.color = content[0].color
            //      //console.log(place.color)
            //      //console.log(content)
            //      myColor = content
            //      console.log(myColor)
            //    })
            //    .catch(err=>{
            //     myColor = 'black'
            //    })
            //    //console.log(myColor)
            // }
            myPlaces.push(place)
          })
          //console.log(myPlaces)
          //this.getColorByStore(myPlaces,(myPlacesUpdated))
          //console.log(myPlacesUpdated)
          cb(null,myPlaces)
        })
        .catch(err=>{
          return cb('Error loading map')
        })
      })
      .catch(err=>{
        return cb('Error loading map')
      })

    }

  };
}