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
    const {
      firstName,
      lastName,
      shopName,
      userName,
      email,
      password,
      confirmPassword,
      shopAddress,
    } = req.body;

    // validate
    if (password !== confirmPassword) {
      throw new Error("confirm password not match");
    }
    const role = "SHOP";
    const shop = await Shop.create({
      firstName,
      lastName,
      shopName,
      userName,
      email,
      role,
      password,
      shopAddress,
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

// login
exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username: username } });
    if (!user) {
      return res.status(400).json({ message: "invalid username or password" });
    }

    const isPasswordCorrent = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrent) {
      return res.status(400).json({ message: "invalid username or password" });
    }

    const payload = {
      id: user.id,
      username: user.username,
      role: user.role,
    };

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
