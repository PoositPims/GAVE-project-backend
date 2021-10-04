const express = require("express");
const router = express.Router();
const shopController = require("../controllers/shopController");
const { authenticate, checkRole } = require("../controllers/authController");

// authenticate เฉพาะ shop (seller)??

router.get("/",  shopController.getAllshop);
// router.get("/", shopController.getAllshop);
router.get("/:id", shopController.getshopById);
// router.put("/:id", authenticate, checkRole("SHOP"), shopController.updateShop);
router.post("/shopRegister",  shopController.createShop);
router.post("/login", shopController.login);
// router.post("/", authenticate, checkRole("SHOP"), shopController.createShop);
// authenticate ก่อน post

module.exports = router;

// // For Admin Only
// router.get('/users', authenticate, checkRole('ADMIN'), userControlles.getAllUsers)
// // For Customer Only
// router.get('/user/:id', authenticate, checkRole('CUSTOMER'))
// // For Shop Only

// // For Shop or Customer
// router.get('/user/:id', authenticate,
