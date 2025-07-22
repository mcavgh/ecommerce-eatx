const server = require("express").Router();
const {
  addReview,
  getAllReviews,
  getUserReviews,
  getProductReviews,
  deleteReview,
  updateReview,
} = require("../controllers/review");

// CREAR REVIEW |
//--------------------------------
server.post("/", addReview);
// READ REVIEW |
//--------------------------------
server.get("/", getAllReviews);
server.get("/user/:userId", getUserReviews);
server.get("/product/:productId", getProductReviews);
// UPDATE REVIEW |
//--------------------------------
server.put("/:id", updateReview);
// DELETE REVIEW |
//--------------------------------
server.delete("/:id", deleteReview);

module.exports = server;
