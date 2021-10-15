const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const { authenticate, checkRole } = require("../controllers/authController");

router.get(
  "/",
  authenticate,
  checkRole("BUYER", "SHOP"),
  cartController.getAllCart
);
router.get(
  "/:id",
  authenticate,
  // checkRole("BUYER"),
  cartController.getCartById
);
router.post(
  "/",
  authenticate,
  checkRole("BUYER", "SHOP"),
  cartController.addToCart
);
// router.post("/createCart", cartController.createCart);
router.delete(
  // "/",
  "/:id",
  authenticate,
  checkRole("BUYER", "SHOP"),
  cartController.deleteCart
);

module.exports = router;
