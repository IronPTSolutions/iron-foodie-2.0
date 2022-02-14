const express = require('express')
const router = express.Router()
const misc = require('../controllers/misc.controller')
const restaurants = require('../controllers/restaurant.controller')
const auth = require('../controllers/auth.controller')

/* Misc routes */
router.get('/', misc.home)

/* Restaurants routes */
router.get('/restaurants', restaurants.list)
router.get('/restaurants/new', restaurants.create);
router.get('/restaurants/:id', restaurants.detail)
router.post('/restaurants', restaurants.doCreate);
router.get('/restaurants/:id/edit', restaurants.edit);
router.post('/restaurants/:id/edit', restaurants.doEdit);
router.post('/restaurants/:id/delete', restaurants.delete);


/* Auth routes */
router.get('/register', auth.register)
router.get('/login', auth.login)
router.post('/register', auth.doRegister)
router.get('/activate/:token', auth.activate)
router.post('/login', auth.doLogin)

module.exports = router