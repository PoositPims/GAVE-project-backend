const express = require("express");
const router = express.Router();
const orderController = require("../controllers/cartController");
const { authenticate, checkRole } = require("../controllers/authController");

router.get("/", authenticate, checkRole("Buyer"), orderController.createOrder);
router.get("/", authenticate, checkRole("SHOP"), orderController.createOrder);
router.post("/", authenticate, checkRole("Buyer"), orderController.createOrder);

module.exports = router;
