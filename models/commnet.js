'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class commnet extends Model {


    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  commnet.init({
    comment_title: DataTypes.STRING,
    commentableId: DataTypes.INTEGER,
    commentableType: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'commnet',
  });


  commnet.associate = function (models) {
    commnet.belongsTo(models.image, {
      foreignKey: 'commentableId',
      constraints: false,
    })
  }

  commnet.associate = function (models) {
    commnet.belongsTo(models.video, {
      foreignKey: 'commentableId',
      constraints: false,
    })
  }

  return commnet;
};