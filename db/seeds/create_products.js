exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('products').del()
  .then(function () {
    // Inserts seed entries
    return knex('products').insert([
      {
        name: 'Baking Powder',
        upc: '062639230814',
        ean: '0062639230814',
        image: 'https://s3.amazonaws.com/buycott/images/attachments/000/552/928/w_thumb/651ad335a1f493a1dc3665afa8ba10e1?1362896261',
        brand: 'Western Family',
        category_id: 1
      },
      {
        name: 'Liquid Honey',
        upc: '062639288853',
        ean: '0062639288853',
        image: 'https://s3.amazonaws.com/buycott/images/attachments/000/552/928/w_thumb/651ad335a1f493a1dc3665afa8ba10e1?1362896261',
        brand: 'Western Family',
        category_id: 1
      },
      {
        name: 'Kraft Peanut Butter Smooth',
        upc: '068100084276',
        ean: '0068100084276',
        image: 'http://d4-pub.bizrate.com/image/obj/7146563403;sq=400',
        brand: 'Kraft Peanut',
        category_id: 1
      }
    ]);
  });
};
