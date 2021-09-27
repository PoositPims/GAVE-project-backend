const { Product } = require("../models");

//create
exports.createProduct = async (req, res, next) => {
  try {
    const {
      productName,
      productPicture,
      productSize,
      price,
      discount,
      amount,
      delivery,
      isActive,
    } = req.body;
    const product = await Product.create({
      productName,
      productPicture,
      productSize,
      price,
      discount,
      amount,
      delivery,
      isActive,
    });
    res.status(201).json({ product });
  } catch (err) {
    next(err);
  }
};
