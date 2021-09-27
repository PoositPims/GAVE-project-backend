const { Cart } = require("../models");

//create
exports.createShop = async (req, res, next) => {
  try {
    const { products, totalPrice, isPaid } = req.body;
    const cart = await Cart.create({ products, totalPrice, isPaid });
    res.status(201).json({ cart });
  } catch (err) {
    next(err);
  }
};

//create
// exports.createShop = async (req, res, next) => {
//     try {
//       const {} = req.body;
//       const cart = await Cart.create({});
// res.status(201).json({ cart });
//     } catch (err) {
//       next(err);
//     }
//   };
