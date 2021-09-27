// const { sequelize } = require("./models");
// sequelize.sync(); // sync แล้วให้ comment เลย

// const db = require("./models");
// db.Customer.crerate({});

const express = require("express");
const userRoute = require("./routes/userRoute");
const app = express();

app.use(express.json());
app.use(express.static("public"));

// handle path and method not found (path and method not specified in the server)
app.use((req, res, next) => {
  res.status(404).json({ message: "this resource is not found" });
});

//config routing
app.use("/users", userRoute);

//handle error
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: err.message });
});

app.listen(8115, () => console.log("server running on port 8115"));
