const express = require("express");
const router = express.Router();
const orderItemRoute = require("../controllers/orderItemRoute");

router.post("/", orderItemRoute.createOrderItem);

module.exports = router;
