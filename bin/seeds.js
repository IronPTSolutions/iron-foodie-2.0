require('dotenv').config();

const mongoose = require('mongoose')
const restaurants = require('../data/restaurants.json')
const Restaurant = require('../models/restaurant.model')

require('../config/db.config');

mongoose.connection.once('open', () => {
  console.info(`*** Connected to the database ${mongoose.connection.db.databaseName} ***`);

  mongoose.connection.db
    .dropDatabase()
      .then(() => `O.o! ${mongoose.connection.db.databaseName} dropped!`)
      .then(() => {
        restaurants.forEach(restaurant => {
          new Restaurant({
            ...restaurant,
            categories: ['mediterranean', 'indian'],
            description: 'lorem sentence grater than 10 characters',
            capacity: Math.floor(Math.random() * 100 + 10),
          }).save()
            .then(rest => console.log(`${rest.name} has been created!`))
            .catch(err =>  console.error(err))
        })
      })
      .catch(err => console.error('mongoose', err))
})































// const mongoose = require('mongoose');
// const restaurants = require('../data/restaurants.json');
// const Restaurant = require('../models/restaurant.model');
// const Dish = require('../models/dish.model');

// require('../config/db.config');

// mongoose.connection.once('open', () => {
//   console.info(`*** Connected to the database ${mongoose.connection.db.databaseName} ***`);

//   mongoose.connection.db
//     .dropDatabase()
//     .then(() => console.log(`- Database dropped`))
//     .then(() => {
//       restaurants.forEach((restaurant) => {
//         new Restaurant({
//           ...restaurant,
//           categories: ['vegan', 'healthy'],
//           description: faker.lorem.sentence(),
//           capacity: Math.floor(Math.random() * 100 + 10),
//         })
//           .save()
//           .catch((err) => {
//             console.error(err);
//           });
//       });
//     })
//     .catch((error) => console.error(error));
// });
