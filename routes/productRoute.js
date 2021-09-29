const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/", productController.getAllProduct);
router.get("/:id", productController.getProductById);
router.delete("/:id", productController.deleteProduct);
router.post("/", productController.createProduct);

module.exports = router;
