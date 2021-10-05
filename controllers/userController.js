const { User } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// const tempUserId = 1; //สมมุติ

exports.authenticate = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith("Bearer")) {
      return res.status(401).json({ message: "you are unauthorized" });
    }

    // กำหนดค่า token
    const token = authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "you are unauthorized" });
    }

    const decoded = jwt.verify(token, "qwerty");

    const user = await User.findOne({
      where: {
        id: decoded.id,
      },
    });

    if (!user) {
      return res.status(401).json({ message: "you are unauthorized" });
    }
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

// Get all
exports.getAllUser = async (req, res, next) => {
  try {
    const user = await User.findAll({
      // where: { userId: req.user.id },
    });
    res.json({ user });
  } catch (err) {
    next(err);
  }
};

// get by id
exports.getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({
      where: {
        id: id,
        // userId: req.user.id,
        // ใส่เงื่อนไข Authenticate เพราะมันอาจจะไปขอไอดีของคนที่ไม่ใช่เจ้าของก็ได้ เราจึงจำเป็นต้องใส่ ไม่งั้นมันจะไปเอา list ของใครมาก็ได้
      },
    });
    res.json({ user });
  } catch (err) {
    next(err);
  }
};

// User create Register
exports.createUserRegister = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      username,
      email,
      telephone,
      password,
      address1,
      address2,
    } = req.body;
    console.log(firstName);
    // if (password !== confirmPassword) {
    //   return res
    //     .status(400)
    //     .json({ message: "password and confirm password did not match" });
    // }
    const role = "BUYER";
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      firstName,
      lastName,
      username,
      email,
      telephone,
      password: hashedPassword,
      address1,
      address2,
      role,
    });
    console.log(user);
    res.status(201).json({ user });
  } catch (err) {
    next(err);
  }
};

// create User Login
exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body; // ต้องตรง
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
      email: user.email,
      username: user.username,
      role:user.role
    };
    const token = jwt.sign(payload, "qwerty", {
      expiresIn: 60 * 60 * 24 * 30,
      //   expiresIn: "30day",
      // "qwerty" คือ secret key
    });
    console.log(token);
    res.json({ message: "success login", token });
  } catch (err) {
    next(err);
  }
};
