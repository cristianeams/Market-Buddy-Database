exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('stores').del()
  .then(function () {
    // Inserts seed entries
    return knex('stores').insert([
      {
        name: 'Save on Foods',
        location: 'Pender St',
        latitude: '49.282068',
        longitude: '-123.108163',
        logo: 'https://www.saveonfoods.com/wp-content/uploads/2016/10/logo2.png',
        website: 'https://www.saveonfoods.com/',
        color: 'lightgreen'
      },
      {
        name: 'IGA',
        location: 'Pender St',
        latitude: '49.282068',
        longitude: '-123.108163',
        logo: 'http://www.igastoresbc.com/media/logo.png',
        website: 'http://www.igastoresbc.com/',
        color: 'red'
      },
      {
        name: 'Safeway',
        location: 'Pender St',
        latitude: '49.282068',
        longitude: '-123.108163',
        logo: 'https://az858194.vo.msecnd.net/cdn/media/data/logos/logo-large.ashx',
        website: 'https://www.safeway.ca/',
        color: 'orange'
      },
      {
        name: 'Choices Market',
        location: 'Pender St',
        latitude: '49.282068',
        longitude: '-123.108163',
        logo: 'https://www.choicesmarkets.com/drive/themes/choicesmarkets/assets/img/header-logo.svg',
        website: 'https://www.choicesmarkets.com/',
        color: 'yellow'
      },
      {
        name: 'Costco',
        location: 'Pender St',
        latitude: '49.282068',
        longitude: '-123.108163',
        logo: 'https://www.costco.ca/wcsstore/CostcoGLOBALSAS/images/Costco_Canada_Logo.png',
        website: 'https://www.costco.ca/',
        color: 'blue'
      },
      {
        name: 'T & T Supermarket',
        location: 'Pender St',
        latitude: '49.282068',
        longitude: '-123.108163',
        logo: 'https://www.tnt-supermarket.com/bc/wp-content/themes/tnt-supermarket/dist/images/tnt-logo-en.png',
        website: 'https://www.tnt-supermarket.com/',
        color: 'green'
      },
      {
        name: 'Save On Meats',
        location: 'Pender St',
        latitude: '49.282068',
        longitude: '-123.108163',
        logo: 'https://pbs.twimg.com/profile_images/461254822692278272/ABoA10Dx_400x400.jpeg',
        website: 'http://saveonmeats.ca/',
        color: 'brown'
      },
      {
        name: 'Chinatown Supermarket',
        location: 'Pender St',
        latitude: '49.282068',
        longitude: '-123.108163',
        logo: 'https://static1.squarespace.com/static/538bdee5e4b0db4eab0960f9/t/53916b34e4b0dd94905f757a/1402039219376/photo+%282%29.JPG?format=2500w',
        website: 'http://www.chinatownsupermarkets.com/',
        color: 'rasin'
      },
      {
        name: 'Urban Fare',
        location: 'Pender St',
        latitude: '49.282068',
        longitude: '-123.108163',
        logo: 'https://urbanfare.com/sites/all/themes/urbanfare/logo.png',
        website: 'https://urbanfare.com/select-your-store?destination=home',
        color: 'silver'
      },
      {
        name: 'Whole Foods',
        location: 'Pender St',
        latitude: '49.282068',
        longitude: '-123.108163',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Whole_Foods_Market_201x_logo.svg',
        website: 'https://www.wholefoodsmarket.com/',
        color: 'tortilla'
      }
    ]);
  });
};