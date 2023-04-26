'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('category_masters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      parent_cat_id: {
        allowNull:false,
        type: Sequelize.INTEGER
      },
      child_cat_id: {
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

    await queryInterface.addConstraint('category_masters', {
      references: {
        field: 'id',
        table: 'perent_categories'
      },
      type: 'foreign key',
      fields: ['parent_cat_id']
    })

    await queryInterface.addConstraint('category_masters', {
      references: {
        field: 'id',
        table: 'child_categories'
      },
      type: 'foreign key',
      fields: ['child_cat_id']
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('category_masters');
  }
};