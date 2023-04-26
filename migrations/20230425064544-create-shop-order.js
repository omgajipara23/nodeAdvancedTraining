'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('shop_orders', {
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
      order_date: {
        type: Sequelize.DATE
      },
      shipping_address_id: {
        allowNull:false,
        type: Sequelize.INTEGER
      },
      shipping_method_id: {
        allowNull:false,
        type: Sequelize.INTEGER
      },
      payment_method_id: {
        allowNull:false,
        type: Sequelize.INTEGER
      },
      order_total: {
        type: Sequelize.DECIMAL
      },
      order_status_id: {
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

    await queryInterface.addConstraint('shop_orders', {
      references: {
        field: 'id',
        table: 'site_users'
      },
      type: 'foreign key',
      fields: ['user_id']
    })

    await queryInterface.addConstraint('shop_orders', {
      references: {
        field: 'id',
        table: 'user_addresses'
      },
      type: 'foreign key',
      fields: ['shipping_address_id']
    })

    await queryInterface.addConstraint('shop_orders', {
      references: {
        field: 'id',
        table: 'shipping_methods'
      },
      type: 'foreign key',
      fields: ['shipping_method_id']
    })

    await queryInterface.addConstraint('shop_orders', {
      references: {
        field: 'id',
        table: 'user_paymebnt_methods'
      },
      type: 'foreign key',
      fields: ['payment_method_id']
    })

    await queryInterface.addConstraint('shop_orders', {
      references: {
        field: 'id',
        table: 'order_statuses'
      },
      type: 'foreign key',
      fields: ['order_status_id']
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('shop_orders');
  }
};