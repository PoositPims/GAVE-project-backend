const { Cart } = require("../models");

//get all
exports.getAllCart = async (req, res, next) => {
  try {
    const cart = await Cart.findAll({
      where: { userId: req.user.id },
      // เพื่อให้คนที่สามารถเข้าถึงข้อมูลนี้ได้ คือคนที่เป็นเจ้าของรหัสเท่านั้น (Auhtnticate)
    });
    res.json({ cart });
  } catch (err) {
    next(err);
  }
};

//get by id
exports.getCartById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cart = await Cart.findOne({
      where: {
        id: id,
        userId: req.user.id,
        // ใส่เงื่อนไข Authenticate เพราะมันอาจจะไปขอไอดีของคนที่ไม่ใช่เจ้าของก็ได้ เราจึงจำเป็นต้องใส่ ไม่งั้นมันจะไปเอา list ของใครมาก็ได้
      },
    });
    res.json({ cart });
  } catch (err) {
    next(err);
  }
};

//create
exports.createCart = async (req, res, next) => {
  try {
    const { products, totalPrice, isPaid } = req.body;
    const cart = await Cart.create({ products, totalPrice, isPaid });
    res.status(201).json({ cart });
  } catch (err) {
    next(err);
  }
};

//delete
exports.deleteCart = async (req, res, next) => {
  try {
    const { id } = req.params;
    const rows = await Cart.destroy({
      where: { id, userId: req.user.id },
    });
    // rows return เป็นจำนวนแถวที่ลบออก
    if (rows === 0) {
      return res.status(400).json({ message: "cannot delete" });
    }
    res.status(204).json();
  } catch (err) {
    next(err);
  }
};
