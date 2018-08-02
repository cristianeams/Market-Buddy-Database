"use strict";

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    registerUser: function (userName, userEmail, userPassword, cb) {

      if (!userName || !userEmail || !userPassword) {
        return cb('Name, email and password must not be empty')
      }
      if (userEmail.indexOf('@') < 0) {
        return cb('Email must have an @ identifier')
      }

      let checkEmail = db.select('id').from('users').where('email',userEmail);

      checkEmail.then((result) => {
        if (result.length > 0) {
          return cb('E-mail already exist');
        } else {
          let userAvatar = 'https://api.adorable.io/avatars/285/' + userName + '.png';
          db('users')
          .returning('id')
          .insert({name: userName, email: userEmail, avatar: userAvatar, password: userPassword})
          .then((result)=> {
            cb(null,result)
          })
          .catch(err => {
            return cb(err)
          })
        }
      })
      .catch(err => {
        return cb(err)
      })

    },

    loginUser: function (userEmail, userPassword, cb) {

      if (!userEmail || !userPassword) {
        return cb('Email and password must not be empty')
      }

      let checkUser = db.select('*').from('users').where('email',userEmail).orWhere('password',userPassword);
      checkUser.then((myUser) => {
        if (myUser.length) {
          let checkUserLists = db.select('*').from('lists').where('user_id',myUser[0].id);
          checkUserLists.then(lists => {
            cb(null,lists)
          })
          .catch(err => {
            return cb(err)
          })
        } else {
          return cb("User don't exist");
        }
      })
      .catch(err => {
        return cb(err)
      })
    }

  };
}

