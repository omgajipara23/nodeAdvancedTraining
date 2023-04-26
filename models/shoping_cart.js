'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class shoping_cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  shoping_cart.init({
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'shoping_cart',
  });
  return shoping_cart;
};