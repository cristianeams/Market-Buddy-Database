
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('prices').del()
    .then(function () {
      // Inserts seed entries
      return knex('prices').insert([
        {id: 1, price: 1, product_id: 1, store_id: 1},
        {id: 2, price: 3, product_id: 1, store_id: 2},
        {id: 3, price: 5, product_id: 1, store_id: 3},
        {id: 4, price: 2, product_id: 2, store_id: 1},
        {id: 5, price: 4, product_id: 2, store_id: 2},
        {id: 6, price: 6, product_id: 2, store_id: 3},
        {id: 7, price: 9, product_id: 3, store_id: 1},
        {id: 8, price: 8, product_id: 3, store_id: 2},
        {id: 9, price: 7, product_id: 3, store_id: 3}
      ]);
    });
};
