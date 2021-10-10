module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define("Order", {
    orderStatus: {
      type: DataTypes.ENUM("success", "fail", "pending"),
      allowNull: false,
    },
    transactionId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
  Order.associate = (models) => {
    Order.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
    Order.hasOne(models.DeliverySuccess, {
      foreignKey: {
        name: "orderId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
    Order.belongsTo(models.Cart, {
      foreignKey: {
        name: "cartId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
    // Order.hasMany(models.OrderItem, {
    //   foreignKey: {
    //     name: "orderId",
    //     allowNull: false,
    //   },
    //   onDelete: "RESTRICT",
    //   onUpdate: "RESTRICT",
    // });
    // Order.belongsTo(models.Shop, {
    //   foreignKey: {
    //     name: "shopId",
    //     allowNull: false,
    //   },
    //   onDelete: "RESTRICT",
    //   onUpdate: "RESTRICT",
    // });
  };
  return Order;
};
