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
      let userConfirmedPassword = myUser.user.confirmPassword;

      DataHelpers.registerUser(userName, userEmail, userPassword, userConfirmedPassword, (err, user_id) => {
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
      let userEmail = myUser.user.email;
      let userPassword = myUser.user.password;

      DataHelpers.loginUser(userEmail, userPassword, (err, user, lists) => {
        if (err) {
          res.status(201).send(err);
        } else {
          res.status(201).json({ user, lists });
        }
      });

    });

  });

  // ROUTE TO LOGIN A USER
  usersRoutes.post("/edit", function(req, res) {

    req.on('data',function(result){

      let myUser = JSON.parse(result);
      let userName = myUser.name;
      let userAvatar = myUser.avatar;
      let userPoints = myUser.points;

      // let randomNumber = Math.floor(Math.random() * 10);
      // let randomName = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

      let userInfo = {
        id: myUser.id,
        name: userName,
        avatar: userAvatar,
        points: userPoints
      }

      DataHelpers.editUser(userInfo, (err, result) => {
        if (err) {
          res.status(201).send(err);
        } else {
          res.status(201).send(result);
        }
      });

    });

  });

  return usersRoutes;

}
