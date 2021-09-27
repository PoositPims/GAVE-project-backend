const express = require("express");
const router = express.Router();

const deliverySuccessController = require("../controllers/deliverySuccessController");

router.post("/", deliverySuccessController.createShop);

module.exports = router;
