module.exports = (sequelize, DataTypes) => {
  const DeliverySuccess = sequelize.define(
    "DeliverySuccess",
    {
      deliveryStatus: {
        type: DataTypes.ENUM("delivered", "delivering", "preparing"),
        allowNull: false,
      },
      delivery: {
        type: DataTypes.ENUM(
          "Thailand Post",
          "Flash Express",
          "Kerry Express",
          "J&T Express"
        ),
        allowNull: false,
      },
      destination: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      underscored: true,
    }
  );
  DeliverySuccess.associate = (models) => {
    DeliverySuccess.belongsTo(models.Order, {
      foreignKey: {
        name: "orderId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  };
  return DeliverySuccess;
};
