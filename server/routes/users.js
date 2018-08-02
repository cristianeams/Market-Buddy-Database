"use strict";

const express       = require('express');
const usersRoutes  = express.Router();
const bodyParser = require("body-parser");

module.exports = function(DataHelpers) {

  // ROUTE TO REGISTER THE NEW USER
  usersRoutes.post("/register", function(req, res) {
    
    req.on('data',function(result){

      let myUser = JSON.parse(result);
      //console.log("toString ", JSON.parse(result));
      let userName = myUser.user.name;
      let userEmail = myUser.user.email;
      let userPassword = myUser.user.password;

      //console.log(userName, userEmail, userPassword);

      DataHelpers.registerUser(userName, userEmail, userPassword, (err, user_id) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(201).send(user_id);
        }
      });

    });

    
    // console.log(req.user);
    //console.log(JSON.parse(Object.keys(req.body)));
    //console.log(res);
    //console.log(next);

    // DataHelpers.getStores(name, location, latitude, longitude, (err, stores, total) => {
    //   if (err) {
    //     res.status(500).json({ error: err.message });
    //   } else {
    //     // let myTotal = { total: total };
    //     // stores.unshift(myTotal);
    //     if (total) {
    //       res.status(201).json(stores);
    //     } else {
    //       res.status(500).json({ error: 'Store not found' });
    //     }
    //   }
    // });

  });

  return usersRoutes;

}
