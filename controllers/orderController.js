const { Order, User, Cart, Product } = require("../models");

//get all
exports.getAllOrder = async (req, res, next) => {
  try {
    const order = await Order.findAll();
    res.json({ order });
  } catch (err) {
    next(err);
  }
};

//get by id
exports.getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await Order.findAll({
      where: { userId: id },
      include: [
        { model: Cart },
        {
          // model: Cart,
          model: User,
          // where: {
          //   id: id,
          //   // userId: req.user.id,
          //   // ไมา่ได้กำหนดเงื่อนไข Authenticate เพราะใครๆก็เข้าถึงข้อใูลได้
          // },
        },
      ],
    });

    // console.log("product..............", JSON.stringify(product, null, 2));

    res.json({ order });
  } catch (err) {
    next(err);
  }
};

// create;
exports.createOrder = async (req, res, next) => {
  try {
    const { orderStatus } = req.body;
    const order = await Order.create({ orderStatus });
    res.status(201).json({ order });
  } catch (err) {
    next(err);
  }
};
