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
          return true;
        }
      }
      return false;
    },

    // THIS IS NOT GOOD BUT WE NEED TO DO LIKE THIS FOR THE DEMO DAY
    // THE CORRECT APPROACH HERE IT'S GO TO THE DATABASE WITH THE
    // NAME OF THE STORE AND GET THE COLOR NAME OF THE STORE BECAUSE
    // RIGHT NOW WE ACTUALLY IT'S NOT GET THE RIGHT INFORMATION.
    // EVEN IF WE CHANGE IN THE DATABASE IT WILL SHOW THE STORE COLOR
    // IN THE MAP CONSIDERING THIS FUNCTION AND NOT THE DATABASE INFORMATION
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