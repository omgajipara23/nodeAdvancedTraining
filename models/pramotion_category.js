'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pramotion_category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  pramotion_category.init({
    pramotion_id: DataTypes.INTEGER,
    parent_cat_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'pramotion_category',
  });
  return pramotion_category;
};