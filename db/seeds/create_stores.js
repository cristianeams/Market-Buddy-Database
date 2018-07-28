exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('stores').del()
  .then(function () {
    // Inserts seed entries
    return knex('stores').insert([
      {
        id: 1,
        name: 'Save on Foods',
        location: 'Pender St',
        latitude: '49.282068',
        longitude: '-123.108163',
        logo: 'https://www.saveonfoods.com/wp-content/uploads/2016/10/logo2.png',
        website: 'https://www.saveonfoods.com/'
      },
      {
        id: 2,
        name: 'IGA',
        location: 'Pender St',
        latitude: '49.282068',
        longitude: '-123.108163',
        logo: 'http://www.igastoresbc.com/media/logo.png',
        website: 'http://www.igastoresbc.com/'
      },
      {
        id: 3,
        name: 'Safeway',
        location: 'Pender St',
        latitude: '49.282068',
        longitude: '-123.108163',
        logo: 'https://az858194.vo.msecnd.net/cdn/media/data/logos/logo-large.ashx',
        website: 'https://www.safeway.ca/'
      }
    ]);
  });
};
