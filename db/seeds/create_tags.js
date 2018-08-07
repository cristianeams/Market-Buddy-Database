
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('tags').del()
    .then(function () {
      // Inserts seed entries
      return knex('tags').insert([
        // {id: 1, name: 'tag 1', product_id: 1, category_id: 1},
        // {id: 2, name: 'tag 2', product_id: 2, category_id: 1},
        // {id: 3, name: 'tag 3', product_id: 3, category_id: 1}
        {name: 'all', product_id: 1, category_id: 1}
      ]);
    });
};
