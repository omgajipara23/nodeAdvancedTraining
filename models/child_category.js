'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class child_category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  child_category.init({
    child_cat_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'child_category',
  });

  child_category.associate = function (models){
    child_category.belongsToMany(models.perent_category, {through : models.category_master, foreignKey : 'child_cat_id'} )
  }

  return child_category;
};