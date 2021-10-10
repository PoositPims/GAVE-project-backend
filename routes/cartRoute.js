const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const { authenticate, checkRole } = require("../controllers/authController");

router.get("/", authenticate, checkRole("BUYER"), cartController.getAllCart);
router.get(
  "/:id",
  authenticate,
  checkRole("BUYER"),
  cartController.getCartById
);
router.post("/", authenticate, checkRole("BUYER"), cartController.addToCart);
// router.delete("/:id", authenticate, cartController.deleteCart);

module.exports = router;
