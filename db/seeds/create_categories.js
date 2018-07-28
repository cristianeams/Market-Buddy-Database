
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('categories').del()
    .then(function () {
      // Inserts seed entries
      return knex('categories').insert([
        {id: 1, name: 'all'},
        {id: 2, name: 'food'},
        {id: 3, name: 'beverage'}
      ]);
    });
};
