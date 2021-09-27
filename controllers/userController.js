const { User } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
//create
exports.createUser = async (req, res, next) => {
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
    });
    console.log(user);
    res.status(201).json({ user });
  } catch (err) {
    next(err);
  }
};
