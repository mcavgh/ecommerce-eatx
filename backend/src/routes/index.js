const { Router } = require('express');
const router = Router();


router.use("/newsletter", require("./newsletter"));
router.use("/products", require("./products"));
router.use("/category", require("./category"));
router.use("/users", require("./user"));
router.use("/orders", require("./orders"));
router.use('/cart', require('./cart.js'));
router.use('/review', require('./review.js'));
router.use('/mercadopago', require('./mercadopago.js'));

module.exports = router;