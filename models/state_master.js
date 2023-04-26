'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class state_master extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  state_master.init({
    state_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'state_master',
  });

  state_master.associate = function (models) {
    state_master.hasMany(models.city_master, { foreignKey: 'state_id' })
  }


  return state_master;
};