module.exports = (sequelize, DataTypes) => {
  const Shop = sequelize.define(
    "Shop",
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      shopName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      role: {
        type: DataTypes.ENUM("BUYER", "SHOP", "ADMIN"),
        allowNull: false,
        // defaultValue: "BUYER",
      },
      password: {
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
        defaultValue: 0.0,
      },
    },
    {
      underscored: true,
    }
  );
  Shop.associate = (models) => {
    Shop.hasMany(models.Product, {
      foreignKey: {
        name: "shopId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
    // Shop.hasMany(models.Order, {
    //   foreignKey: {
    //     name: "shopId",
    //     allowNull: false,
    //   },
    //   onDelete: "RESTRICT",
    //   onUpdate: "RESTRICT",
    // });
  };
  return Shop;
};
