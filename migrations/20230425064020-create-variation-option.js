'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('variation_options', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      variation_id: {
        allowNull:false,
        type: Sequelize.INTEGER
      },
      value: {
        type: Sequelize.STRING
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
    await queryInterface.addConstraint('variation_options', {
      references: {
        field: 'id',
        table: 'variations'
      },
      type: 'foreign key',
      fields: ['variation_id']
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('variation_options');
  }
};