'use strict';
const {
  Model
} = require('sequelize');
const { options } = require('../routes/user.routes');
module.exports = (sequelize, DataTypes) => {
  class passwordMaster extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }


  passwordMaster.init({
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'passwordMaster',
  });

  passwordMaster.afterCreate(async (user, options) => {
    console.log(user.password);
    user.password = "testing the new password"
    passwordMaster.password = user.password
    console.log(passwordMaster.password ,"  demooo");
  })



  return passwordMaster;

};