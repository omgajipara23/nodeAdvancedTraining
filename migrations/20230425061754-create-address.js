'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('addresses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      street_number: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      address_line_1: {
        type: Sequelize.STRING,
        allowNull: false
      },
      address_line_2: {
        type: Sequelize.STRING,
        allowNull: false
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false
      },
      region: {
        type: Sequelize.STRING,
        allowNull: false
      },
      country_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.addConstraint('addresses', {
      references: {
        field: 'id',
        table: 'countries'
      },
      type: 'foreign key',
      fields: ['country_id']
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('addresses');
  }
};