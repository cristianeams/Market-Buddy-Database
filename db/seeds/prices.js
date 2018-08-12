
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('prices').del()
    .then(function () {
      // Inserts seed entries
      return knex('prices').insert([

        {price: 1, product_id: 1, store_id: 1},
        {price: 2, product_id: 1, store_id: 2},
        {price: 3, product_id: 1, store_id: 3},
        {price: 4, product_id: 1, store_id: 4},
        {price: 5, product_id: 1, store_id: 5},
        {price: 6, product_id: 1, store_id: 6},
        {price: 7, product_id: 1, store_id: 7},
        {price: 8, product_id: 1, store_id: 8},
        {price: 9, product_id: 1, store_id: 9},
        {price: 10, product_id: 1, store_id: 10},

        {price: 1.5, product_id: 2, store_id: 1},
        {price: 2.5, product_id: 2, store_id: 2},
        {price: 3.5, product_id: 2, store_id: 3},
        {price: 4.5, product_id: 2, store_id: 4},
        {price: 5.5, product_id: 2, store_id: 5},
        {price: 6.5, product_id: 2, store_id: 6},
        {price: 7.5, product_id: 2, store_id: 7},
        {price: 8.5, product_id: 2, store_id: 8},
        {price: 9.5, product_id: 2, store_id: 9},
        {price: 10.5, product_id: 2, store_id: 10},

        {price: 1.75, product_id: 3, store_id: 1},
        {price: 2.75, product_id: 3, store_id: 2},
        {price: 3.75, product_id: 3, store_id: 3},
        {price: 4.75, product_id: 3, store_id: 4},
        {price: 5.75, product_id: 3, store_id: 5},
        {price: 6.75, product_id: 3, store_id: 6},
        {price: 7.75, product_id: 3, store_id: 7},
        {price: 8.75, product_id: 3, store_id: 8},
        {price: 9.75, product_id: 3, store_id: 9},
        {price: 10.75, product_id: 3, store_id: 10}
      ]);
    });
};
