'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class video extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  video.init({
    title: DataTypes.STRING,
    url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'video',
  });

  video.associate = function (models) {
    video.hasMany(models.commnet, {
      foreignKey: 'commentableId',
      constraints: false,
      scope: {
        commentableType: 'video'
      }
    })
  }

  return video;
};



