const express = require("express");
const router = express.Router();
const shopController = require("../controllers/shopController");
const { authenticate, checkRole } = require("../controllers/authController");

// authenticate เฉพาะ shop (seller)??

router.get("/", authenticate, shopController.getAllshop);
router.get("/:id", authenticate, shopController.getshopById);
router.post("/shopRegister", shopController.createShop);
router.post("/login", shopController.login);

module.exports = router;
