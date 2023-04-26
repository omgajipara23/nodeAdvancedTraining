'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_reviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      ordreted_product_id: {
        allowNull:false,
        type: Sequelize.INTEGER
      },
      rating_value: {
        type: Sequelize.INTEGER
      },
      comment: {
        type: Sequelize.STRING
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

    await queryInterface.addConstraint('user_reviews', {
      references: {
        field: 'id',
        table: 'site_users'
      },
      type: 'foreign key',
      fields: ['user_id']
    })

    await queryInterface.addConstraint('user_reviews', {
      references: {
        field: 'id',
        table: 'order_lines'
      },
      type: 'foreign key',
      fields: ['ordreted_product_id']
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_reviews');
  }
};