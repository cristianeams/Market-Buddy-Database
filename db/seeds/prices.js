
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('prices').del()
    .then(function () {
      // Inserts seed entries
      return knex('prices').insert([
        {price: 1, product_id: 1, store_id: 1},
        {price: 3, product_id: 1, store_id: 2},
        {price: 5, product_id: 1, store_id: 3},
        {price: 2, product_id: 2, store_id: 1},
        {price: 4, product_id: 2, store_id: 2},
        {price: 6, product_id: 2, store_id: 3},
        {price: 9, product_id: 3, store_id: 1},
        {price: 8, product_id: 3, store_id: 2},
        {price: 7, product_id: 3, store_id: 3}
      ]);
    });
};
