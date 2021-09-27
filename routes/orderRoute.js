const express = require("express");
const router = express.Router();
const orderController = require("../controllers/cartController");

router.post("/", orderController.createOrder);

module.exports = router;
