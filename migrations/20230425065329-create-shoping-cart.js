'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('shoping_carts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        allowNull:false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue:new Date()
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue:new Date()
      }
    });

    await queryInterface.addConstraint('shoping_carts', {
      references: {
        field: 'id',
        table: 'site_users'
      },
      type: 'foreign key',
      fields: ['user_id']
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('shoping_carts');
  }
};