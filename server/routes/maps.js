"use strict";

const express    = require('express');
const mapRoutes  = express.Router();

module.exports = function(DataHelpers) {

  mapRoutes.get("/", function(req, res) {

    let myPosition = req.query.at;
    let positions = myPosition.split(',');
    let latitude = positions[0];
    let longitude = positions[1];

    DataHelpers.searchPlaces(myPosition, (err, result) => {
      if (err) {
        res.status(201).send(err)
      } else {
        res.status(201).render("map", { places: result, latitude: latitude, longitude: longitude  })
      }
    })

  });

  return mapRoutes;

}
