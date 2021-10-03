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

//update
exports.updateDelivery = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { deliveryStatus, delivery, destination } = req.body;
    const [rows] = await DeliverySuccess.update(
      { deliveryStatus, delivery, destination },
      { where: { id, userId: req.user.id } }
    );
    // if (rows[0] === 0)
    // [rows] คือการ restruturing
    if (rows === 0)
      return res.status(400).json({ message: "cannot update list" });
    res.status(200).json({ message: "update success" });
  } catch (err) {
    next(err);
  }
};
