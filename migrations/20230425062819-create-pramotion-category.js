'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pramotion_categories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pramotion_id: {
        allowNull:false,
        type: Sequelize.INTEGER
      },
      parent_cat_id: {
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

    await queryInterface.addConstraint('pramotion_categories', {
      references: {
        field: 'id',
        table: 'pramotions'
      },
      type: 'foreign key',
      fields: ['pramotion_id']
    })

    await queryInterface.addConstraint('pramotion_categories', {
      references: {
        field: 'id',
        table: 'perent_categories'
      },
      type: 'foreign key',
      fields: ['parent_cat_id']
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('pramotion_categories');
  }
};