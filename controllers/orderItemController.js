const { OrderItem } = require("../models");

//get all
exports.getAllOrderItem = async (req, res, next) => {
  try {
    const orderItem = await OrderItem.findAll({
      where: { userId: req.user.id },
      // เพื่อให้คนที่สามารถเข้าถึงข้อมูลนี้ได้ คือคนที่เป็นเจ้าของรหัสเท่านั้น (Auhtnticate)
    });
    res.json({ orderItem });
  } catch (err) {
    next(err);
  }
};

//get by id
exports.getOrderitemById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const orderItem = await OrderItem.findOne({
      where: {
        id: id,
        userId: req.user.id,
        // ใส่เงื่อนไข Authenticate เพราะมันอาจจะไปขอไอดีของคนที่ไม่ใช่เจ้าของก็ได้ เราจึงจำเป็นต้องใส่ ไม่งั้นมันจะไปเอา list ของใครมาก็ได้
      },
    });
    res.json({ orderItem });
  } catch (err) {
    next(err);
  }
};

//create
// exports.createOrderItem = async (req, res, next) => {
//   try {
//     const { products } = req.body;
//     const orderItem = await OrderItem.create({ products });
//     res.status(201).json({ orderItem });
//   } catch (err) {
//     next(err);
//   }
// };
