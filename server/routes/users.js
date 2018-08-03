"use strict";

const express       = require('express');
const usersRoutes  = express.Router();

module.exports = function(DataHelpers) {

  // ROUTE TO REGISTER THE NEW USER
  usersRoutes.post("/register", function(req, res) {

    req.on('data',function(result){

      let myUser = JSON.parse(result);
      let userName = myUser.user.name;
      let userEmail = myUser.user.email;
      let userPassword = myUser.user.password;

      DataHelpers.registerUser(userName, userEmail, userPassword, (err, user_id) => {
        if (err) {
          res.status(201).send(err);
        } else {
          res.status(201).json({ id: user_id });
        }
      });

    });

  });

  // ROUTE TO LOGIN A USER
  usersRoutes.post("/login", function(req, res) {
    
    req.on('data',function(result){

      let myUser = JSON.parse(result);
      let user = JSON.parse(myUser.user);
      let userEmail = user.email;
      let userPassword = user.password;

      DataHelpers.loginUser(userEmail, userPassword, (err, user, lists) => {
        if (err) {
          res.status(201).send(err);
        } else {
          res.status(201).json({ user, lists });
        }
      });

    });

  });

  return usersRoutes;

}
