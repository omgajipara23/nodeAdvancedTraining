'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('shoping_cart_items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cart_id: {
        allowNull:false,
        type: Sequelize.INTEGER
      },
      product_item_id: {
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
        type: Sequelize.DATE,
        defaultValue:new Date()
      }
    });

    await queryInterface.addConstraint('shoping_cart_items', {
      references: {
        field: 'id',
        table: 'shoping_carts'
      },
      type: 'foreign key',
      fields: ['cart_id']
    })

    await queryInterface.addConstraint('shoping_cart_items', {
      references: {
        field: 'id',
        table: 'product_items'
      },
      type: 'foreign key',
      fields: ['product_item_id']
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('shoping_cart_items');
  }
};