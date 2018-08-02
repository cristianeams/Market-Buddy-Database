"use strict";

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    registerUser: function (userName, userEmail, userPassword, cb) {

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

      let checkUser = db.select('*').from('users').where('email',userEmail).orWhere('password',userPassword);

      checkUser.then((myUser) => {

        if (myUser) {

          let checkUserLists = db.select('*').from('lists').where('user_id',myUser.id);

          checkUserLists.then(lists => {
            let userLists = ['mylist'];
            if (lists) {
              cb(null, userLists);
            }
          })
          .catch(err => {
            return cb(err)
          })

        } else {
          return cb('Wrong email and/or password');
        }
      })
      .catch(err => {
        return cb(err)
      })

    }

  };
}

