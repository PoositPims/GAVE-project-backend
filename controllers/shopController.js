const { Shop } = require("../models");

//create
exports.createShop = async (req, res, next) => {
  try {
    const { shopName, shopAddress, revenue } = req.body;
    const shop = await Shop.create({
      shopName,
      shopAddress,
      revenue,
    });
    res.status(201).json({ shop });
  } catch (err) {
    next(err);
  }
};
