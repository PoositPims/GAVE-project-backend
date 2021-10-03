module.exports = (sequelize, DataTypes) => {
  const Shop = sequelize.define(
    "Shop",
    {
      shopName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      shopAddress: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      renenue: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
      },
      // role: {
      //   type: DataTypes.DECIMAL(15, 2),
      //   allowNull: false,
      // },
    },
    {
      underscored: true,
    }
  );
  Shop.associate = (models) => {
    Shop.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
    Shop.hasMany(models.Product, {
      foreignKey: {
        name: "shopId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
    Shop.hasMany(models.Order, {
      foreignKey: {
        name: "shopId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  };
  return Shop;
};


