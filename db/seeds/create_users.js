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
    ]);
  });
};
