'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user_address.init({
    user_id: DataTypes.INTEGER,
    address_id: DataTypes.INTEGER,
    is_default: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'user_address',
  });

  user_address.associate = function (models) {
    user_address.belongsTo(models.address, { foreignKey: 'address_id' })
    user_address.belongsTo(models.site_user, { foreignKey: 'user_id' })
  }
  return user_address;
};