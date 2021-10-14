const { Cart, Product } = require("../models");
const clone = require("clone");

//get all
exports.getAllCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: { userId: req.user.id, isPaid: false },
      // เพื่อให้คนที่สามารถเข้าถึงข้อมูลนี้ได้ คือคนที่เป็นเจ้าของรหัสเท่านั้น (Auhtnticate)
    });
    // console.log("cart......", cart);
    console.log(JSON.stringify(cart, null, 2));
    let productId = [];
    cart.products.forEach(
      (item) => productId.push(item.productId)
      // item.products.forEach((item) => (productId = item.productId))
    );
    const product = await Product.findAll({
      where: { id: productId },
    });
    const newProduct = [...JSON.parse(JSON.stringify(product))];
    const newProductforResponse = newProduct.map((item) => {
      const arrcart = [...cart.products];
      const idx = arrcart.findIndex(
        (itemOfCart) => itemOfCart.productId === item.id
      );
      return { ...item, quantity: arrcart[idx].quantity };
    });
    // console.log(product);
    // map id ไปกับค่า product
    res.json({
      cart: newProductforResponse,
      cartId: cart.id,
      userId: cart.userId,
    });
  } catch (err) {
    next(err);
  }
};

//get by id
exports.getCartById = async (req, res, next) => {
  // console.log("req.user.....................", req.user);
  try {
    const { id } = req.params;
    // console.log("id.......................", id);
    const cart = await Cart.findOne({
      where: {
        userId: id,
        isPaid: true,
        // ใส่เงื่อนไข Authenticate เพราะมันอาจจะไปขอไอดีของคนที่ไม่ใช่เจ้าของก็ได้ เราจึงจำเป็นต้องใส่ ไม่งั้นมันจะไปเอา list ของใครมาก็ได้
      },
    });
    // console.log("cart................", cart);
    res.json({ cart });
  } catch (err) {
    next(err);
  }
};

//create
exports.addToCart = async (req, res, next) => {
  try {
    const { productId, quantity, price } = req.body;
    const { id } = req.user;
    console.log("x");
    // console.log("req.body.......................", req.body);
    // console.log(req.user.id);
    const cart = await Cart.findOne({ where: { userId: id, isPaid: false } });
    // console.log("cart..................................", cart);

    const cartProducts = clone(cart.products);
    const idx = cartProducts.findIndex((x) => x.productId === productId);
    const newCart = [...cartProducts];
    if (idx > -1) {
      newCart[idx] = {
        ...newCart[idx],
        quantity: (newCart[idx].quantity += quantity),
      };
    } else {
      newCart.push({
        productId: productId,
        quantity,
        price,
      });
    }

    let totalPrice = newCart.reduce((a, c) => a + +c.price * c.quantity, 0);
    // console.log("totalPrice.............", totalPrice);
    // console.log("newCart.............", newCart);
    // console.log("productId.............", productId);

    // cart.products = clone(newCart);
    cart.products = newCart;
    cart.totalPrice = totalPrice;
    // console.log("cart.............", cart);
    await cart.save();
    // const cart = await Cart.create({ products, totalPrice, isPaid });
    res.status(201).json({ result: req.body });
  } catch (err) {
    next(err);
  }
};

// .................................................................
//update
exports.updateCart = async (req, res, next) => {
  try {
    const { userId, productId, quantity } = req.body;
    const cartAlreadyOne = await Cart.findOne({
      where: { userId, isPaid: true },
    });
    const cartProducts = clone(cartAlreadyOne.products);
    const newCart = [...cartProducts];
    if (idx > -1) {
      newCart[idx] = {
        ...newCart[idx],
        quantity: (newCart[idx].quantity += quantity),
      };
    } else {
      newCart.push({
        productId: productId,
        quantity,
      });
    }
    cart.products = clone(newCart);
    await cart.save();
    // const idx = cartProducts.findIndex((x) => x.productId === productId);
    // const newCart = [...cartProducts];
  } catch (err) {
    next(err);
  }
};
// .................................................................

//delete
exports.deleteCart = async (req, res, next) => {
  try {
    const { id } = req.params;
    // const { productId, quantity } = req.body;
    // const { id } = req.user;
    const rows = await Cart.findOne({
      userId: id,
      isPaid: false,
    });
    // console.log(rows);

    let idx = rows.products.findIndex((item) => item.productId === +id);
    // console.log("idx.............", idx);
    if (idx >= -1) {
      rows.products.splice(idx, 1);
      // console.log("rows.products..........", rows.products);
      Cart.update(
        {
          products: rows.products,
        },
        {
          where: {
            id: rows.id,
          },
        }
      );
    }

    // rows.products
    // let productId = [];
    // rows.products.splice(2, "");

    // rows.products.forEach((item) => productId.push(item.productId));
    // console.log("productId.....................", productId);

    // con
    // rows.products

    // const del = await Cart.destroy({
    //   where: { id: productId },
    // });

    // const product = await Product.findAll({
    //   where: { id: productId },
    // });

    // const rows = await Cart.destroy({
    //   where: {
    //     id,
    //     userId: req.user.id,
    //     // userId: id,
    //   },
    // });
    // rows return เป็นจำนวนแถวที่ลบออก

    // if (rows === 0) {
    //   return res.status(400).json({
    //     // message: "cannot delete",
    //     cart,
    //     product,
    //   });
    // }
    res.status(204).json();
  } catch (err) {
    next(err);
  }
};

// const cart = await Cart.findOne({
//   where: { userId: req.user.id, isPaid: false },
//   // เพื่อให้คนที่สามารถเข้าถึงข้อมูลนี้ได้ คือคนที่เป็นเจ้าของรหัสเท่านั้น (Auhtnticate)
// });
