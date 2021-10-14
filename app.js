require("dotenv").config();
const { sequelize } = require("./models");
const multer = require("multer");
const { Product } = require("./models");
const express = require("express");
const fs = require("fs");
const cors = require("cors");
const { memoryStorage } = require("multer");
const { initSeedData } = require("./utils/seed");
const productRoute = require("./routes/productRoute");
const paymentRoute = require("./routes/paymentRoute");
const userRoute = require("./routes/userRoute");
const shopRoute = require("./routes/shopRoute");
const cartRoute = require("./routes/cartRoute");
const orderRoute = require("./routes/orderRoute");

const startApp = async () => {
  // const cloudinary = require("cloudinary").v2;

  // For reset db......
  // await sequelize.sync({ force: true }); // sync แล้วให้ comment เลย
  // await initSeedData();

  // const db = require("./models");
  // db.Customer.create({});

  // const orderRoute = require("./routes/orderRoute");
  // const authRoute = require("./routes/authRoute");
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/public", express.static("public"));
  // app.use(express.static("public"));

  //config routing
  // const uploadPromise = util.promisify(cloudinary.uploader.upload);
  app.use("/users", userRoute);
  app.use("/shops", shopRoute);
  app.use("/products", productRoute);
  app.use("/payments", paymentRoute);
  app.use("/carts", cartRoute);
  app.use("/orders", orderRoute);

  // app.use("/", authRoute);
  // app.use("/seller", userRoute); ต้องแยก
  // แบ่ง path คนละหน้าที่ เช่น user , sellers

  // multer picture.......................................................
  // const pictureStorage = multer.diskStorage({
  //   destination: (req, file, cb) => {
  //     // console.log(file);
  //     cb(null, "public/images");
  //   },
  //   filename: (req, file, cb) => {
  //     cb(null, `${Date.now()}.${file.mimetype.split("/")[1]}`);
  //   },
  // });

  // const upload = multer({ storage: pictureStorage });
  // app.post("/upload", upload.single("image"), (req, res) => {
  //   console.log(req.file);
  //   res.send("single file success");
  // });
  // multer picture.......................................................

  // handle path and method not found (path and method not specified in the server)
  // เอาไว้ดัก เวลาหาไม่เอ
  app.use((req, res, next) => {
    res.status(404).json({ message: "this resource is not found" });
  });

  //handle error
  app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({ message: err.message });
  });

  app.listen(8115, () => console.log("server running on port 8115"));
};

startApp();
