const paymentController = require("../controllers/paymentController");
const router = require("express").Router();

router.post("/request-payment", paymentController.createPaymentReq);
router.post("/result", paymentController.paymentResult);

module.exports = router;
