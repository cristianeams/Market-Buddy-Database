
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('entries').del()
    .then(function () {
      // Inserts seed entries
      return knex('entries').insert([

        {id: 1, quantity: 1, list_id: 1, product_id: 1},
        {id: 2, quantity: 1, list_id: 1, product_id: 2},
        {id: 3, quantity: 1, list_id: 1, product_id: 3},

        {id: 4, quantity: 1, list_id: 2, product_id: 1},
        {id: 5, quantity: 1, list_id: 2, product_id: 2},
        {id: 6, quantity: 1, list_id: 2, product_id: 3},

        {id: 7, quantity: 1, list_id: 3, product_id: 1},
        {id: 8, quantity: 1, list_id: 3, product_id: 2},
        {id: 9, quantity: 1, list_id: 3, product_id: 3},

        {id: 10, quantity: 1, list_id: 4, product_id: 1},
        {id: 11, quantity: 1, list_id: 4, product_id: 2},
        {id: 12, quantity: 1, list_id: 4, product_id: 3},

        {id: 13, quantity: 1, list_id: 5, product_id: 1},
        {id: 14, quantity: 1, list_id: 5, product_id: 2},
        {id: 15, quantity: 1, list_id: 5, product_id: 3}

      ]);
    });
};
