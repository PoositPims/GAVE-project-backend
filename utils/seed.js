const { User, Cart, Shop } = require("../models");
const bcrypt = require("bcryptjs");

exports.initSeedData = async () => {
  console.log("start seeding...");
  const password = "123";
  const hashedPassword = await bcrypt.hash(password, 12);
  // create seed customer and cart
  const user = await User.findOne({ where: { username: "buyer" } });
  if (!user) {
    const user = await User.create({
      firstName: "buyer",
      lastName: "buyer",
      username: "buyer",
      email: "buyer@gmail.com",
      telephone: "1234567890",
      password: hashedPassword,
      address1: "buyer",
      address2: "buyer",
      role: "BUYER",
    });
    await Cart.create({
      products: [],
      totalPrice: 0,
      isPaid: false,
      userId: user.id,
    });
  }

  const shop = await Shop.findOne({ where: { username: "shop" } });
  if (!shop) {
    await Shop.create({
      firstName: "shop",
      lastName: "shop",
      shopName: "shop",
      username: "shop",
      email: "shop@gmail.com",
      role: "SHOP",
      password: hashedPassword,
      shopAddress: "shop",
      renenue: 0,
    });
  }
  console.log("seeding finished");
};
