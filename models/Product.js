module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      productName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      productPicture: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      productSize: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
      },
      discount: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: true,
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      delivery: {
        type: DataTypes.ENUM(
          "ThailandPost",
          "FlashExpress",
          "KerryExpress",
          "JandTExpress"
        ),
        allowNull: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
    },
    {
      underscored: true,
    }
  );
  Product.associate = (models) => {
    // Product.hasOne(models.Cart, {
    //   foreignKey: {
    //     name: "productId",
    //     allowNull: false,
    //   },
    //   onDelete: "RESTRICT",
    //   onUpdate: "RESTRICT",
    // });
    Product.belongsTo(models.Shop, {
      foreignKey: {
        name: "shopId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
    // Product.hasMany(models.OrderItem, {
    //   foreignKey: {
    //     name: "productId",
    //     allowNull: false,
    //   },
    //   onDelete: "RESTRICT",
    //   onUpdate: "RESTRICT",
    // });
  };
  return Product;
};
