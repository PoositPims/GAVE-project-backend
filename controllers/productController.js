const { Product } = require("../models");

//get all
exports.getAllProduct = async (req, res, next) => {
  try {
    const product = await Product
      .findAll
      // where: { userId: req.user.id },
      // ไม่ม where เพราะ ทุกๆคนสามารถเข้าถึงข้อมูลชุดนี้ได้ ต่อให้ไม่เป็น user
      ();
    res.json({ product });
  } catch (err) {
    next(err);
  }
};

//get by id
exports.getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({
      where: {
        id: id,
        // userId: req.user.id,
        // ไมา่ได้กำหนดเงื่อนไข Authenticate เพราะใครๆก็เข้าถึงข้อใูลได้
      },
    });
    res.json({ product });
  } catch (err) {
    next(err);
  }
};

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

//delete
exports.deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const rows = await Product.destroy({
      where: {
        id,
        // userId: req.user.id
        //ใส่เงื่อนใขแค่ให้ id ตรงกันก็พอ เพราะไม่ใช่ user ก็สามารถเข้าถึงได้
      },
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

//update
exports.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
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
    const [rows] = await List.update(
      {
        productName,
        productPicture,
        productSize,
        price,
        discount,
        amount,
        delivery,
        isActive,
      },
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
