const express = require('express')
const router = express.Router()
const misc = require('../controllers/misc.controller')
const restaurants = require('../controllers/restaurant.controller')
const auth = require('../controllers/auth.controller')
const user = require('../controllers/user.controller')
const passport = require('passport');
const authMiddleware = require('../middlewares/auth.middleware')

const SCOPES = [
  "https://www.googleapis.com/auth/userinfo.profile",
  "https://www.googleapis.com/auth/userinfo.email"
]

/* Misc routes */
router.get('/', misc.home)

/* Restaurants routes */
router.get('/restaurants', authMiddleware.isAuthenticated, restaurants.list)
router.get('/restaurants/new', authMiddleware.isAuthenticated, restaurants.create);
router.get('/restaurants/:id', authMiddleware.isAuthenticated,restaurants.detail)
router.post('/restaurants', authMiddleware.isAuthenticated, restaurants.doCreate);
router.get('/restaurants/:id/edit', authMiddleware.isAuthenticated, restaurants.edit);
router.post('/restaurants/:id/edit', authMiddleware.isAuthenticated, restaurants.doEdit);
router.post('/restaurants/:id/delete', authMiddleware.isAuthenticated,restaurants.delete);

/* Auth routes */
router.get('/register', auth.register)
router.get('/login', auth.login)
router.post('/register', auth.doRegister)
router.get('/activate/:token', auth.activate)
router.post('/login', auth.doLogin)
router.get('/login/google', passport.authenticate('google-auth', { scope: SCOPES  }))
router.get('/auth/google/callback', auth.doLoginGoogle)
router.get('/logout', auth.logout)

/* User routes */
router.get('/profile', authMiddleware.isAuthenticated, user.profile)
router.post('/like/:id', authMiddleware.isAuthenticated, user.doLike)

module.exports = router