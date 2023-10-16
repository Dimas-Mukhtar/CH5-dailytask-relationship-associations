"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Auth, {
        foreignKey: {
          name: "userId"
        }
      })

      User.belongsTo(models.Shop, {
        foreignKey: {
          name: "shopId"
        }
      })
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      age: DataTypes.INTEGER,
      address: DataTypes.STRING,
      role: {
        type: DataTypes.ENUM(["Owner", "Staff"]),
        defaultValue: "Staff"
      },
      shopId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null
      }
    },
    {
      // hooks: {
      //   beforeCreate: async (user) => {
      //     if (!user.shopId) {
      //       user.shopId = null
      //     }
      //   }
      // },
      sequelize,
      modelName: "User"
    }
  )
  return User
}
