'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_paymebnt_methods', {
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
      payment_method_id: {
        allowNull:false,
        type: Sequelize.INTEGER
      },
      account_number: {
        type: Sequelize.INTEGER
      },
      expiry_date: {
        type: Sequelize.DATE
      },
      is_default: {
        type: Sequelize.BOOLEAN
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

    await queryInterface.addConstraint('user_paymebnt_methods', {
      references: {
        field: 'id',
        table: 'site_users'
      },
      type: 'foreign key',
      fields: ['user_id']
    })

    await queryInterface.addConstraint('user_paymebnt_methods', {
      references: {
        field: 'id',
        table: 'payment_methods'
      },
      type: 'foreign key',
      fields: ['payment_method_id']
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_paymebnt_methods');
  }
};