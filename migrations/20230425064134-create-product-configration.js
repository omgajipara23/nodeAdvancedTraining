'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('product_configrations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      variation_opt_id: {
        allowNull:false,
        type: Sequelize.INTEGER
      },
      product_id: {
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
        defaultValue:new Date(),
        type: Sequelize.DATE
      }
    });

    await queryInterface.addConstraint('product_configrations', {
      references: {
        field: 'id',
        table: 'variation_options'
      },
      type: 'foreign key',
      fields: ['variation_opt_id']
    })

    await queryInterface.addConstraint('product_configrations', {
      references: {
        field: 'id',
        table: 'product_items'
      },
      type: 'foreign key',
      fields: ['product_id']
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('product_configrations');
  }
};