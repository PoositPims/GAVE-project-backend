const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { authenticate, checkRole } = require("../controllers/authController");

router.get("/", productController.getAllProduct);
router.get("/:id", productController.getProductById);
router.delete(
  "/:id",
  authenticate,
  checkRole("SHOP"),
  productController.deleteProduct
);
router.post(
  "/",
  authenticate,
  checkRole("SHOP"),
  productController.createProduct
);
router.put(
  "/:id",
  authenticate,
  checkRole("SHOP"),
  productController.updateProduct
);

module.exports = router;
