'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('product_items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      product_id: {
        allowNull:false,
        type: Sequelize.INTEGER
      },
      qty_in_stoke: {
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.DECIMAL
      },
      createdAt: {
        allowNull: false,
        defaultValue:new Date(),
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue:new Date()
      }
    });

    await queryInterface.addConstraint('product_items', {
      references: {
        field: 'id',
        table: 'products'
      },
      type: 'foreign key',
      fields: ['product_id']
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('product_items');
  }
};