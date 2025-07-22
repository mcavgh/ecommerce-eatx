const { Cart, Product, Image, Review, User, Order } = require("../db.js");

const addReview = (req, res, next) => {
  Review.create({
    reviewText: req.body.reviewText,
    rating: req.body.rating,
    productId: req.body.productId,
    userId: req.body.userId,
  })
    .then((review) => {
      res.send(review);
    })
    .catch((err) => next(err));
};

const getAllReviews = (req, res, next) => {
  Review.findAll()
    .then((reviews) => {
      res.send(reviews);
    })
    .catch((err) => next(err));
};

const getUserReviews = (req, res, next) => {
  User.findByPk(req.params.userId, {
    include: [{ model: Review, include: [{ model: Product }] }],
   })
    .then((userReviews) => {
      res.send(userReviews);
    })
    .catch((err) => next(err));
};

const getProductReviews = (req, res, next) => {
  Product.findByPk(req.params.productId, {
    include: [{ model: Review, include: [{ model: User }] }],
  })
    .then((productReviews) => {
      res.send(productReviews);
    })
    .catch((err) => next(err));
};

const deleteReview = (req, res, next) => {
  Review.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      res.send({ msg: "Review deleted successfully" });
    })
    .catch((err) => next(err));
};

const updateReview = (req, res, next) => {
  Review.update(
    {
      title: req.body.title,
      reviewText: req.body.reviewText,
      rating: req.body.rating,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then(() => {
      res.send({ msg: "Review updated successfully" });
    })
    .catch((err) => next(err));
};

module.exports = {
  addReview,
  getAllReviews,
  getUserReviews,
  getProductReviews,
  deleteReview,
  updateReview,
};
