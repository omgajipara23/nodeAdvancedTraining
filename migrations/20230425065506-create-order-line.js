'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('order_lines', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      product_item_id: {
        allowNull:false,
        type: Sequelize.INTEGER
      },
      order_id: {
        allowNull:false,
        type: Sequelize.INTEGER
      },
      qty: {
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.DECIMAL
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

    await queryInterface.addConstraint('order_lines', {
      references: {
        field: 'id',
        table: 'product_items'
      },
      type: 'foreign key',
      fields: ['product_item_id']
    })

    await queryInterface.addConstraint('order_lines', {
      references: {
        field: 'id',
        table: 'shop_orders'
      },
      type: 'foreign key',
      fields: ['order_id']
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('order_lines');
  }
};