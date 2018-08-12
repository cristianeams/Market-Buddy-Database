
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('entries').del()
    .then(function () {
      // Inserts seed entries
      return knex('entries').insert([
        {quantity: 1, list_id: 1, product_id: 1},
        {quantity: 1, list_id: 1, product_id: 2},
        {quantity: 1, list_id: 1, product_id: 3}
      ]);
    });
};
