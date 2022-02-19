const Like = require('../models/like.model')

module.exports.profile = (req, res, next) => {
  Like.find({ user: req.user.id })
    .populate('restaurant')
    .then((likes) => {
      res.render("users/profile", { likes })
    })
    .catch(next)
}

module.exports.doLike = (req, res, next) => {
  const restId = req.params.id
  const userId = req.user.id

  Like.findOneAndDelete({ restaurant: restId, user: userId})
    .then(like => {
      if (like) {
        res.status(200).send({ success : 'Like remove from DDBB'})
      } else {
        return Like.create({ restaurant: restId, user: userId })
          .then(() => {
            res.status(201).send({ success : 'Like added to DDBB' })
          })
      }
    })
    .catch(next)
}