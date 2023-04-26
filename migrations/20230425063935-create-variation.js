'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('variations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      child_cat_id: {
        allowNull:false,
        type: Sequelize.INTEGER
      },
      variation_name: {
        type: Sequelize.STRING
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

    await queryInterface.addConstraint('variations', {
      references: {
        field: 'id',
        table: 'child_categories'
      },
      type: 'foreign key',
      fields: ['child_cat_id']
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('variations');
  }
};