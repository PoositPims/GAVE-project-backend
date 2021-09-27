const { DeliverySuccess } = require("../models");

//create
exports.createDeliverySuccess = async (req, res, next) => {
  try {
    const { deliveryStatus, delivery, destination } = req.body;
    const deliverySuccess = await DeliverySuccess.create({
      deliveryStatus,
      delivery,
      destination,
    });
    res.status(201).json({ deliverySuccess });
  } catch (err) {
    next(err);
  }
};
