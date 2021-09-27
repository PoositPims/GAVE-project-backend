const { OrderItem } = require("../models");

//create
exports.createOrderItem = async (req, res, next) => {
  try {
    const { products } = req.body;
    const orderItem = await OrderItem.create({ products });
    res.status(201).json({ orderItem });
  } catch (err) {
    next(err);
  }
};
