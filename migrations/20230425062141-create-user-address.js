'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_addresses', {
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
      address_id: {
        allowNull:false,
        type: Sequelize.INTEGER
      },
      is_default: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    await queryInterface.addConstraint('user_addresses', {
      references: {
        field: 'id',
        table: 'site_users'
      },
      type: 'foreign key',
      fields: ['user_id']
    })

    await queryInterface.addConstraint('user_addresses', {
      references: {
        field: 'id',
        table: 'addresses'
      },
      type: 'foreign key',
      fields: ['address_id']
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_addresses');
  }
};