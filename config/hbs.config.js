const hbs = require('hbs')

hbs.registerPartials('./views/partials')

hbs.registerHelper('restaurantHasCategory', function (options) {
  const { restaurant, category } = options.hash;

  if (restaurant && restaurant.categories.includes(category)) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
})

hbs.registerHelper('userLikedRestaurant', function (options) {
  const { restaurant, likes } = options.hash;
  if (restaurant && likes && likes.some(like => like.restaurant == restaurant.id)) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
})

hbs.registerHelper('prettyCost', (cost) => {
  return `${cost.toFixed(2)} €`;
});

hbs.registerHelper('formatDate', (date) => {
  const toDate = new Date(date)

  let day = toDate.getDate()
  let month = toDate.getMonth() + 1
  let year = toDate.getFullYear()

  if (month < 10) {
    return `${day}-0${month}-${year}`
  } else {
    return `${day}-${month}-${year}`
  }
})
