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

    getColorByStore: function(storeName) {
      let color = 'white';
      switch(storeName) {
        case 'IGA': color = 'blue'
                    break;
        case 'Whole Foods': color = 'lightgreen';
                            break;
        default:  color = 'black'
      }
      return color;
    },

    searchPlaces: function(position, cb) {

      let myPlaces = []
      let myStores = []

      let myUrl = 'https://places.cit.api.here.com/places/v1/autosuggest?at=' + position
      myUrl += '&q=supermarket&app_id=cEFnf8LIFrbMaPpViTgE&app_code=Fq_3xSNct4qJTbyTiJTMkg'

      let myRequest = request({
        "method":"GET", 
        "uri": myUrl,
        "json": true,
        "headers": {
          "User-Agent": "Mbuddy"
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
          myStores.push(key.name);
        })
        myStores.push('Whole Foods Market');
        myPromise.then((markets)=>{
          markets.results.forEach((key)=> {
              let place = {
                title: key.title,
                position: key.position,
                text: key.vicinity,
                color: this.getColorByStore(key.title)
              }
              myPlaces.push(place)
          })
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