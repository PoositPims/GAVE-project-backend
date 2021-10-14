const paymentController = require("../controllers/paymentController");
const router = require("express").Router();
const { authenticate } = require("../controllers/authController");

router.post(
  "/request-payment",
  authenticate,
  paymentController.createPaymentReq
);
router.post("/result", paymentController.paymentResult);

module.exports = router;
