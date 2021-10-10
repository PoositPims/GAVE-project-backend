const { Shop } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//get all
exports.getAllshop = async (req, res, next) => {
  try {
    const shop = await Shop.findAll();
    res.json({ shop });
  } catch (err) {
    next(err);
  }
};

//get by id
exports.getshopById = async (req, res, next) => {
  try {
    const { id } = req.params;
    // console.log(id)
    const shop = await Shop.findOne({
      where: {
        id: id,
        // shopId: req.shop.id,
        // ใส่เงื่อนไข Authenticate เพราะมันอาจจะไปขอไอดีของคนที่ไม่ใช่เจ้าของก็ได้ เราจึงจำเป็นต้องใส่ ไม่งั้นมันจะไปเอา list ของใครมาก็ได้
      },
    });
    // console.log(shop)
    res.json({ shop });
  } catch (err) {
    next(err);
  }
};

//create
exports.createShop = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      shopName,
      username,
      email,
      password,
      confirmPassword,
      shopAddress,
      renenue,
    } = req.body;

    // validate
    if (password !== confirmPassword) {
      throw new Error("confirm password not match");
    }
    const role = "SHOP";
    const hashedPassword = await bcrypt.hash(password, 12);
    const shop = await Shop.create({
      firstName,
      lastName,
      shopName,
      username,
      email,
      role,
      password: hashedPassword,
      shopAddress,
      renenue,
    });
    console.log(shop);
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

// login
exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const shop = await Shop.findOne({ where: { username: username } });
    if (!shop) {
      return res.status(400).json({ message: "invalid username or password" });
    }

    const isPasswordCorrent = await bcrypt.compare(password, shop.password);

    if (!isPasswordCorrent) {
      return res.status(400).json({ message: "invalid username or password" });
    }

    const payload = {
      id: shop.id,
      username: shop.username,
      role: shop.role,
    };
    console.log(process.env.JWT_SECRET_KEY);
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: 60 * 60 * 24 * 30,
      //   expiresIn: "30d",
      // "qwerty" คือ secret key
    });

    console.log(token);
    res.json({ message: "success login", token });
  } catch (err) {
    next(err);
  }
};
