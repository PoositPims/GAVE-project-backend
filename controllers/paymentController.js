const axios = require("axios");
const CryptoJs = require("crypto-js");
const { Order, Cart } = require("../models");

const chillpayUrl = "https://sandbox-appsrv2.chillpay.co/api/v2/Payment/";
const merchantCode = "M032774";
const apiKey =
  "revuwEcTgPXNsxBrMVf3ZRB0vPQbCqM9TyQrK5hKOUJsX2BDsYV7BZswFBnDb3WG";
const md5Secret =
  "eYGsDdjncfbdNW2ilDkglwwnsRL1C0kiHjHmbmtmY6WPBCrzxwW18M5m1zgcQIWTXRO8d1GIiYBqa757BS5ojulz3BR8laWIiLOiPOh9c1MmosjTdeGEymrwRiD7EPAjLqVwv4Qf5RnRF4L8SNMH65RzJmodUb8ouOAZH";

const redirectPath = "http://localhost:3000/";

//create
exports.createPaymentReq = async (req, res, next) => {
  try {
    const { userId, cartId } = req.body;
    // const { userId, cartId } = req.params;

    const cart = await Cart.findByPk(cartId);
    if (!cart) {
      throw new Error("no cart");
    }
    if (cart.isPaid) {
      throw new Error("cart is already paid");
    }
    // console.log("cart...........", cart);

    const IPAddress =
      req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const order = await Order.create({
      orderStatus: "pending",
      cartId,
      userId: req.user.id,
    });
    const orderNo = order.id;
    const amount = cart.totalPrice * 100;
    // console.log("amount............", amount);
    const phoneNumber = "081111111";
    const description = "test buy";
    const channelCode = "creditcard";

    // // console.log("userId..............", userId);
    const requestBody = {
      MerchantCode: merchantCode,
      OrderNo: orderNo,
      CustomerId: userId,
      Amount: amount,
      PhoneNumber: phoneNumber,
      Description: description,
      ChannelCode: channelCode,
      Currency: "764",
      LangCode: "TH",
      RouteNo: "1",
      IPAddress,
      ApiKey: apiKey,
      TokenFlag: "N",
      Md5Secret: md5Secret,
    };

    // make all value in the object to array
    const bodyValues = Object.values(requestBody);

    // stringify from bodyValues
    const stringBodyValues = bodyValues.reduce((prev, key) => prev + key, "");

    const CheckSum = CryptoJs.MD5(stringBodyValues).toString();

    // contact chillpay
    const { data } = await axios.post(
      chillpayUrl,
      {
        ...requestBody,
        CheckSum,
      },
      {
        timeout: 30000,
      }
    );
    const { TransactionId } = data;
    await order.update({ transactionId: TransactionId.toString() });
    res.status(201).json({ ChillpayData: data });
  } catch (err) {
    next(err);
  }
};

exports.paymentResult = async (req, res, next) => {
  try {
    const { status, transNo, respCode } = req.body;
    const order = await Order.findOne({
      where: {
        transactionId: transNo.toString(),
      },
    });
    if (!order) {
      throw new Error("no order");
    }
    // update order status
    if (respCode > 0) {
      await order.update({ orderStatus: "fail" });
    } else {
      await order.update({ orderStatus: "success" });
      // update user's current cart => is_paid = true, create new cart
      const cart = await Cart.findByPk(order.cartId);
      if (!cart) {
        throw new Error("no cart");
      }
      cart.isPaid = true;
      await cart.save();
      // create a new cart for user
      await Cart.create({
        products: [],
        totalPrice: 0,
        isPaid: false,
        userId: order.userId,
      });
    }
  } catch (err) {
    next(err);
  }
  // redirect
  res.redirect(redirectPath);
};

// const idx = cartItems.findIndex((x) => x.id === product.id);
//     const newCart = [...cartItems];
//     if (idx > -1) {
//       newCart[idx] = { ...newCart[idx], qty: newCart[idx].qty + 1 };
//     } else {
//       newCart.push({ ...product, qty: 1 });
//     }
//     setCartItems(newCart);
