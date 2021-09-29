const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const { authenticate } = require("../controllers/authController");

router.get("/", authenticate, cartController.getAllCart);
router.get("/:id", authenticate, cartController.getCartById);
router.post("/", authenticate, cartController.createCart);
router.delete("/:id", authenticate, cartController.deleteCart);

module.exports = router;
