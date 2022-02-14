const mongoose = require('mongoose');
const User = require('../models/user.model')
const mailer = require('../config/mailer.config')

module.exports.login = (req, res, next) => {
  res.render('auth/login')
}

module.exports.register = (req, res, next) => {
  res.render('auth/register')
}

module.exports.doLogin = (req, res, next) => {
  res.render('auth/login')
}

module.exports.doRegister = (req, res, next) => {
  const user = req.body;

  const renderWithErrors = (errors) => {
    res.render('auth/register', { errors, user })
  }

  User.findOne({ email: user.email })
    .then((userFound) => {
      if (userFound) {
        renderWithErrors({ email: 'Email already in use' })
      } else {
        if (req.file) {
          user.image = req.file.path
        }
        return User.create(user)
          .then((createdUser) => {
            mailer.sendActivationEmail(createdUser.email, createdUser.activationToken)
            res.redirect('/login')
          })

      }
    })
    .catch(err => {
      if (err instanceof mongoose.Error.ValidationError) {
        renderWithErrors(err.errors)
      } else {
        next(err)
      }
    })
}

module.exports.activate = (req, res, next) => {
  const activationToken = req.params.token;

  User.findOneAndUpdate(
    { activationToken, active: false },
    { active: true }
  )
    .then(() => {
      res.redirect('/login')
    })
    .catch(err => next(err))
}