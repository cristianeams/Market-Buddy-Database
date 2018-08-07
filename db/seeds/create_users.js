exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
  .then(function () {
    // Inserts seed entries
    return knex('users').insert([
      {
        name: 'root',
        email: 'root@root.com',
        avatar: 'https://api.adorable.io/avatars/285/root.png',
        password: 'bananaShark'
      }
      // {
      //   id: 1,
      //   name: 'sam',
      //   email: 'sam@sam.com',
      //   avatar: 'https://api.adorable.io/avatars/285/sam.png',
      //   password: 'sam'
      // },
      // {
      //   id: 2,
      //   name: 'leo',
      //   email: 'leo@leo.com',
      //   avatar: 'https://api.adorable.io/avatars/285/leo.png',
      //   password: 'leo'
      // },
      // {
      //   id: 3,
      //   name: 'cris',
      //   email: 'cris@cris.com',
      //   avatar: 'https://api.adorable.io/avatars/285/cris.png',
      //   password: 'cris'
      // },
      // {
      //   id: 4,
      //   name: 'dani',
      //   email: 'dani@dani.com',
      //   avatar: 'https://api.adorable.io/avatars/285/dani.png',
      //   password: 'dani'
      // },
      // {
      //   id: 5,
      //   name: 'giovani',
      //   email: 'giovani@giovani.com',
      //   avatar: 'https://api.adorable.io/avatars/285/giovani.png',
      //   password: 'giovani'
      // }
    ]);
  });
};
