// const { sequelize } = require("./models");
// sequelize.sync({ force: true }); // sync แล้วให้ comment เลย

// const db = require("./models");
// db.Customer.create({});
require('dotenv').config();
const express = require("express");
const userRoute = require("./routes/userRoute");
const shopRoute = require("./routes/shopRoute");
const productRoute = require("./routes/productRoute")
// const authRoute = require("./routes/authRoute");
const cors = require("cors");
const app = express();
app.use(cors());

app.use(express.json());
app.use(express.static("public"));

//config routing
app.use("/users", userRoute);
app.use("/shops", shopRoute);
app.use("/products",productRoute)
// app.use("/", authRoute);
// app.use("/seller", userRoute); ต้องแยก
// แบ่ง path คนละหน้าที่ เช่น user , seller

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
