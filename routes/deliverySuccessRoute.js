const express = require("express");
const router = express.Router();
const deliverySuccessController = require("../controllers/deliverySuccessController");
const { authenticate, checkRole } = require("../controllers/authController");

router.post("/", deliverySuccessController.createShop);
// get
// put

module.exports = router;
