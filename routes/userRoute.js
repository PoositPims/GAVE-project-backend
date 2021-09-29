const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
// const { authenticate } = require("../controllers/authController");
// const { authenticate } = require("../controllers/userController");

// router.get("/", userController.getAllUser);
// router.get("/:id", userController.getAllUser);
// .................
// router.post("/register", authenticate, userController.createUserRegister);
// router.post("/register", authenticate, userController.createUserRegister);
router.post("/register", userController.createUserRegister);
// ..................
// router.post("/", authenticate, userController.createUserLogin);
router.post("/login", userController.login); // เพราะ  login no need to verify
// ..................
// router.post("/register", userController.createUserRegister);

// ใช้ authenticate เมื่อต้องยืนยันตัวตน (GET เฉพาะตัว user หรือ permission ของ admin)
// authenticate คือต้องมี token มาใช้ก่อน

module.exports = router;
