"use strict";

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    registerUser: function (userName, userEmail, userPassword, cb) {

      let checkEmail = db.select('id').from('users').where('email',userEmail);

      checkEmail.then((result) => {

        if (result.length > 0) {

          console.log('E-mail already exist');

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

    }

  };
}

