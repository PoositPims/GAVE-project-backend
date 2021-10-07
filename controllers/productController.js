const { Product } = require("../models");

//get all authen (true)
exports.getAllProductTrue = async (req, res, next) => {
  try {
    const { isActive = true } = req.query;
    const product = await Product.findAll({
      where: { shopId: req.user.id, isActive: isActive },
    });
    // console.log("test");
    // console.log(product);
    res.json({ product });
  } catch (err) {
    next(err);
  }
};

//get all authen (false)
exports.getAllProductFalse = async (req, res, next) => {
  try {
    const { isActive = false } = req.query;
    const product = await Product.findAll({
      where: { shopId: req.user.id, isActive: isActive },
    });
    // console.log("test");
    // console.log(product);
    res.json({ product });
  } catch (err) {
    next(err);
  }
};

//get all
exports.getAllProductHome = async (req, res, next) => {
  try {
    const { isActive = true } = req.query;
    const product = await Product.findAll({
      where: { isActive: isActive },
      // where: { shopId: req.user.id },
    });
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
      shopId,
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
      shopId: req.user.id,
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
    // console.log(id);
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
    const [rows] = await Product.update(
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
      {
        where: {
          id,
          // userId: req.user.id
        },
      }
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
