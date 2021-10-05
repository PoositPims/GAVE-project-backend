const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
// const { authenticate } = require("../controllers/authController");
// const { authenticate } = require("../controllers/userController");

router.get("/", userController.getAllUser);
router.get("/:id", userController.getUserById);
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

// ตัวอย่าง..........................................................
// for Admin only
// router.get(
//   "/users",
//   authenticate,
//   checkRole("ADMIN"),
//   iserControllers.getAlluser
// );
//  checkRole("ADMIN") check ว่าใครเข้าได้บ้าง
//for customer only
// router.get("/user/:id", authenticate, checkRole("ADMIN"));
//for shop only

// for shop or customer
// router.get("/user/:id", authenticate, checkRole("ADMIN","customer"));
// ถ้าทุกคนเข้าถึงได้ ก็ไม่ต้องใส่

module.exports = router;

// // For Admin Only
// router.get('/users', authenticate, checkRole('ADMIN'), userControlles.getAllUsers)
// // For Customer Only
// router.get('/user/:id', authenticate, checkRole('CUSTOMER'))
// // For Shop Only

// // For Shop or Customer
// router.get('/user/:id', authenticate,
