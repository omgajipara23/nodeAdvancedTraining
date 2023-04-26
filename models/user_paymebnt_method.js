'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_paymebnt_method extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user_paymebnt_method.init({
    user_id: DataTypes.INTEGER,
    payment_method_id: DataTypes.INTEGER,
    account_number: DataTypes.INTEGER,
    expiry_date: DataTypes.DATE,
    is_default: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'user_paymebnt_method',
  });
  return user_paymebnt_method;
};