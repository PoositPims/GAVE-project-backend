const express = require("express");
const router = express.Router();
const orderController = require("../controllers/cartController");
const { authenticate } = require("../controllers/authController");

router.get("/", authenticate, orderController.createOrder);
// router.post("/", authenticate, orderController.createOrder);

module.exports = router;
