'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  image.init({
    title: DataTypes.STRING,
    url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'image',
  });

  image.associate = function (models) {
    image.hasMany(models.commnet, {
      foreignKey: 'commentableId',
      constraints: false,
      scope: {
        commentableType: 'image'
      }
    })
  }

  return image;
};