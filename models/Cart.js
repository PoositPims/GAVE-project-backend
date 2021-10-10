module.exports = (Sequelize, DataTypes) => {
  const Cart = Sequelize.define(
    "Cart",
    {
      products: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      totalPrice: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
      },
      isPaid: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      underscored: true,
    }
  );
  Cart.associate = (models) => {
    Cart.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
    Cart.hasOne(models.Order, {
      foreignKey: {
        name: "cartId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
    // Cart.belongsTo(models.Product, {
    //   foreignKey: {
    //     name: "productId",
    //     allowNull: false,
    //   },
    //   onDelete: "RESTRICT",
    //   onUpdate: "RESTRICT",
    // });
  };
  return Cart;
};
