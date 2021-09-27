const { Order } = require("../models");

//create
exports.createOrder = async (req, res, next) => {
  try {
    const { orderStatus } = req.body;
    const order = await Order.create({ orderStatus });
    res.status(201).json({ order });
  } catch (err) {
    next(err);
  }
};
