'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class city_master extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  city_master.init({
    city_name: DataTypes.STRING,
    state_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'city_master',
  });

  city_master.associate = function (models) {
    city_master.belongsTo(models.state_master, { foreignKey: 'state_id' })
  }

  return city_master;
};