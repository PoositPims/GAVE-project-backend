const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { authenticate, checkRole } = require("../controllers/authController");
const { upload } = require("../controllers/multer");
router.get("/sold", authenticate, productController.getAllProductTrue);
router.get("/notSold", authenticate, productController.getAllProductFalse);
router.get("/allProduct", productController.getAllProductHome);
router.get("/:id", productController.getProductById);
router.delete(
  "/:id",
  authenticate,
  checkRole("SHOP"),
  productController.deleteProduct
);
router.post(
  "/createProduct",
  upload.single("cloudInput"),
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
