const { Shop } = require("../models");

//get all
exports.getAllshop = async (req, res, next) => {
  try {
    const shop = await Shop.findAll({
      where: { userId: req.user.id },
      // เพื่อให้คนที่สามารถเข้าถึงข้อมูลนี้ได้ คือคนที่เป็นเจ้าของรหัสเท่านั้น (Auhtnticate)
    });
    res.json({ shop });
  } catch (err) {
    next(err);
  }
};

//get by id
exports.getshopById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const shop = await Shop.findOne({
      where: {
        id: id,
        userId: req.user.id,
        // ใส่เงื่อนไข Authenticate เพราะมันอาจจะไปขอไอดีของคนที่ไม่ใช่เจ้าของก็ได้ เราจึงจำเป็นต้องใส่ ไม่งั้นมันจะไปเอา list ของใครมาก็ได้
      },
    });
    res.json({ shop });
  } catch (err) {
    next(err);
  }
};

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

//update
exports.updateShop = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { shopName, shopAddress, revenue } = req.body;
    const [rows] = await Shop.update(
      { shopName, shopAddress, revenue },
      { where: { id, userId: req.user.id } }
    );
    // if (rows[0] === 0)
    // [rows] คือการ restruturing
    if (rows === 0)
      return res.status(400).json({ message: "cannot update list" });
    res.status(200).json({ message: "update success" });
  } catch (err) {
    next(err);
  }
};
