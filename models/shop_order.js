'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class shop_order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  shop_order.init({
    user_id: DataTypes.INTEGER,
    order_date: DataTypes.DATE,
    shipping_address_id: DataTypes.INTEGER,
    shipping_method_id: DataTypes.INTEGER,
    payment_method_id: DataTypes.INTEGER,
    order_total: DataTypes.DECIMAL,
    order_status_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'shop_order',
  });
  return shop_order;
};