"use strict";

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // FUNCTION TO REGISTER A NEW USER
    registerUser: function (userName, userEmail, userPassword, userConfirmedPassword, cb) {

      if (!userName || !userEmail || !userPassword) {
        return cb('Name, email and password must not be empty')
      }
      if (userEmail.indexOf('@') < 0) {
        return cb('Email must have an @ identifier')
      }

      if (userPassword != userConfirmedPassword) {
        return cb('Passwords must match')
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
            let myRegisteredUser = {
              id: result[0],
              name: userName,
              email: userEmail,
              avatar: userAvatar,
              points: 0
            }  
            cb(null,myRegisteredUser)
          })
          .catch(err => {
            return cb('Error creating new user. Try again later.')
          })
        }
      })
      .catch(err => {
        return cb('Error checking email in database. Try again later.')
      })

    },

    // FUNCTION TO LOGIN AN EXISTING USER
    loginUser: function (userEmail, userPassword, cb) {

      if (!userEmail || !userPassword) {
        return cb('Email and password must not be empty')
      }

      let checkUser = db.select('*').from('users').where('email',userEmail).andWhere('password',userPassword);

      checkUser.then((myUser) => {
        if (myUser.length) {
          let checkUserLists = db.select('*').from('lists').where('user_id',myUser[0].id);
          checkUserLists.then(lists => {
            let myCurrentUser = {
              id: myUser[0].id,
              name: myUser[0].name,
              email: myUser[0].email,
              avatar: myUser[0].avatar,
              points: myUser[0].points,
              isadmin: myUser[0].isadmin,
              lists: lists
            }
            cb(null,myCurrentUser)
          })
          .catch(err => {
            return cb('Error when select all the lists of the user')
          })
        } else {
          return cb("User not found. Please register.");
        }
      })
      .catch(err => {
        return cb('Error trying to validate user login')
      })
    },

    // FUNCTION TO EDIT AN EXISTING USER
    editUser: function (userInfo, cb) {

      if (!userInfo.id || !userInfo.name || !userInfo.avatar) {
        return cb('User ID, name and avatar must not be empty')
      }

      let checkUser = db.select('*').from('users').where('id',userInfo.id);

      checkUser.then((myUser) => {
        if (myUser.length) {
          db('users').where('id',userInfo.id).update({ name: userInfo.name, avatar: userInfo.avatar, points: userInfo.points })
          .then((result) => {
            return cb('User profile updated')
          })
          .catch(err => {
            return cb('Error updating user. Try again later.')
          })
        } else {
          return cb("User don't exist. Update aborted.")
        }
      })
      .catch(err => {
        return cb('Error searching for user. Try again later.')
      })

    }

  };
}

