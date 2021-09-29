const express = require("express");
const router = express.Router();
const shopController = require("../controllers/shopController");
const { authenticate } = require("../controllers/authController");

// authenticate เฉพาะ shop (seller)??

router.get("/", authenticate, shopController, getAllshop);
router.get("/:id", authenticate, shopController, getshopById);
router.put("/:id", authenticate, shopController, updateShop);
router.post("/", authenticate, shopController.createShop);
// authenticate ก่อน post

module.exports = router;
