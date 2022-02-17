const mongoose = require('mongoose');
const Restaurant = require('../models/restaurant.model');
const categories = Object.keys(require('../data/categories.json'));
const Like = require('../models/like.model');

module.exports.list = (req, res, next) => {
  Like.find({ user: req.user.id})
    .then(likes=> {
      return Restaurant.find()
        .sort({ createdAt: 'desc' })
        .limit(9)
        .then((restaurants) => res.render('restaurants/list', { restaurants, likes }))
    })

    .catch((error) => next(error));
};

module.exports.detail = (req, res, next) => {

  Restaurant.findById(req.params.id)
    .populate('dishes')
    .then((restaurant) => {
      if (restaurant) {
        res.render('restaurants/detail', { restaurant });
      } else {
        res.redirect('/restaurants');
      }
    })
    .catch(error => next(error));
};

module.exports.create = (req, res, next) => {
  res.render('restaurants/new', {
    categories: categories
  });
};

module.exports.doCreate = (req, res, next) => {
  let restaurantCategories = req.body.categories;

  if (restaurantCategories && !Array.isArray(restaurantCategories)) {
    restaurantCategories = [restaurantCategories]
  }

  const restaurant = new Restaurant({
    name: req.body.name,
    address: req.body.address,
    description: req.body.description,
    categories: restaurantCategories,
    capacity: req.body.capacity,
    image: req.body.image || undefined
  });

  restaurant
    .save()
    .then(() => res.redirect('/restaurants'))
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(400).render('restaurants/new', {
          errors: error.errors,
          restaurant,
          categories: categories
        });
      } else {
        next(error);
      }
    });
};

module.exports.edit = (req, res, next) => {

  Restaurant.findById(req.params.id)
    .then((restaurant) => {
      res.render('restaurants/edit', {
        restaurant,
        categories: categories
      });
    })
    .catch(next)

};

module.exports.doEdit = (req, res, next) => {
  Restaurant.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new: true })
    .then((restaurant) => res.redirect(`/restaurants/${restaurant.id}`))
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        req.body.id = req.params.id;
        res.status(400).render('restaurants/edit', {
          errors: error.errors,
          restaurant: req.body,
          categories: categories,
        });
      } else {
        next(error);
      }
    });
};

module.exports.delete = (req, res, next) => {
  Restaurant.findByIdAndDelete(req.params.id)
    .then(() => res.redirect('/restaurants'))
    .catch(error => next(error));
};














// list ->
//   sort(cratedAt: 'desc') ? -> https://stackoverflow.com/questions/4299991/how-to-sort-in-mongoose
//   limit? (10,12, 13..?)

// detail,
// create,
// doCreate -> .save?
//   const restaurant = new Restaurant({
//     name: req.body.name,
//     address: req.body.address,
//     image: req.body.image,
//     description: req.body.description,
//     categories: req.body.categories,
//     capacity: req.body.capacity,
//     maxProductCost: req.body.maxProductCost,
//   });,
// edit,
// doEdit,
// delete