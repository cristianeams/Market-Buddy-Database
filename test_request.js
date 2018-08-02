
var request = require('request-promise');

request({
  "method":"GET", 
  //"uri": "https://api.github.com/",
  "uri": "http://api.walmartlabs.com/v1/items?apiKey=zryzrajgzuzd5jphat78kqe9&upc=191565554913",
  "json": true,
  "headers": {
    "User-Agent": "My little demo app"
  }
}).then(console.log, console.log);
