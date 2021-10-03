const { Order } = require("../models");

//get all
exports.getAllOrder = async (req, res, next) => {
  try {
    const order = await Order.findAll();
    res.json({ order });
  } catch (err) {
    next(err);
  }
};

create;
exports.createOrder = async (req, res, next) => {
  try {
    const { orderStatus } = req.body;
    const order = await Order.create({ orderStatus });
    res.status(201).json({ order });
  } catch (err) {
    next(err);
  }
};
