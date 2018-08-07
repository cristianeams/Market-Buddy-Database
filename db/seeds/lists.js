
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('lists').del()
    .then(function () {
      // Inserts seed entries
      return knex('lists').insert([
        // {id: 1, name: 'My Super List', total: 100, user_id: 1},
        // {id: 2, name: 'My Pocky List', total: 100, user_id: 2},
        // {id: 3, name: 'My Juca List', total: 100, user_id: 3},
        // {id: 4, name: 'My Tiny List', total: 100, user_id: 4},
        // {id: 5, name: 'My Bald List', total: 100, user_id: 5}
        {name: 'Sample List', user_id: 1}
        // {id: 2, name: 'My Pocky List', user_id: 2},
        // {id: 3, name: 'My Juca List', user_id: 3},
        // {id: 4, name: 'My Tiny List', user_id: 4},
        // {id: 5, name: 'My Bald List', user_id: 5}
      ]);
    });
};
