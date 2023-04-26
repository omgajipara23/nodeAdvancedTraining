'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class shoping_cart_item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  shoping_cart_item.init({
    cart_id: DataTypes.INTEGER,
    product_item_id: DataTypes.INTEGER,
    qty: DataTypes.INTEGER,
    price: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'shoping_cart_item',
  });
  return shoping_cart_item;
};