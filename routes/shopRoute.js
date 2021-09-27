const express = require("express");
const router = express.Router();
const shopController = require("../controllers/shopController");

router.post("/", shopController.createShop);

module.exports = router;
