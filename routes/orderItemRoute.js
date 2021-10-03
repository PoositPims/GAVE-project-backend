const express = require("express");
const router = express.Router();
const orderItemRoute = require("../controllers/orderItemRoute");
const { authenticate, checkRole } = require("../controllers/authController");

router.get(
  "/",
  authenticate,
  checkRole("Buyer"),
  orderItemRoute.getAllOrderItem
);
router.get(
  "/:id",
  authenticate,
  checkRole("Buyer"),
  orderItemRoute.getOrderItemById
);
router.post(
  "/",
  authenticate,
  checkRole("Buyer"),
  orderItemRoute.createOrderItem
);

module.exports = router;
