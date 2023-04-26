'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class variation_option extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  variation_option.init({
    variation_id: DataTypes.INTEGER,
    value: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'variation_option',
  });
  return variation_option;
};