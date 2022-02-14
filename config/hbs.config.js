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
