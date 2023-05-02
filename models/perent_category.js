'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class perent_category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  perent_category.init({
    parent_cat_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'perent_category',
  });

  perent_category.associate = function (models) {
    perent_category.belongsToMany(models.child_category, { through: models.category_master, foreignKey: 'parent_cat_id' })
  }

  return perent_category;
};