const { User, Shop } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.checkRole =
  (...roles) =>
  async (req, res, next) => {
    // ['ADMIN']          'CUSTOMER'
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "you are not allowed" });
    }
    next();
  };

// exports.checkRole =
//   (...roles) =>
//   async (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return res.status(403).json({ message: "You are not allowed" });
//     }
//   };

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

    // decoded = jwt paylaod object
    const decoded = jwt.verify(token, "qwerty");
    const role = decoded.role;
    switch (role) {
      case "BUYER":
        {
          const user = await User.findOne({
            where: {
              id: decoded.id,
            },
          });
          if (!user) {
            return res.status(401).json({ message: "you are unauthorized" });
          }
          req.user = user;
        }
        break;

      case "SHOP":
        {
          const shop = await Shop.findOne({
            where: {
              id: decoded.id,
            },
          });
          if (!shop) {
            return res.status(401).json({ message: "you are unauthorized" });
          }
          req.user = shop;
        }
        break;

      default:
        break;
    }
    next();
  } catch (err) {
    next(err);
  }
};

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

//................ auth create shop id ?
// create login
// exports.createLogin = async (req, res, next) => {
//   try {
//     const { username, email, password } = req.body;
//     const user = await User.findOne({ where: { username: username } });
//     // select * from users where username = username
//     // หาว่า มี username ที่เราพิมพ์ลงไปไหม (username = username ไหม) ถ้าหาเจอจะ return เป็นค่า obj. ที่มันหาเจอ ถ้าหาไม่เจอจะ return เป็น null
//     if (!user) {
//       // !user คือ ถ้าหาไม่เจอ
//       return res.status(400).json({ message: "invalid username or password" });
//     }

//     const isPasswordCorrent = await bcrypt.compare(password, user.password);
//     // password คือ password ที่เรารับเข้ามา
//     // user.password คือ password ที่อยู่ใน database
//     if (!isPasswordCorrent) {
//       // ถ้า password ไม่ถูกต้อง // password did not match
//       return res.status(400).json({ message: "invalid username or password" });
//     }

//     const payload = {
//       id: user.id,
//       email: user.email,
//       username: user.username,
//       //   role: 'customer'
//     };

//     const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
//       expiresIn: 60 * 60 * 24 * 30,
//       //   expiresIn: "30d",
//       // process.env.JWT_SECRET_KEY คือ secret key ที่เราเก็บค่าไว้ใน file .env
//       // "qwerty" คือ secret key
//     });
//     console.log(token);

//     res.json({ message: "success login", token });
//   } catch (err) {
//     next(err);
//   }
// };

// ตัวอย่าง........................................การเขียน Middleware
// exports.checkRole =
//   (...roles) =>
//   (req, res, next) => {
//     //ถ้าเป็น ['ADMIN'] Admin ก็จะ สามารถทำได้
//     if (!roles.includes(req.user.role)) {
//       return res.status(403).json({ message: "you are not allow" });
//     }
//     // if(!roles.includes(req.user.role )) คือไม่อนุญาติ
//     next();
//   };

// check ว่าใครบ้างที่เข้า route ไม่ได้
