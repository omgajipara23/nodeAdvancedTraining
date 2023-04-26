'use strict';
const {
  Model
} = require('sequelize');
const address = require('./address');
module.exports = (sequelize, DataTypes) => {
  class country extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  country.init({
    country_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'country',
  });

  country.associate = function (models) {
    country.hasOne(models.address, { foreignKey: 'country_id' });
  };


  return country;
};