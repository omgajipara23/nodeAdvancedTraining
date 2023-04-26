'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class category_master extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  category_master.init({
    parent_cat_id: DataTypes.INTEGER,
    child_cat_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'category_master',
  });

 

  return category_master;
};